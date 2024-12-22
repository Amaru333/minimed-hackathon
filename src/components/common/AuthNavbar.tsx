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
export function AuthNavbar() {
  const router = useRouter();
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="font-bold">
          MedEd Platform
        </Link>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/courses"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Courses
          </Link>
          <Link
            href="/tutorials"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Tutorials
          </Link>
          <Link
            href="/achievements"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Achievements
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {/* <Link href="/profile" className="font-bold">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link> */}
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
                onClick={() => {}}
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