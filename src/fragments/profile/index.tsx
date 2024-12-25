"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Book, GraduationCap, Settings, Trophy, CheckCircle } from "lucide-react";
import { UserCard } from "./UserCard";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/slices/userSlice";
import { getMonthAndYear } from "@/lib/functions";
import { fetchProfile } from "@/services/profileService";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    averageQuizScore: 0,
    userScore: 0,
  });
  useEffect(() => {
    fetchProfile().then((data) => {
      setProfileData(data);
    });
  }, []);
  console.log(profileData, "PROFILE DATA");
  const userDetails = useSelector(getUser);
  // Mock user data
  const userData = {
    id: userDetails._id,
    name: userDetails.name,
    email: userDetails.email,
    avatar: "https://github.com/shadcn.png",
    specialty: "Emergency Medicine",
    joinDate: getMonthAndYear(userDetails.createdAt),
    bio: "Passionate about improving emergency care through continuous learning and innovation.",
    stats: {
      coursesCompleted: 2,
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
      // { id: 2, name: "Emergency Trauma Care", progress: 75, certificateEarned: false },
      // { id: 3, name: "Pediatric Emergency Assessment", progress: 50, certificateEarned: false },
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
    averageQuizScore: parseFloat(profileData.averageQuizScore.toFixed(2)) || 0,
    certifications: ["ACLS-001"],
    userScore: parseFloat(profileData.userScore.toFixed(2)) || 0,
  };
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
              .map((n: string[]) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-xl text-muted-foreground">{userData.specialty}</p>
          <p className="text-sm text-muted-foreground mt-2">Member since {userData.joinDate}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-1">
          <UserCard
            id={userData.id}
            name={userData.name}
            specialty={userData.specialty}
            coursesCompleted={userData.stats.coursesCompleted}
            averageQuizScore={userData.averageQuizScore}
            certifications={userData.certifications}
            achievements={userData.achievements.map((a) => a.name)}
            userScore={userData.userScore}
            profilePicture={userData.avatar}
          />
        </div>

        <div className="md:col-span-2">
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
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center mt-4 first:mt-0">
                      {activity.type === "course" && (
                        <Book className="h-4 w-4 mr-2 text-blue-500" />
                      )}
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
                        <Button variant="outline">View Certificate</Button>
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
      </div>
    </div>
  );
}
