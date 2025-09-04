//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { composePlugins, withNx }  from '@nx/next';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
};

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform();
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];
export const runtime = 'edge';
export default  composePlugins(...plugins)(nextConfig);
