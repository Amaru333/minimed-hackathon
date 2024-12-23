"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Clock, Users, BarChart, Star, GraduationCap, BookOpen } from "lucide-react";
import { getCourses } from "@/services/courseService";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  enrolled: number;
  rating: number;
  instructor: string;
  category: string;
}

// Mock data for courses
// const courses = [
//   {
//     id: 1,
//     title: "Advanced Cardiac Life Support (ACLS)",
//     description: "Master the skills needed for advanced cardiac life support scenarios.",
//     image: "/extras/course-placeholder.png",
//     duration: "16 hours",
//     level: "Advanced",
//     enrolled: 1234,
//     rating: 4.8,
//     instructor: "Dr. Sarah Johnson",
//     category: "Emergency",
//   },
//   {
//     id: 2,
//     title: "Pediatric Emergency Assessment",
//     description: "Learn to quickly and accurately assess pediatric emergencies.",
//     image: "/extras/course-placeholder.png",
//     duration: "12 hours",
//     level: "Intermediate",
//     enrolled: 987,
//     rating: 4.7,
//     instructor: "Dr. Michael Chen",
//     category: "Pediatrics",
//   },
//   {
//     id: 3,
//     title: "Emergency Trauma Care",
//     description: "Develop skills to manage trauma cases in emergency settings.",
//     image: "/extras/course-placeholder.png",
//     duration: "20 hours",
//     level: "Advanced",
//     enrolled: 1567,
//     rating: 4.9,
//     instructor: "Dr. Emily Rodriguez",
//     category: "Emergency",
//   },
//   {
//     id: 4,
//     title: "Neurology Essentials for Emergency Medicine",
//     description: "Understand key neurological concepts crucial for emergency care.",
//     image: "/extras/course-placeholder.png",
//     duration: "14 hours",
//     level: "Intermediate",
//     enrolled: 876,
//     rating: 4.6,
//     instructor: "Dr. David Lee",
//     category: "Neurology",
//   },
//   // Add more courses as needed
// ];

const categories = ["All", "Emergency", "Pediatrics", "Neurology", "Cardiology"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses(); // Fetch courses from API
        setCourses(data);
      } catch {
        // setError(err.message || "Failed to fetch courses.");
      }
      //  finally {
      //   setLoading(false);
      // }
    };

    fetchCourses();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || course.category === selectedCategory) &&
      (selectedLevel === "All Levels" || course.level === selectedLevel)
    );
  });

  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grid" className="mb-8">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Link href={`/course/${course.id}/description`} key={course.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {course.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart className="h-4 w-4" />
                        {course.level}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{course.enrolled} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Link href={`/course/${course.id}/description`} key={course.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <div className="w-48 h-48 relative">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                        <Badge variant="secondary">{course.category}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart className="h-4 w-4" />
                          {course.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.enrolled} enrolled
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No courses found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}
