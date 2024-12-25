import User from "@/fragments/user";
import React, { use } from "react";

function UserPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  return <User params={{ userId }} />;
}

export default UserPage;
