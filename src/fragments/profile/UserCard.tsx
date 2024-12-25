"use client";
import Image from "next/image";
const QRCodeSVG = dynamic(() => import("qrcode.react").then((mod) => mod.QRCodeSVG), {
  ssr: false,
});
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Award, Trophy, BarChart } from "lucide-react";
import dynamic from "next/dynamic";

interface UserCardProps {
  id: string;
  name: string;
  specialty: string;
  coursesCompleted: number;
  averageQuizScore: number;
  certifications: string[];
  achievements: string[];
  userScore: number;
  profilePicture: string;
}

export function UserCard({
  id,
  name,
  specialty,
  coursesCompleted,
  averageQuizScore,
  certifications,
  achievements,
  userScore,
  profilePicture = "https://github.com/shadcn.png",
}: UserCardProps) {
  const getUserScoreColor = (score: number) => {
    if (score <= 3) return "bg-red-500";
    if (score <= 7) return "bg-yellow-500";
    return "bg-green-500";
  };

  const userCardUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/user/${id}`;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src={profilePicture}
              alt={name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <CardTitle>{name}</CardTitle>
              <p className="text-sm text-muted-foreground">{specialty}</p>
            </div>
          </div>
          <QRCodeSVG value={userCardUrl} width={50} height={50} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Courses Completed</span>
          </div>
          <span className="font-bold">{coursesCompleted}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Average Quiz Score</span>
            </div>
            <span className="font-bold">{averageQuizScore}%</span>
          </div>
          <Progress value={averageQuizScore} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Certifications</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="secondary">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Achievements</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <Badge key={index} variant="outline">
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">User Score</span>
            <span className="font-bold">{userScore}/10</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full ${getUserScoreColor(userScore)}`}
              style={{ width: `${userScore * 10}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
