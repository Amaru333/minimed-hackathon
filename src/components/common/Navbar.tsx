import Link from "next/link";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="font-bold">
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
          {/* <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search courses..." className="w-[200px] pl-8" />
          </div> */}
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
