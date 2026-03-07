export type LessonType = "video" | "reading" | "chapter-review" | "quiz";

export interface LessonItem {
  id: number;
  title: string;
  type: LessonType;
  duration?: string;
  completed: boolean;
  /** Text body used when type is "reading" or "chapter-review" */
  content?: string;
}

export interface ChapterGroup {
  id: number;
  title: string; // e.g. "Chapter 1"
  lessons: LessonItem[];
}

export interface EventSection {
  afterChapterId: number; // render event card after this chapter id
  workshopType: string; // e.g. "Workshop:"
  name: string; // e.g. "Ux Best Practices"
}

export interface FinalQuizItem {
  id: number;
  title: string;
  description: string; // e.g. "Multiple Choice Questions"
}

export interface ModuleDetail {
  id: number;
  courseId: number;
  moduleNumber: number;
  title: string;
  totalChapters: number;
  totalLessons: number;
  totalQuizzes: number;
  chapterList: ChapterGroup[];
  event?: EventSection;
  finalQuiz?: FinalQuizItem;
}

/** Flatten all lesson items (chapters + final quiz) into one ordered list */
export const getAllLessons = (mod: ModuleDetail): LessonItem[] => {
  const items: LessonItem[] = [];
  mod.chapterList.forEach((ch) => items.push(...ch.lessons));
  if (mod.finalQuiz) {
    items.push({
      id: mod.finalQuiz.id,
      title: mod.finalQuiz.title,
      type: "quiz",
      completed: false,
      content: mod.finalQuiz.description,
    });
  }
  return items;
};

