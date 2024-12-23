import CourseDescription from "@/fragments/course-description";
import React, { use } from "react";

function CourseDescriptionPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  return <CourseDescription params={{ courseId }} />;
}

export default CourseDescriptionPage;
