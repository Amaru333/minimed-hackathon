"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
export function AuthNavbar() {
  const router = useRouter();
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="font-bold">
          <Image src="/extras/logo-full.png" alt="Medverse" width={70} height={50} />
        </Link>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/courses"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Courses
          </Link>
          <Link
            href="/certificates"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Certificates
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-primary-100 flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem
                className="w-full text-left py-2 px-4 hover:bg-primary-200 transition-all duration-200 cursor-pointer bg-primary-300 font-medium"
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="w-full text-left py-2 px-4 hover:bg-primary-200 transition-all duration-200 cursor-pointer bg-primary-300 font-medium"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
