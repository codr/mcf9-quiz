# MCF9 Quiz App

A simple quiz application built with React, TypeScript, and Vite. Users can respond to survey questions on a 1-5 agreement scale and receive instant results.

## Features

- **Interactive Quiz** - Present questions and collect 1-5 scale responses from users
- **Reverse Scoring** - Support for negatively-phrased questions that score in reverse
- **Dynamic Results** - Display total scores with performance brackets (Low, Moderate, High)
- **Navigation** - Move between questions, review previous answers, or reset the quiz
- **Responsive Design** - Clean, flat design that works across devices
- **Fast Development** - Built with Vite for instant HMR and blazing fast builds

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

## Project Structure

```
src/
  ├── App.tsx          # Main quiz component with logic
  ├── App.css          # Styling for quiz interface
  ├── main.tsx         # React entry point
  ├── index.css        # Global styles
  └── assets/          # Static assets
```

## Customizing Questions

Edit the `QUESTIONS` array in [src/App.tsx](src/App.tsx) to modify quiz content:

```tsx
const QUESTIONS: Question[] = [
  { id: 1, text: "Question text here" },
  { id: 2, text: "Negatively phrased question", reversed: true },
  // Add more questions...
];
```

### Question Options

- `id` - Unique identifier for the question
- `text` - The question text displayed to users
- `reversed` (optional) - Set to `true` for reverse scoring (5→1, 4→2, etc.)

## Score Brackets

Results are categorized based on performance:

- **Low** - 0-40% of maximum score
- **Moderate** - 40-70% of maximum score
- **High** - 70%+ of maximum score

Customize bracket thresholds and messages in the `getScoreBracket()` function in [src/App.tsx](src/App.tsx).

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **ESLint** - Code quality

## License

MIT
