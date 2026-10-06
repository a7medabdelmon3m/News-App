# 📱 News App - Cross-Platform Mobile News Application

A modern, high-performance mobile news reading application built with **React Native** and **Expo**. Designed to deliver an intuitive, responsive reading experience with file-based routing, global state management, dark/light theme switching, and custom typography.

---

## 📌 1. Project Overview

**News App** provides users with an accessible platform to browse, search, and read breaking news and topical stories from around the world. The architecture focuses on performance, modularity, and clean UX design, ensuring smooth navigation and readable typography across both Android and iOS devices.

---

## 🛠️ 2. Tech Stack & Dependencies

* **Core Framework:** React Native & Expo (Managed Workflow)
* **Navigation & Routing:** Expo Router (File-based navigation with dynamic stack & tab support)
* **Programming Language:** TypeScript (Strict typing for components, state models, and API responses)
* **State Management:** Redux Toolkit (RTK) (Centralized store handling theme preferences, cached articles, and category selections)
* **Networking:** Axios / Fetch API (Consuming RESTful News APIs with error handling)
* **Typography:** Inter Variable & Static Font Family (Complete range from Thin to Black with italic variants for optimal readability)
* **Developer Environment & Tooling:**
  * Workspace settings and editor conventions (`.vscode/`)
  * AI agent development standards and guidelines (`AGENTS.md`, `CLAUDE.md`, `.claude/`)

---

## 🏗 3. Architecture & Project Structure

The project follows a **Modular Clean Architecture** pattern, enforcing clear separation between the presentation layer, business logic, state management, and data access:

```text
News-App/
├── .claude/                # Agent configurations and assistant presets
├── .vscode/                # Editor settings and recommended extensions
├── assets/                 # Static application assets
│   ├── expo.icon/          # App icon and splash screen assets
│   └── fonts/Inter/        # Inter font family files (Variable & Static TTFs)
├── app / src/
│   ├── api/                # API client configuration and network service calls
│   ├── components/         # Reusable UI components (ArticleCard, Header, Skeletons)
│   ├── constants/          # Theme palettes, layout metrics, and static values
│   ├── hooks/              # Custom utility and state hooks (useTheme, useNewsQuery)
│   ├── store/              # Redux Toolkit store setup and slices
│   │   ├── themeSlice.ts   # Dark / Light theme mode state
│   │   └── newsSlice.ts    # Articles caching and category filtering
│   └── (routes) / screens  # File-based application screens via Expo Router
├── app.json                # Expo application manifest configuration
├── AGENTS.md               # Development agent workflows and standards
├── CLAUDE.md               # Code conventions and project guidelines
└── README.md               # Repository documentation
```

### Key Architectural Layers:
1. **Presentation Layer:** Pure, decoupled UI components responsible only for rendering views and handling user input.
2. **Navigation Layer:** Expo Router manages navigation stacks and deep links declaratively via file structure.
3. **Application State Layer:** Redux Toolkit slices manage app-wide state—including active theme, current category filter, and cached feeds—without unnecessary prop-drilling.
4. **Data Access Layer:** Dedicated API modules handle endpoint communication, payload parsing, and error normalization.

---

## 📋 4. Development Workflow & Implementation Phases

### Phase 1: Foundation & Tooling Setup
* Initialized the Expo project structure with TypeScript integration.
* Configured workspace rules and assistant instructions (`.vscode/settings.json`, `CLAUDE.md`, `AGENTS.md`) for consistent code standards.
* Imported and registered the full **Inter** typography suite with asynchronous font loading (`expo-font`).

### Phase 2: State Management & Theming Engine
* Built the central store using Redux Toolkit.
* Developed `themeSlice` to support instant switching between Light Mode and Dark Mode.
* Configured state slices for category filtering and article caching.

### Phase 3: Component Library & Screen Development
* Created responsive News Card components displaying media thumbnails, source badges, publication timestamps, and titles.
* Built dynamic Category Selector tabs (Business, Technology, Sports, Health, Entertainment, General).
* Implemented the Home Feed screen and Article Details viewer.
* Added Skeleton loaders and custom error views for loading states.

### Phase 4: API Integration & UX Polishing
* Integrated external News API services to deliver live articles.
* Added Pull-to-Refresh (`RefreshControl`) for on-demand feed updates.
* Optimized list virtualization using `FlatList` to maintain steady 60fps scrolling performance.

---

## 🌟 5. Key Features

* **Category-Based Filtering:** Browse articles organized by specific topics and industries.
* **Instant Search:** Quickly find stories and breaking headlines.
* **Dark & Light Mode:** Tailored color palettes for comfortable reading in all lighting conditions.
* **Custom Typography:** Editorial reading experience powered by the complete Inter font family.
* **Responsive Layout:** Adaptive design tailored for various screen dimensions and device orientations.

---

## 🚀 6. Getting Started

### Prerequisites
* Node.js (v18 or later)
* npm, yarn, or bun
* Expo Go app installed on your physical device (iOS or Android)

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/a7medabdelmon3m/news-app.git](https://github.com/a7medabdelmon3m/news-app.git)
   cd news-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npx expo start
   ```

4. Launch the application:
   * Scan the terminal's QR code using **Expo Go** on Android or the Camera app on iOS.
   * Press `a` to run on an Android emulator, or `i` for the iOS simulator.

---

## 📄 7. License

This project is licensed under the terms specified in the repository's `LICENSE` file.
