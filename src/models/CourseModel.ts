export interface Lesson {
  _id: string;
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  current?: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Stage {
  _id: string;
  id: number;
  title: string;
  completed: boolean;
  progress?: number;
  lessons: Lesson[];
  quiz: Quiz;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  type: string;
  skillLevel: string;
  duration: string;
  critiqueSessions: string;
  currentStage: number;
  currentLesson: number;
  stages: Stage[];
}
