CSS Modules + Layers Demo
🌙 Toggle Theme
Component Architecture
Each component has its own CSS Module file:

Button.module.css - Button component styles
Card.module.css - Card component styles
Input.module.css - Input component styles
Badge.module.css - Badge component styles
All modules use @layer components to ensure they're in the same specificity layer, while remaining scoped via CSS Modules hashing.

Button Variants
Primary
Secondary
Success
Danger
Disabled
Button Sizes
Small
Default
Large
Form Inputs
Enter your name...
Enter your email...
Try typing something...
Badges
Primary
Success
Danger
Interactive Counter
Decrease
0
Increase
Reset
File Structure:
src/
├── styles/
│   └── tokens.css              # @layer tokens
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.module.css   # @layer components
│   ├── Card/
│   │   ├── Card.jsx
│   │   └── Card.module.css     # @layer components
│   ├── Input/
│   │   ├── Input.jsx
│   │   └── Input.module.css    # @layer components
│   └── Badge/
│       ├── Badge.jsx
│       └── Badge.module.css    # @layer components
Key Benefits: Each component is self-contained with scoped CSS Modules, but all components share the same layer hierarchy. You can override any component by adding styles in the utilities or overrides layer!