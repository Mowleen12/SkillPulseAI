import express from "express";
import path from "path";
import dns from "dns";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Ensure localhost/resolving does not slow down
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Analyze market data for a given skill or domain
app.post("/api/analyze", async (req: express.Request, res: express.Response): Promise<void> => {
  const { query, categories } = req.body;
  const targetQuery = query?.trim() || (categories && categories.length > 0 ? categories.join(", ") : "AI & Machine Learning");

  // Check for Gemini API key
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Graceful fallback to rich simulated data based on user keypress
    console.log(`[SkillPulse AI Server] No GEMINI_API_KEY found or using placeholder. Generating visual simulated data for '${targetQuery}'.`);
    const mockData = generateSimulatedMarketData(targetQuery);
    res.json(mockData);
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `Analyze the current tech market demand, job roles, salary insights, and future technology demand in the Indian technology ecosystem (with major tech hubs like Bengaluru, Hyderabad, Pune, Gurugram, etc.) specifically for the skill/domain: "${targetQuery}".
Return factual estimates, current trends, and forward-looking predictions. Ensure data corresponds to the Indian job market, using lakhs per annum (LPA) in Rupee (₹) values for salaries (e.g. ₹12–25 LPA or ₹18–35 LPA).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite recruitment analyst and technology demographer specializing in the Indian tech market. Return highly structured market intelligence. Always output strictly raw, valid JSON conforming to the requested schema. Do not wrap in markdown blocks, do not include any explanatory prefix or suffix.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skillName: { type: Type.STRING, description: "Name of the skill or domain searched" },
            demandScore: { type: Type.NUMBER, description: "Current demand score from 1 to 100 based on job postings volume" },
            growthRate: { type: Type.STRING, description: "Year-over-year growth rate percentage with a plus sign, e.g. '+48%'" },
            openingsCount: { type: Type.STRING, description: "Estimate of active job openings in India for this tech, e.g., '14,200+'" },
            salaryRange: { type: Type.STRING, description: "Average salary range in India using Lakhs Per Annum (LPA), e.g. '₹12–28 LPA'" },
            roleInDemand: { type: Type.STRING, description: "Highest in-demand job role associated with this skill" },
            trendGraphData: {
              type: Type.ARRAY,
              description: "5-year demand progression (2022 to 2026)",
              items: {
                type: Type.OBJECT,
                properties: {
                  year: { type: Type.STRING },
                  demand: { type: Type.NUMBER, description: "Demand metric on a scale of 0 to 100" }
                },
                required: ["year", "demand"]
              }
            },
            topRoleProfiles: {
              type: Type.ARRAY,
              description: "Top 3 Job Profiles with average Indian salary and percentage job share",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Job profile title" },
                  salary: { type: Type.STRING, description: "Avg salary in LPA, e.g. '₹15–30 LPA'" },
                  share: { type: Type.NUMBER, description: "Percentage share of postings, sum of all 3 should be roughly 100%" }
                },
                required: ["name", "salary", "share"]
              }
            },
            futureDemandInsight: { type: Type.STRING, description: "Short forward-looking paragraph specifically predicting 12-month demand shifts, tech-hub focus, and industry adoption in India" },
            keyPrerequisites: {
              type: Type.ARRAY,
              description: "Top 4 required secondary skills or related libraries/tools to pair with this",
              items: { type: Type.STRING }
            }
          },
          required: [
            "skillName", "demandScore", "growthRate", "openingsCount", 
            "salaryRange", "roleInDemand", "trendGraphData", 
            "topRoleProfiles", "futureDemandInsight", "keyPrerequisites"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text from Gemini API");
    }

    const data = JSON.parse(text.trim());
    res.json(data);
  } catch (err: any) {
    console.error("[SkillPulse AI Server] Gemini error:", err.message);
    // Fallback to high-quality procedural generation if API fails
    const mockData = generateSimulatedMarketData(targetQuery);
    res.json({
      ...mockData,
      _isFallback: true,
      _errorMessage: err.message
    });
  }
});

// Procedural rich-mock generator for stunning client side interactive previews
function generateSimulatedMarketData(skill: string) {
  // Clean first
  const queryClean = skill.trim();

  // Baseline data generator
  const lcc = queryClean.toLowerCase();
  let score = 75 + Math.floor(Math.random() * 20);
  let growth = `+${20 + Math.floor(Math.random() * 50)}%`;
  let openings = `${1500 + Math.floor(Math.random() * 15000)}+`;
  let salary = "₹10–24 LPA";
  let topRole = "Senior Architect";
  let profiles = [
    { name: "Senior Developer", salary: "₹18–32 LPA", share: 45 },
    { name: "Core Engineer", salary: "₹12–22 LPA", share: 35 },
    { name: "Technical specialist", salary: "₹8–15 LPA", share: 20 }
  ];
  let insight = `The Indian ecosystem is experiencing unprecedented acceleration in ${queryClean} integration. Driven primarily by Global Capability Centers (GCCs) in Bengaluru, Pune, and Noida, talent supply remains constrained. Employers are paying a premium of up to 40% for candidates equipped with verifiable real-world projects of this technology domain.`;
  let prereqs = ["Data Systems", "Rest APIs", "System Architecture", "Deployment Pipelines"];

  if (lcc.includes("ai") || lcc.includes("machine") || lcc.includes("learning") || lcc.includes("llm") || lcc.includes("agent") || lcc.includes("deep")) {
    score = 96;
    growth = "+68%";
    openings = "12,400+";
    salary = "₹18–38 LPA";
    topRole = "AI Engineer / Researcher";
    profiles = [
      { name: "NLP Specialist", salary: "₹16–35 LPA", share: 50 },
      { name: "MLOps Architect", salary: "₹24–42 LPA", share: 30 },
      { name: "Data Scientist", salary: "₹12–25 LPA", share: 20 }
    ];
    insight = "Generative AI and Agentic networks are rewriting technology roadmaps in Tier-1 Indian tech cities. Bengaluru hosts over 40% of these roles, backed by massive funding rounds. The upcoming year expects an increased shift from prompt-based integrations to deep model fine-tuning and stateful AI agent development.";
    prereqs = ["PyTorch / JAX", "Hugging Face", "Vector Databases", "LangChain / LangGraph"];
  } else if (lcc.includes("software") || lcc.includes("development") || lcc.includes("web") || lcc.includes("frontend") || lcc.includes("react") || lcc.includes("python")) {
    score = 88;
    growth = "+28%";
    openings = "24,500+";
    salary = "₹8–20 LPA";
    topRole = "Full Stack Engineer";
    profiles = [
      { name: "Senior Frontend Lead", salary: "₹15–28 LPA", share: 40 },
      { name: "React System Developer", salary: "₹10–18 LPA", share: 35 },
      { name: "Fullstack Architect", salary: "₹20–38 LPA", share: 25 }
    ];
    insight = "Modern browser-centric and state-intensive application development has led to solid, stable hiring across mid-sized startups and large enterprise products. Knowledge of modular micro-frontends, server-side rendering patterns, and lightweight UI packages yields the highest salary outcomes.";
    prereqs = ["TypeScript & ESNext", "React Node Engineering", "Modern CSS (Tailwind)", "State Management Engine"];
  } else if (lcc.includes("cloud") || lcc.includes("aws") || lcc.includes("azure") || lcc.includes("compute")) {
    score = 91;
    growth = "+35%";
    openings = "16,200+";
    salary = "₹12–26 LPA";
    topRole = "Cloud Architect";
    profiles = [
      { name: "AWS Cloud Specialist", salary: "₹14–28 LPA", share: 45 },
      { name: "DevOps Integration Lead", salary: "₹16–32 LPA", share: 35 },
      { name: "Systems Site Engineer", salary: "₹9–17 LPA", share: 20 }
    ];
    insight = "Enterprise digital transformation and the Indian government's sovereign cloud initiatives have spawned major jobs in Pune and Hyderabad. Businesses are transitioning to serverless frameworks and multi-cloud security architectures, looking for engineers who can aggressively reduce monthly infrastructure runrates.";
    prereqs = ["Amazon Web Services", "Kubernetes Engine", "Terraform IaC", "Cloud Security Protocols"];
  } else if (lcc.includes("cyber") || lcc.includes("security") || lcc.includes("sec")) {
    score = 89;
    growth = "+42%";
    openings = "8,700+";
    salary = "₹14–30 LPA";
    topRole = "Security Architect";
    profiles = [
      { name: "CISO / Security Director", salary: "₹28–55 LPA", share: 25 },
      { name: "Penetration Tester", salary: "₹10–22 LPA", share: 45 },
      { name: "SecOps Engineer", salary: "₹14–26 LPA", share: 30 }
    ];
    insight = "With banking, financial services, and insurance (BFSI) centers expanding operations rapidly in Mumbai and GIFT City, cybersecurity hiring has seen continuous double-digit growth. Zero-trust compliance and incident prevention are critical focuses as cyber-threat complexities reach an all-time high.";
    prereqs = ["Ethical Hacking (OSCP)", "SIEM Systems", "Zero Trust Architecture", "ISO 27001 Cryptography"];
  } else if (lcc.includes("data") || lcc.includes("engineer") || lcc.includes("database") || lcc.includes("sql") || lcc.includes("spark")) {
    score = 93;
    growth = "+52%";
    openings = "15,400+";
    salary = "₹14–32 LPA";
    topRole = "Principal Data Engineer";
    profiles = [
      { name: "Databricks/Spark architect", salary: "₹22–45 LPA", share: 35 },
      { name: "Data Warehouse Engineer", salary: "₹12–24 LPA", share: 40 },
      { name: "Data Wrangler Extraordinaire", salary: "₹10–18 LPA", share: 25 }
    ];
    insight = "The explosion of big data ingestion to feed AI models has created a critical bottleneck for data plumbing. Engineers who can optimize multi-terabyte data pipelines and maintain reliable real-time stream processing represent the hotbed of current hiring in Noida and Bengaluru global centers.";
    prereqs = ["Apache Spark / Kafka", "Snowflake / Databricks", "Python Pipeline Orchestration", "dbt Data Modeling"];
  } else if (lcc.includes("devops") || lcc.includes("kubernetes") || lcc.includes("ci/cd") || lcc.includes("docker")) {
    score = 92;
    growth = "+40%";
    openings = "11,800+";
    salary = "₹13–28 LPA";
    topRole = "SRE & DevOps Lead";
    profiles = [
      { name: "Kubernetes Platform Engineer", salary: "₹16–34 LPA", share: 40 },
      { name: "CI/CD Pipeline Manager", salary: "₹10–20 LPA", share: 35 },
      { name: "Infrastructure Architect", salary: "₹22–40 LPA", share: 25 }
    ];
    insight = "Automation is the key driver of engineering resource efficiency in Indian IT hubs. Companies are actively migrating internal software to containerized, auto-scaling instances. Deep competence in Infrastructure-as-Code and CI/CD pipelines guarantees the highest level of career mobility today.";
    prereqs = ["Docker & Kubernetes", "Terraform / Ansible", "GitHub Actions / GitLab", "Prometheus & Grafana"];
  } else if (lcc.includes("mobile") || lcc.includes("android") || lcc.includes("ios") || lcc.includes("flutter") || lcc.includes("native")) {
    score = 84;
    growth = "+24%";
    openings = "9,300+";
    salary = "₹9–21 LPA";
    topRole = "Mobile App Developer";
    profiles = [
      { name: "iOS Swift Specialist", salary: "₹12–25 LPA", share: 35 },
      { name: "Android Kotlin Engineer", salary: "₹10–20 LPA", share: 40 },
      { name: "Flutter/React Native Lead", salary: "₹8–16 LPA", share: 25 }
    ];
    insight = "The Indian digital consumer economy is native-mobile first. With ultra-low telecom rates, fintech and social-commerce consumer apps in India are onboarding millions daily. Teams are scaling mobile product performance, focusing on offline-first usability and complex local asset caching.";
    prereqs = ["Swift / Kotlin Core", "React Native & Flutter", "RESTful Websockets", "Google Play / App Store CI"];
  } else if (lcc.includes("product") || lcc.includes("manager") || lcc.includes("pm")) {
    score = 86;
    growth = "+26%";
    openings = "6,500+";
    salary = "₹15–35 LPA";
    topRole = "Technical Product Manager";
    profiles = [
      { name: "Senior PM (B2B SaaS)", salary: "₹22–42 LPA", share: 40 },
      { name: "Growth Product Manager", salary: "₹12–25 LPA", share: 35 },
      { name: "Associate Product Manager", salary: "₹8–15 LPA", share: 25 }
    ];
    insight = "As Indian software service giants transition to build high-margin IP products, and startup unicorns prioritize unit economics, the demand for high-caliber Product Managers is spiking. PMs who can bridge complex tech (specifically AI/ML capability) with clean business goals lead recruitment lists.";
    prereqs = ["Product Backlog Agile", "Amplitude Analytics", "User Journey Demography", "Technical API translation"];
  }

  // Create a beautiful consistent 5-year progression graph
  const trendGraphData = [
    { year: "2022", demand: Math.max(20, Math.floor(score * 0.55 + Math.random() * 10)) },
    { year: "2023", demand: Math.max(35, Math.floor(score * 0.70 + Math.random() * 10)) },
    { year: "2024", demand: Math.max(50, Math.floor(score * 0.82 + Math.random() * 8)) },
    { year: "2025", demand: Math.max(65, Math.floor(score * 0.93 + Math.random() * 5)) },
    { year: "2026", demand: score }
  ];

  return {
    skillName: queryClean,
    demandScore: score,
    growthRate: growth,
    openingsCount: openings,
    salaryRange: salary,
    roleInDemand: topRole,
    trendGraphData,
    topRoleProfiles: profiles,
    futureDemandInsight: insight,
    keyPrerequisites: prereqs
  };
}

// Vite integration:
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SkillPulse AI] Server successfully listening on http://0.0.0.0:${PORT} — use http://localhost:${PORT} in your browser`);
  });
}

startServer();
