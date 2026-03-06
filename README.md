# Tax Calculator

A web application that calculates Canadian federal income tax based on annual salary and tax year.
Built with React, TypeScript and TailwindCSS.

## Requirements

- Node.js 22.13.0+
- pnpm
- Docker (to run the API locally)

## Getting Started

### 1. Start the API
```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Start the development server
```bash
pnpm dev
```

The app will be available at http://localhost:5173.

## Running Tests
```bash
pnpm test:run
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

**pnpm as package manager** — chosen over npm and Yarn for its disk efficiency via global store with hard links, and faster installs. Also it is the strongest option today for monorepo setups.

**Retry logic** — As the API throws random errors I decided to use `axios-retry`, retrying up to 3 times on network errors and 500 responses.

**shared/ folder** — Types and utils that are consumed across multiple layers live in `shared/` to make the boundary between domain logic and UI explicit.