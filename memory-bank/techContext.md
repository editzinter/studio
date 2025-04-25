# Technical Context

## Technologies
- **Next.js 15.3.1**: React framework for production
- **React 19.0.0**: UI library
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS 4**: Utility-first CSS framework
- **ESLint 9**: Code linting
- **Node.js**: Runtime environment
- **Canvas Library**: To be selected from these options:
  - **Fabric.js**: Powerful canvas manipulation library
  - **Konva.js**: 2D drawing library with mobile support
  - **react-canvas**: React components for canvas
  - **PixiJS**: Fast rendering library with good mobile support

## Development Setup
- **Next.js App Router**: File-based routing system
- **Server Components**: Default in the App Router
- **Geist & Geist Mono fonts**: For typography
- **Light/Dark Mode**: Using media queries and CSS variables
- **Mobile-Responsive Design**: Separate optimized editor for mobile devices

## Technical Constraints
- Browser compatibility (modern browsers)
- Accessibility standards compliance
- Performance optimization for web vitals
- Canvas rendering performance on mobile devices
- Touch interface optimization for the editor

## Dependencies
```json
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next": "15.3.1",
  "fabric": "^5.3.0",        // If selecting Fabric.js
  "konva": "^9.0.0",         // If selecting Konva.js
  "react-konva": "^18.2.10", // If selecting Konva.js
  "pixi.js": "^7.3.1"        // If selecting PixiJS
},
"devDependencies": {
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4",
  "eslint": "^9",
  "eslint-config-next": "15.3.1",
  "@eslint/eslintrc": "^3"
}
```

## Build & Deployment
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start Production**: `npm start`
- **Linting**: `npm run lint`

## Canvas Library Selection Considerations
- **Performance**: How well it performs with complex menu designs
- **Mobile Support**: Touch events and mobile rendering capabilities
- **Features**: Text manipulation, image handling, layering
- **Community**: Active development and support
- **Bundle Size**: Impact on application load time 