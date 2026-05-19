'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    const checkAuth = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/verify', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const verifiedUser = data?.data?.user || data?.user || null;
                if (verifiedUser) {
                    setUser(verifiedUser);
                } else {
                    router.push('/admin');
                }
            } else {
                router.push('/admin');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            router.push('/admin');
        }
    }, [router]);

    useEffect(() => {
        // Check authentication status
        const run = async () => {
            await checkAuth();
        };
        run();
    }, [checkAuth]);

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth', {
                method: 'DELETE',
                credentials: 'include'
            });
            router.push('/admin');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-tachometer-alt' },
        { name: 'Home Page', href: '/admin/content/home', icon: 'fas fa-home' },
        { name: 'About Institution', href: '/admin/content/about', icon: 'fas fa-info-circle' },
        { name: 'Courses', href: '/admin/courses', icon: 'fas fa-graduation-cap' },
        { name: 'Admissions', href: '/admin/admissions', icon: 'fas fa-file-alt' },
        { name: 'Institute Cells', href: '/admin/content/institute-cells', icon: 'fas fa-building' },
        { name: 'Students Corner', href: '/admin/content/students', icon: 'fas fa-user-graduate' },
        { name: 'IIC Management', href: '/admin/content/iic', icon: 'fas fa-lightbulb' },
        { name: 'Faculty', href: '/admin/faculty', icon: 'fas fa-chalkboard-teacher' },
        { name: 'Events', href: '/admin/events', icon: 'fas fa-calendar-alt' },
        { name: 'Approvals', href: '/admin/approvals', icon: 'fas fa-certificate' },
        { name: 'Gallery', href: '/admin/gallery', icon: 'fas fa-images' },
        { name: 'Placements', href: '/admin/placements', icon: 'fas fa-briefcase' },
        { name: 'Statistics', href: '/admin/statistics', icon: 'fas fa-chart-line' },
        { name: 'Research', href: '/admin/research', icon: 'fas fa-microscope' },
        { name: 'Committee', href: '/admin/committee', icon: 'fas fa-users' },
        { name: 'Contact', href: '/admin/contact', icon: 'fas fa-envelope' },
    ];

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar - Fixed on desktop, slide-in on mobile */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex items-center justify-center h-16 bg-blue-600">
                    <h1 className="text-white text-xl font-bold">THEEM Admin</h1>
                </div>

                <nav className="mt-8 px-4 overflow-y-auto h-[calc(100vh-4rem)]">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center px-4 py-3 mb-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${pathname === item.href ? 'bg-blue-50 text-blue-600 font-medium' : ''
                                }`}
                        >
                            <i className={`${item.icon} mr-3 w-5`}></i>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area - Offset by sidebar width on desktop */}
            <div className="lg:pl-64">
                {/* Top Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-4 sm:px-6 py-4">
                        <div className="flex items-center min-w-0 flex-1">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-4"
                            >
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                            <h2 className="text-xl font-semibold text-gray-900 truncate">
                                {navigation.find(item => item.href === pathname)?.name || 'Admin Panel'}
                            </h2>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="hidden sm:block text-sm text-gray-600 truncate max-w-48">
                                {user?.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
