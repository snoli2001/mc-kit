# Core - MC Kit

Core de todo el paquete de librerias de MC Kit, incluye servicios, componentes y herramientas para facilitar el uso.

## Table of Contents

- [Installation](#installation)
  - [1. Install libraries](#1-install-libraries)
  - [2. Add Styles](#2-add-styles)

## Installation

### 1. Install libraries

```bash
npm install --save @mckit/core primeicons primeng primeflex @ngx-pwa/local-storage@18
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 2. Add Styles

**File**: ./src/styles.scss

```scss
@import "primeng/resources/themes/lara-light-blue/theme.css";
@import "primeng/resources/primeng.css";
@import "primeicons/primeicons.css";

/* CSS Layer Configuration for Tailwind and PrimeNG */
@layer tailwind-base, primeng, tailwind-utilities;

/* PrimeNG Layer (no need to modify as the imports handle this) */
@layer primeng {}

/* Components and Utilities Layer for Tailwind */
@layer tailwind-utilities {
    @tailwind components;
    @tailwind utilities;
}

body, html {
    height: 100%;
    margin: 0;
    min-height: 100%;
}
```

### 3. Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
