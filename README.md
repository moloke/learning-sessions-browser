# Learning Sessions Browser

A React-based web application for browsing and managing AI learning sessions. Built as part of a take-home assessment.

## Features

- **Search**: Filter sessions by title with 300ms debounce
- **Sort**: Toggle between ascending/descending popularity sort with stable sorting
- **Completion Tracking**: Mark sessions as complete/incomplete
- **Loading & Error States**: Simulated 500ms network delay with error simulation
- **Text Highlighting**: Search matches are highlighted in yellow
- **Accessibility**: Full keyboard navigation, ARIA attributes, and semantic HTML
- **Responsive Design**: Works on desktop and mobile devices

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Search**: Type in the search box to filter sessions by title (case-insensitive)
2. **Sort**: Click the "Sort: Popularity ↓/↑" button to toggle sort order
3. **Mark Complete**: Click the "Mark Complete" button on any session card
4. **Error Testing**: Click "Simulate Error" button, then trigger a retry to test error handling

## Project Structure

```
├── src/
│   ├── App.jsx           # Main application component
│   ├── api.js            # API layer with simulated fetch
│   ├── mockData.js       # Session data
│   ├── main.jsx          # Application entry point
│   └── index.css         # TailwindCSS imports
├── DECISION_LOG.md       # Technical decision documentation
└── package.json          # Dependencies and scripts
```

## Technical Decisions

See [DECISION_LOG.md](DECISION_LOG.md) for detailed explanations of:
- Data coercion strategy
- Debounce implementation
- Stable sorting approach
- Accessibility implementation

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Programming language

## Accessibility Features

- Semantic HTML elements (`<button>`, `<ul>`, `<li>`)
- ARIA attributes (`aria-pressed`, `role="status"`, `aria-live`)
- Keyboard navigation support
- High contrast colors (WCAG AA compliant)
- Focus indicators on all interactive elements

## Time Investment

Developed in approximately 60-75 minutes, focusing on:
- Core requirements implementation
- Clean, maintainable code
- Accessibility best practices
- One stretch goal: text highlighting
