/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Medical Education Platform for Healthcare Professionals
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Enhance your medical knowledge and skills with our comprehensive courses
                    designed specifically for frontline healthcare workers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                alt="Hero Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/extras/hero-landing.svg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <BookOpen className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Comprehensive Courses</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access detailed medical courses with video lectures and interactive content.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Earn Certifications</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Complete courses to earn recognized certifications in your field.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Expert Community</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect with healthcare professionals and share experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
