# Contributing to DevControl

Thank you for your interest in contributing to DevControl! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Getting Started

DevControl is a developer portal built with Next.js 15, React 19, and Express.js. Before contributing, please:

1. Read the [README.md](./README.md) to understand the project
2. Check existing [issues](https://github.com/GoddeyUwamari/devcontrol/issues) and [pull requests](https://github.com/GoddeyUwamari/devcontrol/pulls)
3. Join discussions to understand ongoing work

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Installation

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/devcontrol.git
   cd devcontrol
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

3. **Set up environment variables:**
   ```bash
   # Copy example env files
   cp .env.example .env.local
   cd backend && cp .env.example .env && cd ..
   ```

4. **Start PostgreSQL and create database:**
   ```bash
   createdb devcontrol_db
   ```

5. **Run database migrations:**
   ```bash
   cd backend
   npm run db:migrate
   cd ..
   ```

6. **Start development servers:**
   ```bash
   npm run dev
   ```

   This starts:
   - Frontend: `http://localhost:3010`
   - Backend API: `http://localhost:8080`

## Code Style

### TypeScript

- Use TypeScript strict mode
- Prefer `type` over `interface` for simple type aliases
- Use `interface` for objects that may be extended
- Avoid `any` types - use proper typing or `unknown`

### React/Next.js

- Use functional components with hooks
- Prefer `useForm` from React Hook Form for forms
- Use Zod for validation schemas
- Follow Next.js 15 App Router conventions
- Use `'use client'` directive when needed

### Naming Conventions

- **Files**: kebab-case for files (e.g., `services.service.ts`)
- **Components**: PascalCase (e.g., `ServiceCard.tsx`)
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### Code Organization

```
app/                    # Next.js app directory
  ├── (auth)/          # Auth-related pages
  ├── dashboard/       # Dashboard page
  ├── services/        # Services pages
  ├── deployments/     # Deployments pages
  └── infrastructure/  # Infrastructure pages
components/            # Reusable components
  └── ui/             # UI primitives
lib/                  # Utilities and services
  ├── services/       # API service clients
  └── types.ts        # Shared TypeScript types
backend/              # Express.js backend
  ├── src/
  │   ├── routes/     # API routes
  │   ├── controllers/# Route controllers
  │   ├── repositories/ # Database layer
  │   └── validators/ # Zod schemas
```

### Comments

- Add comments for complex logic
- Use JSDoc for exported functions
- Avoid obvious comments
- Keep comments up-to-date with code changes

**Good:**
```typescript
/**
 * Calculates monthly AWS cost across all running resources
 * @param resources - Array of infrastructure resources
 * @returns Total monthly cost in USD
 */
export function calculateMonthlyCost(resources: InfrastructureResource[]): number {
  return resources
    .filter(r => r.status === 'running')
    .reduce((sum, r) => sum + r.costPerMonth, 0)
}
```

**Bad:**
```typescript
// This function adds two numbers
function add(a: number, b: number) {
  return a + b // return sum
}
```

## Pull Request Process

### Before Submitting

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Write clean, readable code
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation

3. **Test your changes:**
   ```bash
   npm run build        # Ensure it builds
   npm run lint         # Fix any linting errors
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add awesome feature

   - Detailed description of what changed
   - Why it was needed
   - Any breaking changes
   "
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

### Submitting the PR

1. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request:**
   - Go to [devcontrol repository](https://github.com/GoddeyUwamari/devcontrol)
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

3. **PR Requirements:**
   - Clear title describing the change
   - Description of what changed and why
   - Screenshots (if UI changes)
   - Link to related issue (if applicable)
   - All CI checks passing

### PR Review Process

- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, your PR will be merged
- Your contribution will be credited in the release notes

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Description:** Clear description of the bug
2. **Steps to Reproduce:**
   - Step-by-step instructions
   - Expected behavior
   - Actual behavior
3. **Environment:**
   - OS and version
   - Node.js version
   - Browser (if frontend issue)
4. **Screenshots:** If applicable
5. **Error Messages:** Full error stack trace

### Security Issues

**DO NOT** open public issues for security vulnerabilities. Instead, email [projectmanager@wayuptechn.com](mailto:projectmanager@wayuptechn.com) with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Feature Requests

We welcome feature requests! Please:

1. **Check existing issues** to avoid duplicates
2. **Describe the feature** clearly
3. **Explain the use case** - why is it needed?
4. **Provide examples** of how it would work
5. **Consider alternatives** - what other solutions exist?

## Development Guidelines

### Adding New Features

1. **Plan first:** Discuss with maintainers in an issue
2. **Keep it scoped:** One feature per PR
3. **Update types:** Add TypeScript types for new data structures
4. **Update docs:** Document new features in README or API docs
5. **Add examples:** Show how to use the feature

### Backend Changes

- Add validation schemas in `validators/schemas.ts`
- Follow repository pattern for database operations
- Return consistent API responses
- Handle errors gracefully

### Frontend Changes

- Use existing UI components when possible
- Ensure responsive design (mobile-first)
- Add loading and error states
- Use React Query for server state management

### Database Changes

- Create migration scripts
- Never drop data without warning
- Test migrations both up and down
- Update seed data if needed

## Testing

While we don't have a comprehensive test suite yet, please:

- Manually test all changes thoroughly
- Test on different browsers (Chrome, Firefox, Safari)
- Test responsive design at various screen sizes
- Verify API endpoints with tools like Postman or curl

## Questions?

- Open a [discussion](https://github.com/GoddeyUwamari/devcontrol/discussions)
- Email: [projectmanager@wayuptechn.com](mailto:projectmanager@wayuptechn.com)
- Check existing documentation in `/docs`

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to DevControl!** 🚀

Your contributions help make developer operations more accessible and efficient for teams everywhere.
