// Anti-Cheat & Cryptographic Verification Engine
export class AntiCheatShield {
  private static instance: AntiCheatShield;
  private lastFrameTime: number = performance.now();
  private anomaliesCount: number = 0;
  private isTampered: boolean = false;
  private callsign: string = 'Operator';
  private integrityHash: string = '';

  private constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('riyanshu_callsign');
      if (saved) this.callsign = saved;
    }
  }

  public static getInstance(): AntiCheatShield {
    if (!AntiCheatShield.instance) {
      AntiCheatShield.instance = new AntiCheatShield();
    }
    return AntiCheatShield.instance;
  }

  public getCallsign(): string {
    return this.callsign;
  }

  public setCallsign(name: string) {
    this.callsign = name.trim().slice(0, 20) || 'Operator';
    if (typeof window !== 'undefined') {
      localStorage.setItem('riyanshu_callsign', this.callsign);
    }
  }

  // Monitor frame delta times for speed-hacking or script injection
  public checkFrameDelta(): boolean {
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    // A delta of < 1ms repeatedly or negative delta indicates abnormal timing loop
    if (delta < 1.2 && delta > 0) {
      this.anomaliesCount++;
      if (this.anomaliesCount > 15) {
        this.isTampered = true;
        return false;
      }
    } else {
      this.anomaliesCount = Math.max(0, this.anomaliesCount - 0.2);
    }
    return !this.isTampered;
  }

  public getIntegrityStatus(): { verified: boolean; text: string; score: number } {
    if (this.isTampered) {
      return { verified: false, text: 'ANOMALY DETECTED · TAMPERED', score: 30 };
    }
    return { verified: true, text: 'SHIELD ACTIVE · 100% SECURE', score: 100 };
  }

  // Generate lightweight signature for score submission
  public async signPayload(score: number, latencyMs: number, timestamp: number): Promise<string> {
    const raw = `${this.callsign}:${score}:${latencyMs}:${timestamp}:riyanshu-anti-cheat-core-seed-2026`;
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      try {
        const msgUint8 = new TextEncoder().encode(raw);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        this.integrityHash = hashHex.slice(0, 16);
        return hashHex;
      } catch (e) {
        // Fallback
      }
    }
    return 'sig_' + Math.abs(score * 31 + timestamp).toString(16);
  }

  // Cross-platform cloud sync bundle
  public exportSyncPayload(extraData: any = {}): string {
    const payload = {
      app: 'Riyanshu.OS',
      version: '2.4.0',
      callsign: this.callsign,
      timestamp: new Date().toISOString(),
      theme: typeof window !== 'undefined' ? localStorage.getItem('riyanshu_theme') || 'cyberpunk' : 'cyberpunk',
      audioMuted: typeof window !== 'undefined' ? localStorage.getItem('riyanshu_audio_muted') === 'true' : false,
      extra: extraData,
      checksum: btoa(`${this.callsign}:${Date.now()}`).slice(0, 12)
    };
    return JSON.stringify(payload, null, 2);
  }

  public importSyncPayload(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.app === 'Riyanshu.OS' && data.callsign) {
        this.setCallsign(data.callsign);
        if (data.theme && typeof window !== 'undefined') {
          localStorage.setItem('riyanshu_theme', data.theme);
        }
        if (data.audioMuted !== undefined && typeof window !== 'undefined') {
          localStorage.setItem('riyanshu_audio_muted', data.audioMuted ? 'true' : 'false');
        }
        return true;
      }
    } catch (e) {}
    return false;
  }
}

export const antiCheat = AntiCheatShield.getInstance();
