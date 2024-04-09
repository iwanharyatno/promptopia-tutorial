import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import '@/styles/globals.css';
import { Suspense } from 'react';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover and Share AI Prompts',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            <Suspense fallback={<h1 className='font-inter font-semibold text-center'>Loading...</h1>}>
              {children}
            </Suspense>
          </main>
        </Provider>
      </body>
    </html>
  )
}
