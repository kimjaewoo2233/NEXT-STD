"use client";
// 재활용 안하기에 layout.tsx 와 같이 관리하는 편이 더 좋다고 판단
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTasks } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { stat } from "fs";
import Skeleton from "react-loading-skeleton";

const NavBar = () => {

    return (
        <nav className="border-b mb-5 px-5 py-3">
           <Container>
            <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href={"/"}>
                            <FaTasks/>
                        </Link>
                       <NavLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
           </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentPath = usePathname(); //이 훅은 브라우저api에 의존하기에 해당 컴포넌트는 클라이언트 컴포넌트 ]
    const { status, data: session } = useSession();
    const links = [
        { label: "Dashboard", href: "/"},
        { label: "Issues", href: "/issues"}
    ];

    return (
        <ul className="flex space-x-6">
        {links.map(link => (
            <Link
                className={`${link.href === currentPath ? "text-zinc-900" : "text-zinc-500"} hover:text-zinc-800 transition-colors`}
                key={link.href} 
                href={link.href}>{link.label}
            </Link>
        ))}
    </ul>
    )
}

const AuthStatus = () => {
    const { status, data:session } = useSession();

    if(status === "loading") return <Skeleton width="3rem"/>;
    if(status === "unauthenticated") return <Link href={"/api/auth/signin"}>Login</Link>;
    return (
        <Box>
        {status === "authenticated" && (
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar 
                    src={session.user?.image!} 
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">{session.user!.email}</Text>
                    </DropdownMenu.Label>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        )}
    </Box>
    )
}

export default NavBar;
