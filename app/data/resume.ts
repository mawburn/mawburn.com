export const resumeProfile = {
  name: 'Matt Burnett',
  title: 'Senior / Staff Software Engineer',
  location: 'Portland, Oregon',
  email: 'mawburn7@gmail.com',
  website: 'https://mawburn.com',
  resumeUrl: 'https://mawburn.com/resume',
  linkedinUrl: 'https://www.linkedin.com/in/burnettmatt/',
  githubUrl: 'https://github.com/mawburn',
  summary:
    'Nearly 15 years building full-stack products and high-scale systems. Former Shopify Senior Engineer with deep TypeScript, React, and Node.js experience, plus Go, SQL, GraphQL, Java, AWS, and GCP.',
  positioning:
    'Senior/Staff-level software engineer with nearly 15 years of professional experience building full-stack products, high-scale systems, developer tooling, and software platforms.',
  focus: ['Senior/Staff IC roles', 'Full-stack', 'Architecture', 'Developer Platforms'],
  knowsAbout: [
    'TypeScript',
    'React',
    'Node.js',
    'JavaScript',
    'GraphQL',
    'REST APIs',
    'SQL',
    'PostgreSQL',
    'Go',
    'Java',
    'AWS',
    'GCP',
    'Docker',
    'Software Architecture',
    'AI/LLM applications',
  ],
}

export const skills = [
  {
    category: 'Primary technical areas',
    items: [
      'TypeScript',
      'React',
      'Node.js',
      'JavaScript',
      'GraphQL',
      'REST APIs',
      'SQL',
      'PostgreSQL',
      'Go',
      'Java',
      'AWS',
      'GCP',
      'Docker',
    ],
  },
  {
    category: 'Engineering strengths',
    items: [
      'Software Architecture',
      'System Design',
      'Developer Experience',
      'Developer Platforms',
      'AI/LLM applications',
      'Technical Leadership',
    ],
  },
]

export const education = [
  {
    institution: 'Henderson State University',
    detail: 'B.S., Computer Science',
  },
]

export type ExperienceArea = {
  name: string
  dates?: string
  bullets: string[]
}

export type ExperienceEntry = {
  company: string
  role: string
  dates: string
  location?: string
  intro?: string
  areas?: ExperienceArea[]
  bullets?: string[]
}

export const workAreas = [
  {
    name: 'Full-stack product engineering',
    details:
      'React and TypeScript on the frontend; Node.js, Go, Java, SQL, and APIs on the backend.',
  },
  {
    name: 'Architecture & technical leadership',
    details:
      'System design, modernization, architectural decisions, mentoring, and technical direction while remaining hands-on.',
  },
  {
    name: 'High-scale product systems',
    details:
      'Experience across Shopify Checkout, fintech, travel, healthcare systems, and other production systems with significant operational requirements.',
  },
  {
    name: 'Developer platforms & AI',
    details:
      "Built and operated internal & external developer tooling, including Shopify's internal AI chat platform used by thousands of employees.",
  },
]

