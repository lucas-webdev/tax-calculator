# Tax Calculator

A web application that calculates Canadian federal income tax based on annual salary and tax year.
Built with React, TypeScript and TailwindCSS.

## Requirements

- Node.js 22.13.0+
- Yarn
- Docker (to run the API locally)

## Getting Started

### 1. Start the API
```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

### 2. Install dependencies
```bash
yarn
```

### 3. Start the development server
```bash
yarn dev
```

The app will be available at http://localhost:5173.

## Running Tests
```bash
yarn test:run
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL for the tax brackets API | `http://localhost:5001` |

## Architecture

### Project Structure
```
src/
├── shared/
│   ├── types/        # Shared domain types
│   └── utils/        # Pure utility functions
├── components/       # React components
├── hooks/            # Custom React hooks
├── services/         # API communication layer
└── test/             # Test setup
```

### Key Decisions

**Retry logic** — The API throws random errors. The service layer uses `axios-retry` with exponential backoff, retrying up to 3 times on network errors and 500 responses.

**Pure calculation logic** — Tax calculation lives in `shared/utils/taxCalculator.ts`, completely isolated from React and UI concerns. This makes it straightforward to test and reason about independently.

**shared/ folder** — Types and utils that are consumed across multiple layers live in `shared/` to make the boundary between domain logic and UI explicit.