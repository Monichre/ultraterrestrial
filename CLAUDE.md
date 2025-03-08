# CLAUDE.md - Ultraterrestrial App Guidelines

## Build/Lint/Test Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`
- Storybook: `npm run storybook`
- Create new component: `npm run new` (uses plop)

## Code Style Guidelines
- **Formatting**: Use Prettier with semicolons disabled, single quotes, 100 char line length
- **Imports**: Group by external/internal/types, use absolute paths with `@/` prefix
- **Components**: Prefer functional components with explicit typing
- **Naming**: PascalCase for components/types, camelCase for variables/functions
- **Types**: Strict typing enabled, avoid `any`, prefer explicit interfaces/types
- **State Management**: Use React context for global state, hooks for local state
- **Error Handling**: Use try/catch for async operations, provide meaningful error messages
- **CSS**: Use Tailwind for styling, custom components for reusable UI elements
- **Folder Structure**: Feature-based organization with domain-driven design
- **Comments**: Add JSDoc for complex functions, avoid unnecessary comments

## Tech Stack
- NextJS, TypeScript, React
- Tailwind CSS with Animation
- Framer Motion for animations
- 3D: Three.js / R3F
- Data Visualization: D3, deck.gl
- AI: OpenAI, Anthropic, LangChain