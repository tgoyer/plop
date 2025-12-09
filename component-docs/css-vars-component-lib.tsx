import React, { useState } from 'react';

// Global tokens (would be in tokens.css)
const tokensCSS = `
@layer tokens;

@layer tokens {
  :root {
    /* Primitive Tokens */
    --color-white: #ffffff;
    --color-gray-50: #f9fafb;
    --color-gray-100: #f3f4f6;
    --color-gray-200: #e5e7eb;
    --color-gray-300: #d1d5db;
    --color-gray-400: #9ca3af;
    --color-gray-500: #6b7280;
    --color-gray-600: #4b5563;
    --color-gray-700: #374151;
    --color-gray-800: #1f2937;
    --color-gray-900: #111827;
    
    --color-blue-50: #eff6ff;
    --color-blue-500: #3b82f6;
    --color-blue-600: #2563eb;
    --color-blue-700: #1d4ed8;
    
    --color-red-50: #fef2f2;
    --color-red-500: #ef4444;
    --color-red-600: #dc2626;
    --color-red-700: #b91c1c;
    
    --color-green-50: #f0fdf4;
    --color-green-500: #22c55e;
    --color-green-600: #16a34a;
    --color-green-700: #15803d;
    
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-3: 0.75rem;
    --spacing-4: 1rem;
    --spacing-6: 1.5rem;
    --spacing-8: 2rem;
    
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    
    --line-height-tight: 1.25;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.75;
    
    --radius-sm: 0.125rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-full: 9999px;
    
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    
    --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Semantic Tokens */
    --text-primary: var(--color-gray-900);
    --text-secondary: var(--color-gray-600);
    --text-tertiary: var(--color-gray-500);
    --text-inverse: var(--color-white);
    
    --bg-primary: var(--color-white);
    --bg-secondary: var(--color-gray-50);
    --bg-tertiary: var(--color-gray-100);
    
    --border-primary: var(--color-gray-200);
    --border-secondary: var(--color-gray-300);
    --border-focus: var(--color-blue-500);
    
    --color-primary: var(--color-blue-600);
    --color-primary-hover: var(--color-blue-700);
    --color-primary-light: var(--color-blue-50);
    
    --color-success: var(--color-green-600);
    --color-success-hover: var(--color-green-700);
    --color-success-light: var(--color-green-50);
    
    --color-danger: var(--color-red-600);
    --color-danger-hover: var(--color-red-700);
    --color-danger-light: var(--color-red-50);
  }
  
  [data-theme="dark"] {
    --text-primary: var(--color-gray-50);
    --text-secondary: var(--color-gray-300);
    --text-tertiary: var(--color-gray-400);
    --text-inverse: var(--color-gray-900);
    
    --bg-primary: var(--color-gray-900);
    --bg-secondary: var(--color-gray-800);
    --bg-tertiary: var(--color-gray-700);
    
    --border-primary: var(--color-gray-700);
    --border-secondary: var(--color-gray-600);
  }
}

@layer utilities;

@layer utilities {
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-4 { gap: var(--spacing-4); }
  .mb-4 { margin-bottom: var(--spacing-4); }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  margin: 0;
  padding: var(--spacing-8);
  transition: all var(--transition-base);
}
`;

