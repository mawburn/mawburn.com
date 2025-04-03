## Framework & Libraries
- React Router v7 (renamed from Remix)
- TailwindCSS v4
- **Important**: You will not have context on these libraries. You must follow existing patterns in the folder structure and examine the libraries in node_modules to understand how they work.

### Research Approach
- Examine node_modules packages to understand library functionality
- Start with README.md files in each package
- Follow established patterns in the existing codebase

## Code Style Guidelines
- Adhere to .prettierrc & oxlint.json configurations
- Omit single unused parameters instead of using `(_) => null` syntax
- Avoid useless comments. ONLY comment complex code requiring explanation
- Use `npm` as the package manager

## Troubleshooting
- Avoid using `npm run dev` for error testing (inefficient)
