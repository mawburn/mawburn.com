type BlogFooterProps = {
  maxWidth?: 'max-w-3xl' | 'max-w-4xl'
}

export function BlogFooter({ maxWidth = 'max-w-4xl' }: BlogFooterProps) {
  return (
    <footer className="mt-auto">
      <div className={`container mx-auto ${maxWidth} px-4 py-6`}>
        <div className="text-center text-sm">
          <p className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
            &copy; {new Date().getFullYear()} Matt Burnett. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
