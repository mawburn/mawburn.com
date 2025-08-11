import { cva, type VariantProps } from 'class-variance-authority'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const markdownContentVariants = cva(
  'text-gray-800 dark:text-gray-200 leading-loose font-inter text-lg',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const markdownStyles = {
  paragraphs: '[&_p]:mb-8',
  links:
    '[&_a]:text-blue-600 [&_a]:dark:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-1 [&_a]:hover:text-blue-800 [&_a]:hover:dark:text-blue-300 [&_a]:transition-colors',
  headings: {
    h1: '[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-10 [&_h1]:[font-size:2.25rem]',
    h2: '[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-5 [&_h2]:mt-8 [&_h2]:[font-size:1.875rem]',
    h3: '[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:mt-6 [&_h3]:[font-size:1.5rem]',
    h4: '[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-3 [&_h4]:mt-4 [&_h4]:[font-size:1.25rem]',
    h5: '[&_h5]:text-lg [&_h5]:font-semibold [&_h5]:mb-2 [&_h5]:mt-3 [&_h5]:[font-size:1.125rem]',
    h6: '[&_h6]:text-base [&_h6]:font-semibold [&_h6]:mb-2 [&_h6]:mt-3 [&_h6]:[font-size:1rem]',
  },
  lists: {
    ul: '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6',
    ol: '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6',
    li: '[&_li]:mb-2',
  },
  blockquotes:
    '[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:dark:border-gray-600 [&_blockquote]:pl-4 [&_blockquote]:mb-4 [&_blockquote]:italic [&_blockquote]:font-inter [&_blockquote]:text-gray-700/75 [&_blockquote]:dark:text-gray-200/75',
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
        markdownStyles.blockquotes,
        'mb-12',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  )
}
