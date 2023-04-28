interface FooterProps {}

export const Footer = ({}: FooterProps) => (
  <footer className="bottom-0 text-center text-sm	py-4 px-0">
    &copy; {new Date().getFullYear()} mawburn.com
  </footer>
)
