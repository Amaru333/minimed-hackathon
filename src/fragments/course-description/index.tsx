import Image from "next/image";
// import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  BookOpen,
  Users,
  Star,
  BarChart,
  CheckCircle,
  PlayCircle,
  Download,
  Globe,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This would come from your API
const courseDetails = {
  id: 1,
  title: "Advanced Cardiac Life Support (ACLS)",
  description:
    "Master the essential skills and knowledge required for advanced cardiac life support. This comprehensive course covers everything from basic life support review to complex cardiac emergency management.",
  instructor: {
    name: "Dr. Sarah Johnson",
    title: "Emergency Medicine Specialist",
    image: "https://github.com/shadcn.png",
    courses: 12,
    students: 3420,
    rating: 4.9,
  },
  stats: {
    enrolled: 1234,
    duration: "16 hours",
    lectures: 24,
    level: "Advanced",
  },
  rating: {
    average: 4.8,
    count: 856,
  },
  topics: [
    "Basic Life Support Review",
    "ECG Interpretation",
    "Emergency Medications",
    "Cardiac Arrest Management",
    "Post-Cardiac Arrest Care",
    "Special Resuscitation Situations",
  ],
  features: [
    "24/7 Course Access",
    "Downloadable Resources",
    "Certificate of Completion",
    "Mobile-friendly Content",
    "Practice Tests",
    "Expert Support",
  ],
  image: "/extras/course-placeholder.png",
};

export default function CourseDescription() {
  return (
    <div className="container py-10 mx-auto">
      <div className="grid gap-6 lg:grid-cols-3 relative items-start">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <Image
              src={courseDetails.image}
              alt={courseDetails.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button size="lg" className="gap-2">
                <PlayCircle className="h-5 w-5" />
                Watch Preview
              </Button>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">{courseDetails.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{courseDetails.description}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-4 w-4" />
              {courseDetails.stats.duration}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <BookOpen className="h-4 w-4" />
              {courseDetails.stats.lectures} lectures
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Users className="h-4 w-4" />
              {courseDetails.stats.enrolled} enrolled
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <BarChart className="h-4 w-4" />
              {courseDetails.stats.level}
            </Badge>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">What You&apos;ll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {courseDetails.topics.map((topic, index) => (
                    <div key={index} className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Course Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {courseDetails.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6 sticky top-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2">$299</div>
                <Button size="lg" className="w-full mb-4">
                  Enroll Now
                </Button>
                <p className="text-sm text-muted-foreground">30-day money-back guarantee</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{courseDetails.instructor.name}</h3>
                  <p className="text-sm text-muted-foreground">{courseDetails.instructor.title}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-semibold">{courseDetails.instructor.courses}</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
                <div>
                  <div className="font-semibold">{courseDetails.instructor.students}</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="font-semibold">{courseDetails.instructor.rating}</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
