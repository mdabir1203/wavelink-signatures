export type Language = "en" | "bn" | "hi";

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
];

type TranslationKeys = {
  // Welcome
  welcomeTitle: string;
  welcomeHighlight: string;
  welcomeSubtitle: string;
  welcomeQuote: string;
  welcomeQuoteAuthor: string;
  welcomeTagline: string;
  welcomeCta: string;

  // Role
  roleTitle: string;
  roleSubtitle: string;
  roleTask1: string;
  roleTask1Desc: string;
  roleTask2: string;
  roleTask2Desc: string;
  roleTask3: string;
  roleTask3Desc: string;
  roleTask4: string;
  roleTask4Desc: string;
  roleTip: string;
  roleCta: string;

  // Reality
  realityTitle: string;
  realitySubtitle: string;
  realityHardTitle: string;
  realityHardText: string;
  realityHardQuote: string;
  realityUpsideTitle: string;
  realityUpsideText: string;
  realityCoffee: string;
  realityCta: string;

  // Milestones
  milestonesTitle: string;
  milestonesSubtitle: string;
  sell10: string;
  sell20: string;
  sell30: string;
  milestoneTip: string;
  milestonesCta: string;

  // Perks (creative bonuses)
  perksTitle: string;
  perksSubtitle: string;
  perkVideoTitle: string;
  perkVideoDesc: string;
  perkPhotoTitle: string;
  perkPhotoDesc: string;
  perkReferralTitle: string;
  perkReferralDesc: string;
  perkStreakTitle: string;
  perkStreakDesc: string;
  perkLeaderTitle: string;
  perkLeaderDesc: string;
  perkSwagTitle: string;
  perkSwagDesc: string;
  perksTip: string;
  perksCta: string;

  // Products
  productsTitle: string;
  productsSubtitle: string;
  reviewStands: string;
  reviewStandsRate: string;
  singleUnit: string;
  singleUnitRate: string;
  qualifyingOrgs: string;
  netRevenue: string;
  netRevenueDesc: string;
  payoutTiming: string;
  payoutTimingDesc: string;
  productsCta: string;

  // Rules
  rulesTitle: string;
  rulesSubtitle: string;
  rule1Title: string;
  rule1Text: string;
  rule2Title: string;
  rule2Text: string;
  rule3Title: string;
  rule3Text: string;
  rule4Title: string;
  rule4Text: string;
  rule5Title: string;
  rule5Text: string;
  rulesCta: string;

  // Commitment
  commitTitle: string;
  commitSubtitle: string;
  commit1: string;
  commit2: string;
  commit3: string;
  commit4: string;
  commitReady: string;
  commitExit: string;
  commitCta: string;

  // Signature
  signTitle: string;
  signSubtitle: string;
  fullName: string;
  emailAddress: string;
  phone: string;
  govId: string;
  taxId: string;
  viewAgreement: string;
  drawSignature: string;
  typeSignature: string;
  signHere: string;
  clearSignature: string;
  agreeText: string;
  signCta: string;
  submitting: string;

  // Completion
  doneTitle: string;
  doneSubtitle: string;
  doneQuote: string;

  // Common
  back: string;
  progressLabel: string;
  selectLanguage: string;
};

