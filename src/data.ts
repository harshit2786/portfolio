// ============================================================
// PORTFOLIO DATA — Harshit Kumar Singh
// ============================================================

export const PORTFOLIO = {
  name: "HARSHIT KUMAR SINGH",
  nameJP: "ハーシット・クマール・シン",
  role: "FULL STACK DEVELOPER & AI ENGINEER",
  roleJP: "フルスタック開発者・AIエンジニア",
  tagline: "Building AI-powered systems at the intersection of performance and intelligence.",
  taglineJP: "パフォーマンスと知性の交差点でAIシステムを構築する。",

  email: "harshit.2002.singh@gmail.com",
  github: "https://github.com/harshit2786",
  linkedin: "https://www.linkedin.com/in/harshit-kumar-singh-58b0b023a/",
  twitter: "https://twitter.com/harshit2786",
  resumeLink: "https://drive.google.com/file/d/1fr0e9bDRlO009PvDjva5OGDxAgqUduab/view?usp=drive_link",

  bio: {
    en: "IIT Kanpur graduate and full-stack architect. I build AI-driven platforms and high-performance systems — from LLM-powered enterprise tools to low-latency Rust engines. Currently engineering at Nanoheal, leading AI product development and system architecture. JLPT N5 certified.",
    jp: "IITカンプール卒業生のフルスタックアーキテクト。LLM駆動のエンタープライズツールからRustの低レイテンシエンジンまで、AIプラットフォームと高性能システムを構築。現在はNanohealでAI製品開発をリード中。JLPT N5取得済み。",
  },

  stats: [
    { value: "6+",  label: "Projects",     labelJP: "プロジェクト" },
    { value: "2+",  label: "Years Exp.",   labelJP: "経験年数" },
    { value: "30+", label: "Technologies", labelJP: "技術スタック" },
  ],

  experience: [
    {
      id: 1,
      company: "NANOHEAL",
      companyFull: "Nanoheal",
      role: "Software Development Engineer I",
      roleJP: "ソフトウェア開発エンジニアI",
      duration: "MAY 2024 — PRESENT",
      durationJP: "2024年5月 — 現在",
      location: "Full-time // フルタイム",
      description: {
        en: "Promoted from Junior Dev to SDE-I in April 2025. Designed AI-driven web apps and enterprise LLM integrations. Led a team of 3 engineers across design, code reviews, and feature delivery. Built full-stack solutions with React.js, Node.js, Strapi, WebSockets, PostgreSQL, and AWS.",
        jp: "2025年4月にジュニア開発者からSDE-Iへ昇格。AI駆動のWebアプリとエンタープライズLLM統合を設計。3人のエンジニアチームをリード。React.js、Node.js、Strapi、WebSockets、PostgreSQL、AWSを使用したフルスタックソリューションを構築。",
      },
      tags: ["React.js", "Node.js", "Strapi", "PostgreSQL", "AWS", "WebSockets", "LLM"],
      color: "#ff2d6b",
    },
    {
      id: 2,
      company: "OUTLIER_AI",
      companyFull: "Outlier AI (Scale AI)",
      role: "Freelance AI Coding Specialist",
      roleJP: "フリーランスAIコーディングスペシャリスト",
      duration: "NOV 2025 — PRESENT",
      durationJP: "2025年11月 — 現在",
      location: "Remote // リモート",
      description: {
        en: "Contributing to RLHF pipelines by crafting complex failure-inducing prompts and validating model weaknesses. Evaluating AI-generated code, developing golden solutions, and engineering training data across full-stack, data analysis, and generalist domains.",
        jp: "RLHFパイプラインに貢献し、複雑なプロンプトを作成してモデルの弱点を検証。AIコードを評価し、ゴールデンソリューションを開発。フルスタック、データ分析など多様なドメインのトレーニングデータを構築。",
      },
      tags: ["RLHF", "Prompt Engineering", "Full-Stack", "Data Analysis", "LLM Evaluation"],
      color: "#00e5ff",
    },
    {
      id: 3,
      company: "VIVAHIT",
      companyFull: "VivaHIT",
      role: "Full Stack Web Developer Intern",
      roleJP: "フルスタックWebデベロッパーインターン",
      duration: "MAY 2023 — JULY 2023",
      durationJP: "2023年5月 — 2023年7月",
      location: "Internship // インターンシップ",
      description: {
        en: "Built responsive web applications using Next.js, Tailwind CSS, and TypeScript. Integrated Firebase (Firestore, Auth, Cloud Functions) for secure backend and data management. Collaborated in agile sprints with daily standups.",
        jp: "Next.js、Tailwind CSS、TypeScriptでレスポンシブWebアプリを開発。Firebase（Firestore、認証、Cloud Functions）を統合。アジャイルスプリントで協力。",
      },
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Git"],
      color: "#bd93f9",
    },
  ],

  projects: [
    {
      id: "skillbridge",
      title: "SKILLBRIDGE",
      titleJP: "スキルブリッジ",
      category: "WEB",
      description: {
        en: "Full-stack LMS with role-based access, course creation, quizzes, and Zoom webinars. Features an AI Playground using RAG over PDFs, async BullMQ/Redis pipeline, and Docker deployment on Railway.",
        jp: "ロールベースアクセス、コース作成、クイズ、Zoom統合を備えたフルスタックLMS。PDFへのRAGを使ったAIプレイグラウンド、BullMQ/Redisパイプラインを実装。",
      },
      tags: ["React", "TypeScript", "Express", "Prisma", "RAG", "BullMQ", "Redis", "Docker"],
      github: "https://github.com/harshit2786/skillbridge-fe",
      demo: null,
      live: "https://skillbridge-ja.netlify.app/",
      color: "#ff2d6b",
      gradient: "linear-gradient(135deg, #1a0a12, #2d0015)",
    },
    {
      id: "order-engine",
      title: "ORDER_ENGINE",
      titleJP: "オーダーエンジン",
      category: "SYSTEMS",
      description: {
        en: "Low-latency order matching engine in Rust (Axum + Tokio). Price-time priority matching with O(log n) insertions via BTreeMap. Prometheus metrics, thread-safe concurrency with RwLock, and full test coverage.",
        jp: "Rust（Axum + Tokio）で構築した低レイテンシの注文マッチングエンジン。BTreeMapによるO(log n)挿入、Prometheusメトリクス、RwLockによるスレッドセーフな並行性。",
      },
      tags: ["Rust", "Axum", "Tokio", "Prometheus", "BTreeMap", "REST API"],
      github: "https://github.com/harshit2786/order_engine",
      demo: null,
      live: null,
      color: "#00e5ff",
      gradient: "linear-gradient(135deg, #001820, #002d40)",
    },
    {
      id: "sam2-colorization",
      title: "SAM2_COLORIZE",
      titleJP: "SAM2カラー化",
      category: "AI",
      description: {
        en: "Interactive building colorization platform using Meta's SAM2 model. Point-and-click mask selection with React + canvas UI, FastAPI backend on GPU-accelerated Beam.cloud, CI/CD to Netlify.",
        jp: "Meta SAM2モデルを使用したインタラクティブな建物彩色プラットフォーム。React+キャンバスUIでポイントアンドクリックマスク選択、FastAPIバックエンドはBeam.cloudのGPU上で稼働。",
      },
      tags: ["SAM2", "React", "FastAPI", "Python", "Beam.cloud", "Canvas API"],
      github: "https://github.com/harshit2786/indieverse-be",
      demo: "https://vimeo.com/1107018147",
      live: null,
      color: "#bd93f9",
      gradient: "linear-gradient(135deg, #0f0a20, #1a0f35)",
    },
    {
      id: "pdfchat",
      title: "PDF_CHAT",
      titleJP: "PDFチャット",
      category: "AI",
      description: {
        en: "Folder-based contextual PDF chat with streaming responses. LangChain + Qdrant for vector embeddings with metadata filtering. Node.js WebSocket server streams OpenAI responses in real time.",
        jp: "フォルダベースのコンテキストPDFチャット。LangChain + Qdrantのベクター埋め込み、Node.js WebSocketサーバーでOpenAIのレスポンスをリアルタイムストリーミング。",
      },
      tags: ["LangChain", "Qdrant", "OpenAI", "WebSocket", "Node.js", "React"],
      github: "https://github.com/harshit2786/pdf-chat-fe",
      demo: "https://vimeo.com/1098860232",
      live: null,
      color: "#ffd700",
      gradient: "linear-gradient(135deg, #1a1400, #2d2200)",
    },
    {
      id: "tunestream",
      title: "TUNESTREAM",
      titleJP: "チューンストリーム",
      category: "WEB",
      description: {
        en: "Collaborative real-time music queuing for parties. Users create music spaces, add songs, and vote on tracks. FastAPI WebSocket server drives live upvote/downvote updates. Auth via NextAuth.js.",
        jp: "パーティー向けリアルタイム共同音楽キューイングアプリ。ユーザーが音楽スペースを作成し、曲を追加して投票。FastAPI WebSocketサーバーがリアルタイム更新を処理。",
      },
      tags: ["Next.js", "PostgreSQL", "Prisma", "NextAuth.js", "FastAPI", "WebSocket", "Recoil"],
      github: "https://github.com/harshit2786/tunestream",
      demo: null,
      live: null,
      color: "#f97316",
      gradient: "linear-gradient(135deg, #1a0e00, #2d1800)",
    },
    {
      id: "quizly",
      title: "QUIZLY",
      titleJP: "クイズリー",
      category: "MOBILE",
      description: {
        en: "Cross-platform mobile quiz app built with React Native. Generates topic-specific quizzes via a FastAPI + OpenAI backend. Features real-time progress tracking, local quiz history, and answer animations.",
        jp: "React Nativeで構築したクロスプラットフォームのモバイルクイズアプリ。FastAPI + OpenAIバックエンドでトピック別クイズを生成。リアルタイム進捗追跡とローカル履歴保存機能付き。",
      },
      tags: ["React Native", "FastAPI", "OpenAI", "Python", "Local Storage"],
      github: "https://github.com/harshit2786/Quizly-RN",
      demo: null,
      live: null,
      color: "#a78bfa",
      gradient: "linear-gradient(135deg, #0f0820, #180d35)",
    },
  ],

  techStack: {
    frontend: [
      { name: "React.js",       color: "#61dafb", logo: "React.svg" },
      { name: "TypeScript",     color: "#3178c6", logo: "TypeScript.svg" },
      { name: "Next.js",        color: "#e2e8f0", logo: "Next.js.svg" },
      { name: "React Native",   color: "#61dafb", logo: "React.svg" },
      { name: "TailwindCSS",    color: "#38bdf8", logo: "Tailwind CSS.svg" },
      { name: "Redux / Recoil", color: "#764abc", logo: "Redux.svg" },
    ],
    backend: [
      { name: "Node.js",    color: "#68a063", logo: "Node.js.svg" },
      { name: "Express",    color: "#888888", logo: "Express.svg" },
      { name: "FastAPI",    color: "#009688", logo: "FastAPI.svg" },
      { name: "Rust (Axum)",color: "#dea584", logo: "Rust.svg" },
      { name: "Go",         color: "#00add8", logo: "Go.svg" },
      { name: "Strapi",     color: "#8c4bff", logo: "Strapi.png" },
    ],
    database: [
      { name: "PostgreSQL", color: "#336791", logo: "PostgresSQL.svg" },
      { name: "MongoDB",    color: "#4db33d", logo: "MongoDB.svg" },
      { name: "Redis",      color: "#dc382d", logo: "Redis.svg" },
      { name: "Prisma ORM", color: "#5a67d8", logo: "Prisma.svg" },
      { name: "Qdrant",     color: "#ff3d00", logo: "Qdrant.svg" },
      { name: "MySQL",      color: "#f29111", logo: "MySQL.svg" },
    ],
    tools: [
      { name: "Docker",        color: "#2496ed", logo: "Docker.svg" },
      { name: "AWS",           color: "#ff9900", logo: "AWS.svg" },
      { name: "Google Cloud",  color: "#4285f4", logo: "Google Cloud.svg" },
      { name: "LangChain",     color: "#4db6ac", logo: "Langchain.svg" },
      { name: "Kafka",         color: "#e0e0e0", logo: "Kafka.svg" },
      { name: "Kubernetes",    color: "#326ce5", logo: "Kubernetes.svg" },
      { name: "Prometheus",    color: "#e6522c", logo: "Prometheus.svg" },
      { name: "Grafana",       color: "#f46800", logo: "Grafana.svg" },
      { name: "GitHub",        color: "#e2e8f0", logo: "GitHub.svg" },
      { name: "Bun",           color: "#fbf0df", logo: "Bun.svg" },
      { name: "Vitest",        color: "#6e9f18", logo: "Vitest.svg" },
    ],
  },

  socials: [
    { label: "GitHub",   labelJP: "ギットハブ",   href: "https://github.com/harshit2786",                                    icon: "github" },
    { label: "LinkedIn", labelJP: "リンクトイン", href: "https://www.linkedin.com/in/harshit-kumar-singh-58b0b023a/",        icon: "linkedin" },
    { label: "Email",    labelJP: "メール",       href: "mailto:harshit.2002.singh@gmail.com",                               icon: "mail" },
  ],

  achievements: [
    { en: "JEE Advanced 2020 — AIR 2786 among 160,000+ participants",       jp: "JEE Advanced 2020 — 160,000人中全国2786位" },
    { en: "JLPT N5 Certified — Japanese Language Proficiency Test",          jp: "JLPT N5取得 — 日本語能力試験合格" },
    { en: "Certificate of Excellence — Coding Ninjas C++ & DSA",             jp: "Coding Ninjas C++ & DSAの優秀証明書取得" },
  ],
} as const;

