import '../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'KarSmiths Meet | Premium Video Conferencing',
    template: '%s',
  },
  description:
    'KarSmiths Meet is a premium, scalable, real-time video conferencing application.',
  twitter: {
    creator: '@karsmiths',
    site: '@karsmiths',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://karsmiths.com/',
    images: [],
    siteName: 'KarSmiths Meet',
  },
  icons: {
    icon: {
      rel: 'icon',
      url: '/favicon.ico',
    },
    apple: [],
  },
};

export const viewport: Viewport = {
  themeColor: '#070707',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-lk-theme="default">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
