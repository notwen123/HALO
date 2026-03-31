import { NextResponse } from "next/server";

/**
 * @title WorldID Verification API
 * @dev Verifies the human operator identity to allow sensitive guardian actions.
 * Uses the direct Developer Portal API for maximum reliability.
 */
export async function POST(req: Request) {
  const proof = await req.json();
  const app_id = process.env.WORLD_ID_APP_ID || "app_staging_08004";
  const action = "guardian-killswitch";

  console.log(`[Backend] Verifying World ID proof for action: ${action}`);

  try {
    const response = await fetch(`https://developer.worldcoin.org/api/v1/verify/${app_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...proof, action }),
    });

    const verifyRes = await response.json();

    if (response.ok && verifyRes.success) {
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
