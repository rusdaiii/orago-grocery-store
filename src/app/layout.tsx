import '@/assets/styles/globals.css';
import 'nprogress/nprogress.css';
import poppins from '@/assets/fonts/poppins';
import Providers from '@/components/parts/Providers';
import { Toaster } from '@/components/ui/toaster';
import generateMetadata from '@/lib/metadata';
import { cn } from '@/lib/utils';

export const metadata = generateMetadata();

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('bg-background font-sans antialiased', poppins.variable)}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
