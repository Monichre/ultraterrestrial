# Agentic Lab Project Guidelines

## Build & Test Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint and fix with ESLint
- `node --test src/path/to/test.ts` - Run single test

## Code Style
- **Formatting**: Uses Prettier (double quotes, 2 spaces) and Biome
- **Imports**: Alphabetized, grouped by type, no spaces between imports
- **Types**: Explicit TypeScript types, avoid `any` when possible
- **Naming**: camelCase for variables/functions, PascalCase for components/classes
- **Error Handling**: Use try/catch with appropriate error logging
- **Components**: Prefer functional components with hooks
- **State Management**: Use context where appropriate for shared state
- **Testing**: Node's built-in test runner with assert

## Project Organization
- Feature-based directory structure in `/src`
- React components in `/src/components`
- API routes in `/src/app/api`