"use client";

import { useState } from "react";
import { MoreVertical, Download, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This would come from your API
const courseData = {
  title: "Advanced Cardiac Life Support",
  instructor: "Dr. Sarah Johnson",
  type: "Pre-recorded",
  skillLevel: "Intermediate",
  duration: "5 Stages, 16 Hours",
  critiqueSessions: "Once a Week",
  currentStage: 3,
  currentLesson: 2,
  stages: [
    {
      id: 1,
      title: "Basic Life Support Review",
      completed: true,
      lessons: [
        { id: 1, title: "CPR Techniques", duration: "15:56", completed: true, current: false },
        { id: 2, title: "AED Usage", duration: "28:34", completed: true, current: false },
      ],
    },
    {
      id: 2,
      title: "ECG Interpretation",
      completed: true,
      lessons: [
        {
          id: 3,
          title: "Basic Rhythm Analysis",
          duration: "41:23",
          completed: true,
          current: false,
        },
        { id: 4, title: "Common Arrhythmias", duration: "39:41", completed: true, current: false },
      ],
    },
    {
      id: 3,
      title: "Emergency Medications",
      completed: false,
      progress: 26,
      lessons: [
        { id: 5, title: "ACLS Algorithms", duration: "28:34", completed: true, current: false },
        { id: 6, title: "Medication Administration", duration: "41:23", current: true },
        { id: 7, title: "Drug Calculations", duration: "39:41", completed: false },
      ],
    },
    {
      id: 4,
      title: "Case Scenarios",
      completed: false,
      lessons: [
        { id: 8, title: "Cardiac Arrest", duration: "35:15", completed: false, current: false },
        {
          id: 9,
          title: "Acute Coronary Syndrome",
          duration: "42:18",
          completed: false,
          current: false,
        },
      ],
    },
    {
      id: 5,
      title: "Final Assessment",
      completed: false,
      lessons: [
        { id: 10, title: "Practice Test", duration: "45:00", completed: false, current: false },
        {
          id: 11,
          title: "Certification Exam",
          duration: "60:00",
          completed: false,
          current: false,
        },
      ],
    },
  ],
};

export default function CourseContent() {
  const [activeStage, setActiveStage] = useState(courseData.currentStage);
  const [activeLesson, setActiveLesson] = useState(courseData.currentLesson);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-muted/10 overflow-auto">
        <div className="p-4">
          <h2 className="font-semibold mb-4">{courseData.title}</h2>
          {courseData.stages.map((stage) => (
            <div key={stage.id} className="mb-4">
              <button
                onClick={() => setActiveStage(stage.id)}
                className="flex items-center justify-between w-full p-2 text-left hover:bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {stage.completed ? (
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      ✓
                    </div>
                  ) : (
                    <div
                      className={`w-6 h-6 rounded-full border border-muted-foreground flex items-center justify-center ${
                        stage.progress ? "text-[8px]" : "text-base"
                      }`}
                    >
                      {stage.progress ? `${stage.progress}%` : stage.id}
                    </div>
                  )}
                  <span className="font-medium">{stage.title}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    activeStage === stage.id ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {activeStage === stage.id && (
                <div className="ml-8 mt-2 space-y-2">
                  {stage.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson.id)}
                      className={`flex items-center justify-between w-full p-2 text-left text-sm hover:bg-muted/50 rounded-lg ${
                        activeLesson === lesson.id ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {lesson.completed ? (
                          <div className="w-4 h-4 text-primary">✓</div>
                        ) : lesson.current ? (
                          <div className="w-4 h-4 text-primary">▶</div>
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-muted-foreground">{lesson.duration}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="aspect-video bg-black relative">
          <video className="w-full h-full" controls poster="/placeholder.svg">
            <source src="/placeholder.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Stage {courseData.currentStage} • Lesson {courseData.currentLesson}
              </h1>
              <h2 className="text-xl mb-4">{courseData.title}</h2>
              <div className="flex gap-2">
                <Badge>Medical</Badge>
                <Badge variant="outline">ACLS</Badge>
                <Badge variant="outline">Emergency</Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <div>
              <div className="text-sm text-muted-foreground">Lecture Type</div>
              <div className="font-medium">{courseData.type}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Skills Level</div>
              <div className="font-medium">{courseData.skillLevel}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-medium">{courseData.duration}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Critique Session</div>
              <div className="font-medium">{courseData.critiqueSessions}</div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex gap-4 mb-6">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Resources
            </Button>
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
            </Button>
          </div>

          <div className="prose max-w-none">
            <h3 className="font-semibold text-2xl mb-1">About This Lesson</h3>
            <p className="mb-2">
              In this lesson, you will learn about proper medication administration techniques in
              emergency scenarios. We&apos;ll cover dosage calculations, drug interactions, and best
              practices for various emergency medications used in ACLS protocols.
            </p>

            <h3 className="font-semibold text-2xl mb-1">Learning Objectives</h3>
            <ul>
              <li>Understand the pharmacology of common ACLS medications</li>
              <li>Calculate appropriate medication dosages based on patient parameters</li>
              <li>Identify potential drug interactions and contraindications</li>
              <li>Demonstrate proper medication administration techniques</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Course Info */}
      <div className="w-80 border-l bg-muted/10 p-4 overflow-auto">
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Course Progress</h3>
          <Progress value={65} className="mb-2" />
          <p className="text-sm text-muted-foreground">65% Complete</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Instructor</h3>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{courseData.instructor}</div>
              <div className="text-sm text-muted-foreground">Emergency Medicine</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Next Up</h3>
          <div className="space-y-2">
            {courseData.stages
              .find((s) => s.id === courseData.currentStage)
              ?.lessons.filter((l) => !l.completed)
              .map((lesson) => (
                <div key={lesson.id} className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="font-medium">{lesson.title}</div>
                  <div className="text-sm text-muted-foreground">Duration: {lesson.duration}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
