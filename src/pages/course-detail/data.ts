export interface CourseModule {
  id: number;
  title: string;
  modules: number;
  lessons: number;
  quizzes: number;
}

export interface CourseDetailData {
  id: number;
  instructor: string;
  instructorColor: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  rating: number;
  members: string;
  video: {
    caption: string;
    gradientBg: string;
  };
  details: {
    subtitle: string;
    body: string;
    bullets: string[];
  };
  whatYoullLearn: string[];
  modules: CourseModule[];
}

export const COURSE_DETAILS: Record<number, CourseDetailData> = {
  1: {
    id: 1,
    instructor: "Dwoskey",
    instructorColor: "bg-pink-500",
    tag: "Cybersecurity",
    tagColor: "border-[#44BCFF] text-[#44BCFF]",
    title: "Microsoft Cybersecurity Analyst Professional Certificate",
    description:
      "Launch your career as a cybersecurity analyst. Build job-ready skills – and must-have AI skills – for an in-demand career. Earn a credential from Microsoft. No prior experience required.",
    rating: 4.8,
    members: "12,000+",
    video: {
      caption: "Introduction to Mentor - What you will learn in the course",
      gradientBg: "from-slate-700 via-slate-800 to-gray-900",
    },
    details: {
      subtitle: "Professional Certificate – 9 course series",
      body: "With this program, you can prepare for the Microsoft Cybersecurity Analyst SC-900 certification exam administered by Microsoft. Learners who complete this program will receive a 50% discount voucher to take the exam.\n\nThrough a mix of videos, assessments, and hands-on activities, you'll learn, apply, and discuss:",
      bullets: [
        "Threat mitigation strategies from an enterprise perspective",
        "Apply effective cybersecurity policy measures within an Azure environment",
        "Practice on tools like MS Defender, Azure Active Directory & more.",
      ],
    },
    whatYoullLearn: [
      "Understand the cybersecurity landscape and learn core concepts foundational to security, compliance, and identity solutions.",
      "Understand the cybersecurity landscape and learn core concepts foundational to security, compliance, and identity solutions.",
      "Understand the cybersecurity landscape and learn core concepts foundational to security, compliance, and identity solutions.",
      "Understand the cybersecurity landscape and learn core concepts foundational to security, compliance, and identity solutions.",
    ],
    modules: [
      { id: 1, title: "Introduction to Computers and Operating Systems and Security", modules: 6, lessons: 12, quizzes: 1 },
      { id: 2, title: "Introduction to Networking and Cloud Computing", modules: 5, lessons: 10, quizzes: 1 },
      { id: 3, title: "Cybersecurity Threat Landscape", modules: 7, lessons: 14, quizzes: 2 },
      { id: 4, title: "Identity and Access Management", modules: 4, lessons: 8, quizzes: 1 },
    ],
  },
  2: {
    id: 2,
    instructor: "Dwoskey",
    instructorColor: "bg-purple-500",
    tag: "Development",
    tagColor: "border-[#978CFF] text-[#978CFF]",
    title: "Google Data Analytics Professional Certificate",
    description:
      "Get professional training designed by Google and be on the fast-track to a competitively paid job. There are 483,000 U.S. job openings in data analytics.",
    rating: 4.6,
    members: "9,500+",
    video: {
      caption: "Module 1 – Data Analytics Fundamentals",
      gradientBg: "from-indigo-800 via-purple-800 to-slate-900",
    },
    details: {
      subtitle: "Professional Certificate – 8 course series",
      body: "This program includes over 180 hours of instruction and hundreds of practice-based assessments, which will help you simulate real-world data analytics scenarios.\n\nContent across 8 courses covers:",
      bullets: [
        "Foundations of data and data analytics",
        "Data cleaning and preparation techniques",
        "Visualization with Tableau and R programming",
      ],
    },
    whatYoullLearn: [
      "Gain an immersive understanding of the practices and processes used by a junior data analyst.",
      "Learn key analytical skills such as data cleaning, analysis, and visualization.",
      "Gain an understanding of how to use tools and platforms including spreadsheets, SQL, and R.",
      "Learn how to prepare for the Google Data Analytics Certificate exam.",
    ],
    modules: [
      { id: 1, title: "Foundations: Data, Data, Everywhere", modules: 5, lessons: 10, quizzes: 1 },
      { id: 2, title: "Ask Questions to Make Data-Driven Decisions", modules: 4, lessons: 9, quizzes: 1 },
      { id: 3, title: "Prepare Data for Exploration", modules: 6, lessons: 12, quizzes: 2 },
      { id: 4, title: "Process Data from Dirty to Clean", modules: 5, lessons: 11, quizzes: 1 },
    ],
  },
  3: {
    id: 3,
    instructor: "Dwoskey",
    instructorColor: "bg-orange-500",
    tag: "Design",
    tagColor: "border-[#FF7E94] text-[#FF7E94]",
    title: "Google UX Design Professional Certificate",
    description:
      "Prepare for a career in the high-growth field of UX design, no experience or degree required. Get professional training designed by Google.",
    rating: 4.7,
    members: "15,000+",
    video: {
      caption: "Introduction to UX Design Principles",
      gradientBg: "from-rose-800 via-pink-800 to-slate-900",
    },
    details: {
      subtitle: "Professional Certificate – 7 course series",
      body: "This program will equip you with the most in-demand UX skills to get job-ready in less than 6 months.\n\nYou'll build a professional portfolio through hands-on projects that include:",
      bullets: [
        "Conducting UX research and usability studies",
        "Building wireframes and prototypes in Figma",
        "Designing apps and websites using UX design principles",
      ],
    },
    whatYoullLearn: [
      "Follow the design process: empathize, define, ideate, prototype, and test.",
      "Understand the basics of UX research, like planning research studies.",
      "Apply foundational UX concepts like user-centered design, accessibility, and equity.",
      "Create a professional UX portfolio featuring three end-to-end projects.",
    ],
    modules: [
      { id: 1, title: "Foundations of User Experience (UX) Design", modules: 6, lessons: 12, quizzes: 1 },
      { id: 2, title: "Start the UX Design Process: Empathize, Define, and Ideate", modules: 5, lessons: 10, quizzes: 1 },
      { id: 3, title: "Build Wireframes and Low-Fidelity Prototypes", modules: 7, lessons: 14, quizzes: 2 },
      { id: 4, title: "Conduct UX Research and Test Early Concepts", modules: 4, lessons: 8, quizzes: 1 },
    ],
  },
};