export const TRANSLATIONS = {
  en: {
    nav: { about: "About", exp: "Experience", projects: "Projects", stack: "Stack", contact: "Contact" },
    hero: {
      status: "SYSTEM_STATUS: ONLINE",
      scroll: "SCROLL TO EXPLORE",
      scrollJP: "スクロールして探索する",
      cta1: "VIEW PROJECTS",
      cta2: "DOWNLOAD RESUME",
    },
    about: {
      tag: "PROTOCOL // ORIGIN",
      title: "ABOUT",
      titleSub: "概要",
      download: "DOWNLOAD_RESUME.PDF",
    },
    experience: {
      tag: "DATA // LOGS",
      title: "EXPERIENCE",
      titleSub: "経験",
    },
    projects: {
      tag: "MISSION // LOGS",
      title: "PROJECTS",
      titleSub: "プロジェクト",
      all: "ALL", web: "WEB", ai: "AI",
    },
    stack: {
      tag: "HARDWARE // INTERFACE",
      title: "TECH STACK",
      titleSub: "技術スタック",
      frontend: "Frontend", backend: "Backend", database: "Database", tools: "Tools & AI",
    },
    contact: {
      tag: "READY_TO_CONNECT?",
      title: "CONTACT",
      titleSub: "連絡",
      sub: "The network is open for collaboration on high-impact digital ventures.",
    },
    footer: {
      copy: "HARSHIT KUMAR SINGH",
      made: "FORGED WITH",
      in: "IN TOKYO TIME",
    },
  },
  jp: {
    nav: { about: "概要", exp: "経験", projects: "作品集", stack: "技術", contact: "連絡" },
    hero: {
      status: "システム状態：オンライン",
      scroll: "スクロールして探索する",
      scrollJP: "SCROLL TO EXPLORE",
      cta1: "作品を見る",
      cta2: "履歴書をダウンロード",
    },
    about: {
      tag: "プロトコル // 起源",
      title: "概要",
      titleSub: "ABOUT",
      download: "履歴書_ダウンロード.PDF",
    },
    experience: {
      tag: "データ // ログ",
      title: "経験",
      titleSub: "EXPERIENCE",
    },
    projects: {
      tag: "ミッション // ログ",
      title: "プロジェクト",
      titleSub: "PROJECTS",
      all: "全て", web: "ウェブ", ai: "AI",
    },
    stack: {
      tag: "ハードウェア // インターフェース",
      title: "技術スタック",
      titleSub: "TECH STACK",
      frontend: "フロントエンド", backend: "バックエンド", database: "データベース", tools: "ツール・AI",
    },
    contact: {
      tag: "接続準備完了？",
      title: "連絡",
      titleSub: "CONTACT",
      sub: "インパクトのあるデジタルベンチャーでのコラボレーションを歓迎します。",
    },
    footer: {
      copy: "ハーシット・クマール・シン",
      made: "で作られた",
      in: "東京時間",
    },
  },
} as const;

export type Lang = keyof typeof TRANSLATIONS;
export type Theme = "dark" | "light";
