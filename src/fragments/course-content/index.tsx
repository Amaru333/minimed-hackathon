"use client";

import { useState, useEffect } from "react";
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
import { Course } from "@/models/CourseModel";
import axiosInstance from "@/lib/axiosInstance";
import { addCertificate } from "@/services/courseService";
import { useRouter } from "next/navigation";

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<{
    type: "lesson" | "quiz";
    id: number | string;
  } | null>(null);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axiosInstance.get("/courses/" + params.courseId);
        // const course = response.data.courses.find((c: Course) => c.id === "acls-123");
        const course = response.data;
        if (course) {
          setCourseData(course);
          setActiveStage(course.currentStage);
          setActiveItem({ type: "lesson", id: course.currentLesson });
          setExpandedStage(`stage-${course.currentStage}`);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [params.courseId]);

  const handleNext = async () => {
    if (!courseData || !activeStage || !activeItem) return;

    const currentStage = courseData.stages.find((s) => s.id === activeStage);

    if (!currentStage) return;

    if (activeItem.type === "lesson") {
      const currentLessonIndex = currentStage.lessons.findIndex((l) => l.id === activeItem.id);
      // console.log(courseData.id, currentStage?._id, currentStage.lessons[currentLessonIndex]._id);
      await axiosInstance.post("/activity", {
        course: courseData.id,
        stage: currentStage._id,
        lesson: currentStage.lessons[currentLessonIndex]._id,
      });
      setCourseData((prev) => {
        if (!prev) return prev;
        const updatedCourse = { ...prev };
        const updatedStage = { ...currentStage };
        updatedStage.lessons[currentLessonIndex].completed = true;
        updatedCourse.stages = prev.stages.map((s) => (s.id === activeStage ? updatedStage : s));
        return updatedCourse;
      });
      if (currentLessonIndex + 1 < currentStage.lessons.length) {
        // Move to the next lesson in the current stage
        setActiveItem({ type: "lesson", id: currentStage.lessons[currentLessonIndex + 1].id });
      } else {
        // Move to the quiz of the current stage
        setActiveItem({ type: "quiz", id: currentStage.quiz.id });
      }
    } else if (activeItem.type === "quiz") {
      const nextStageIndex = courseData.stages.findIndex((s) => s.id === activeStage) + 1;
      if (nextStageIndex < courseData.stages.length) {
        setCourseData((prev) => {
          if (!prev) return prev;
          const updatedCourse = { ...prev };
          const updatedStage = { ...currentStage };
          updatedStage.quiz.completed = true;
          updatedCourse.stages = prev.stages.map((s) => (s.id === activeStage ? updatedStage : s));
          return updatedCourse;
        });
        // Move to the first lesson of the next stage
        const nextStage = courseData.stages[nextStageIndex];
        setActiveStage(nextStage.id);
        setActiveItem({ type: "lesson", id: nextStage.lessons[0].id });
        setExpandedStage(`stage-${nextStage.id}`);
      } else {
        // User has completed the course
        addCertificate(courseData.id)
          .then((response) => {
            router.push(`/certificates/${response._id}`);
          })
          .catch(() => {
            console.log("Error adding certificate");
          });
      }
    }
  };

  // Calculate course progress
  const courseProgress = courseData
    ? Math.round(
        courseData.stages.reduce((totalProgress, stage) => {
          // Count completed lessons
          const completedLessons = stage.lessons.filter((lesson) => lesson.completed).length;
          const totalLessons = stage.lessons.length;

          // Count completed quiz
          const quizCompleted = stage.quiz?.completed ? 1 : 0;
          const totalQuizzes = 1; // Each stage has one quiz

          // Calculate stage progress based on lessons and quiz
          const stageProgress =
            ((completedLessons + quizCompleted) / (totalLessons + totalQuizzes)) * 100;

          return totalProgress + stageProgress; // Accumulate progress for all stages
        }, 0) / courseData.stages.length // Divide by total number of stages
      )
    : 0;

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-muted/10 overflow-auto">
        <div className="p-4">
          <h2 className="font-semibold mb-4">{courseData.title}</h2>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={expandedStage ?? undefined}
            onValueChange={setExpandedStage}
          >
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
                        }}
                        className={`flex items-center justify-between w-full p-2 text-left text-sm hover:bg-muted/50 rounded-lg ${
                          activeStage === stage.id &&
                          activeItem?.type === "lesson" &&
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
                      }}
                      className={`flex items-center justify-between w-full p-2 text-left text-sm hover:bg-muted/50 rounded-lg ${
                        activeStage === stage.id && activeItem?.type === "quiz" ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                        <span>Section Quiz</span>
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
        {activeItem?.type === "lesson" ? (
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
              {activeItem?.type === "lesson" && (
                <div className="mt-6">
                  <Button onClick={handleNext}>Next</Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <QuizComponent
            quizId={activeItem?.id as string}
            courseId={params.courseId}
            onNext={handleNext}
          />
        )}
      </div>

      {/* Right Sidebar - Course Info */}
      <div className="w-80 border-l bg-muted/10 p-4 overflow-auto">
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Course Progress</h3>
          <Progress value={courseProgress} className="mb-2" />
          <p className="text-sm text-muted-foreground">{courseProgress}% Complete</p>
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
