import { Language } from "@/lib/i18n";

export interface Chapter {
  number: string;
  title: string;
  whisper: string;
}

const EN: Chapter[] = [
  { number: "I", title: "The Invitation", whisper: "Every wave starts with one small push." },
  { number: "II", title: "Your Role", whisper: "You are not staff. You are the signal." },
  { number: "III", title: "The Honest Part", whisper: "No fairy tales. Only real ones." },
  { number: "IV", title: "The Climb", whisper: "Milestones are just proof you moved." },
  { number: "V", title: "The Fun Side", whisper: "Create loudly. Get rewarded louder." },
  { number: "VI", title: "What You Carry", whisper: "A card that outlives paper." },
  { number: "VII", title: "The Code", whisper: "Trust is the only currency here." },
  { number: "VIII", title: "The Promise", whisper: "Say it, and mean it." },
  { number: "IX", title: "Your Name", whisper: "This is where the story becomes yours." },
];

const BN: Chapter[] = [
  { number: "১", title: "আমন্ত্রণ", whisper: "প্রতিটি ঢেউ একটি ছোট ধাক্কা দিয়ে শুরু হয়।" },
  { number: "২", title: "আপনার ভূমিকা", whisper: "আপনি কর্মী নন, আপনিই সংকেত।" },
  { number: "৩", title: "সৎ কথা", whisper: "রূপকথা নয়, শুধু বাস্তব।" },
  { number: "৪", title: "উঠে যাওয়া", whisper: "মাইলস্টোন মানে আপনি এগিয়েছেন।" },
  { number: "৫", title: "মজার দিক", whisper: "জোরে তৈরি করুন, আরও জোরে পুরস্কার নিন।" },
  { number: "৬", title: "যা আপনি বহন করবেন", whisper: "কাগজের চেয়েও দীর্ঘজীবী কার্ড।" },
  { number: "৭", title: "নিয়ম", whisper: "এখানে বিশ্বাসই একমাত্র মুদ্রা।" },
  { number: "৮", title: "প্রতিশ্রুতি", whisper: "বলুন, এবং মন থেকে বলুন।" },
  { number: "৯", title: "আপনার নাম", whisper: "এখান থেকেই গল্পটা আপনার।" },
];

const HI: Chapter[] = [
  { number: "१", title: "निमंत्रण", whisper: "हर लहर एक छोटे धक्के से शुरू होती है।" },
  { number: "२", title: "आपकी भूमिका", whisper: "आप स्टाफ नहीं, आप संकेत हैं।" },
  { number: "३", title: "सच्ची बात", whisper: "कोई कहानी नहीं, सिर्फ हकीकत।" },
  { number: "४", title: "चढ़ाई", whisper: "माइलस्टोन सिर्फ सबूत हैं कि आप बढ़े।" },
  { number: "५", title: "मज़ेदार हिस्सा", whisper: "खुलकर बनाइए, और ज़्यादा पाइए।" },
  { number: "६", title: "आप क्या लेकर चलेंगे", whisper: "कागज़ से लंबा चलने वाला कार्ड।" },
  { number: "७", title: "नियम", whisper: "यहाँ भरोसा ही एकमात्र मुद्रा है।" },
  { number: "८", title: "वादा", whisper: "कहिए, और दिल से कहिए।" },
  { number: "९", title: "आपका नाम", whisper: "यहीं से कहानी आपकी हो जाती है।" },
];

const MAP: Record<Language, Chapter[]> = { en: EN, bn: BN, hi: HI };

export function getChapter(lang: Language, index: number): Chapter {
  const list = MAP[lang] ?? EN;
  return list[Math.min(index, list.length - 1)];
}

export function chapterLabel(lang: Language): string {
  return lang === "bn" ? "অধ্যায়" : lang === "hi" ? "अध्याय" : "Chapter";
}
