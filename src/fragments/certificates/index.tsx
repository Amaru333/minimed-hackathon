"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchCertificates } from "@/services/certificateService";

// {
//   "_id": "676abf74bb2770a5245d3e5c",
//   "user": "67655e4c1018827b9bcbc583",
//   "course": {
//       "_id": "6767f5920b22ad74f9c546ca",
//       "title": "Advanced Cardiac Life Support (ACLS)",
//       "slug": "ACLS-001"
//   },
//   "percentage": 83.33333333333333,
//   "issueDate": "2024-12-24T14:04:36.194Z",
//   "expirationDate": "2026-12-24T14:04:36.194Z",
//   "createdAt": "2024-12-24T14:04:36.195Z",
//   "updatedAt": "2024-12-24T14:04:36.195Z",
//   "__v": 0
// }

interface Certificate {
  _id: string;
  user: string;
  course: {
    _id: string;
    title: string;
    slug: string;
  };
  percentage: number;
  issueDate: string;
  expirationDate: string;
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    fetchCertificates().then((data) => {
      setCertificates(data);
    });
  }, []);
  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates?.map((certificate) => (
          <Link href={`/certificates/${certificate._id}`} key={certificate._id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{certificate.course.title}</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">{certificate.course.slug}</div>
                    <p className="text-xs text-muted-foreground">
                      Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-3 flex">
                    <span className="font-semibold text-green-500">
                      {certificate.percentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <Badge variant="secondary">
                    Expires: {new Date(certificate.expirationDate).toLocaleDateString()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">View Certificate</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