const en: TranslationKeys = {
  welcomeTitle: "Welcome to",
  welcomeHighlight: "Wave Link",
  welcomeSubtitle: "You've been invited as a",
  welcomeQuote: "\"We're building something big… let's make waves together 🌊\"",
  welcomeQuoteAuthor: "— Wave Link Founding Team",
  welcomeTagline: "One Tap. Endless Connections.",
  welcomeCta: "Let's get started 🚀",

  roleTitle: "Your mission 🎯",
  roleSubtitle: "Sell NFC cards & review stands. Earn commission on every deal.",
  roleTask1: "Find customers",
  roleTask1Desc: "Pitch Wave Link NFC products to businesses & individuals",
  roleTask2: "Close deals",
  roleTask2Desc: "Get them to buy — cards or review stands",
  roleTask3: "Help with setup",
  roleTask3Desc: "Make sure customers are happy & verified",
  roleTask4: "Post content",
  roleTask4Desc: "Share success stories on social media within 48hrs",
  roleTip: "💡 Result = reward. No fixed hours — work when you want!",
  roleCta: "Got it — what do I earn? 💰",

  realityTitle: "Reality check ⚡",
  realitySubtitle: "Selling isn't always easy — but the rewards are real.",
  realityHardTitle: "The honest truth",
  realityHardText: "Some people will say no. Some won't reply. That's normal. Keep pushing.",
  realityHardQuote: "\"After 10 rejections, 1 yes — that's the game changer 🏆\"",
  realityUpsideTitle: "But here's the upside",
  realityUpsideText: "When you DO close a deal — you earn real commission. Up to 20% of revenue. No cap.",
  realityCoffee: "Close deals = earn big. No deals = just tea ☕",
  realityCta: "I can handle it 💪",

  milestonesTitle: "Your earnings path 🗺️",
  milestonesSubtitle: "More you sell, higher the commission rate. Simple math.",
  sell10: "Sell 10 Cards",
  sell20: "Sell 20 Cards",
  sell30: "Sell 30 Cards",
  milestoneTip: "Commission rate increases as you hit each milestone!",
  milestonesCta: "Show me the products 📦",

  productsTitle: "What you'll sell 📦",
  productsSubtitle: "NFC cards for individuals & review stands for businesses.",
  reviewStands: "Review Stands & Partnerships",
  reviewStandsRate: "20% commission",
  singleUnit: "Single Card Sales",
  singleUnitRate: "5% commission",
  qualifyingOrgs: "Gyms, Salons, Cafes, Schools, SMEs, and more",
  netRevenue: "Net Revenue",
  netRevenueDesc: "Sales price minus VAT, taxes, and shipping.",
  payoutTiming: "Payout Timing",
  payoutTimingDesc: "Within 10 business days via bKash/Nagad/bank transfer.",
  productsCta: "What are the rules? 📋",

  rulesTitle: "Simple rules 📋",
  rulesSubtitle: "Follow these and you're golden.",
  rule1Title: "Follow the Law",
  rule1Text: "Respect the Bangladesh Cyber Security Act. Keep customer info private.",
  rule2Title: "Be Honest",
  rule2Text: "Always use real documents for KYC. Fake info = immediate termination.",
  rule3Title: "Work Freedom",
  rule3Text: "Choose when you work. You get paid when tasks are finished & confirmed.",
  rule4Title: "After-Sales Help",
  rule4Text: "Help customers set up the app. Make sure they're happy with the product.",
  rule5Title: "Travel Support",
  rule5Text: "Travel 25km+ for Wavelink? We cover transport. Keep receipts!",
  rulesCta: "I'm ready to commit ✅",

  commitTitle: "Ready to hustle? 💪",
  commitSubtitle: "Check each box if you agree. No pressure.",
  commit1: "I understand this is commission-based, not a salary",
  commit2: "I'll be transparent in all customer communications",
  commit3: "I accept milestone-based commission — sell more, earn more ✅",
  commit4: "I'll represent Wave Link with integrity & energy",
  commitReady: "Let's gooo! Your journey starts now 🚀",
  commitExit: "Exit option always available — no hard feelings 😊",
  commitCta: "Ready to sign ✍️",

  signTitle: "Sign the agreement ✍️",
  signSubtitle: "Legally binding under Bangladeshi digital law. Everything is transparent.",
  fullName: "Full name *",
  emailAddress: "Email address *",
  phone: "Phone number (optional)",
  govId: "Government ID (NID/Passport) *",
  taxId: "Tax ID (TIN) *",
  viewAgreement: "📄 View Full Agreement",
  drawSignature: "Draw",
  typeSignature: "Type",
  signHere: "Sign here with your finger ☝️",
  clearSignature: "Clear",
  agreeText: "I confirm this is my legal signature. I have read and agree to the Ambassador Agreement under the ICT Act 2006 and Digital Security Act 2018 of Bangladesh.",
  signCta: "Sign & Submit 🔐",
  submitting: "Submitting...",

  doneTitle: "You're in! 🎉",
  doneSubtitle: "Agreement signed & recorded. Time to start selling!",
  doneQuote: "\"Customers are waiting… let's not keep them waiting 👀\"",

  back: "Back",
  progressLabel: "Onboarding…",
  selectLanguage: "Select Language",
};

