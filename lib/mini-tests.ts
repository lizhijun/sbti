export interface MiniTest {
  id: string;
  slug: string;
  icon: string;
  accent: string;
  accentLight: string;
  questionCount: number;
  resultCount: number;
  tags: string[];
  defaultPriority: number;
}

export const miniTests: MiniTest[] = [
  {
    id: "animal",
    slug: "animal",
    icon: "🦊",
    accent: "#F97316",
    accentLight: "#FFEDD5",
    questionCount: 12,
    resultCount: 4,
    tags: ["fun", "social"],
    defaultPriority: 9823,
  },
  {
    id: "love-language",
    slug: "love-language",
    icon: "💝",
    accent: "#EC4899",
    accentLight: "#FCE7F3",
    questionCount: 10,
    resultCount: 5,
    tags: ["emotion", "social"],
    defaultPriority: 7651,
  },
  {
    id: "social-battery",
    slug: "social-battery",
    icon: "🔋",
    accent: "#10B981",
    accentLight: "#D1FAE5",
    questionCount: 10,
    resultCount: 4,
    tags: ["fun", "social"],
    defaultPriority: 5432,
  },
  {
    id: "decision",
    slug: "decision",
    icon: "🧭",
    accent: "#F59E0B",
    accentLight: "#FEF3C7",
    questionCount: 10,
    resultCount: 4,
    tags: ["practical", "career"],
    defaultPriority: 4210,
  },
  {
    id: "color",
    slug: "color",
    icon: "🎨",
    accent: "#8B5CF6",
    accentLight: "#EDE9FE",
    questionCount: 10,
    resultCount: 4,
    tags: ["fun"],
    defaultPriority: 6108,
  },
  {
    id: "burnout",
    slug: "burnout",
    icon: "😮‍💨",
    accent: "#64748B",
    accentLight: "#F1F5F9",
    questionCount: 10,
    resultCount: 3,
    tags: ["career", "practical"],
    defaultPriority: 8200,
  },
];

export const miniTestBySlug: Record<string, MiniTest> = Object.fromEntries(
  miniTests.map((t) => [t.slug, t]),
);
