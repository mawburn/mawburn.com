type FooterProps = {
  maxWidth?: 'max-w-3xl' | 'max-w-4xl'
}

export function Footer({ maxWidth = 'max-w-4xl' }: FooterProps) {
  return (
    <footer className="mt-auto py-8">
      <div className={`container mx-auto ${maxWidth} px-4 py-6`}>
        <div className="text-center text-sm">
          <p className="text-black dark:text-white">
            &copy; {new Date().getFullYear()} Matt Burnett. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
