"use client";

import { useState } from "react";
// import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Book, GraduationCap, Settings, Clock, Trophy, CheckCircle } from "lucide-react";

// Mock user data
const userData = {
  name: "Dr. Jane Smith",
  email: "jane.smith@example.com",
  avatar: "/placeholder.svg",
  specialty: "Emergency Medicine",
  joinDate: "January 2022",
  bio: "Passionate about improving emergency care through continuous learning and innovation.",
  stats: {
    coursesCompleted: 15,
    hoursLearned: 120,
    certificatesEarned: 8,
    quizzesPassed: 42,
  },
  recentActivity: [
    { type: "course", name: "Advanced Trauma Care", date: "2023-06-15" },
    { type: "quiz", name: "ACLS Algorithms", date: "2023-06-10" },
    { type: "certificate", name: "Emergency Pediatrics", date: "2023-05-28" },
  ],
  courses: [
    { id: 1, name: "Advanced Cardiac Life Support", progress: 100, certificateEarned: true },
    { id: 2, name: "Emergency Trauma Care", progress: 75, certificateEarned: false },
    { id: 3, name: "Pediatric Emergency Assessment", progress: 50, certificateEarned: false },
  ],
  achievements: [
    { id: 1, name: "Fast Learner", description: "Completed 5 courses in one month", icon: "🚀" },
    { id: 2, name: "Quiz Master", description: "Scored 100% in 10 quizzes", icon: "🏆" },
    {
      id: 3,
      name: "Consistent Learner",
      description: "Logged in for 30 consecutive days",
      icon: "🔥",
    },
  ],
};

export default function Profile() {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [specialty, setSpecialty] = useState(userData.specialty);
  const [bio, setBio] = useState(userData.bio);

  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>
            {userData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-xl text-muted-foreground">{userData.specialty}</p>
          <p className="text-sm text-muted-foreground mt-2">Member since {userData.joinDate}</p>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary" className="gap-2">
            <User className="h-4 w-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="courses" className="gap-2">
            <Book className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.stats.coursesCompleted}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.stats.hoursLearned}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.stats.certificatesEarned}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quizzes Passed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.stats.quizzesPassed}</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {userData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center mt-4 first:mt-0">
                    {activity.type === "course" && <Book className="h-4 w-4 mr-2 text-blue-500" />}
                    {activity.type === "quiz" && (
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    )}
                    {activity.type === "certificate" && (
                      <GraduationCap className="h-4 w-4 mr-2 text-yellow-500" />
                    )}
                    <div className="ml-2 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{userData.bio}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="space-y-4">
            {userData.courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>Progress: {course.progress}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="mb-2" />
                  <div className="flex justify-between items-center">
                    <Button variant="outline">Continue Course</Button>
                    {course.certificateEarned && (
                      <Badge variant="secondary" className="gap-1">
                        <GraduationCap className="h-4 w-4" />
                        Certificate Earned
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userData.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    {achievement.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