export const selectedProjects = [
  {
    name: 'Portaler',
    subtitle: 'Real-time collaborative mapping platform for Albion Online',
    githubUrl: 'https://github.com/mawburn/portaler-core',
    metrics: [
      ['22K', 'monthly active unique users'],
      ['15M', 'API requests'],
      ['75K', 'Discord roles monitored'],
      ['~$30/mo', 'Hetzner production server'],
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
  },
]

export const experience: ExperienceEntry[] = [
  {
    company: 'Shopify',
    role: 'Senior Software Engineer',
    dates: 'April 2021 – August 2026',
    intro:
      'Product and platform engineering across Shopify Checkout, Checkout Extensibility, and internal AI developer tooling at Shopify scale.',
    areas: [
      {
        name: 'Dev AI / Augmented Engineering',
        dates: 'March 2025 – August 2026',
        bullets: [
          'Launched, built, operated, and evolved an internal AI chat and developer platform used in the daily workflows of thousands of Shopify employees.',
          'Built production developer infrastructure around LLMs: full-stack React/TypeScript application work, a Node.js backend, LLM integrations, internal APIs, and developer-oriented workflows.',
          'Designed and implemented AI-assisted engineering capabilities intended to make AI useful inside real software-development workflows rather than functioning as a generic chat interface.',
          'Built integrations between the AI platform and Shopify internal systems, working across frontend/backend boundaries, application architecture, deployment, reliability, and developer experience.',
          'Contributed technically as the platform grew from an early internal tool into a broadly adopted product and helped shape the emerging Augmented Engineering function.',
        ],
      },
      {
        name: 'Checkout / Checkout Extensibility',
        dates: 'April 2021 – March 2025',
        bullets: [
          'Worked on Checkout Extensibility systems that enable merchants and developers to customize Shopify Checkout, a business-critical surface whose resulting checkout experiences are seen by hundreds of millions of people.',
          'Served as a key engineer on the initial Checkout Editor team, contributing to system design, application architecture, frontend architecture, data flows, API integration, developer interfaces, and core technical decisions.',
          'Built complex merchant-facing Checkout Editor behavior with React and TypeScript while working across the editor UI, application data, backend/platform capabilities, APIs, and checkout extensibility systems.',
          'Worked with internal-facing GraphQL APIs, application data contracts, platform services, and integration points connecting product UI to the underlying checkout platform.',
          'Designed and implemented the original secure tracking-script injection architecture for Checkout Editor, enabling extensibility while isolating checkout from malicious or unsafe code.',
          'Integrated checkout extensibility work with major Shopify systems including Shop Pay, Customer Accounts, and other checkout/platform teams, balancing system boundaries, compatibility, security, and cross-product behavior.',
        ],
      },
    ],
  },
  {
    company: 'Red Ventures',
    role: 'Senior Software Engineer / Technical Lead',
    dates: 'March 2018 – April 2021',
    intro:
      'Hands-on technical lead and senior engineer across travel-product modernization, full-stack web applications, and backend data/event systems.',
    areas: [
      {
        name: 'ExpertFlyer / The Points Guy Travel',
        bullets: [
          'Led the engineering effort to re-architect ExpertFlyer after it became part of The Points Guy / Red Ventures travel organization, while continuing to write production code.',
          'Helped define the new architecture, break apart and replace legacy functionality, determine implementation approaches, mentor engineers, and build rapid proofs of concept for technical evaluation.',
          'Built Go backend services, REST APIs, business logic, application workflows, and integrations as the primary backend foundation for the new ExpertFlyer architecture.',
          'Designed Go services and REST APIs that integrated with the existing legacy Java Struts application during the ExpertFlyer modernization without working on the Struts application itself.',
          'Contributed to the modern full-stack application using React and TypeScript alongside the Go backend architecture.',
        ],
      },
      {
        name: 'CreditCards.com',
        bullets: [
          'Helped build and launch an advertising/customer-facing portal using React, TypeScript, and Node.js.',
          'Built separate Java backend functionality for event tracking and data processing, consolidating user/event information into shared ETL-style data flows after acquisitions within Red Ventures.',
        ],
      },
    ],
  },
  {
    company: 'ABC Financial Services',
    role: 'Senior Software Engineer',
    dates: 'September 2016 – March 2018',
    bullets: [
      'Worked on a greenfield full-stack platform with React, TypeScript/JavaScript, Node.js, Java/Spring, PostgreSQL, SQL, REST APIs, and AWS-hosted production systems.',
      'Built user-facing React functionality and Node.js service-layer code connecting frontend behavior to backend services, APIs, business logic, and PostgreSQL-backed data.',
      'Contributed to application architecture, API design, relational data modeling/data flows, backend integration, and product/technical strategy.',
      'Worked across Java/Spring services and cloud-hosted infrastructure where appropriate while maintaining substantial hands-on full-stack ownership.',
    ],
  },
  {
    company: 'Arkansas Blue Cross Blue Shield',
    role: 'Systems Analyst Programmer III',
    dates: 'October 2013 – September 2016',
    bullets: [
      'Built and modernized a critical database-backed healthcare application used daily by medical facilities across Arkansas and designed to support thousands of users.',
      'Delivered substantial feature development, performance improvements, usability improvements, architecture work, application/data integration, and SQL/database development.',
      'Worked on complex healthcare workflows and production reliability for software depended upon by real healthcare organizations.',
      'Took on increasing technical responsibility over time, including mentoring junior developers and improving existing enterprise systems rather than simply maintaining them.',
    ],
  },
  {
    company: 'Baptist Health',
    role: 'Web Analyst',
    dates: 'January 2012 – October 2013',
    bullets: [
      'Developed an internal full-stack hospital application suite with authentication, single sign-on, configurable user roles, granular permissions, database-backed workflows, and internal web interfaces.',
      'Helped migrate important hospital workflows from mainframe-based processes into modern web applications across application logic, relational data, workflow design, and hospital-process integration.',
      'Maintained and supported more than 12 additional applications and databases while building and modernizing core hospital systems.',
    ],
  },
  {
    company: 'Acxiom',
    role: 'Configuration Management Intern',
    dates: 'May 2011 – August 2011',
    location: 'Conway, Arkansas',
    bullets: [
      'Automated categorization and documentation of large enterprise folder structures using Perl within an established configuration-management environment.',
      'Worked with Subversion and enterprise development processes while building scripts that traversed filesystem structures, categorized existing content, and reduced manual inspection/documentation work.',
    ],
  },
]

export const militaryService = {
  organization: 'U.S. Army National Guard — 39th Infantry Brigade Combat Team',
  dates: 'April 2004 – April 2011',
  details:
    'Seven years of service while completing school and beginning my technical career, including a deployment in support of Operation Iraqi Freedom.',
  roles:
    'Trained or served across several specialties as responsibilities changed, including 25B Information Technology Specialist / Information Systems Operator-Analyst, 25F Network Switching Systems Operator-Maintainer, 11B Infantryman, 88M Motor Transport Operator, and 92Y Unit Supply Specialist.',
  bullets: [
    'Performed military IT and communications-systems work involving deployment, installation, operation, troubleshooting, and maintenance of information systems, network/communications equipment, and telecommunications information-management processes.',
    'Documented technical procedures and requirements, prepared reports and system-related documentation, and helped coordinate technical and operational tasks.',
    'Developed early leadership and operational skills through task delegation, training other soldiers, planning and executing assigned tasks, adapting to changing requirements, ROTC participation, and military leadership training.',
  ],
}
