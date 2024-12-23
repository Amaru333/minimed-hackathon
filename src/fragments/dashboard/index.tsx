"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Award,
  Flame,
  ArrowRight,
  Clock,
  TrendingUp,
  Star,
  Users,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/slices/userSlice";

const recentCourses = [
  {
    id: 1,
    title: "Emergency Trauma Care",
    instructor: "Dr. Michael Chen",
    duration: "8 hours",
    enrolled: 1234,
    image: "/extras/course-placeholder.png",
  },
  {
    id: 2,
    title: "Pediatric Emergency Assessment",
    instructor: "Dr. Sarah Johnson",
    duration: "6 hours",
    enrolled: 892,
    image: "/extras/course-placeholder.png",
  },
];

const recommendedCourses = [
  {
    id: 3,
    title: "Advanced Airway Management",
    rating: 4.8,
    students: 2156,
    duration: "10 hours",
    level: "Advanced",
    image: "/extras/course-placeholder.png",
  },
  {
    id: 4,
    title: "Critical Care Pharmacology",
    rating: 4.9,
    students: 1879,
    duration: "12 hours",
    level: "Intermediate",
    image: "/extras/course-placeholder.png",
  },
];

export default function Dashboard() {
  const userDetails = useSelector(getUser);
  // This would typically come from an API call
  const userData = {
    name: userDetails.name,
    currentModule: {
      title: "Advanced Cardiac Life Support",
      progress: 65,
      id: 10,
    },
    streakDays: 7,
    completedCourses: 3,
    totalAchievements: 12,
  };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(userData.currentModule.progress), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userData.name}!</h1>
          <p className="text-muted-foreground">Continue your medical education journey</p>
        </div>
        <Button>
          View All Courses
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="rounded-md overflow-hidden">
                <Image
                  src="/extras/course-placeholder.png"
                  alt="Course thumbnail"
                  width={120}
                  height={80}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{userData.currentModule.title}</h3>
                <Progress value={progress} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-1">{progress}% complete</p>
              </div>
            </div>
            <Link
              href={`/course/${userData.currentModule.id}`}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Button className="w-full mt-4">
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Calendar Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Trauma Assessment</h4>
                  <p className="text-sm text-muted-foreground">Live Webinar</p>
                </div>
                <div className="text-sm">Tomorrow, 2 PM</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Pediatric Emergencies</h4>
                  <p className="text-sm text-muted-foreground">Recorded Lecture</p>
                </div>
                <div className="text-sm">Friday, 10 AM</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{userData.completedCourses}</div>
                <p className="text-sm text-muted-foreground">Courses Completed</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{userData.totalAchievements}</div>
                <p className="text-sm text-muted-foreground">Achievements Earned</p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Learning Stats Card */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Your Learning Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">24h</div>
                <p className="text-sm text-muted-foreground">Time Spent</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">85%</div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <Star className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <Award className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Streak Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Flame className="mr-2 h-4 w-4 text-orange-500" />
              Daily Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userData.streakDays} days</div>
            <p className="text-sm text-muted-foreground">Keep up the great work!</p>
            <div className="mt-4 flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    day <= userData.streakDays ? "bg-orange-500 text-white" : "bg-muted"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recently Added Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {recentCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.id}/description`}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={120}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="text-sm flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.enrolled} enrolled
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Start New Module Card */}
        <Card>
          <CardHeader>
            <CardTitle>Start a New Module</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-md overflow-hidden">
                  <Image
                    src="/extras/course-placeholder.png"
                    alt="Module thumbnail"
                    width={80}
                    height={60}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Emergency Triage</h4>
                  <p className="text-sm text-muted-foreground">8 lessons • 3 hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="rounded-md overflow-hidden">
                  <Image
                    src="/extras/course-placeholder.png"
                    alt="Module thumbnail"
                    width={80}
                    height={60}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Pharmacology Basics</h4>
                  <p className="text-sm text-muted-foreground">12 lessons • 5 hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="rounded-md overflow-hidden">
                  <Image
                    src="/extras/course-placeholder.png"
                    alt="Module thumbnail"
                    width={80}
                    height={60}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Pharmacology Basics</h4>
                  <p className="text-sm text-muted-foreground">12 lessons • 5 hours</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Browse All Modules
            </Button>
          </CardContent>
        </Card>
        {/* Recommended Courses */}
        <Card className="col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendedCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.id}/description`}
                  className="group relative overflow-hidden rounded-lg border p-4 hover:border-primary transition-colors"
                >
                  <div className="flex gap-4">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={160}
                      height={90}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary">{course.level}</Badge>
                        <span className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {course.rating}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