// Button.module.css (as string for demo)
const buttonCSS = `
@layer components;

@layer components {
  .button {
    /* Component-specific tokens */
    --btn-padding-x: var(--spacing-4);
    --btn-padding-y: var(--spacing-2);
    --btn-font-size: var(--font-size-base);
    --btn-font-weight: var(--font-weight-medium);
    --btn-border-radius: var(--radius-md);
    
    /* Styles using the tokens */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    padding: var(--btn-padding-y) var(--btn-padding-x);
    font-size: var(--btn-font-size);
    font-weight: var(--btn-font-weight);
    line-height: var(--line-height-tight);
    border: 1px solid transparent;
    border-radius: var(--btn-border-radius);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .primary {
    background-color: var(--color-primary);
    color: var(--text-inverse);
  }
  
  .primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }
  
  .secondary {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border-color: var(--border-primary);
  }
  
  .secondary:hover:not(:disabled) {
    background-color: var(--bg-tertiary);
  }
  
  .danger {
    background-color: var(--color-danger);
    color: var(--text-inverse);
  }
  
  .danger:hover:not(:disabled) {
    background-color: var(--color-danger-hover);
  }
  
  .success {
    background-color: var(--color-success);
    color: var(--text-inverse);
  }
  
  .success:hover:not(:disabled) {
    background-color: var(--color-success-hover);
  }
  
  .small {
    --btn-padding-x: var(--spacing-3);
    --btn-padding-y: var(--spacing-1);
    --btn-font-size: var(--font-size-sm);
  }
  
  .large {
    --btn-padding-x: var(--spacing-6);
    --btn-padding-y: var(--spacing-3);
    --btn-font-size: var(--font-size-lg);
  }
}
`;

// Card.module.css
const cardCSS = `
@layer components;

@layer components {
  .card {
    --card-bg: var(--bg-primary);
    --card-border: var(--border-primary);
    --card-radius: var(--radius-lg);
    --card-padding: var(--spacing-6);
    --card-shadow: var(--shadow-base);
    
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--card-radius);
    padding: var(--card-padding);
    box-shadow: var(--card-shadow);
    margin-bottom: var(--spacing-4);
  }
  
  .header {
    margin-bottom: var(--spacing-4);
    padding-bottom: var(--spacing-4);
    border-bottom: 1px solid var(--border-primary);
  }
  
  .title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--text-primary);
    margin: 0;
  }
  
  .body {
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
  }
}
`;

// Input.module.css
const inputCSS = `
@layer components;

@layer components {
  .input {
    --input-bg: var(--bg-primary);
    --input-border: var(--border-primary);
    --input-text: var(--text-primary);
    --input-placeholder: var(--text-tertiary);
    --input-focus-border: var(--border-focus);
    --input-radius: var(--radius-md);
    --input-padding-x: var(--spacing-3);
    --input-padding-y: var(--spacing-2);
    
    width: 100%;
    padding: var(--input-padding-y) var(--input-padding-x);
    font-size: var(--font-size-base);
    color: var(--input-text);
    background-color: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: var(--input-radius);
    transition: all var(--transition-base);
  }
  
  .input::placeholder {
    color: var(--input-placeholder);
  }
  
  .input:focus {
    outline: none;
    border-color: var(--input-focus-border);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
}
`;

// Badge.module.css
const badgeCSS = `
@layer components;

@layer components {
  .badge {
    --badge-padding-x: var(--spacing-2);
    --badge-padding-y: var(--spacing-1);
    --badge-font-size: var(--font-size-xs);
    --badge-radius: var(--radius-full);
    
    display: inline-flex;
    align-items: center;
    padding: var(--badge-padding-y) var(--badge-padding-x);
    font-size: var(--badge-font-size);
    font-weight: var(--font-weight-medium);
    border-radius: var(--badge-radius);
  }
  
  .primary {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
  }
  
  .success {
    background-color: var(--color-success-light);
    color: var(--color-success);
  }
  
  .danger {
    background-color: var(--color-danger-light);
    color: var(--color-danger);
  }
}
`;

// Simulated CSS Modules (in real app, these would be imported)
const buttonStyles = {
  button: 'button',
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
  success: 'success',
  small: 'small',
  large: 'large'
};

const cardStyles = {
  card: 'card',
  header: 'header',
  title: 'title',
  body: 'body'
};

const inputStyles = {
  input: 'input'
};

const badgeStyles = {
  badge: 'badge',
  primary: 'primary',
  success: 'success',
  danger: 'danger'
};

