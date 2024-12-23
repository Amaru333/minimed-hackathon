import React, { use } from "react";
import CourseContent from "@/fragments/course-content";

function CourseContentPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return <CourseContent params={{ courseId }} />;
}

export default CourseContentPage;
