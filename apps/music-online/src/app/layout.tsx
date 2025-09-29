import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: 'Music Online',
  description: 'A blogsite to share and write about the art of music videos.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // try {
  //   const request = await fetch('http://localhost:8000/idk', {
  //     method: 'GET',
  //     cache: 'no-store',
  //   });
  //   const data = await request.json();
  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  // }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
