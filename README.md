# Tax Calculator

A web application that calculates Canadian federal income tax using marginal tax rates. Users enter an annual salary and select a tax year (2019-2022), and the app displays the total tax owed, a band-by-band breakdown, and the effective tax rate.

Built with React 19, TypeScript, and TailwindCSS v4.

## Requirements

- Node.js 22+
- pnpm
- Docker

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
pnpm test:coverage
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL for the tax brackets API | `http://localhost:5001` |

Copy `.env.example` to `.env` to configure locally.

## Key Decisions

**Pure calculation logic** — Tax calculation lives in `shared/utils/taxCalculator.ts`, completely isolated from React. It receives brackets and a salary, returns a result. This makes it trivial to test and reason about independently.

**Retry logic** — The API intentionally throws random 500 errors. The service layer uses `axios-retry` with exponential backoff, retrying up to 3 times before surfacing the error. Retry attempts are logged via `console.warn` for observability.

**shared/ folder** — Types and utilities consumed across multiple layers live in `shared/` to make the boundary between domain logic and UI explicit.

**pnpm** — Chosen over npm and Yarn for its disk efficiency via content-addressable storage with hard links, and faster installs.

## Error Handling

- **Random API failures** — Handled transparently via retry logic; errors surface to the UI only after 3 failed attempts.
- **Unsupported years** — The year selector is restricted to 2019-2022, preventing invalid API calls entirely.
- **Invalid input** — Negative salaries and empty inputs are validated on submit with inline error messages. Stale results are cleared when validation fails.

## Validation

The calculation logic is verified against these expected results (2022 brackets):

| Salary | Total Tax | Effective Rate |
|---|---|---|
| $0 | $0.00 | 0.00% |
| $50,000 | $7,500.00 | 15.00% |
| $100,000 | $17,739.17 | 17.74% |
| $1,234,567 | $385,587.65 | 31.23% |
