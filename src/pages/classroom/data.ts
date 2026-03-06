export interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "reading" | "quiz";
}

export interface ClassroomModule {
  id: number;
  title: string;
  chapters: number;
  totalLessons: number;
  totalQuizzes: number;
  lessons: Lesson[];
}

export interface ProgressItem {
  label: string;
  percent: number;
  barColor: string;
}

export interface ClassroomCourse {
  id: number;
  title: string;
  instructor: string;
  instructorColor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  currentLesson: {
    title: string;
    caption: string;
    duration: string;
    description: string;
    gradientBg: string;
  };
  overview: string;
  resources: { title: string; type: string; size: string }[];
  progressItems: ProgressItem[];
  modules: ClassroomModule[];
}

export const CLASSROOM_DATA: Record<number, ClassroomCourse> = {
  1: {
    id: 1,
    title: "Advances User Experience",
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    progress: 70,
    totalLessons: 12,
    completedLessons: 8,
    currentLesson: {
      title: "Foundations of UX — Lesson 3: User Research Methods",
      caption: "Introduction to Mentor - What you will learn in the course",
      duration: "18:42",
      description:
        "In this lesson we explore the core methods used in user research, including interviews, surveys, contextual inquiry, and usability testing. You'll learn how to choose the right method for your project stage and how to synthesize findings into actionable insights.",
      gradientBg: "from-pink-900 via-rose-800 to-slate-900",
    },
    overview:
      "This course covers end-to-end UX design principles including research, wireframing, prototyping, and usability testing. By the end you'll have the skills to design user-centred digital products from scratch.",
    resources: [
      { title: "UX Research Methods.pdf", type: "PDF", size: "2.4 MB" },
      { title: "Interview Guide Template.docx", type: "DOC", size: "340 KB" },
      { title: "Figma Starter Kit", type: "LINK", size: "" },
    ],
    progressItems: [
      { label: "Lectures",   percent: 75, barColor: "bg-orange-400" },
      { label: "Readings",   percent: 45, barColor: "bg-red-400" },
      { label: "Quizzes",    percent: 65, barColor: "bg-[#44BCFF]" },
      { label: "Assessment", percent: 0,  barColor: "bg-emerald-400" },
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Computers and Operating Systems",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 1, title: "What is UX Design?", duration: "12:10", completed: true, type: "video" },
          { id: 2, title: "History & Evolution of UX", duration: "09:45", completed: true, type: "video" },
          { id: 3, title: "UX vs UI vs Product Design", duration: "14:20", completed: true, type: "reading" },
        ],
      },
      {
        id: 2,
        title: "Enterprise Systems and Security",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 4, title: "Research Planning", duration: "11:30", completed: true, type: "video" },
          { id: 5, title: "User Interviews", duration: "16:00", completed: true, type: "video" },
          { id: 6, title: "User Research Methods", duration: "18:42", completed: false, type: "video" },
          { id: 7, title: "Synthesising Research", duration: "13:55", completed: false, type: "reading" },
        ],
      },
      {
        id: 3,
        title: "Business Systems Applications",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 8, title: "Low-Fidelity Wireframes", duration: "20:15", completed: false, type: "video" },
          { id: 9, title: "High-Fidelity Prototypes", duration: "22:40", completed: false, type: "video" },
          { id: 10, title: "Prototype Quiz", duration: "10:00", completed: false, type: "quiz" },
        ],
      },
      {
        id: 4,
        title: "Computers, Operating Systems, and Security",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 11, title: "Planning a Usability Test", duration: "15:00", completed: false, type: "video" },
          { id: 12, title: "Final Assessment", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
      {
        id: 5,
        title: "Introduction to Computers and Operating Systems and Secur",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 13, title: "Advanced Security Concepts", duration: "17:00", completed: false, type: "video" },
        ],
      },
      {
        id: 6,
        title: "Final Assessment",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 14, title: "Final Assessment", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
    ],
  },
  2: {
    id: 2,
    title: "Advance Java",
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    progress: 85,
    totalLessons: 12,
    completedLessons: 10,
    currentLesson: {
      title: "Collections Framework — Lesson 5: Maps & HashMaps",
      caption: "Introduction to Mentor - What you will learn in the course",
      duration: "21:15",
      description:
        "Deep-dive into Java's Collections Framework with a focus on Map implementations. We cover HashMap internals, collision handling, load factors, and when to use TreeMap vs LinkedHashMap for your use case.",
      gradientBg: "from-purple-900 via-indigo-800 to-slate-900",
    },
    overview:
      "An intensive course covering advanced Java topics including generics, collections, concurrency, streams, and design patterns. Suitable for developers with a foundational Java knowledge.",
    resources: [
      { title: "Java Collections Cheatsheet.pdf", type: "PDF", size: "1.8 MB" },
      { title: "HashMap Deep Dive.pdf", type: "PDF", size: "900 KB" },
      { title: "Java Docs Reference", type: "LINK", size: "" },
    ],
    progressItems: [
      { label: "Lectures",   percent: 85, barColor: "bg-purple-400" },
      { label: "Readings",   percent: 60, barColor: "bg-red-400" },
      { label: "Quizzes",    percent: 70, barColor: "bg-[#44BCFF]" },
      { label: "Assessment", percent: 10, barColor: "bg-emerald-400" },
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Generics",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 1, title: "Introduction to Generics", duration: "14:00", completed: true, type: "video" },
          { id: 2, title: "Bounded Type Parameters", duration: "11:30", completed: true, type: "video" },
          { id: 3, title: "Wildcards", duration: "09:45", completed: true, type: "reading" },
        ],
      },
      {
        id: 2,
        title: "Collections Framework",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 4, title: "Lists & Sets", duration: "17:20", completed: true, type: "video" },
          { id: 5, title: "Maps & HashMaps", duration: "21:15", completed: false, type: "video" },
          { id: 6, title: "Collections Quiz", duration: "15:00", completed: false, type: "quiz" },
        ],
      },
      {
        id: 3,
        title: "Concurrency & Threads",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 7, title: "Threads & Executors", duration: "19:00", completed: true, type: "video" },
          { id: 8, title: "Synchronization", duration: "16:30", completed: true, type: "video" },
          { id: 9, title: "CompletableFuture", duration: "22:00", completed: true, type: "video" },
        ],
      },
      {
        id: 4,
        title: "Streams & Lambdas",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 10, title: "Lambda Expressions", duration: "14:00", completed: true, type: "video" },
          { id: 11, title: "Stream Operations", duration: "18:30", completed: true, type: "video" },
          { id: 12, title: "Final Assessment", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
      {
        id: 5,
        title: "Design Patterns",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 13, title: "Singleton & Factory", duration: "16:00", completed: false, type: "video" },
        ],
      },
      {
        id: 6,
        title: "Final Assessment",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 14, title: "Final Assessment", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
    ],
  },
  3: {
    id: 3,
    title: "Project Management",
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    currentLesson: {
      title: "Agile & Scrum — Lesson 4: Sprint Planning",
      caption: "Introduction to Mentor - What you will learn in the course",
      duration: "17:30",
      description:
        "This lesson walks you through the sprint planning ceremony in Scrum. Learn how to break down a product backlog into sprint tasks, estimate story points, and set a sprint goal that your team can commit to.",
      gradientBg: "from-orange-900 via-amber-800 to-slate-900",
    },
    overview:
      "A practical guide to project management methodologies including Waterfall, Agile, and Scrum. Covers stakeholder management, risk assessment, budgeting, and delivery strategies.",
    resources: [
      { title: "Agile Manifesto.pdf", type: "PDF", size: "512 KB" },
      { title: "Sprint Planning Template.xlsx", type: "XLS", size: "220 KB" },
      { title: "Jira Beginner Guide", type: "LINK", size: "" },
    ],
    progressItems: [
      { label: "Lectures",   percent: 75, barColor: "bg-orange-400" },
      { label: "Readings",   percent: 45, barColor: "bg-red-400" },
      { label: "Quizzes",    percent: 65, barColor: "bg-[#44BCFF]" },
      { label: "Assessment", percent: 0,  barColor: "bg-emerald-400" },
    ],
    modules: [
      {
        id: 1,
        title: "Project Management Fundamentals",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 1, title: "What is Project Management?", duration: "10:00", completed: true, type: "video" },
          { id: 2, title: "Project Lifecycle", duration: "12:30", completed: true, type: "video" },
          { id: 3, title: "Stakeholder Management", duration: "14:00", completed: true, type: "reading" },
        ],
      },
      {
        id: 2,
        title: "Agile & Scrum Practices",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 4, title: "Intro to Agile", duration: "11:00", completed: true, type: "video" },
          { id: 5, title: "Scrum Roles", duration: "13:45", completed: true, type: "video" },
          { id: 6, title: "Sprint Planning", duration: "17:30", completed: false, type: "video" },
          { id: 7, title: "Retrospectives", duration: "10:00", completed: false, type: "reading" },
        ],
      },
      {
        id: 3,
        title: "Risk Assessment & Budget",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 8, title: "Risk Identification", duration: "15:00", completed: true, type: "video" },
          { id: 9, title: "Budget Planning", duration: "18:00", completed: true, type: "video" },
          { id: 10, title: "Risk Quiz", duration: "10:00", completed: true, type: "quiz" },
        ],
      },
      {
        id: 4,
        title: "Delivery & Project Closure",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 11, title: "Project Closure", duration: "12:00", completed: false, type: "video" },
          { id: 12, title: "Final Assessment", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
      {
        id: 5,
        title: "Stakeholder Management",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 13, title: "Managing Stakeholders", duration: "14:00", completed: false, type: "video" },
        ],
      },
      {
        id: 6,
        title: "Final Assessment",
        chapters: 4,
        totalLessons: 12,
        totalQuizzes: 1,
        lessons: [
          { id: 14, title: "Final Assessment", duration: "30:00", completed: false, type: "quiz" },
        ],
      },
    ],
  },
};
