"use client";

import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit";
import { ShieldCheck, UserCheck } from "lucide-react";
import { useState } from "react";

/**
 * @title WorldIDGuardian
 * @dev The "Human Check" component for high-stakes actions in HALO.
 */
export default function WorldIDGuardian({ 
  onVerified 
}: { 
  onVerified: (result: ISuccessResult) => void 
}) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (result: ISuccessResult) => {
    console.log("[WorldID] Human Identity Proof received:", result);
    // In a real app, we verify the proof on our backend/Next.js API route
    // For the hackathon demo, we'll verify and allow the action
    const res = await fetch("/api/verify-proof", {
      method: "POST",
      body: JSON.stringify(result),
    });
    
    if (res.ok) {
       onVerified(result);
    } else {
       throw new Error("Human verification failed. Protection remains ACTIVE.");
    }
  };

  return (
    <IDKitWidget
      app_id="app_staging_08004..." // Placeholder for testing
      action="guardian-killswitch"
      verification_level={VerificationLevel.Orb}
      handleVerify={handleVerify}
      onSuccess={(result) => console.log("Guardian Proof Verified!", result)}
    >
      {({ open }) => (
        <button
          onClick={open}
          className="flex items-center gap-2 px-6 py-2 bg-accent/20 text-accent rounded-lg border border-accent/30 hover:bg-accent/30 transition-all font-medium"
        >
          <UserCheck className="w-4 h-4" />
          Verify Human Guardian
        </button>
      )}
    </IDKitWidget>
  );
}
