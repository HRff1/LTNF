import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DefaultSeo } from 'next-seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'News & Offers - Stay Updated',
  description: 'Get the latest news and best offers in one place',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider>
          <DefaultSeo
            title="News & Offers"
            description="Get the latest news and best offers in one place"
            openGraph={{
              type: 'website',
              locale: 'en_US',
              url: 'https://your-website.com',
              siteName: 'News & Offers',
            }}
            twitter={{
              handle: '@yourhandle',
              site: '@yourhandle',
              cardType: 'summary_large_image',
            }}
          />
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </body>
    </html>
  )
}