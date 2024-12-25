"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { fetchCertificate } from "@/services/certificateService";

// Component
export default function IndividualCertificate({ params }: { params: { certificateId: string } }) {
  const [certificate, setCertificate] = useState({
    _id: "",
    user: {
      name: "",
    },
    course: {
      title: "",
      slug: "",
    },
    percentage: 0,
    issueDate: "",
    expirationDate: "",
  });
  useEffect(() => {
    fetchCertificate(params.certificateId).then((data) => {
      setCertificate(data);
    });
  }, [params.certificateId]);
  const [verificationUrl, setVerificationUrl] = useState<string>("");
  // const certificate = certificates.find((cert) => cert.id === params.certificateId);

  // Ref for capturing the certificate div
  const certificateRef = useRef<HTMLDivElement>(null);

  // Set the verification URL dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      setVerificationUrl(`${window.location.origin}/certificates/${certificate?._id}`);
    }
  }, [certificate?._id]);

  // Handle Download as PDF
  const handleDownload = async () => {
    if (!certificateRef.current) return;

    // Capture the certificate div as an image
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Handle images loaded from URLs
    });

    const imgData = canvas.toDataURL("image/png");

    // Create a PDF
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${certificate?.course.title}-${certificate.course.slug}.pdf`); // Filename
  };

  // If certificate is not found
  if (!certificate) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-red-500">Certificate not found</h2>
      </div>
    );
  }

  return (
    <div className="container py-10 mx-auto">
      {/* Certificate Card */}
      <div ref={certificateRef}>
        <Card className="max-w-3xl mx-auto">
          {/* Header */}
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Certificate of Completion</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Certificate Details */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold">This certifies that</h2>
              <h3 className="text-3xl font-bold mt-2">{certificate.user.name}</h3>
              <p className="text-xl mt-2">has successfully completed the course</p>
              <h4 className="text-2xl font-bold mt-2">{certificate.course.title}</h4>
              <p className="text-xl mt-2">Securing</p>
              <div className="flex items-center justify-center mt-2">
                <span className="text-3xl font-bold text-green-500">
                  {certificate.percentage.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Issue and Expiration Details */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Issue Date: {new Date(certificate.issueDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expiration Date: {new Date(certificate.expirationDate).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="secondary" className="text-lg">
                Course ID: {certificate.course.slug}
              </Badge>
            </div>

            {/* Institution and QR Code */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Image
                  src="/placeholder.svg"
                  alt="Institution Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h5 className="font-semibold">Medical Education Platform</h5>
                  <p className="text-sm text-muted-foreground">Accredited Institution</p>
                </div>
              </div>
              <QRCodeSVG value={verificationUrl} size={100} includeMargin />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-6">
        <Button className="gap-2" onClick={handleDownload}>
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
      </div>
    </div>
  );
}
