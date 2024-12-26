"use client"
import { usePathname } from 'next/navigation'
import Navbar from './(root)/_components/layouts/Navbar';
// import DashboardNav from './(admin)/_components/Admin-Navbar';

export default function NavigationMain() {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/dashboard');

    return (
        <>
            {!isAdminRoute && <Navbar />}
            {/* {isAdminRoute && <DashboardNav />} */}
        </>
    )
}