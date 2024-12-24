"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

const certificates = [
  {
    id: "cert-001",
    name: "Advanced Cardiac Life Support",
    courseId: "ACLS-2023",
    issueDate: "2023-06-15",
    expirationDate: "2025-06-15",
  },
  {
    id: "cert-002",
    name: "Pediatric Advanced Life Support",
    courseId: "PALS-2023",
    issueDate: "2023-07-01",
    expirationDate: "2025-07-01",
  },
  {
    id: "cert-003",
    name: "Emergency Nursing Certification",
    courseId: "ENC-2023",
    issueDate: "2023-05-20",
    expirationDate: "2026-05-20",
  },
];

export default function Certificates() {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <Link href={`/certificates/${certificate.id}`} key={certificate.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{certificate.name}</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{certificate.courseId}</div>
                <p className="text-xs text-muted-foreground">
                  Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                </p>
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
