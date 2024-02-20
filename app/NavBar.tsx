"use client";
// 재활용 안하기에 layout.tsx 와 같이 관리하는 편이 더 좋다고 판단
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTasks } from "react-icons/fa";

const NavBar = () => {
    const currentPath = usePathname(); //이 훅은 브라우저api에 의존하기에 해당 컴포넌트는 클라이언트 컴포넌트 
    const links = [
        { label: "Dashboard", href: "/"},
        { label: "Issues", href: "/issues"}
    ];
    console.log(currentPath);
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 items-center h-14">
            <Link href={"/"}><FaTasks/></Link>
            <ul className="flex space-x-6">
                {links.map(link => (
                    <Link
                        className={`${link.href === currentPath ? "text-zinc-900" : "text-zinc-500"} hover:text-zinc-800 transition-colors`}
                        key={link.href} 
                        href={link.href}>{link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar;
