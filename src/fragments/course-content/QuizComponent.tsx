import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  answers: number[];
}

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (results: QuizResults) => void;
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore();
      setShowResults(true);
      onComplete({ score, totalQuestions: quiz.questions.length, answers });
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const scorePercentage = (score / quiz.questions.length) * 100;

    const resultData = [
      { name: "Correct", value: score },
      { name: "Incorrect", value: quiz.questions.length - score },
    ];

    const COLORS = ["#4CAF50", "#F44336"];

    const questionAnalysis = quiz.questions.map((question, index) => ({
      question: `Q${index + 1}`,
      correct: answers[index] === question.correctAnswer ? 1 : 0,
      incorrect: answers[index] !== question.correctAnswer ? 1 : 0,
    }));

    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>
              You scored {score} out of {quiz.questions.length} ({scorePercentage.toFixed(2)}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={scorePercentage} className="w-full" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Overall Performance</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={resultData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {resultData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Question Analysis</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={questionAnalysis}>
                    <XAxis dataKey="question" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="correct" stackId="a" fill="#4CAF50" />
                    <Bar dataKey="incorrect" stackId="a" fill="#F44336" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{quiz.questions[currentQuestion]?.text}</p>
          <RadioGroup onValueChange={(value) => handleAnswer(parseInt(value))}>
            {quiz.questions[currentQuestion]?.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNext} disabled={answers[currentQuestion] === undefined}>
            {currentQuestion === quiz.questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
