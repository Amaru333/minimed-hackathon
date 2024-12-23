import React from "react";
import CourseContent from "@/fragments/course-content";

function CourseContentPage({ params }: { params: { courseId: string } }) {
  return <CourseContent params={params} />;
}

export default CourseContentPage;
