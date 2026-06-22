import { MarketIntelligence, SkillCategory } from "../types";

export const CATEGORIES: SkillCategory[] = [
  'AI & Machine Learning',
  'Software Development',
  'Cloud Computing',
  'Cybersecurity',
  'Data Engineering',
  'DevOps',
  'Mobile Development',
  'Product Management'
];

export const PRELOADED_ANALYTICS: Record<SkillCategory, MarketIntelligence> = {
  'AI & Machine Learning': {
    skillName: 'AI & Machine Learning',
    demandScore: 96,
    growthRate: '+68%',
    openingsCount: '12,400+',
    salaryRange: '₹18–38 LPA',
    roleInDemand: 'AI Specialist / Researcher',
    trendGraphData: [
      { year: "2022", demand: 42 },
      { year: "2023", demand: 61 },
      { year: "2024", demand: 78 },
      { year: "2025", demand: 90 },
      { year: "2026", demand: 96 }
    ],
    topRoleProfiles: [
      { name: "NLP Specialist", salary: "₹16–35 LPA", share: 50 },
      { name: "MLOps Architect", salary: "₹24–42 LPA", share: 30 },
      { name: "AI Engineer", salary: "₹18–35 LPA", share: 20 }
    ],
    futureDemandInsight: "Generative AI and Agentic networks are rewriting technology roadmaps in Tier-1 Indian tech cities. Bengaluru hosts over 40% of these roles, backed by massive funding rounds. The upcoming year expects an increased shift from prompt-based integrations to deep model fine-tuning and stateful AI agent development.",
    keyPrerequisites: ["PyTorch & JAX", "Hugging Face Models", "Vector Databases (Pinecone/Milvus)", "LangChain & Agent Frameworks"]
  },
  'Software Development': {
    skillName: 'Software Development',
    demandScore: 88,
    growthRate: '+28%',
    openingsCount: '24,500+',
    salaryRange: '₹8–20 LPA',
    roleInDemand: 'Full Stack Engineer',
    trendGraphData: [
      { year: "2022", demand: 72 },
      { year: "2023", demand: 78 },
      { year: "2024", demand: 83 },
      { year: "2025", demand: 86 },
      { year: "2026", demand: 88 }
    ],
    topRoleProfiles: [
      { name: "Senior Frontend Lead", salary: "₹15–28 LPA", share: 40 },
      { name: "React App Developer", salary: "₹10–18 LPA", share: 35 },
      { name: "Fullstack Architect", salary: "₹20–38 LPA", share: 25 }
    ],
    futureDemandInsight: "Modern browser-centric and state-intensive application development has led to solid, stable hiring across mid-sized startups and large enterprise products. Knowledge of modular micro-frontends, server-side rendering patterns, and lightweight UI packages yields the highest salary outcomes.",
    keyPrerequisites: ["TypeScript & ESNext", "React Node Engineering", "Modern CSS (Tailwind)", "State Management Engine"]
  },
  'Cloud Computing': {
    skillName: 'Cloud Computing',
    demandScore: 91,
    growthRate: '+35%',
    openingsCount: '16,200+',
    salaryRange: '₹12–26 LPA',
    roleInDemand: 'Cloud Solutions Architect',
    trendGraphData: [
      { year: "2022", demand: 54 },
      { year: "2023", demand: 67 },
      { year: "2024", demand: 76 },
      { year: "2025", demand: 84 },
      { year: "2026", demand: 91 }
    ],
    topRoleProfiles: [
      { name: "AWS Architect", salary: "₹14–28 LPA", share: 45 },
      { name: "Site Reliability Specialist", salary: "₹16–32 LPA", share: 35 },
      { name: "Azure Systems Engineer", salary: "₹9–17 LPA", share: 20 }
    ],
    futureDemandInsight: "Enterprise digital transformation and the Indian government's sovereign cloud initiatives have spawned major jobs in Pune and Hyderabad. Businesses are transitioning to serverless frameworks and multi-cloud security architectures, looking for engineers who can aggressively reduce monthly infrastructure runrates.",
    keyPrerequisites: ["Amazon Web Services", "Kubernetes Engine", "Terraform IaC", "Cloud Security Protocols"]
  },
  'Cybersecurity': {
    skillName: 'Cybersecurity',
    demandScore: 89,
    growthRate: '+42%',
    openingsCount: '8,700+',
    salaryRange: '₹14–30 LPA',
    roleInDemand: 'Security Architect',
    trendGraphData: [
      { year: "2022", demand: 45 },
      { year: "2023", demand: 56 },
      { year: "2024", demand: 68 },
      { year: "2025", demand: 79 },
      { year: "2026", demand: 89 }
    ],
    topRoleProfiles: [
      { name: "CISO / Security Director", salary: "₹28–55 LPA", share: 25 },
      { name: "Penetration Tester", salary: "₹10–22 LPA", share: 45 },
      { name: "SecOps Specialist", salary: "₹14–26 LPA", share: 30 }
    ],
    futureDemandInsight: "With banking, financial services, and insurance (BFSI) centers expanding operations rapidly in Mumbai and GIFT City, cybersecurity hiring has seen continuous double-digit growth. Zero-trust compliance and incident prevention are critical focuses as cyber-threat complexities reach an all-time high.",
    keyPrerequisites: ["Ethical Hacking (OSCP)", "SIEM Systems", "Zero Trust Architecture", "ISO 27001 Cryptography"]
  },
  'Data Engineering': {
    skillName: 'Data Engineering',
    demandScore: 93,
    growthRate: '+52%',
    openingsCount: '15,400+',
    salaryRange: '₹14–32 LPA',
    roleInDemand: 'Data Infrastructure Engineer',
    trendGraphData: [
      { year: "2022", demand: 48 },
      { year: "2023", demand: 62 },
      { year: "2024", demand: 74 },
      { year: "2025", demand: 85 },
      { year: "2026", demand: 93 }
    ],
    topRoleProfiles: [
      { name: "Databricks Engineer", salary: "₹22–45 LPA", share: 35 },
      { name: "Data Pipeline Specialist", salary: "₹12–24 LPA", share: 40 },
      { name: "Analytics Wrangler", salary: "₹10–18 LPA", share: 25 }
    ],
    futureDemandInsight: "The explosion of big data ingestion to feed AI models has created a critical bottleneck for data plumbing. Engineers who can optimize multi-terabyte data pipelines and maintain reliable real-time stream processing represent the hotbed of current hiring in Noida and Bengaluru global centers.",
    keyPrerequisites: ["Apache Spark & Kafka", "Snowflake & Databricks", "Python Pipeline Orchestration", "dbt Data Modeling"]
  },
  'DevOps': {
    skillName: 'DevOps',
    demandScore: 92,
    growthRate: '+40%',
    openingsCount: '11,800+',
    salaryRange: '₹13–28 LPA',
    roleInDemand: 'Platform SRE Director',
    trendGraphData: [
      { year: "2022", demand: 52 },
      { year: "2023", demand: 65 },
      { year: "2024", demand: 78 },
      { year: "2025", demand: 85 },
      { year: "2026", demand: 92 }
    ],
    topRoleProfiles: [
      { name: "Platform Engineer", salary: "₹16–34 LPA", share: 40 },
      { name: "GitLab CI Lead", salary: "₹10–20 LPA", share: 35 },
      { name: "Infrastructure Architect", salary: "₹22–40 LPA", share: 25 }
    ],
    futureDemandInsight: "Automation is the key driver of engineering resource efficiency in Indian IT hubs. Companies are actively migrating internal software to containerized, auto-scaling instances. Deep competence in Infrastructure-as-Code and CI/CD pipelines guarantees the highest level of career mobility today.",
    keyPrerequisites: ["Docker & Kubernetes", "Terraform & Ansible", "GitHub Actions / GitLab CI", "Prometheus & Grafana Systems"]
  },
  'Mobile Development': {
    skillName: 'Mobile Development',
    demandScore: 84,
    growthRate: '+24%',
    openingsCount: '9,300+',
    salaryRange: '₹9–21 LPA',
    roleInDemand: 'Swift/Kotlin Developer',
    trendGraphData: [
      { year: "2022", demand: 65 },
      { year: "2023", demand: 71 },
      { year: "2024", demand: 76 },
      { year: "2025", demand: 80 },
      { year: "2026", demand: 84 }
    ],
    topRoleProfiles: [
      { name: "iOS Core Lead", salary: "₹12–25 LPA", share: 35 },
      { name: "Android Kotlin Engineer", salary: "₹10–20 LPA", share: 40 },
      { name: "Cross-Platform dev", salary: "₹8–16 LPA", share: 25 }
    ],
    futureDemandInsight: "The Indian digital consumer economy is native-mobile first. With ultra-low telecom rates, fintech and social-commerce consumer apps in India are onboarding millions daily. Teams are scaling mobile product performance, focusing on offline-first usability and complex local asset caching.",
    keyPrerequisites: ["Swift / Kotlin Core", "React Native & Flutter", "RESTful Websockets", "Google Play / App Store CI"]
  },
  'Product Management': {
    skillName: 'Product Management',
    demandScore: 86,
    growthRate: '+26%',
    openingsCount: '6,500+',
    salaryRange: '₹15–35 LPA',
    roleInDemand: 'Technical Product Manager',
    trendGraphData: [
      { year: "2022", demand: 59 },
      { year: "2023", demand: 68 },
      { year: "2024", demand: 75 },
      { year: "2025", demand: 81 },
      { year: "2026", demand: 86 }
    ],
    topRoleProfiles: [
      { name: "B2B SaaS PM Lead", salary: "₹22–42 LPA", share: 40 },
      { name: "Growth Optimization Guru", salary: "₹12–25 LPA", share: 35 },
      { name: "APM Strategist", salary: "₹8–15 LPA", share: 25 }
    ],
    futureDemandInsight: "As Indian software service giants transition to build high-margin IP products, and startup unicorns prioritize unit economics, the demand for high-caliber Product Managers is spiking. PMs who can bridge complex tech (specifically AI/ML capability) with clean business goals lead recruitment lists.",
    keyPrerequisites: ["Product Backlog Agile", "Amplitude Analytics", "User Journey Demography", "Technical API translation"]
  }
};
