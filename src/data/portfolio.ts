import defaultProfilePlaceholder from "../assets/images/anuvab-profile.png";

export interface SkillItem {
  name: string;
  learning?: boolean;
}

export interface SkillCategory {
  id: 'programming' | 'core-cs' | 'tools' | 'cloud';
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export interface ProjectItem {
  id: 'diu-campus-navigation' | 'student-result-management';
  title: string;
  language: string;
  environment: string;
  summary: string;
  technicalImplementation: string[];
  features: string[];
  githubUrl: string;
  githubPlaceholderNote: string;
}

export interface JourneyStage {
  step: string;
  title: string;
  description: string;
  items: string[];
}

export const PORTFOLIO_PROFILE = {
  name: 'Anuvab',
  headline: 'Aspiring Cloud Engineer | CSE Student | Developer',
  university: 'Daffodil International University (DIU), Bangladesh',
  department: 'Computer Science and Engineering (CSE)',
  heroIntro:
    'I am a Computer Science and Engineering student building foundational skills in C, Java, Python, data structures, and algorithms while preparing for a career in Cloud Engineering and distributed systems.',
  placeholderImage: defaultProfilePlaceholder,
  recommendedAssetPath: 'src/assets/images/anuvab-profile.jpg',
  aboutParagraphs: [
    'I am a Computer Science and Engineering student at Daffodil International University. I enjoy building software projects, exploring programming concepts, and understanding how systems work.',
    'I am particularly interested in Cloud Engineering, Networking, and Infrastructure. I want to develop practical technical skills and gradually build the knowledge required to work with real-world cloud systems.',
  ],
  contact: {
    email: 'anuvabbhadra2005@gmail.com',
    emailIsPlaceholder: true,
    githubUrl: 'https://github.com/anuvab-001',
    githubLabel: 'github.com/anuvab-001',
    linkedinUrl: 'https://www.linkedin.com/in/your-linkedin-profile',
    linkedinLabel: 'linkedin.com/in/your-linkedin-profile',
    linkedinIsPlaceholder: true,
  },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    subtitle: 'Core languages used for coursework and console applications',
    items: [
      { name: 'C' },
      { name: 'Java' },
      { name: 'Python', learning: true },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core Computer Science',
    subtitle: 'Foundational problem solving and algorithmic structures',
    items: [
      { name: 'Object-Oriented Programming' },
      { name: 'Data Structures' },
      { name: 'Algorithms' },
      { name: 'Graph Theory' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools and Technologies',
    subtitle: 'Version control and web fundamentals',
    items: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud and Infrastructure (Learning)',
    subtitle: 'Active study areas toward cloud systems engineering',
    items: [
      { name: 'Linux', learning: true },
      { name: 'Networking Fundamentals', learning: true },
      { name: 'Cloud Computing Fundamentals', learning: true },
      { name: 'Cloud Infrastructure Concepts', learning: true },
    ],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'diu-campus-navigation',
    title: 'DIU Campus Navigation System',
    language: 'C',
    environment: 'Console Application',
    summary:
      'A console-based campus navigation application that calculates the shortest walking route between different locations on the Daffodil International University campus.',
    technicalImplementation: [
      'Weighted undirected graph',
      'Adjacency list representation',
      "Dijkstra's shortest path algorithm",
      'Binary Min Heap',
      'Dynamic memory allocation',
    ],
    features: [
      'View available campus locations',
      'Explore direct walking connections',
      'Select source and destination',
      'Calculate the shortest route',
      'Display estimated walking distance and time',
    ],
    githubUrl: 'https://github.com/anuvab-001/diu-campus-navigation',
    githubPlaceholderNote: 'Replace with final repository URL in src/data/portfolio.ts',
  },
  {
    id: 'student-result-management',
    title: 'Student Result Record Management System',
    language: 'C',
    environment: 'Console Application',
    summary:
      'A student result management application that manages student records, calculates grades and CGPA, and provides searching and ranking functionality.',
    technicalImplementation: [
      'Structures',
      'Max Heap',
      'Binary Search Tree',
      'Hash Table with separate chaining',
      'Linked Lists',
      'Bubble Sort',
    ],
    features: [
      'Add student records',
      'Search students by ID',
      'Calculate CGPA and grades',
      'Identify the top-performing student',
      'Display student rankings',
      'Display records in sorted order',
    ],
    githubUrl: 'https://github.com/anuvab-001/student-result-management-system',
    githubPlaceholderNote: 'Replace with final repository URL in src/data/portfolio.ts',
  },
];

export const CLOUD_JOURNEY_INTRO =
  'I am developing my knowledge of cloud computing, networking, Linux, and automation. My goal is to understand how modern infrastructure works and how applications are deployed, managed, and scaled in real-world environments.';

export const CLOUD_JOURNEY_STAGES: JourneyStage[] = [
  {
    step: '01',
    title: 'Currently Learning',
    description: 'Building daily fluency in operating systems, scripting, and networking basics.',
    items: [
      'Python',
      'Linux Fundamentals',
      'Networking',
      'Git and GitHub',
      'Cloud Computing Fundamentals',
    ],
  },
  {
    step: '02',
    title: 'Areas of Interest',
    description: 'Exploring the core building blocks behind scalable infrastructure.',
    items: [
      'Cloud Infrastructure',
      'Cloud Networking',
      'Virtualization',
      'Infrastructure Automation',
      'Distributed Systems',
    ],
  },
  {
    step: '03',
    title: 'Future Goals',
    description: 'Long-term milestones as I transition from academic foundations to production systems.',
    items: [
      'Learn AWS or Microsoft Azure',
      'Develop practical cloud projects',
      'Understand deployment and infrastructure management',
      'Build real-world cloud engineering experience',
    ],
  },
];
