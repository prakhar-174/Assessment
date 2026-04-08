# Apex Calendar: Post-AI Analog Dashboard

A high-fidelity, interactive React dashboard that harmonizes modern minimalist layout constraints with the tactile aesthetic of physical printed materials.

## 🚀 Key Features

- **Physical Wall Calendar Frame**: Realistic spiral binding, nail-hole cutout, and strict physical sizing (`100vh` constraint) to simulate a printed object perfectly nested on a screen.
- **Warm "Post-AI" Aesthetic**: The application discards neon gloss and glassmorphism in favor of a flat, organic Cream and Deep Earth color palette built to replicate matte-finish print materials.
- **Apex Calendar Layout**: 
  - **Dynamic Hero Card**: Atmospheric imagery overlaid with Work Sans bold geometric typography that physically "jitters" upon transitioning months using Framer motion.
  - **Curated Schedule**: Precise, squared date grid leveraging Sunset Orange limits and flat Peach connectivity spanning paths.
  - **Monthly Intentions**: Integrated note-taking panel mapped with an authentic "dark ink" ruled paper texture.
- **Smart Entry Flow**: 
  - **FAB Interaction**: A spinning Floating Action Button triggering an inline modal overlay without breaking form factor.
  - **Contextual Logging**: Automatically captures selected date ranges (or defaults to today) and directly pipes formatted memos into the monthly intentions list.
  - **Success States**: Flat Emerald Green success validation immediately triggers across the calendar grid blocks upon data capture.
- **Persistence**: Fully functional, fully decoupled `localStorage` integration separating distinct intentions and ranges uniquely for individual calendar grid months.

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Date Utility**: date-fns
- **Icons**: Lucide React

## 🏗️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository (or extract the assessment files).
2. Navigate to the project directory:
   ```bash
   cd FrontendAssessment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```

### Building for Production
To create an optimized production bundle:
```bash
npm run build
```

## 🎨 Design Evolution

This project evolved profoundly across multiple architectural iterations:
1. **The Physical Wrapper**: Began with strict analog references (Drop shadows to create Z-depth).
2. **Glassmorphic Bento Grid**: Transitioned into a massive, data-heavy "Obsidian" themed interface loaded directly with complex gradient blurring constraints.
3. **The Apex Purge**: Stripped away vague spatial excess to lock down a strict 100vh fit. Eliminated excessive glow logic to deliver a clean, crisp "print" aesthetic anchored exclusively by warm Creams, raw Deep Earth browns, and flat Sunset Orange accents.