// Component implementations
function Button({ children, variant = 'primary', size, disabled, onClick }) {
  const classes = [
    buttonStyles.button,
    buttonStyles[variant],
    size && buttonStyles[size]
  ].filter(Boolean).join(' ');
  
  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

function Card({ title, children }) {
  return (
    <div className={cardStyles.card}>
      {title && (
        <div className={cardStyles.header}>
          <h2 className={cardStyles.title}>{title}</h2>
        </div>
      )}
      <div className={cardStyles.body}>
        {children}
      </div>
    </div>
  );
}

function Input({ placeholder, type = 'text', value, onChange }) {
  return (
    <input 
      className={inputStyles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

function Badge({ children, variant = 'primary' }) {
  const classes = [badgeStyles.badge, badgeStyles[variant]].join(' ');
  return <span className={classes}>{children}</span>;
}

function App() {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <style>{tokensCSS}</style>
      <style>{buttonCSS}</style>
      <style>{cardCSS}</style>
      <style>{inputCSS}</style>
      <style>{badgeCSS}</style>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="flex items-center justify-between mb-4">
          <h1 style={{ 
            fontSize: 'var(--font-size-3xl)', 
            fontWeight: 'var(--font-weight-bold)',
            margin: 0 
          }}>
            CSS Modules + Layers Demo
          </h1>
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
          </Button>
        </div>

        <Card title="Component Architecture">
          <p><strong>Each component has its own CSS Module file:</strong></p>
          <ul style={{ marginTop: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
            <li><code>Button.module.css</code> - Button component styles</li>
            <li><code>Card.module.css</code> - Card component styles</li>
            <li><code>Input.module.css</code> - Input component styles</li>
            <li><code>Badge.module.css</code> - Badge component styles</li>
          </ul>
          <p>
            All modules use <code>@layer components</code> to ensure they're in the same specificity layer,
            while remaining scoped via CSS Modules hashing.
          </p>
        </Card>

        <Card title="Button Variants">
          <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          
          <h3 style={{ 
            fontSize: 'var(--font-size-lg)', 
            marginTop: 'var(--spacing-6)',
            marginBottom: 'var(--spacing-2)' 
          }}>
            Button Sizes
          </h3>
          <div className="flex gap-4 items-center" style={{ flexWrap: 'wrap' }}>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary">Default</Button>
            <Button variant="primary" size="large">Large</Button>
          </div>
        </Card>

        <Card title="Form Inputs">
          <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
            <Input 
              placeholder="Enter your name..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input 
              type="email" 
              placeholder="Enter your email..." 
            />
            <Input 
              placeholder="Try typing something..."
            />
          </div>
          {inputValue && (
            <p style={{ marginTop: 'var(--spacing-4)', color: 'var(--text-secondary)' }}>
              You typed: <strong>{inputValue}</strong>
            </p>
          )}
        </Card>

        <Card title="Badges">
          <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </Card>

        <Card title="Interactive Counter">
          <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={() => setCount(count - 1)}>
              Decrease
            </Button>
            <span style={{ 
              fontSize: 'var(--font-size-2xl)', 
              fontWeight: 'var(--font-weight-semibold)',
              minWidth: '60px',
              textAlign: 'center'
            }}>
              {count}
            </span>
            <Button variant="primary" onClick={() => setCount(count + 1)}>
              Increase
            </Button>
            <Button variant="danger" onClick={() => setCount(0)}>
              Reset
            </Button>
          </div>
        </Card>

        <div style={{ 
          marginTop: 'var(--spacing-8)', 
          padding: 'var(--spacing-4)',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)'
        }}>
          <strong>File Structure:</strong>
          <pre style={{ 
            marginTop: 'var(--spacing-2)', 
            marginBottom: 0,
            fontFamily: 'monospace',
            fontSize: 'var(--font-size-xs)'
          }}>{`src/
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
│       └── Badge.module.css    # @layer components`}</pre>
          
          <p style={{ marginTop: 'var(--spacing-4)', marginBottom: 0 }}>
            <strong>Key Benefits:</strong> Each component is self-contained with scoped CSS Modules, 
            but all components share the same layer hierarchy. You can override any component 
            by adding styles in the <code>utilities</code> or <code>overrides</code> layer!
          </p>
        </div>
      </div>
    </>
  );
}

export default App;