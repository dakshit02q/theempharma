import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Panel - THEEM Pharmacy',
  description: 'Administrative panel for THEEM College of Pharmacy and Research',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
