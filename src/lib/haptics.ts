// Haptic feedback controller with safe browser fallback
export type HapticType = 'light' | 'medium' | 'heavy' | 'bounce' | 'laser' | 'success' | 'warning';

class HapticController {
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('riyanshu_haptics_enabled');
      this.enabled = saved !== 'false';
    }
  }

  public isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('riyanshu_haptics_enabled', val ? 'true' : 'false');
    }
  }

  public getEnabled(): boolean {
    return this.enabled;
  }

  public trigger(type: HapticType = 'light') {
    if (!this.enabled || !this.isSupported()) return;

    try {
      switch (type) {
        case 'light':
          navigator.vibrate(12);
          break;
        case 'medium':
          navigator.vibrate(28);
          break;
        case 'heavy':
          navigator.vibrate([45, 30, 45]);
          break;
        case 'bounce':
          navigator.vibrate(18);
          break;
        case 'laser':
          navigator.vibrate([20, 15, 35]);
          break;
        case 'success':
          navigator.vibrate([15, 30, 15, 30, 40]);
          break;
        case 'warning':
          navigator.vibrate([40, 40, 40]);
          break;
      }
    } catch (e) {
      // Ignored
    }
  }
}

export const haptic = new HapticController();
