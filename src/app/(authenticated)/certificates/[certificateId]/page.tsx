import IndividualCertificate from "@/fragments/individual-certificate";
import React, { use } from "react";

function IndividualCertificatePage({ params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = use(params);
  return <IndividualCertificate params={{ certificateId }} />;
}

export default IndividualCertificatePage;
