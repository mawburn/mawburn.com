import {
  education,
  experience,
  militaryService,
  resumeProfile,
  selectedProjects,
  skills,
} from '~/data/resume'

function bullet(text: string) {
  return `- ${text}`
}

function renderResumeMarkdown() {
  const lines: string[] = [
    `# ${resumeProfile.name}`,
    '',
    resumeProfile.title,
    '',
    resumeProfile.positioning,
    '',
    '## Links',
    '',
    bullet(`[Website](${resumeProfile.website})`),
    bullet(`[LinkedIn](${resumeProfile.linkedinUrl})`),
    bullet(`[GitHub](${resumeProfile.githubUrl})`),
    '',
    '## Experience',
    '',
  ]

  for (const job of experience) {
    if (job.company === 'Shopify' && job.areas) {
      for (const area of job.areas) {
        lines.push(`### ${job.company}`, `${area.name}`, area.dates ?? job.dates, '')
        lines.push(...area.bullets.map(bullet), '')
      }
      continue
    }

    lines.push(`### ${job.company}`, job.role, job.dates, '')
    if (job.location) lines.push(job.location, '')
    if (job.intro) lines.push(job.intro, '')

    if (job.areas) {
      for (const area of job.areas) {
        lines.push(`#### ${area.name}`, '')
        lines.push(...area.bullets.map(bullet), '')
      }
    } else if (job.bullets) {
      lines.push(...job.bullets.map(bullet), '')
    }
  }

  lines.push('## Selected Projects', '')
  for (const project of selectedProjects) {
    lines.push(`### ${project.name}`, '', project.subtitle, '')
    lines.push(bullet(`Source: ${project.githubUrl}`))
    for (const [value, label] of project.metrics) {
      lines.push(bullet(`${value} ${label}`))
    }
    lines.push(
      bullet(
        'Built and operated an open-source full-stack platform that grew to approximately 22,000 monthly active unique users and handled approximately 15 million API requests.'
      ),
      bullet(
        'Designed production infrastructure for a multi-tenant, real-time collaborative mapping system used by many separate guilds and alliances, each with private mapping data and Discord-based access controls.'
      ),
      bullet(
        'Discord integration monitored roughly 75,000 user roles across approximately 500 Discord servers while Matt operated it.'
      ),
      bullet(
        'Production ran on roughly a $30/month Hetzner server and typically consumed only about 5–10% of available resources.'
      ),
      bullet(
        'After Matt stopped maintaining Portaler, he archived the original repository and the open-source project moved into community development.'
      ),
      bullet(`Technology: ${project.technologies.join(', ')}`),
      ''
    )
  }

  lines.push('## Skills', '')
  for (const group of skills) {
    lines.push(`### ${group.category}`, '', group.items.join(', '), '')
  }

  lines.push('## Military Service', '')
  lines.push(
    `### ${militaryService.organization}`,
    militaryService.dates,
    '',
    militaryService.details,
    ''
  )
  lines.push(militaryService.roles, '')
  lines.push(...militaryService.bullets.map(bullet), '')

  lines.push('## Education', '')
  for (const school of education) {
    lines.push(`### ${school.institution}`, school.detail, '')
  }

  return `${lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`
}

export function loader() {
  return new Response(renderResumeMarkdown(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
