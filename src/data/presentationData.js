export const sectionsData = [
  {
    id: "sec-01",
    number: "01",
    tag: "INTRODUCTION",
    title: "What is Software Maintenance?",
    subtitle: "The Life of a Software System",
    tagline: "Build → Deploy → Use → Evolve",
    quote: "Software is never really finished. It evolves, adapts, and gets maintained.",
    definition: "Software maintenance is the process of modifying, updating, and improving software after it has been delivered and deployed.",
    cameraConfig: {
      position: [0, 2.5, 14],
      target: [0, 0, 0],
      fov: 46
    },
    hud: {
      status: "OPERATIONAL",
      statusCode: "normal",
      version: "1.0",
      modules: 12,
      dependencies: 8,
      warnings: 0
    },
    lifecycleStage: "BUILD",
    speakerNotes: "Introduce the core topic: 'What is Software Maintenance? Software maintenance is the process of modifying, updating, and improving software after it has been delivered and deployed.' Point out the healthy revolving 3D software ecosystem.",
    cards: {
      singleCard: {
        title: "What is Software Maintenance?",
        text: "Software maintenance is the process of modifying, updating, and improving software after it has been delivered and deployed."
      }
    }
  },
  {
    id: "sec-02",
    number: "02",
    tag: "FUNDAMENTALS",
    title: "WHY DOES SOFTWARE CHANGE?",
    subtitle: "The Life After Delivery",
    definition: "Software maintenance is the formal process of modifying a software system after delivery to correct faults, adapt to environment changes, improve performance, and prevent future problems.",
    cameraConfig: {
      position: [2.5, 2, 10],
      target: [0, 0, 0],
      fov: 42
    },
    hud: {
      status: "OPERATIONAL",
      statusCode: "normal",
      version: "1.0",
      modules: 12,
      dependencies: 8,
      warnings: 0
    },
    lifecycleStage: "DEPLOY",
    speakerNotes: "Define Software Maintenance formally (IEEE 1219). Highlight the 4 distinct reasons software changes post-delivery: Bugs, Environment Changes, User Needs, and Future Risks.",
    cards: {
      definition: {
        title: "FORMAL DEFINITION",
        badge: "IEEE 1219",
        text: "Process of modifying a software system or component after delivery to correct faults, improve performance, or adapt to a changed environment."
      },
      process: {
        title: "THE FOUR PILLARS",
        badge: "TAXONOMY",
        pillars: [
          { name: "CORRECT", desc: "Fix bugs & runtime faults", color: "#f43f5e" },
          { name: "ADAPT", desc: "Environment & OS changes", color: "#06b6d4" },
          { name: "IMPROVE", desc: "Enhance UX & speed", color: "#10b981" },
          { name: "PREVENT", desc: "Proactive debt cleanup", color: "#f59e0b" }
        ]
      },
      example: {
        title: "MAINTENANCE TRIGGERS",
        badge: "REAL WORLD",
        triggers: [
          "Bug reports from active users",
          "OS / Cloud platform upgrades",
          "Emerging security vulnerabilities",
          "Scaling under peak load"
        ]
      }
    }
  },
  {
    id: "sec-03",
    number: "03",
    tag: "TYPE 01",
    title: "01 — CORRECTIVE MAINTENANCE",
    subtitle: "Fixing Unexpected Faults & Defects",
    definition: "Reactive modifications made to fix defects and errors discovered after software deployment.",
    cameraConfig: {
      position: [-2.2, 0.2, 5.5],
      target: [-1.2, -0.4, 0],
      fov: 38
    },
    hud: {
      status: "DEGRADED",
      statusCode: "degraded",
      version: "1.0 → 1.0.1",
      modules: 12,
      dependencies: 8,
      warnings: 1
    },
    lifecycleStage: "MAINTAIN",
    speakerNotes: "Explain Corrective Maintenance. Direct the audience's attention to the broken payment module in the 3D ecosystem showing an ERROR state. Walk through the 5-step repair workflow: Detect -> Analyze -> Fix -> Test -> Deploy.",
    cards: {
      definition: {
        title: "DEFINITION",
        badge: "REACTIVE",
        text: "Modifications performed to fix faults, bugs, and defects discovered during production execution after deployment."
      },
      process: {
        title: "CORRECTIVE WORKFLOW",
        badge: "5 STEPS",
        steps: [
          { num: "01", title: "DETECT", desc: "Error reported in production" },
          { num: "02", title: "ANALYZE", desc: "Trace stack logs & state" },
          { num: "03", title: "FIX", desc: "Patch core calculation bug" },
          { num: "04", title: "TEST", desc: "Automated regression suite" },
          { num: "05", title: "DEPLOY", desc: "Hotfix release v1.0.1" }
        ]
      },
      example: {
        title: "REAL-WORLD SCENARIO",
        badge: "BANKING CASE",
        scenario: "A banking mobile application fails during a money transfer due to a transaction calculation defect. Engineers patch the fault and restore operational status.",
        codeSnippet: `// Corrective Hotfix: Prevent Null Pointer Crash
- function executeTx(tx) { return tx.amount > 0; }
+ function executeTx(tx) {
+   if (!tx || typeof tx.amount !== 'number') throw new Error("Invalid payload");
+   return tx.amount > 0;
+ }`
      }
    }
  },
  {
    id: "sec-04",
    number: "04",
    tag: "TYPE 02",
    title: "02 — ADAPTIVE MAINTENANCE",
    subtitle: "Adapting to Changing Environments",
    definition: "Modifications made so that software continues to function seamlessly when its operating environment changes.",
    cameraConfig: {
      position: [4, -0.8, 6.5],
      target: [1.2, -0.5, 0],
      fov: 40
    },
    hud: {
      status: "ADAPTING...",
      statusCode: "adapting",
      version: "1.1",
      modules: 12,
      dependencies: 8,
      warnings: 0
    },
    lifecycleStage: "MAINTAIN",
    speakerNotes: "Emphasize that in Adaptive Maintenance, the software itself is not broken—the external environment changed. Show how the 3D ecosystem reconnects to the new database portal.",
    cards: {
      definition: {
        title: "DEFINITION",
        badge: "ENVIRONMENTAL",
        text: "Modifications executed so software continues operating in a modified environment without altering basic functionality."
      },
      process: {
        title: "ADAPTATION PHASES",
        badge: "MIGRATION",
        steps: [
          { num: "01", title: "Env Audit", desc: "Detect API/OS deprecation" },
          { num: "02", title: "Refactor API", desc: "Update driver bindings" },
          { num: "03", title: "Re-compile", desc: "Verify compatibility" }
        ]
      },
      example: {
        title: "REAL-WORLD SCENARIO",
        badge: "DB MIGRATION",
        scenario: "An organization migrates its infrastructure from MySQL 5.7 to PostgreSQL 16. The application is updated with new database drivers and SQL syntax compatibility.",
        changes: [
          { old: "OLD OS (Win 7 / Linux 4.x)", new: "NEW OS (Win 11 / Linux 6.x)" },
          { old: "REST API v1 (Deprecated)", new: "GraphQL / REST v2 API" }
        ]
      }
    }
  },
  {
    id: "sec-05",
    number: "05",
    tag: "TYPE 03",
    title: "03 — PERFECTIVE MAINTENANCE",
    subtitle: "Enhancing Functionality & Performance",
    definition: "Modifications driven by user feedback or new requirements to improve performance, usability, responsiveness, or add requested features.",
    cameraConfig: {
      position: [0, 2.8, 5],
      target: [0, 0, 0],
      fov: 38
    },
    hud: {
      status: "UPGRADED (v2.0)",
      statusCode: "upgraded",
      version: "2.0",
      modules: 16,
      dependencies: 10,
      warnings: 0
    },
    lifecycleStage: "EVOLVE",
    speakerNotes: "Explain Perfective Maintenance as user-driven enhancements. Demonstrate how the 3D software core upgrades to Version 2.0 with faster throughput.",
    cards: {
      definition: {
        title: "DEFINITION",
        badge: "ENHANCEMENT",
        text: "Modifications implemented to improve performance, maintainability, or user experience based on active user feedback."
      },
      process: {
        title: "PERFECTIVE WORKFLOW",
        badge: "UPGRADE",
        steps: [
          { num: "01", title: "User Feedback", desc: "Collect performance tickets" },
          { num: "02", title: "Query Tuning", desc: "Optimize DB query indexes" },
          { num: "03", title: "UI Polish", desc: "Deploy dark mode & quick search" }
        ]
      },
      example: {
        title: "REAL-WORLD SCENARIO",
        badge: "STUDENT PORTAL",
        scenario: "A university student portal receives a search system upgrade (reducing search query latency from 3.2s to 120ms) and an improved responsive mobile UI.",
        metrics: [
          { metric: "Latency", before: "3.2s load", after: "120ms load" },
          { metric: "Interface", before: "Basic Static", after: "Glass Hologram v2.0" }
        ]
      }
    }
  },
  {
    id: "sec-06",
    number: "06",
    tag: "TYPE 04",
    title: "04 — PREVENTIVE MAINTENANCE",
    subtitle: "Proactive Refactoring & Debt Cleanup",
    definition: "Modifications executed proactively to detect and fix latent faults before they become catastrophic production failures.",
    cameraConfig: {
      position: [-2.5, 1.8, 7],
      target: [0, 0, 0],
      fov: 40
    },
    hud: {
      status: "REFACTORED",
      statusCode: "refactored",
      version: "2.1",
      modules: 14,
      dependencies: 8,
      warnings: 0
    },
    lifecycleStage: "MAINTAIN",
    speakerNotes: "In Preventive Maintenance, nothing is broken yet! Developers identify technical debt, code complexity, and outdated dependencies.",
    cards: {
      definition: {
        title: "DEFINITION",
        badge: "PROACTIVE",
        text: "Modifications made to prevent future problems by detecting and resolving latent faults before they manifest as failures."
      },
      process: {
        title: "SCAN & REFACTOR",
        badge: "AUDIT",
        steps: [
          { num: "01", title: "Code Audit", desc: "Scan static code analysis" },
          { num: "02", title: "Debt Cleanup", desc: "Refactor complex methods" },
          { num: "03", title: "Patch Deps", desc: "Update security libraries" }
        ]
      },
      example: {
        title: "REAL-WORLD SCENARIO",
        badge: "TECH DEBT",
        scenario: "Scanning source code for security vulnerabilities, simplifying complex nested method logic, and updating unmaintained third-party dependencies.",
        slogan: "Fix problems before they become failures."
      }
    }
  },
  {
    id: "sec-07",
    number: "07",
    tag: "SYNTHESIS",
    title: "THE FOUR TYPES OF MAINTENANCE",
    subtitle: "Categorization Matrix & Taxonomy",
    definition: "Lientz and Swanson (1980) classified software maintenance into four distinct operational categories based on trigger source and intent.",
    cameraConfig: {
      position: [0, 9, 13],
      target: [0, 0, 0],
      fov: 52
    },
    hud: {
      status: "TAXONOMY REVIEW",
      statusCode: "normal",
      version: "2.1",
      modules: 14,
      dependencies: 8,
      warnings: 0
    },
    lifecycleStage: "MAINTAIN",
    speakerNotes: "Use the overhead 3D view showing 4 branching paths (Corrective, Adaptive, Perfective, Preventive) originating from the central ecosystem.",
    cards: {
      definition: {
        title: "TAXONOMY OVERVIEW",
        badge: "REVISION",
        text: "All post-delivery software changes fall into one of four distinct categories defined by operational trigger and objective."
      },
      process: {
        title: "FOUR TYPES MATRIX",
        badge: "PERCENTAGE",
        matrix: [
          { name: "🐛 CORRECTIVE", percent: "~20%", focus: "Fix existing faults", color: "#f43f5e" },
          { name: "🌍 ADAPTIVE", percent: "~25%", focus: "Env & OS changes", color: "#06b6d4" },
          { name: "✨ PERFECTIVE", percent: "~50%", focus: "Enhance UX & speed", color: "#10b981" },
          { name: "🛡 PREVENTIVE", percent: "~5%", focus: "Prevent future errors", color: "#f59e0b" }
        ]
      },
      example: {
        title: "KEY INSIGHT",
        badge: "DISTRIBUTION",
        text: "Perfective maintenance accounts for ~50% of total maintenance effort due to evolving business requirements and user demands."
      }
    }
  },
  {
    id: "sec-08",
    number: "08",
    tag: "WORKFLOW",
    title: "SOFTWARE MAINTENANCE PROCESS",
    subtitle: "The Continuous Evolution Pipeline",
    definition: "Software maintenance is not a one-off event. It is a continuous, structured engineering process that loops indefinitely throughout the product lifetime.",
    cameraConfig: {
      position: [3.5, 2, 9.5],
      target: [0, 0, 0],
      fov: 44
    },
    hud: {
      status: "PIPELINE ACTIVE",
      statusCode: "normal",
      version: "2.1",
      modules: 14,
      dependencies: 8,
      warnings: 0
    },
    lifecycleStage: "MAINTAIN",
    speakerNotes: "Walk through the continuous process ring. Emphasize that the repeat step loops back into the system.",
    cards: {
      definition: {
        title: "PROCESS DEFINITION",
        badge: "IEEE 1219",
        text: "A continuous lifecycle loop comprising Problem Identification, Analysis, Design, Implementation, System Testing, and Acceptance."
      },
      process: {
        title: "PIPELINE STAGES",
        badge: "7 STAGES",
        steps: [
          { num: "01", title: "Request", desc: "Log ticket or crash" },
          { num: "02", title: "Analysis", desc: "Estimate cost & risk" },
          { num: "03", title: "Modify", desc: "Code refactoring" },
          { num: "04", title: "Testing", desc: "Automated regression" },
          { num: "05", title: "Deploy", desc: "Production release" },
          { num: "06", title: "Monitor", desc: "Telemetry tracking" },
          { num: "07", title: "Repeat", desc: "Loop continuous" }
        ]
      },
      example: {
        title: "CONTINUOUS INSIGHT",
        badge: "FEEDBACK LOOP",
        text: "Maintenance is continuous. Every production deployment generates telemetry feeds for the next iteration cycle."
      }
    }
  },
  {
    id: "sec-09",
    number: "09",
    tag: "REALITY",
    title: "CHALLENGES OF SOFTWARE MAINTENANCE",
    subtitle: "Why 60-80% of Software Cost is Maintenance",
    quote: "The software that was easy to build isn't always easy to maintain.",
    definition: "Over 70% of total software lifecycle budget is consumed during the maintenance phase due to architectural decay and complexity accumulation.",
    cameraConfig: {
      position: [-4.5, -1.8, 6.5],
      target: [0, 0, 0],
      fov: 48
    },
    hud: {
      status: "COMPLEXITY HIGH",
      statusCode: "degraded",
      version: "2.1",
      modules: 24,
      dependencies: 32,
      warnings: 4
    },
    lifecycleStage: "MAINTAIN",
    speakerNotes: "Explain why 60-80% of total software budget is spent on maintenance due to legacy code and tech debt.",
    cards: {
      definition: {
        title: "MAINTENANCE BOTTLENECK",
        badge: "COST FACTORS",
        text: "Over 70% of total software budget goes toward maintenance due to legacy decay, technical debt, and developer turnover."
      },
      process: {
        title: "PRIMARY CHALLENGES",
        badge: "OBSTACLES",
        challenges: [
          "Legacy Code & Outdated Frameworks",
          "Accumulated Technical Debt",
          "Missing / Outdated Documentation",
          "Tight Coupling & Complex Dependencies",
          "Security Vulnerabilities in Stale Packages",
          "Loss of Original Developer Context"
        ]
      },
      example: {
        title: "THE HARD TRUTH",
        badge: "QUOTE",
        text: "\"The software that was easy to build isn't always easy to maintain.\" Architectural discipline from Day 1 is vital."
      }
    }
  },
  {
    id: "sec-10",
    number: "10",
    tag: "CONCLUSION",
    title: "SOFTWARE IS NEVER REALLY FINISHED",
    subtitle: "It evolves. It adapts. It gets maintained.",
    definition: "Successful software is defined not by how cleanly it was launched on Day 1, but by how effectively it adapts to change across years of maintenance.",
    cameraConfig: {
      position: [0, 0, 16.5],
      target: [0, 0, 0],
      fov: 52
    },
    hud: {
      status: "LIFECYCLE COMPLETE",
      statusCode: "normal",
      version: "2.1+",
      modules: 14,
      dependencies: 8,
      warnings: 0
    },
    lifecycleStage: "EVOLVE",
    speakerNotes: "Conclude the presentation. Reiterate: 'Software is never really finished. It evolves, adapts, and gets maintained.' Presenter Details card displays USN, Name, and Team.",
    cards: {
      definition: {
        title: "FINAL TAKEAWAY",
        badge: "SUMMARY",
        text: "Successful software is defined not by its launch day, but by how effectively it adapts to change across years of maintenance."
      },
      process: {
        title: "THE SOFTWARE LIFECYCLE",
        badge: "FULL RING",
        steps: [
          { num: "01", title: "BUILD", desc: "Architecture" },
          { num: "02", title: "DEPLOY", desc: "Production" },
          { num: "03", title: "USE", desc: "Active Users" },
          { num: "04", title: "MAINTAIN", desc: "Continuous" },
          { num: "05", title: "EVOLVE", desc: "Growth" },
          { num: "06", title: "REPEAT", desc: "Lifecycle" }
        ]
      },
      example: {
        title: "SLOGAN",
        badge: "THANK YOU",
        text: "It evolves. It adapts. It gets maintained."
      }
    }
  }
];
