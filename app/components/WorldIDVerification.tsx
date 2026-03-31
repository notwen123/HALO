"use client";

import { IDKitRequestWidget, orbLegacy, IDKitResult } from "@worldcoin/idkit";
import { ShieldCheck, UserCheck } from "lucide-react";
import { useState } from "react";

/**
 * @title WorldIDGuardian
 * @dev The "Human Check" component for high-stakes actions in HALO.
 */
export default function WorldIDGuardian({ 
  onVerified 
}: { 
  onVerified: (result: IDKitResult) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleVerify = async (result: IDKitResult) => {
    console.log("[WorldID] Human Identity Proof received:", result);
    
    const res = await fetch("/api/verify-proof", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });
    
    const verifyRes = await res.json();

    if (res.ok && verifyRes.success) {
       onVerified(result);
    } else {
       throw new Error("Human verification failed. Protection remains ACTIVE.");
    }
  };

  return (
    <IDKitRequestWidget
      app_id="app_staging_08004"
      action="guardian-killswitch"
      onOpenChange={setIsOpen}
      open={isOpen}
      handleVerify={handleVerify}
      onSuccess={(result) => console.log("Guardian Proof Verified!", result)}
      auto_legacy_proofs={true}
      preset={orbLegacy()}
    >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-accent/20 text-accent rounded-lg border border-accent/30 hover:bg-accent/30 transition-all font-medium"
        >
          <UserCheck className="w-4 h-4" />
          Verify Human Guardian
        </button>
    </IDKitRequestWidget>
  );
}