const bn: TranslationKeys = {
  welcomeTitle: "স্বাগতম",
  welcomeHighlight: "Wave Link",
  welcomeSubtitle: "আপনাকে আমন্ত্রণ জানানো হয়েছে",
  welcomeQuote: "\"আমরা বড় কিছু করতে যাচ্ছি… একসাথে ঢেউ তুলি 🌊\"",
  welcomeQuoteAuthor: "— Wave Link প্রতিষ্ঠাতা দল",
  welcomeTagline: "এক ট্যাপ। অসীম সংযোগ।",
  welcomeCta: "শুরু করি 🚀",

  roleTitle: "আপনার মিশন 🎯",
  roleSubtitle: "NFC কার্ড ও রিভিউ স্ট্যান্ড বিক্রি করুন। প্রতিটি ডিলে কমিশন নিন।",
  roleTask1: "কাস্টমার খুঁজুন",
  roleTask1Desc: "ব্যবসা ও ব্যক্তিদের কাছে Wave Link NFC পণ্য পিচ করুন",
  roleTask2: "ডিল ক্লোজ করুন",
  roleTask2Desc: "কার্ড বা রিভিউ স্ট্যান্ড কিনতে রাজি করান",
  roleTask3: "সেটআপে সাহায্য করুন",
  roleTask3Desc: "কাস্টমার যেন খুশি ও ভেরিফাইড থাকে",
  roleTask4: "কন্টেন্ট পোস্ট করুন",
  roleTask4Desc: "৪৮ ঘণ্টার মধ্যে সোশ্যাল মিডিয়ায় সাফল্যের গল্প শেয়ার করুন",
  roleTip: "💡 ফলাফল = পুরস্কার। কোনো ফিক্সড সময় নেই — যখন খুশি কাজ করুন!",
  roleCta: "বুঝেছি — কী আয় হবে? 💰",

  realityTitle: "বাস্তবতা যাচাই ⚡",
  realitySubtitle: "বিক্রি সবসময় সহজ না — তবে পুরস্কার আসল।",
  realityHardTitle: "সত্যি কথা",
  realityHardText: "অনেকে না বলবে। অনেকে রিপ্লাই দেবে না। এটা স্বাভাবিক। চেষ্টা চালিয়ে যান।",
  realityHardQuote: "\"১০ টা না-র পর ১ টা হ্যাঁ — সেটাই গেম চেঞ্জার 🏆\"",
  realityUpsideTitle: "তবে ভালো দিকটা হলো",
  realityUpsideText: "যখন আপনি ডিল ক্লোজ করবেন — আসল কমিশন পাবেন। রেভিনিউর ২০% পর্যন্ত। কোনো সীমা নেই।",
  realityCoffee: "ডিল ক্লোজ = বড় আয়। ডিল না হলে = শুধু চা ☕",
  realityCta: "পারব আমি 💪",

  milestonesTitle: "আপনার আয়ের পথ 🗺️",
  milestonesSubtitle: "যত বেশি বিক্রি, তত বেশি কমিশন রেট। সিম্পল ম্যাথ।",
  sell10: "১০টা কার্ড বিক্রি",
  sell20: "২০টা কার্ড বিক্রি",
  sell30: "৩০টা কার্ড বিক্রি",
  milestoneTip: "প্রতিটি মাইলস্টোনে কমিশন রেট বাড়ে!",
  milestonesCta: "প্রোডাক্ট দেখান 📦",

  productsTitle: "কী বিক্রি করবেন 📦",
  productsSubtitle: "ব্যক্তিদের জন্য NFC কার্ড ও ব্যবসার জন্য রিভিউ স্ট্যান্ড।",
  reviewStands: "রিভিউ স্ট্যান্ড ও পার্টনারশিপ",
  reviewStandsRate: "২০% কমিশন",
  singleUnit: "একক কার্ড বিক্রি",
  singleUnitRate: "৫% কমিশন",
  qualifyingOrgs: "জিম, সেলুন, ক্যাফে, স্কুল, SME, এবং আরও",
  netRevenue: "নেট রেভিনিউ",
  netRevenueDesc: "বিক্রয় মূল্য থেকে ভ্যাট, ট্যাক্স ও শিপিং বাদ।",
  payoutTiming: "পেমেন্ট সময়",
  payoutTimingDesc: "১০ কার্যদিবসের মধ্যে বিকাশ/নগদ/ব্যাংক ট্রান্সফারে।",
  productsCta: "নিয়মগুলো কী? 📋",

  rulesTitle: "সহজ নিয়ম 📋",
  rulesSubtitle: "এগুলো মানলেই সব ঠিক।",
  rule1Title: "আইন মানুন",
  rule1Text: "বাংলাদেশ সাইবার সিকিউরিটি আইন মেনে চলুন। কাস্টমার তথ্য গোপন রাখুন।",
  rule2Title: "সৎ থাকুন",
  rule2Text: "KYC-তে সবসময় আসল কাগজপত্র ব্যবহার করুন। ভুয়া তথ্য = তাৎক্ষণিক বরখাস্ত।",
  rule3Title: "কাজের স্বাধীনতা",
  rule3Text: "কখন কাজ করবেন আপনি ঠিক করুন। কাজ শেষ ও নিশ্চিত হলেই পেমেন্ট পাবেন।",
  rule4Title: "বিক্রি-পরবর্তী সাহায্য",
  rule4Text: "কাস্টমারকে অ্যাপ সেটআপে সাহায্য করুন। তারা খুশি থাকুক।",
  rule5Title: "ভ্রমণ সহায়তা",
  rule5Text: "Wavelink-এর জন্য ২৫ কিমি+ ভ্রমণ? আমরা পরিবহন খরচ দেব। রশিদ রাখুন!",
  rulesCta: "আমি প্রস্তুত ✅",

  commitTitle: "প্রস্তুত তো? 💪",
  commitSubtitle: "একমত হলে প্রতিটি বক্সে টিক দিন। কোনো চাপ নেই।",
  commit1: "আমি বুঝেছি এটা কমিশন-ভিত্তিক, বেতন নয়",
  commit2: "আমি সব কাস্টমার যোগাযোগে স্বচ্ছ থাকব",
  commit3: "আমি মাইলস্টোন-ভিত্তিক কমিশন মেনে নিচ্ছি — বেশি বিক্রি, বেশি আয় ✅",
  commit4: "আমি Wave Link-কে সততা ও উদ্যমের সাথে প্রতিনিধিত্ব করব",
  commitReady: "চলো শুরু করি! তোমার যাত্রা শুরু হচ্ছে 🚀",
  commitExit: "বের হওয়ার অপশন সবসময় আছে — কোনো সমস্যা নেই 😊",
  commitCta: "সাইন করতে রেডি ✍️",

  signTitle: "চুক্তি সাইন করুন ✍️",
  signSubtitle: "বাংলাদেশি ডিজিটাল আইনের অধীনে আইনত বাধ্যকর। সব কিছু স্বচ্ছ।",
  fullName: "পূর্ণ নাম *",
  emailAddress: "ইমেইল ঠিকানা *",
  phone: "ফোন নম্বর (ঐচ্ছিক)",
  govId: "সরকারি আইডি (NID/পাসপোর্ট) *",
  taxId: "ট্যাক্স আইডি (TIN) *",
  viewAgreement: "📄 পুরো চুক্তি দেখুন",
  drawSignature: "আঁকুন",
  typeSignature: "টাইপ করুন",
  signHere: "আঙুল দিয়ে সাইন করুন ☝️",
  clearSignature: "মুছুন",
  agreeText: "আমি নিশ্চিত করছি এটি আমার আইনি স্বাক্ষর। আমি তথ্য ও যোগাযোগ প্রযুক্তি আইন ২০০৬ ও ডিজিটাল নিরাপত্তা আইন ২০১৮ এর অধীনে অ্যাম্বাসেডর চুক্তি পড়েছি ও সম্মত আছি।",
  signCta: "সাইন ও সাবমিট 🔐",
  submitting: "সাবমিট হচ্ছে...",

  doneTitle: "আপনি যোগ দিয়েছেন! 🎉",
  doneSubtitle: "চুক্তি সাইন ও রেকর্ড হয়েছে। বিক্রি শুরু করার সময়!",
  doneQuote: "\"কাস্টমাররা অপেক্ষা করছে… তাদের আর অপেক্ষা করাবেন না 👀\"",

  back: "পেছনে",
  progressLabel: "অনবোর্ডিং…",
  selectLanguage: "ভাষা নির্বাচন করুন",
};

