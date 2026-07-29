/** Tiny sensory feedback layer: haptics + soft synthesized tones. */
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as any).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function haptic(pattern: number | number[] = 12) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(pattern); } catch { /* ignore */ }
  }
}

export function tone(frequency = 520, duration = 0.18, gainValue = 0.05) {
  const ac = audio();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(gainValue, ac.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration + 0.02);
}

export function chime(muted: boolean, step = 0) {
  if (muted) return;
  tone(440 + step * 28, 0.16, 0.045);
  setTimeout(() => tone(660 + step * 28, 0.22, 0.03), 90);
}

export function fanfare(muted: boolean) {
  if (muted) return;
  [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.3, 0.05), i * 130));
}
