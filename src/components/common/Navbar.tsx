import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="font-bold">
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
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search courses..." className="w-[200px] pl-8" />
          </div>
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