const hi: TranslationKeys = {
  welcomeTitle: "स्वागत है",
  welcomeHighlight: "Wave Link",
  welcomeSubtitle: "आपको आमंत्रित किया गया है",
  welcomeQuote: "\"हम कुछ बड़ा बना रहे हैं… साथ मिलकर लहरें उठाएं 🌊\"",
  welcomeQuoteAuthor: "— Wave Link संस्थापक टीम",
  welcomeTagline: "एक टैप। अनंत कनेक्शन।",
  welcomeCta: "शुरू करें 🚀",

  roleTitle: "आपका मिशन 🎯",
  roleSubtitle: "NFC कार्ड और रिव्यू स्टैंड बेचें। हर डील पर कमीशन कमाएं।",
  roleTask1: "कस्टमर खोजें",
  roleTask1Desc: "बिज़नेस और लोगों को Wave Link NFC प्रोडक्ट पिच करें",
  roleTask2: "डील क्लोज़ करें",
  roleTask2Desc: "उन्हें कार्ड या रिव्यू स्टैंड खरीदने के लिए राज़ी करें",
  roleTask3: "सेटअप में मदद करें",
  roleTask3Desc: "कस्टमर खुश और वेरिफ़ाइड हों",
  roleTask4: "कंटेंट पोस्ट करें",
  roleTask4Desc: "48 घंटे में सोशल मीडिया पर सफलता की कहानी शेयर करें",
  roleTip: "💡 नतीजा = इनाम। कोई फ़िक्स्ड टाइम नहीं — जब चाहें काम करें!",
  roleCta: "समझ गया — कमाई क्या होगी? 💰",

  realityTitle: "हक़ीक़त जाँच ⚡",
  realitySubtitle: "बेचना हमेशा आसान नहीं — लेकिन इनाम असली है।",
  realityHardTitle: "सच्ची बात",
  realityHardText: "कुछ लोग ना कहेंगे। कुछ रिप्लाई नहीं देंगे। ये सामान्य है। कोशिश जारी रखें।",
  realityHardQuote: "\"10 ना के बाद 1 हाँ — वही गेम चेंजर है 🏆\"",
  realityUpsideTitle: "लेकिन अच्छी बात ये है",
  realityUpsideText: "जब आप डील क्लोज़ करेंगे — असली कमीशन मिलेगा। रेवेन्यू का 20% तक। कोई सीमा नहीं।",
  realityCoffee: "डील क्लोज़ = बड़ी कमाई। डील नहीं = सिर्फ़ चाय ☕",
  realityCta: "मैं कर सकता/सकती हूँ 💪",

  milestonesTitle: "आपकी कमाई का रास्ता 🗺️",
  milestonesSubtitle: "जितना ज़्यादा बेचो, उतना ज़्यादा कमीशन रेट। सिंपल मैथ।",
  sell10: "10 कार्ड बेचें",
  sell20: "20 कार्ड बेचें",
  sell30: "30 कार्ड बेचें",
  milestoneTip: "हर माइलस्टोन पर कमीशन रेट बढ़ता है!",
  milestonesCta: "प्रोडक्ट दिखाओ 📦",

  productsTitle: "क्या बेचेंगे 📦",
  productsSubtitle: "व्यक्तियों के लिए NFC कार्ड और बिज़नेस के लिए रिव्यू स्टैंड।",
  reviewStands: "रिव्यू स्टैंड और पार्टनरशिप",
  reviewStandsRate: "20% कमीशन",
  singleUnit: "सिंगल कार्ड बिक्री",
  singleUnitRate: "5% कमीशन",
  qualifyingOrgs: "जिम, सैलून, कैफ़े, स्कूल, SME, और भी बहुत कुछ",
  netRevenue: "नेट रेवेन्यू",
  netRevenueDesc: "बिक्री मूल्य में से VAT, टैक्स और शिपिंग कटेगा।",
  payoutTiming: "पेमेंट का समय",
  payoutTimingDesc: "10 कार्यदिवसों में बिकाश/नगद/बैंक ट्रांसफ़र से।",
  productsCta: "नियम क्या हैं? 📋",

  rulesTitle: "सरल नियम 📋",
  rulesSubtitle: "ये मानें तो सब ठीक।",
  rule1Title: "क़ानून का पालन करें",
  rule1Text: "बांग्लादेश साइबर सिक्योरिटी एक्ट का पालन करें। कस्टमर की जानकारी गोपनीय रखें।",
  rule2Title: "ईमानदार रहें",
  rule2Text: "KYC में हमेशा असली दस्तावेज़ इस्तेमाल करें। नक़ली जानकारी = तुरंत बर्खास्तगी।",
  rule3Title: "काम की आज़ादी",
  rule3Text: "कब काम करना है आप तय करें। काम पूरा और पुष्टि होने पर ही पेमेंट मिलेगा।",
  rule4Title: "बिक्री के बाद मदद",
  rule4Text: "कस्टमर को ऐप सेटअप में मदद करें। उन्हें प्रोडक्ट से खुश रखें।",
  rule5Title: "यात्रा सहायता",
  rule5Text: "Wavelink के लिए 25 किमी+ यात्रा? हम परिवहन खर्च देंगे। रसीदें रखें!",
  rulesCta: "मैं तैयार हूँ ✅",

  commitTitle: "तैयार हो? 💪",
  commitSubtitle: "सहमत हों तो हर बॉक्स पर टिक करें। कोई दबाव नहीं।",
  commit1: "मैं समझता/समझती हूँ ये कमीशन-आधारित है, सैलरी नहीं",
  commit2: "मैं सभी कस्टमर संवाद में पारदर्शी रहूँगा/रहूँगी",
  commit3: "मैं माइलस्टोन-आधारित कमीशन स्वीकार करता/करती हूँ — ज़्यादा बेचो, ज़्यादा कमाओ ✅",
  commit4: "मैं Wave Link का ईमानदारी और ऊर्जा से प्रतिनिधित्व करूँगा/करूँगी",
  commitReady: "चलो शुरू करते हैं! तुम्हारी यात्रा शुरू हो रही है 🚀",
  commitExit: "बाहर निकलने का ऑप्शन हमेशा है — कोई बात नहीं 😊",
  commitCta: "साइन करने को तैयार ✍️",

  signTitle: "समझौता साइन करें ✍️",
  signSubtitle: "बांग्लादेशी डिजिटल क़ानून के तहत कानूनी रूप से बाध्यकारी। सब कुछ पारदर्शी।",
  fullName: "पूरा नाम *",
  emailAddress: "ईमेल पता *",
  phone: "फ़ोन नंबर (वैकल्पिक)",
  govId: "सरकारी आईडी (NID/पासपोर्ट) *",
  taxId: "टैक्स आईडी (TIN) *",
  viewAgreement: "📄 पूरा समझौता देखें",
  drawSignature: "बनाएं",
  typeSignature: "टाइप करें",
  signHere: "उंगली से साइन करें ☝️",
  clearSignature: "मिटाएं",
  agreeText: "मैं पुष्टि करता/करती हूँ कि यह मेरा कानूनी हस्ताक्षर है। मैंने ICT एक्ट 2006 और डिजिटल सिक्योरिटी एक्ट 2018 के तहत एम्बेसडर समझौता पढ़ा है और सहमत हूँ।",
  signCta: "साइन और सबमिट 🔐",
  submitting: "सबमिट हो रहा है...",

  doneTitle: "आप शामिल हो गए! 🎉",
  doneSubtitle: "समझौता साइन और रिकॉर्ड हो गया। बिक्री शुरू करने का समय!",
  doneQuote: "\"कस्टमर इंतज़ार कर रहे हैं… उन्हें और इंतज़ार न कराएं 👀\"",

  back: "पीछे",
  progressLabel: "ऑनबोर्डिंग…",
  selectLanguage: "भाषा चुनें",
};

const translations: Record<Language, TranslationKeys> = { en, bn, hi };

export function t(lang: Language, key: keyof TranslationKeys): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

export type { TranslationKeys };
