import { NextResponse } from "next/server";
import { IVerifyResponse, verifyCloudProof } from "@worldcoin/idkit"

/**
 * @title WorldID Verification API
 * @dev Verifies the human operator identity to allow sensitive guardian actions.
 */
export async function POST(req: Request) {
  const proof = await req.json();
  const app_id = process.env.WORLD_ID_APP_ID as `app_${string}`;
  const action = "guardian-killswitch";

  console.log(`[Backend] Verifying World ID proof for action: ${action}`);

  try {
    const verifyRes = await verifyCloudProof(proof, app_id, action);

    if (verifyRes.success) {
      console.log("[Backend] Human verified! Action AUTHORIZED.");
      return NextResponse.json(verifyRes, { status: 200 });
    } else {
      console.error("[Backend] Proof verification failed:", verifyRes);
      return NextResponse.json(verifyRes, { status: 400 });
    }
  } catch (error) {
    console.error("[Backend] World ID API error:", error);
    return NextResponse.json({ success: false, error: "Internal Verification Error" }, { status: 500 });
  }
}
