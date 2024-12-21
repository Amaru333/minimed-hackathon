import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Award, Trophy, BarChart } from "lucide-react";

interface UserCardProps {
  name: string;
  specialty: string;
  coursesCompleted: number;
  averageQuizScore: number;
  certifications: string[];
  achievements: string[];
  userScore: number;
}

export function UserCard({
  name,
  specialty,
  coursesCompleted,
  averageQuizScore,
  certifications,
  achievements,
  userScore,
}: UserCardProps) {
  const getUserScoreColor = (score: number) => {
    if (score <= 3) return "bg-red-500";
    if (score <= 7) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{specialty}</p>
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
