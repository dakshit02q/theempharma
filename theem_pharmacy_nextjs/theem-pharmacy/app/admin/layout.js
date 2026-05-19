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
    <div className={`${inter.className} bg-gray-50 min-h-screen`}>
      {children}
    </div>
  );
}
