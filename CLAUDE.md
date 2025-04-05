## Framework & Libraries

- React Router v7 (renamed from Remix)
- TailwindCSS v4
- **Important**: You will not have context on these libraries. You must follow existing patterns in the folder structure and examine the libraries in node_modules to understand how they work.

## Do's

- Follow existing patterns in the folder structure
- Examine node_modules packages to understand library functionality
- Start with README.md files in each package
- Adhere to .prettierrc & oxlint.json configurations
- Use `pnpm` as the package manager
- Only comment complex code requiring extra explanation
- Always run a typecheck `pnpm typecheck` after creating or updating code

## Don'ts

- DON'T USE COMMENTS unless there is a very unique piece of code that requires extra information
- Don't use `(_) => null` syntax for unused parameters; omit them instead
- Don't use `pnpm run dev` for error testing (inefficient)
- Don't assume knowledge of React Router v7 (Remix renamed to this) or TailwindCSS v4 functionality
- Don't use the `any` type unless absolutely necessary
- Don't typecast unless absolutely necessary
