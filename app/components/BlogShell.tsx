import type { ReactNode } from 'react'

import { RSSIcon } from './icons'
import { ThemeToggle } from './ThemeToggle'

/**
 * Runs before first paint (it sits at the top of the wrapper, so it executes during HTML
 * parsing). Applies the saved/system theme to this wrapper only; the rest of the site stays dark.
 */
const themeScript = `(function(){var el=document.currentScript&&document.currentScript.parentElement;if(!el)return;var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}el.classList.toggle('dark',t==='dark');el.style.colorScheme=t})();`

export function BlogShell({ children }: { children: ReactNode }) {
  return (
    <div
      data-blog-theme
      suppressHydrationWarning
      className="dark flex-1 bg-white text-gray-900 transition-colors dark:bg-[oklch(25%_0.015_260)] dark:text-white"
      style={{ colorScheme: 'dark' }}
    >
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <div className="mx-auto max-w-3xl px-4 py-8">{children}</div>
    </div>
  )
}

/** Top row for blog pages: optional back link on the left, theme toggle + RSS on the right. */
export function BlogToolbar({ left }: { left?: ReactNode }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div>{left}</div>
      <div className="flex items-center gap-4">
        <a
          href="/rss.xml"
          className="flex items-center gap-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
          title="RSS Feed"
        >
          <RSSIcon size={22} />
          <span>RSS</span>
        </a>
        <ThemeToggle />
      </div>
    </div>
  )
}