// TODO: replace with API call — keyed as "{courseId}_{moduleId}"
export const MODULE_DETAILS: Record<string, ModuleDetail> = {
  "1_1": {
    id: 1,
    courseId: 1,
    moduleNumber: 1,
    title: "Introduction to Computers and Operating Systems",
    totalChapters: 4,
    totalLessons: 12,
    totalQuizzes: 1,
    chapterList: [
      {
        id: 1,
        title: "Chapter 1",
        lessons: [
          {
            id: 1, title: "Introduction", type: "video",
            duration: "12:10", completed: true,
          },
          {
            id: 2, title: "Lesson 1", type: "video",
            duration: "09:45", completed: false,
          },
          {
            id: 3, title: "Lesson 2", type: "reading",
            completed: false,
            content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
          {
            id: 4, title: "Lesson 3", type: "chapter-review",
            completed: false,
            content: "Review the key concepts from Chapter 1 before proceeding.",
          },
        ],
      },
      {
        id: 2,
        title: "Chapter 2",
        lessons: [
          { id: 5, title: "Lesson 4", type: "video", duration: "11:30", completed: false },
          {
            id: 6, title: "Lesson 5", type: "reading", completed: false,
            content: "This reading covers advanced topics introduced in the lecture.",
          },
          {
            id: 7, title: "Lesson 6", type: "chapter-review", completed: false,
            content: "Chapter 2 review: consolidate your understanding.",
          },
        ],
      },
      {
        id: 3,
        title: "Chapter 3",
        lessons: [
          { id: 8, title: "Lesson 7", type: "video", duration: "15:00", completed: false },
          {
            id: 9, title: "Lesson 8", type: "reading", completed: false,
            content: "Supplementary reading for Chapter 3.",
          },
          {
            id: 10, title: "Lesson 9", type: "chapter-review", completed: false,
            content: "Chapter 3 review: test your understanding.",
          },
        ],
      },
      {
        id: 4,
        title: "Chapter 4",
        lessons: [
          { id: 11, title: "Lesson 10", type: "video", duration: "17:00", completed: false },
          {
            id: 12, title: "Lesson 11", type: "reading", completed: false,
            content: "Final reading material before the exam.",
          },
          {
            id: 13, title: "Lesson 12", type: "chapter-review", completed: false,
            content: "Chapter 4 review.",
          },
        ],
      },
    ],
    event: {
      afterChapterId: 2,
      workshopType: "Workshop:",
      name: "Ux Best Practices",
    },
    finalQuiz: {
      id: 100,
      title: "Final Exam",
      description: "Multiple Choice Questions",
    },
  },
  "2_1": {
    id: 1,
    courseId: 2,
    moduleNumber: 1,
    title: "Introduction to Generics & Collections",
    totalChapters: 4,
    totalLessons: 12,
    totalQuizzes: 1,
    chapterList: [
      {
        id: 1,
        title: "Chapter 1",
        lessons: [
          { id: 1, title: "Introduction", type: "video", duration: "14:00", completed: true },
          { id: 2, title: "Lesson 1", type: "video", duration: "11:30", completed: true },
          { id: 3, title: "Lesson 2", type: "reading", completed: false, content: "Generics theory reading." },
          { id: 4, title: "Lesson 3", type: "chapter-review", completed: false, content: "Chapter 1 review." },
        ],
      },
      {
        id: 2,
        title: "Chapter 2",
        lessons: [
          { id: 5, title: "Lesson 4", type: "video", duration: "17:20", completed: false },
          { id: 6, title: "Lesson 5", type: "reading", completed: false, content: "Collections reading." },
          { id: 7, title: "Lesson 6", type: "chapter-review", completed: false, content: "Chapter 2 review." },
        ],
      },
      {
        id: 3,
        title: "Chapter 3",
        lessons: [
          { id: 8, title: "Lesson 7", type: "video", duration: "19:00", completed: false },
          { id: 9, title: "Lesson 8", type: "reading", completed: false, content: "Concurrency reading." },
          { id: 10, title: "Lesson 9", type: "chapter-review", completed: false, content: "Chapter 3 review." },
        ],
      },
      {
        id: 4,
        title: "Chapter 4",
        lessons: [
          { id: 11, title: "Lesson 10", type: "video", duration: "14:00", completed: false },
          { id: 12, title: "Lesson 11", type: "reading", completed: false, content: "Streams reading." },
          { id: 13, title: "Lesson 12", type: "chapter-review", completed: false, content: "Chapter 4 review." },
        ],
      },
    ],
    event: {
      afterChapterId: 2,
      workshopType: "Workshop:",
      name: "Java Best Practices",
    },
    finalQuiz: {
      id: 100,
      title: "Final Exam",
      description: "Multiple Choice Questions",
    },
  },
  "3_1": {
    id: 1,
    courseId: 3,
    moduleNumber: 1,
    title: "Project Management Fundamentals",
    totalChapters: 4,
    totalLessons: 12,
    totalQuizzes: 1,
    chapterList: [
      {
        id: 1,
        title: "Chapter 1",
        lessons: [
          { id: 1, title: "Introduction", type: "video", duration: "10:00", completed: true },
          { id: 2, title: "Lesson 1", type: "video", duration: "12:30", completed: true },
          { id: 3, title: "Lesson 2", type: "reading", completed: false, content: "PM lifecycle reading." },
          { id: 4, title: "Lesson 3", type: "chapter-review", completed: false, content: "Chapter 1 review." },
        ],
      },
      {
        id: 2,
        title: "Chapter 2",
        lessons: [
          { id: 5, title: "Lesson 4", type: "video", duration: "11:00", completed: false },
          { id: 6, title: "Lesson 5", type: "reading", completed: false, content: "Agile reading." },
          { id: 7, title: "Lesson 6", type: "chapter-review", completed: false, content: "Chapter 2 review." },
        ],
      },
      {
        id: 3,
        title: "Chapter 3",
        lessons: [
          { id: 8, title: "Lesson 7", type: "video", duration: "15:00", completed: false },
          { id: 9, title: "Lesson 8", type: "reading", completed: false, content: "Risk reading." },
          { id: 10, title: "Lesson 9", type: "chapter-review", completed: false, content: "Chapter 3 review." },
        ],
      },
      {
        id: 4,
        title: "Chapter 4",
        lessons: [
          { id: 11, title: "Lesson 10", type: "video", duration: "12:00", completed: false },
          { id: 12, title: "Lesson 11", type: "reading", completed: false, content: "Closure reading." },
          { id: 13, title: "Lesson 12", type: "chapter-review", completed: false, content: "Chapter 4 review." },
        ],
      },
    ],
    event: {
      afterChapterId: 2,
      workshopType: "Workshop:",
      name: "Agile Approaches",
    },
    finalQuiz: {
      id: 100,
      title: "Final Exam",
      description: "Multiple Choice Questions",
    },
  },
};
