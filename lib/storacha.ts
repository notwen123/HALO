import { create } from "@storacha/client";
import { StoreIndexedDB } from "@storacha/client/stores/indexeddb";

/**
 * @title StorachaClient
 * @dev The decentralized logging engine for HALO.
 */
export class StorachaClient {
  private client: any;

  async init() {
    if (typeof window === "undefined") return;
    const store = new StoreIndexedDB("halo-guardian-storage");
    this.client = await create({ store });
    return this.client;
  }

  /**
   * @dev Upload an agent performance log to Storacha.
   */
  async uploadLog(log: any) {
    if (!this.client) await this.init();
    
    console.log("[Storacha] Preparing agent log for decentralized storage...");
    const blob = new Blob([JSON.stringify(log)], { type: "application/json" });
    const file = new File([blob], `agent_log_${Date.now()}.json`);
    
    // In actual use, we would need to ensure the client is logged in
    // This is the functional path for the hackathon
    try {
      const root = await this.client.uploadFile(file);
      console.log(`[Storacha] Agent log successfully stored! CID: ${root}`);
      return root;
    } catch (error) {
      console.error("[Storacha] Upload failed:", error);
      return null;
    }
  }
}

export const storacha = new StorachaClient();
