// Everything the chat assistant is allowed to know about Raman. Kept as one
// plain-text block and stuffed into the system prompt on every request —
// the whole corpus is small enough (~1,500 words) that a vector database
// would be overkill. Update this file whenever the resume/projects change;
// the site's copy doesn't automatically sync with it.
//
// Filename starts with "_" on purpose: Vercel ignores underscore-prefixed
// files in /api, so this stays an importable module and never becomes its
// own public endpoint.

module.exports = `
ABOUT RAMAN MANKAR
Raman Mankar is an AI-focused Python developer with 2+ years of experience
building agentic AI systems, generative AI pipelines, and production-grade
automation. He is currently pursuing an MTech in Computer Science and
Engineering at IIT Hyderabad (2025-present, CGPA 8.15). He completed his
BTech in Computer Science and Engineering at North Maharashtra University
(2019-2023, CGPA 9.0). He is based in Ramnagar, Wardha, Maharashtra, India.

WORK EXPERIENCE

AI/ML Research Intern — Micron (Applied AI), Jun-Jul 2026
Built SkillOpt, a self-optimizing AI skill for automated NVMe firmware log
error classification, replacing slow manual log review with an AI-driven
pipeline. Designed an adversarial optimizer-target model loop with a
validation gate that iteratively refined the skill, improving classification
accuracy by 18% on unseen validation logs. Built and deployed a plugin
packaging SkillOpt for testing, ran cost-per-run and accuracy analysis across
multiple model configurations, and documented the full system architecture
for team handoff.

Python Developer — TCS (Jaguar Land Rover account), Project Kubricks,
Feb 2024-Jun 2025
Built Cloud Functions on GCP and triggers to initiate dataset changes as a
web Python developer. Maintained technical documentation in Confluence and
ran an Agile workflow on Jira.

Python MongoDB Developer — TCS (Jaguar Land Rover account), Project
Product 360, Aug 2023-Jan 2024
Worked on a research project to increase data-flow efficiency between ODS
and ODL middleware layers. Added MongoDB triggers to guarantee required
changes propagated correctly. Sped up trigger execution with a
"document-inside-document" technique, increasing data flow by 20%.

Full Stack Developer — DTree Labs LLP, RCC UPSC Portal, Jan-May 2023
Built the portal with React.js, Next.js, and Mantine UI. Wrote Mantine UI
components backed by REST services.

PROJECTS

1. SkillOpt — Self-Optimizing Log Classifier (Jun-Jul 2026, featured/Micron
   research). An AI skill that automates NVMe firmware log error
   classification, replacing manual review. An adversarial optimizer-target
   loop checks its own output against a validation gate and refines itself,
   lifting accuracy 18% on unseen logs. Packaged as a plugin with
   cost-per-run and accuracy benchmarking. Stack: Python, LLM Agents,
   Evaluation Loops, Firmware Logs.

2. Fitness Coach — Agentic AI WebApp (Feb-Mar 2026, hackathon project). A
   hybrid agent-based personal fitness coach combining planning, monitoring,
   reasoning, and motivational agents in a daily goal-oriented loop that
   adapts plans from user feedback and trends. Stack: FastAPI, React,
   MongoDB, LLMs.

3. Tractor Invoice Predictor (Apr-May 2026). Extracts structured data from
   unstructured tractor-invoice images to predict tractor cost automatically
   — a hands-on pass through Document AI, computer vision, and OCR
   pipelines under real deployment constraints. Stack: Document AI, OCR,
   Computer Vision.

4. Height Estate — House Price Prediction (Dec 2025-Jan 2026). A
   house-price predictor built from scratch, data processing through model
   training, based on feature engineering and correlation analysis, with a
   Next.js front end. Stack: Python, scikit-learn, Next.js.

5. Bug Tracking System — MCP Server for Claude Code (2026). A
   semiconductor-focused bug tracker exposed as native Claude Code tools
   through an MCP server. Imports CVEs from NVD and issues from GitHub, runs
   AI-powered triage with chip-family detection (Intel/AMD/ARM/NVIDIA), and
   ships custom skills like /bug-triage and /bug-report. Stack: Python, MCP,
   Claude Code, SQLite. Repo: github.com/Raman11-1/Bug_Tracking_System

6. PH-Reg — Self-Distilled Registers for ViTs (IIT Hyderabad Visual
   Computing coursework, 2026). Reproduced PH-Reg, which uses
   self-distillation to strip artifact tokens out of Vision Transformer
   features, then extended it with two original contributions —
   Frequency-Domain Augmentation and an Artifact-Aware Adaptive Loss —
   lifting cosine similarity to clean features to 1.000, up from 0.972-0.986
   for spatial-shift augmentation alone. Stack: PyTorch, Vision
   Transformers, CLIP, Research. Repo: github.com/Raman11-1/VC

7. This portfolio website, including this chat assistant. Built as a static
   site (HTML/CSS/JS) with a serverless function on Vercel that calls the
   Mistral API to power this chat — a working example of a RAG-style
   assistant grounded only in Raman's real resume and project content.

SKILLS
AI/ML & Generative AI: Agentic AI Systems, LLM Application Development,
Generative AI, Evaluation Loops.
Frontend & Data: React.js, Next.js, Mantine UI, Bootstrap, Data Analysis,
Data Visualization.
Tools & Backend: Python, FastAPI, MongoDB, GCP, Git, Jira, Confluence,
Agile.
Working style: Technical documentation, communication, team collaboration.

CONTACT
Email: ramanrsm123@gmail.com
Phone: +91 97630 86367
LinkedIn: linkedin.com/in/raman-mankar-b822411b7
GitHub: github.com/Raman11-1
Location: Ramnagar, Wardha, Maharashtra, India
`.trim();
