
/**
 * Mock Service to simulate Stellar Ledger interactions
 */
export const stellarService = {
  /**
   * Generates a mock transaction ID
   */
  generateTxId: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'XDR_';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * Simulates recording an event to the ledger
   */
  recordEvent: async (eventName: string, data: any) => {
    console.log(`[Stellar] Recording event: ${eventName}`, data);
    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 800));
    return stellarService.generateTxId();
  }
};
