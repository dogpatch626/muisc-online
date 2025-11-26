'use client';
// App.jsx
import { WavyBackground } from '@/components/ui/shadcn-io/wavy-background';
import Image from 'next/image';
import logo from '../../public/steriledreams.svg';
import {
  useState,
  createContext,
  useMemo,
  useCallback,
  useRef,
  Ref,
} from 'react';
import ActiveChannel from './ActiveChannel';
import PlayerControlComponents from './components/PlayerControlComponents';
export const VideoContext = createContext({});
export const IframeContext = createContext<Ref<HTMLIFrameElement> | undefined>(
  undefined
);
export default function Home() {
  const [position, setPos] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const updatePosition = useCallback((index: number) => {
    setPos(index);
  }, []);

  const carouselItems = [
    {
      id: 1,
      artist: 'MIKE',
      src: 'https://www.youtube.com/embed/0cDe2pK4SoU?si?enablejsapi=1',
    },
    {
      id: 2,
      artist: 'Gorillaz',
      src: 'https://www.youtube.com/embed/04mfKJWDSzI?si=6orlk7BtIn4rqutH?enablejsapi=1',
    },
    {
      id: 3,
      artist: 'TOOL',
      src: 'https://www.youtube-nocookie.com/embed/-_nQhGR0K8M?si=wmN_XVsbYnTWAIXm?enablejsapi=1',
    },
    {
      id: 4,
      artist: 'Crumb',
      src: 'https://www.youtube-nocookie.com/embed/BqnG_Ei35JE?si=sa_tt6QOmJpfRBnH?enablejsapi=1',
    },
    {
      id: 5,
      artist: 'SADE',
      src: 'https://www.youtube-nocookie.com/embed/U-SHfpm5Bxk?si=iI5eBo8XHuG-kpdt?enablejsapi=1',
    },
  ];
  const contextValue = useMemo(
    () => ({
      position,
      updatePosition,
    }),
    [position, updatePosition]
  );
  function moveLeft(): void {
    // circular array
    setPos((position - (1 % 5) + 5) % 5);
  }
  function moveRight(): void {
    setPos((position + (1 % 5) + 5) % 5);
  }

  return (
    <VideoContext value={contextValue}>
      <IframeContext value={iframeRef}>
        <WavyBackground
          // perspective={100}
          // beamsPerSide={3}
          // gridColor="#eeeeee"
          className="flex items-center justify-center w-12/12"
        >
          <div className="main-container w-12/12">
            <div className="content-body w-8/12">
              <div className="tv-container   w-12/12">
                <div className="tv-body isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 w-12/12">
                  <div className="tv-screen-container ">
                    <div className="tv-screen">
                      <div className="content ">
                        {/* {change && (
                    <Image
                      src={
                        'https://media1.tenor.com/m/88dnH_mHRLAAAAAC/static-tv-static.gif'
                      }
                      alt="static"
                      key={'static'}
                      priority={true}
                      width={25}
                      height={25}
                    ></Image>
                  )} */}
                        <ActiveChannel channel={carouselItems[position]} />
                      </div>
                      <div className="scan-lines"></div>
                      <div className="flicker"></div>
                    </div>
                  </div>
                </div>
                <PlayerControlComponents
                  moveLeft={moveLeft}
                  moveRight={moveRight}
                />
              </div>
              {/* temporary for placements */}
            </div>
            <div className="carousel-container w-4/12 h-12/12 flex flex-col justify-center">
              {/* <Carousel songs={carouselItems} /> */}
            </div>
            <div className="footer static">
              {' '}
              <Image
                src={logo}
                alt={''}
                style={{
                  position: 'fixed',
                  bottom: 5,
                  width: '100px',
                  color: 'black',
                  justifySelf: 'center',
                }}
              />
            </div>
          </div>
        </WavyBackground>
      </IframeContext>
    </VideoContext>
  );
}
