# Contributing to E-Mart

We love your input! We want to make contributing to E-Mart as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process
We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Code Style
- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use React hooks appropriately

## Component Guidelines

### Creating New Components
1. Place components in appropriate directories:
   - UI components in `components/ui`
   - Admin components in `components/admin`
   - Storefront components in `components/storefront`

2. Follow the component template:
```tsx
import { type FC } from 'react'
import { useStore } from '@/providers/store-provider'

interface MyComponentProps {
  // Define props
}

export const MyComponent: FC<MyComponentProps> = ({ ...props }) => {
  // Component logic
  return (
    // JSX
  )
}
```

### State Management
- Use local state for component-specific data
- Use context for global state
- Avoid prop drilling
- Consider performance implications

## Testing Guidelines
1. Write tests for new features
2. Update tests when modifying existing features
3. Ensure all tests pass before submitting PR
4. Follow test naming convention: `describe('ComponentName', () => ...)`

## Bug Reports
We use GitHub issues to track public bugs. Report a bug by opening a new issue!

### Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## Feature Requests
We use GitHub issues to track feature requests. When proposing a feature:

- Explain in detail how it would work
- Keep the scope as narrow as possible
- Remember that this is a volunteer-driven project

## License
By contributing, you agree that your contributions will be licensed under its MIT License.
