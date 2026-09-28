import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PS2_COLORS = [
  '#3c78ff', '#ff5050', '#ffc828', '#50c864',
  '#b450dc', '#28c8dc', '#ff8c32', '#ff64b4',
];

const FLOOR_Y = -1.6;
const CEILING_Y = 3;
const WALL_X = 5;
const Z_NEAR = 4;   // behind the camera
const Z_FAR = -22;  // into the distance
const GRID_STEP = 1;

function makeGlowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.15, 'rgba(255,255,255,0.8)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.3)');
  grad.addColorStop(0.7, 'rgba(255,255,255,0.05)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function RoomGrid() {
  const geometry = useMemo(() => {
    const positions: number[] = [];

    // Floor
    for (let z = Z_NEAR; z >= Z_FAR; z -= GRID_STEP) {
      positions.push(-WALL_X, FLOOR_Y, z, WALL_X, FLOOR_Y, z);
    }
    for (let x = -WALL_X; x <= WALL_X; x += GRID_STEP) {
      positions.push(x, FLOOR_Y, Z_NEAR, x, FLOOR_Y, Z_FAR);
    }

    // Ceiling
    for (let z = Z_NEAR; z >= Z_FAR; z -= GRID_STEP) {
      positions.push(-WALL_X, CEILING_Y, z, WALL_X, CEILING_Y, z);
    }
    for (let x = -WALL_X; x <= WALL_X; x += GRID_STEP) {
      positions.push(x, CEILING_Y, Z_NEAR, x, CEILING_Y, Z_FAR);
    }

    // Left wall
    for (let z = Z_NEAR; z >= Z_FAR; z -= GRID_STEP) {
      positions.push(-WALL_X, FLOOR_Y, z, -WALL_X, CEILING_Y, z);
    }
    for (let y = FLOOR_Y; y <= CEILING_Y; y += GRID_STEP) {
      positions.push(-WALL_X, y, Z_NEAR, -WALL_X, y, Z_FAR);
    }

    // Right wall
    for (let z = Z_NEAR; z >= Z_FAR; z -= GRID_STEP) {
      positions.push(WALL_X, FLOOR_Y, z, WALL_X, CEILING_Y, z);
    }
    for (let y = FLOOR_Y; y <= CEILING_Y; y += GRID_STEP) {
      positions.push(WALL_X, y, Z_NEAR, WALL_X, y, Z_FAR);
    }

    // Back wall
    for (let x = -WALL_X; x <= WALL_X; x += GRID_STEP) {
      positions.push(x, FLOOR_Y, Z_FAR, x, CEILING_Y, Z_FAR);
    }
    for (let y = FLOOR_Y; y <= CEILING_Y; y += GRID_STEP) {
      positions.push(-WALL_X, y, Z_FAR, WALL_X, y, Z_FAR);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#9aacbb" transparent opacity={0.3} />
    </lineSegments>
  );
}

const TRAIL_LENGTH = 20;

interface OrbData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  colorHex: string;
  trail: THREE.Vector3[];
}

function GlowOrb({ orb, glowMap }: { orb: OrbData; glowMap: THREE.Texture }) {
  const groupRef = useRef<THREE.Group>(null);
  const frameCount = useRef(0);

  const trailGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(TRAIL_LENGTH * 3);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    orb.position.add(orb.velocity);

    if (Math.abs(orb.position.x) > WALL_X * 0.9) orb.velocity.x *= -1;
    if (orb.position.y < FLOOR_Y + 0.3 || orb.position.y > CEILING_Y - 0.3) orb.velocity.y *= -1;
    if (orb.position.z > Z_NEAR - 0.5 || orb.position.z < Z_FAR + 0.5) orb.velocity.z *= -1;

    groupRef.current.position.copy(orb.position);

    // Update trail every 3 frames
    frameCount.current++;
    if (frameCount.current % 3 === 0) {
      orb.trail.push(orb.position.clone());
      if (orb.trail.length > TRAIL_LENGTH) orb.trail.shift();
    }

    // Write trail to geometry
    const attr = trailGeo.getAttribute('position') as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const pt = orb.trail[i];
      if (pt) {
        arr[i * 3] = pt.x;
        arr[i * 3 + 1] = pt.y;
        arr[i * 3 + 2] = pt.z;
      } else {
        arr[i * 3] = orb.position.x;
        arr[i * 3 + 1] = orb.position.y;
        arr[i * 3 + 2] = orb.position.z;
      }
    }
    attr.needsUpdate = true;
    trailGeo.setDrawRange(0, orb.trail.length);
  });

  return (
    <>
      <group ref={groupRef} position={orb.position}>
        {/* Solid colored orb */}
        <mesh>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={orb.colorHex} toneMapped={false} />
        </mesh>
        {/* Glow around it */}
        <sprite scale={[0.5, 0.5, 1]}>
          <spriteMaterial
            map={glowMap}
            color={orb.colorHex}
            transparent
            opacity={0.7}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
        <pointLight
          color={orb.colorHex}
          intensity={1.5}
          distance={4}
          decay={2}
        />
      </group>
      {/* Trail */}
      <primitive object={(() => {
        const mat = new THREE.LineBasicMaterial({
          color: orb.colorHex,
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
          toneMapped: false,
        });
        return new THREE.Line(trailGeo, mat);
      })()}/>
    </>
  );
}

function Orbs() {
  const glowMap = useMemo(() => makeGlowTexture(), []);

  const orbs = useMemo<OrbData[]>(() =>
    Array.from({ length: 11 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * WALL_X * 1.4,
        FLOOR_Y + 0.5 + Math.random() * (CEILING_Y - FLOOR_Y - 1),
        Z_NEAR - 1 - Math.random() * (Z_NEAR - Z_FAR - 2),
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.007,
      ),
      colorHex: PS2_COLORS[Math.floor(Math.random() * PS2_COLORS.length)],
      trail: [],
    })),
  []);

  return (
    <>
      {orbs.map((orb, i) => (
        <GlowOrb key={i} orb={orb} glowMap={glowMap} />
      ))}
    </>
  );
}

export function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <Canvas
        camera={{ position: [0, FLOOR_Y + 1.6, 3], fov: 75, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#f0f0f0' }}
      >
        <color attach="background" args={['#f0f0f0']} />
        <fog attach="fog" args={['#f0f0f0', 4, 26]} />

        <ambientLight intensity={0.35} />

        <RoomGrid />
        <Orbs />
      </Canvas>
    </div>
  );
}
