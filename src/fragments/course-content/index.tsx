"use client";

import { useState } from "react";
// import Link from "next/link"
// import Image from "next/image"
import {
  MoreVertical,
  Download,
  MessageSquare,
  PlayCircle,
  CheckCircle,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuizComponent } from "./QuizComponent";

// This would come from your API
const courseData = {
  id: "acls-123",
  title: "Advanced Cardiac Life Support (ACLS)",
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
      quiz: {
        id: "quiz-1",
        title: "Basic Life Support Quiz",
        questions: [
          {
            id: 1,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 2,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 3,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 4,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 5,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 6,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 7,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 8,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 9,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          {
            id: 10,
            text: "What is the correct compression to ventilation ratio for adult CPR?",
            options: ["15:2", "30:2", "20:2", "10:2"],
            correctAnswer: 1,
          },
          // Add more questions...
        ],
      },
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
      quiz: {
        id: "quiz-2",
        title: "ECG Interpretation Quiz",
        questions: [
          // Add questions here
        ],
      },
    },
    {
      id: 3,
      title: "Emergency Medications",
      completed: false,
      progress: 26,
      lessons: [
        { id: 5, title: "ACLS Algorithms", duration: "28:34", completed: true, current: false },
        {
          id: 6,
          title: "Medication Administration",
          duration: "41:23",
          current: true,
          completed: false,
        },
        { id: 7, title: "Drug Calculations", duration: "39:41", completed: false, current: false },
      ],
      quiz: {
        id: "quiz-3",
        title: "Emergency Medications Quiz",
        questions: [
          // Add questions here
        ],
      },
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
      quiz: {
        id: "quiz-4",
        title: "Case Scenarios Quiz",
        questions: [
          // Add questions here
        ],
      },
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
      quiz: {
        id: "quiz-5",
        title: "Final Assessment Quiz",
        questions: [
          // Add questions here
        ],
      },
    },
  ],
};

type QuizResults = {
  score: number;
  totalQuestions: number;
  answers: number[];
};

type Quiz = {
  id: string;
  title: string;
  questions: {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
  }[];
};

export default function CoursePage() {
  const [activeStage, setActiveStage] = useState(courseData.currentStage);
  const [activeItem, setActiveItem] = useState<{ type: "lesson" | "quiz"; id: number | string }>({
    type: "lesson",
    id: courseData.currentLesson,
  });
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  console.log(quizResults);
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-muted/10 overflow-auto">
        <div className="p-4">
          <h2 className="font-semibold mb-4">{courseData.title}</h2>
          <Accordion type="single" collapsible className="w-full">
            {courseData.stages.map((stage) => (
              <AccordionItem key={stage.id} value={`stage-${stage.id}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    {stage.completed ? (
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-muted-foreground flex items-center justify-center">
                        {stage.progress ? `${stage.progress}%` : stage.id}
                      </div>
                    )}
                    <span>{stage.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="ml-8 mt-2 space-y-2">
                    {stage.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveStage(stage.id);
                          setActiveItem({ type: "lesson", id: lesson.id });
                          setQuizResults(null);
                        }}
                        className={`flex items-center justify-between w-full p-2 text-left text-sm hover:bg-muted/50 rounded-lg ${
                          activeStage === stage.id &&
                          activeItem.type === "lesson" &&
                          activeItem.id === lesson.id
                            ? "bg-muted/50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : lesson.current ? (
                            <PlayCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <div className="w-4 h-4" />
                          )}
                          <span>{lesson.title}</span>
                        </div>
                        <span className="text-muted-foreground">{lesson.duration}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setActiveStage(stage.id);
                        setActiveItem({ type: "quiz", id: stage.quiz.id });
                        setQuizResults(null);
                      }}
                      className={`flex items-center justify-between w-full p-2 text-left text-sm hover:bg-muted/50 rounded-lg ${
                        activeStage === stage.id && activeItem.type === "quiz" ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                        <span>{stage.quiz.title}</span>
                      </div>
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeItem.type === "lesson" ? (
          <>
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
                    Stage {activeStage} • Lesson {activeItem.id}
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
                <h3>About This Lesson</h3>
                <p>
                  In this lesson, you will learn about proper medication administration techniques
                  in emergency scenarios. We&apos;ll cover dosage calculations, drug interactions,
                  and best practices for various emergency medications used in ACLS protocols.
                </p>

                <h3>Learning Objectives</h3>
                <ul>
                  <li>Understand the pharmacology of common ACLS medications</li>
                  <li>Calculate appropriate medication dosages based on patient parameters</li>
                  <li>Identify potential drug interactions and contraindications</li>
                  <li>Demonstrate proper medication administration techniques</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <QuizComponent
            quiz={courseData.stages.find((s) => s.id === activeStage)?.quiz as Quiz}
            onComplete={(results) => setQuizResults(results)}
          />
        )}
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
            <div className="w-10 h-10 rounded-full bg-muted" />
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
              .find((s) => s.id === activeStage)
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
