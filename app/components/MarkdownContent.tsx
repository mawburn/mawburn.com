import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const markdownContentVariants = cva('text-gray-800 dark:text-gray-200 leading-relaxed', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const markdownStyles = {
  paragraphs: '[&_p]:mb-6',
  links:
    '[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-1 [&_a]:hover:text-blue-800 [&_a]:hover:dark:text-blue-300 [&_a]:transition-colors',
  headings: {
    h1: '[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-10',
    h2: '[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-5 [&_h2]:mt-8',
    h3: '[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:mt-6',
    h4: '[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-3 [&_h4]:mt-4',
    h5: '[&_h5]:text-lg [&_h5]:font-semibold [&_h5]:mb-2 [&_h5]:mt-3',
    h6: '[&_h6]:text-base [&_h6]:font-semibold [&_h6]:mb-2 [&_h6]:mt-3',
  },
  lists: {
    ul: '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6',
    ol: '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6',
    li: '[&_li]:mb-2',
  },
}

interface MarkdownContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof markdownContentVariants> {
  html: string
}

export function MarkdownContent({ html, className, variant, ...props }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        markdownContentVariants({ variant }),
        markdownStyles.paragraphs,
        markdownStyles.links,
        Object.values(markdownStyles.headings).join(' '),
        Object.values(markdownStyles.lists).join(' '),
        'mb-12',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  )
}
