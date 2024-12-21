"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Award, Flame, ArrowRight } from "lucide-react";
import Image from "next/image";

const userData = {
  name: "Dr. Jane Smith",
  currentModule: {
    title: "Advanced Cardiac Life Support",
    progress: 65,
  },
  streakDays: 7,
  completedCourses: 3,
  totalAchievements: 12,
};

export default function Dashboard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(userData.currentModule.progress), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {userData.name}!</h1>

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
            <Button className="w-full mt-4">
              Continue Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

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

        {/* Quick Stats Card */}
        <Card>
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
        </Card>

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
            </div>
            <Button variant="outline" className="w-full mt-4">
              Browse All Modules
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
