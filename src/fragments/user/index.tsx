"use client";

import { UserCard } from "@/fragments/profile/UserCard";
import axios from "axios";
import { useEffect, useState } from "react";

// This would typically come from an API call
const mockUserData = {
  id: "user123",
  name: "Dr. Jane Smith",
  specialty: "Emergency Medicine",
  coursesCompleted: 15,
  averageQuizScore: 92,
  certifications: ["ACLS", "PALS", "BLS"],
  achievements: ["Fast Learner", "Quiz Master", "Consistent Learner"],
  userScore: 8.5,
  profilePicture: "/placeholder.svg",
};

export default function User({ params }: { params: { userId: string } }) {
  const [userData, setUserData] = useState(mockUserData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${params.userId}`);
        console.log(response.data);
        setUserData({
          id: response.data.user._id,
          name: response.data.user.name,
          specialty: "Emergency Medicine",
          coursesCompleted: 1,
          averageQuizScore: response.data.averageQuizScore.toFixed(2),
          certifications: ["ACLS"],
          achievements: ["Fast Learner", "Quiz Master", "Consistent Learner"],
          userScore: response.data.userScore.toFixed(2),
          profilePicture: "https://github.com/shadcn.png",
        });
        // setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container py-10 flex justify-center">
      <UserCard
        id={userData.id}
        name={userData.name}
        specialty={userData.specialty}
        coursesCompleted={userData.coursesCompleted}
        averageQuizScore={userData.averageQuizScore}
        certifications={userData.certifications}
        achievements={userData.achievements}
        userScore={userData.userScore}
        profilePicture={userData.profilePicture}
      />
    </div>
  );
}
