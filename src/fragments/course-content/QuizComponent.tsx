import { useState, useEffect } from "react";
import axios from "axios";
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
import { Quiz } from "@/models/CourseModel";

interface QuizComponentProps {
  quizId: string;
  courseId: string;
}

export function QuizComponent({ quizId, courseId }: QuizComponentProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("/api/courses/random");
        const course = response.data.courses.find((c: { id: string }) => c.id === "acls-123");
        if (course) {
          const quizData = course.stages.find(
            (s: { quiz: { id: string } }) => s.quiz.id === quizId
          )?.quiz;
          if (quizData) {
            setQuiz(quizData);
            setAnswers(new Array(quizData.questions.length).fill(-1));
          }
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId, courseId]);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === quiz?.questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  if (showResults) {
    const score = calculateScore();
    const scorePercentage = (score / quiz.questions.length) * 100;

    return (
      <div className="container max-w-4xl py-10 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>
              You scored {score} out of {quiz.questions.length} ({scorePercentage.toFixed(2)}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="mb-6">
                <h3 className="font-semibold mb-2">
                  Question {index + 1}: {question.text}
                </h3>
                <div className="pl-4">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2 mb-1">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          optionIndex === answers[index] && optionIndex === question.correctAnswer
                            ? "bg-green-500"
                            : optionIndex === answers[index]
                            ? "bg-red-500"
                            : optionIndex === question.correctAnswer
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={optionIndex === question.correctAnswer ? "font-semibold" : ""}
                      >
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
                {answers[index] !== question.correctAnswer && (
                  <p className="text-sm text-red-500 mt-2">
                    Your answer was incorrect. The correct answer is:{" "}
                    {question.options[question.correctAnswer]}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button onClick={() => setShowResults(false)}>Retake Quiz</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>Answer all questions and submit to see your results.</CardDescription>
        </CardHeader>
        <CardContent>
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="mb-6">
              <h3 className="font-semibold mb-2">
                Question {index + 1}: {question.text}
              </h3>
              <RadioGroup onValueChange={(value) => handleAnswer(index, parseInt(value))}>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={optionIndex.toString()}
                      id={`q${question.id}-option${optionIndex}`}
                    />
                    <Label htmlFor={`q${question.id}-option${optionIndex}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={answers.some((answer) => answer === -1)}>
            Submit Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
