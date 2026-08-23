[NOTES](https://drive.google.com/file/d/1Uh9KDhcsAqlsKG35Vl4-AcZRYDsi4WhQ/view?usp=drive_link)
# React — Complete Topics

## 1. React Fundamentals

* What is React?
* Why React?
* React vs traditional DOM manipulation
* React's declarative approach
* React ecosystem
* React library vs framework
* Single Page Applications (SPA)
* React applications and UI composition
* React rendering model
* React's component-based architecture
* React project structure
* Installing React
* Vite + React
* React Developer Tools

---

# 2. JSX

* What is JSX?
* JSX syntax
* JSX expressions
* Embedding JavaScript in JSX
* JSX attributes
* `className`
* `htmlFor`
* Inline styles
* Self-closing elements
* JSX comments
* Fragments
* Expressions vs statements
* Conditional JSX
* Rendering arrays
* Rendering objects
* JSX escaping
* JSX transformation
* JSX vs HTML
* Common JSX errors

Example concepts:

```jsx
const name = "John";

function App() {
  return <h1>Hello {name}</h1>;
}
```

---

# 3. Components

## Functional Components

* Function components
* Component naming
* Component return values
* Component composition
* Reusable components
* Component responsibilities

## Component Composition

* Parent components
* Child components
* Nested components
* Component hierarchy
* `children` prop
* Layout components
* Wrapper components
* Compound components

## Component Design

* Presentational components
* Container components
* Smart vs dumb components
* Reusable vs specialized components
* Component boundaries
* Single responsibility
* Avoiding unnecessary abstraction

---

# 4. Props

* What are props?
* Passing props
* Receiving props
* Multiple props
* Destructuring props
* Default values
* Boolean props
* Object props
* Array props
* Function props
* JSX props
* `children`
* Passing components as props
* Prop drilling
* Props vs state
* Immutable props

Example:

```jsx
function User({ name, age }) {
  return (
    <p>
      {name} - {age}
    </p>
  );
}
```

---

# 5. State

* What is state?
* `useState`
* State initialization
* Updating state
* State updates
* State batching
* Functional state updates
* State immutability
* Objects in state
* Arrays in state
* Nested state
* Derived state
* State preservation
* State reset
* Lazy state initialization

Example:

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

Functional update:

```jsx
setCount(prev => prev + 1);
```

---

# 6. Events

* React events
* Event handlers
* `onClick`
* `onChange`
* `onSubmit`
* `onMouseEnter`
* Keyboard events
* Form events
* Passing arguments to handlers
* Event propagation
* Event bubbling
* `preventDefault`
* `stopPropagation`
* Synthetic events

---

# 7. Conditional Rendering

* `if`
* `else`
* Ternary operator
* Logical `&&`
* Logical `||`
* Nullish values
* Early returns
* Conditional components
* Loading states
* Empty states
* Error states
* Authentication-based rendering

Example:

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

---

# 8. Rendering Lists

* `map()`
* Rendering arrays
* `key`
* Why keys matter
* Stable keys
* Index as key
* Dynamic lists
* Nested lists
* Lists with components
* Adding/removing items
* Updating list items

Example:

```jsx
users.map(user => (
  <User key={user.id} user={user} />
))
```

---

# 9. Forms

* Controlled components
* Uncontrolled components
* Input state
* Text inputs
* Checkboxes
* Radio buttons
* Select elements
* Textareas
* Multiple inputs
* Form submission
* Form validation
* Error messages
* Form reset
* Dynamic forms
* File inputs
* Form libraries

Important libraries:

* React Hook Form
* Formik
* Zod

---

# 10. Lifting State Up

* Sharing state between components
* Moving state to common parent
* Controlled components
* Parent-child communication
* Sibling communication
* State ownership
* Single source of truth

Concept:

```text
       Parent
       /    \
   Child A  Child B
```

If both children need the same state, move that state into the parent.

---

# 11. Component Communication

## Parent → Child

Props.

## Child → Parent

Callback functions.

## Sibling → Sibling

Move shared state to their common parent.

## Distant Components

* Context
* State management libraries
* External stores

---

# 12. Hooks

## Rules of Hooks

* Only call hooks at the top level
* Only call hooks from React functions
* Why hooks have rules
* Hook ordering

## Built-in Hooks

* `useState`
* `useEffect`
* `useContext`
* `useReducer`
* `useRef`
* `useMemo`
* `useCallback`
* `useLayoutEffect`
* `useImperativeHandle`
* `useId`
* `useTransition`
* `useDeferredValue`
* `useSyncExternalStore`
* `useDebugValue`

---

# 13. useEffect

* What is an Effect?
* Side effects
* Dependency array
* Effect execution
* Cleanup functions
* Mount/update/unmount mental model
* Fetching data
* Event subscriptions
* Timers
* Browser APIs
* Synchronizing with external systems
* Avoiding unnecessary effects
* Effect dependency mistakes
* Infinite loops
* Race conditions
* Cleanup

Example:

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

Important:

> `useEffect` is primarily for synchronizing React with systems outside React, not for calculating ordinary derived values.

---

# 14. useRef

* What is `useRef`?
* Persisting values between renders
* DOM references
* Focusing inputs
* Previous values
* Mutable values
* `ref.current`
* Refs vs state
* Forwarding refs
* Imperative APIs

Example:

```jsx
const inputRef = useRef(null);

inputRef.current.focus();
```

---

# 15. useContext

* Context API
* Creating context
* Provider
* Consumer
* `useContext`
* Global-ish values
* Theme
* Authentication
* Locale
* Avoiding prop drilling
* Context performance
* Splitting contexts

---

# 16. useReducer

* Reducer concept
* Actions
* Dispatch
* State transitions
* Complex state
* `useReducer`
* Reducer purity
* Reducer patterns
* `useReducer` + Context

Example:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

dispatch({
  type: "increment"
});
```

---

# 17. Custom Hooks

* What are custom hooks?
* Extracting reusable logic
* Naming conventions
* Sharing behavior
* Hook composition
* Custom data-fetching hooks
* Custom form hooks
* Custom browser hooks
* Custom authentication hooks

Example:

```jsx
function useOnlineStatus() {
  // reusable logic
}
```

---

# 18. State Management

## Local State

* `useState`
* `useReducer`

## Shared State

* Context
* External stores

## State Categories

* UI state
* Server state
* Form state
* URL state
* Global application state
* Derived state

## Libraries

* Redux
* Redux Toolkit
* Zustand
* Jotai
* MobX

Important distinction:

> Server state and client state are different problems.

---

# 19. Context API

* Creating context
* Providing context
* Consuming context
* Multiple contexts
* Context composition
* Context + reducer
* Authentication context
* Theme context
* Context performance
* When NOT to use context

---

# 20. Re-rendering

* What causes a component to render?
* Parent renders
* State updates
* Context updates
* Props changes
* Reconciliation
* Component identity
* State preservation
* State reset
* Referential equality
* Render vs commit

---

# 21. React Rendering Model

* Render phase
* Commit phase
* Reconciliation
* Virtual DOM concept
* React elements
* Fiber architecture
* Component tree
* DOM updates
* Batching
* Concurrent rendering
* Interruptible rendering
* Scheduling

---

# 22. React Strict Mode

* What Strict Mode does
* Development-only behavior
* Detecting unsafe patterns
* Effect re-running
* Component re-rendering
* Finding accidental side effects
* Strict Mode misconceptions

---

# 23. React 18+ Concepts

* Automatic batching
* Concurrent rendering
* Transitions
* `useTransition`
* `useDeferredValue`
* Suspense improvements
* Streaming
* Concurrent features

---

# 24. React 19 Concepts

* Actions
* Form Actions
* `useActionState`
* `useOptimistic`
* `use`
* Server Components concepts
* Server Functions / Server Actions concepts
* Improved form handling
* Ref as a prop
* Metadata support
* Resource preloading

---

# 25. Suspense

* What is Suspense?
* Suspense boundaries
* Fallback UI
* Lazy loading
* Code splitting
* Data-loading patterns
* Nested Suspense
* Streaming UI
* Suspense with frameworks

Example:

```jsx
<Suspense fallback={<Loading />}>
  <Profile />
</Suspense>
```

---

# 26. Error Handling

* JavaScript errors
* Error boundaries
* `ErrorBoundary`
* Fallback UI
* Component errors
* Async errors
* API errors
* Form errors
* Error recovery
* Retry mechanisms
* Global error handling

---

# 27. Lazy Loading

* `lazy()`
* Dynamic imports
* Code splitting
* Bundle splitting
* Suspense + lazy
* Route-based splitting
* Component-based splitting
* Loading states

Example:

```jsx
const Dashboard = lazy(() => import("./Dashboard"));
```

---

# 28. Performance Optimization

* Avoiding unnecessary renders
* Component splitting
* `memo`
* `useMemo`
* `useCallback`
* Lazy loading
* Code splitting
* Virtualization
* Debouncing
* Throttling
* Stable references
* Expensive calculations
* Large lists
* Network optimization
* Image optimization

Important:

> Memoization is not automatically an optimization. It can add complexity and overhead when the computation or rendering is already cheap.

---

# 29. React.memo

* What `memo` does
* Props comparison
* Referential equality
* When memoization helps
* When memoization does nothing
* Custom comparison
* Memoization pitfalls

---

# 30. useMemo

* Memoizing calculations
* Dependency array
* Referential equality
* Expensive calculations
* Derived values
* When not to use `useMemo`

---

# 31. useCallback

* Memoizing functions
* Function identity
* Dependency array
* `React.memo` interaction
* When callbacks need stabilization
* When `useCallback` is unnecessary

---

# 32. Lists & Large Data

* Rendering large lists
* Pagination
* Infinite scrolling
* Virtualization
* Windowing
* `react-window`
* TanStack Virtual
* Performance profiling

---

# 33. Routing

React itself does not provide full application routing.

Common solution:

* React Router

Topics:

* Routes
* Route parameters
* Nested routes
* Layout routes
* Navigation
* Links
* Redirects
* Query parameters
* Search params
* Protected routes
* 404 routes
* Lazy routes
* Route loaders
* Route actions
* Navigation state

---

# 34. Data Fetching

* `fetch`
* REST APIs
* GraphQL
* Loading state
* Error state
* Empty state
* Request cancellation
* Race conditions
* Caching
* Refetching
* Pagination
* Infinite queries
* Mutations
* Optimistic updates

Libraries:

* TanStack Query
* SWR
* Apollo Client

---

# 35. Server State

Understand:

* Fetching
* Caching
* Stale data
* Background refetching
* Retry
* Mutations
* Optimistic updates
* Pagination
* Infinite queries
* Query invalidation

TanStack Query is an important topic here.

---

# 36. Authentication

* Login
* Logout
* Signup
* Session management
* Access tokens
* Refresh tokens
* Cookies
* Protected routes
* Authorization
* Role-based access
* Permission-based access
* Loading authentication state
* Handling expired sessions

---

# 37. React + TypeScript

* Typing components
* Props interfaces
* Type aliases
* Event types
* `useState` types
* `useReducer` types
* `useRef` types
* `useContext` types
* Custom hook types
* Generic components
* Children typing
* API response types
* Discriminated unions
* Avoiding unnecessary `any`

---

# 38. Styling React Applications

## CSS

* CSS files
* CSS modules
* Global CSS
* CSS variables

## Other Approaches

* Tailwind CSS
* CSS-in-JS
* Styled Components
* Emotion

Topics:

* Responsive design
* Themes
* Dark mode
* Design tokens
* Component styling
* Conditional classes

---

# 39. Accessibility

* Semantic HTML
* ARIA
* Keyboard navigation
* Focus management
* Screen readers
* Accessible forms
* Accessible buttons
* Accessible dialogs
* Accessible navigation
* Color contrast
* Focus indicators
* `aria-label`
* `aria-describedby`

---

# 40. Testing React

## Unit Testing

* Vitest
* Jest

## Component Testing

* React Testing Library

## End-to-End Testing

* Playwright
* Cypress

Topics:

* Rendering components
* User interactions
* Queries
* Mocking APIs
* Testing forms
* Testing loading states
* Testing errors
* Testing accessibility
* Integration tests
* E2E tests

Testing principle:

> Test what the user can observe and do rather than testing React's internal implementation details.

---

# 41. React DevTools

* Components panel
* Props inspection
* State inspection
* Hooks inspection
* Profiler
* Render analysis
* Component tree
* Performance investigation

---

# 42. Debugging

* Console debugging
* React DevTools
* Error boundaries
* Network debugging
* Infinite render loops
* Infinite effects
* Stale closures
* Incorrect dependencies
* State mutation
* Key problems
* Race conditions
* Memory leaks

---

# 43. Common React Bugs

* Mutating state
* Incorrect keys
* Missing effect dependencies
* Infinite effects
* Stale closures
* State updates based on stale state
* Unnecessary effects
* Prop drilling
* Overusing context
* Overusing global state
* Overusing memoization
* Fetching inside the wrong lifecycle
* Race conditions
* Incorrect cleanup
* Conditional hooks
* Hooks inside loops
* Hooks inside conditions

---

# 44. Closures in React

Understand JavaScript closures because React relies heavily on them.

Topics:

* Lexical scope
* Closures
* Stale closures
* Effects and closures
* Event handlers
* Timers
* Async callbacks
* Dependency arrays

---

# 45. Immutability

* Why React expects immutable updates
* Object updates
* Array updates
* Nested updates
* Spread syntax
* Functional updates
* Immer
* State mutation bugs

Example:

```jsx
setUser(prev => ({
  ...prev,
  name: "Alex"
}));
```

---

# 46. Advanced Component Patterns

* Compound components
* Render props
* Higher-order components
* Controlled components
* Uncontrolled components
* Headless components
* Provider pattern
* Custom hooks
* Slot patterns
* Component composition
* Polymorphic components

---

# 47. Portals

* `createPortal`
* Modals
* Dialogs
* Tooltips
* Dropdowns
* Rendering outside parent DOM hierarchy
* Event behavior with portals

Example:

```jsx
createPortal(
  <Modal />,
  document.body
);
```

---

# 48. Refs & Imperative APIs

* `useRef`
* DOM refs
* Ref forwarding
* Imperative handles
* `useImperativeHandle`
* Focus management
* Imperative component APIs
* Ref cleanup

---

# 49. Animations

* CSS transitions
* CSS animations
* React transitions
* React Transition Group
* Framer Motion / Motion
* Layout animations
* Enter/exit animations
* Gesture interactions
* Performance considerations

---

# 50. Internationalization

* Multiple languages
* Translation files
* Locale detection
* Number formatting
* Date formatting
* Currency formatting
* RTL languages
* `Intl`
* i18next
* react-intl

---

# 51. React Architecture

Learn how to organize large applications.

Example:

```text
src/
├── components/
├── features/
├── hooks/
├── pages/
├── routes/
├── services/
├── store/
├── utils/
├── types/
└── assets/
```

Topics:

* Feature-based architecture
* Layered architecture
* Shared components
* Domain logic
* API services
* State boundaries
* Dependency management
* Component boundaries
* Separation of concerns

---

# 52. Design Systems

* Design tokens
* Component libraries
* Button systems
* Input systems
* Modal systems
* Typography
* Spacing
* Colors
* Themes
* Component variants
* Storybook

---

# 53. Storybook

* Component development
* Stories
* Args
* Controls
* Component documentation
* Visual testing
* Interaction testing
* Accessibility testing
* Design-system development

---

# 54. React Server Components

Understand:

* Client Components
* Server Components
* `"use client"`
* Server rendering
* Component boundaries
* Serialization
* Server-only code
* Client-only code
* Data fetching
* Server Components vs Client Components

This is especially important when using frameworks such as Next.js.

---

# 55. React Frameworks

React itself is the UI library. For full applications, frameworks provide additional capabilities.

Important ecosystem:

* Next.js
* React Router framework features
* Remix / React Router
* Expo for React Native

For Next.js specifically:

* App Router
* Server Components
* Client Components
* Layouts
* Pages
* Loading UI
* Error UI
* Route handlers
* Server Actions
* Caching
* Rendering strategies

---

# 56. Rendering Strategies

Understand the differences between:

* CSR — Client-Side Rendering
* SSR — Server-Side Rendering
* SSG — Static Site Generation
* ISR — Incremental Static Regeneration
* Streaming
* Server Components

Also understand:

* Hydration
* Hydration mismatches
* Partial rendering
* Progressive rendering

---

# 57. Security

* XSS
* JSX escaping
* `dangerouslySetInnerHTML`
* CSRF
* Authentication security
* Token storage
* Cookies
* Content Security Policy
* Dependency vulnerabilities
* Environment variables
* Secrets
* Input validation
* Authorization

---

# 58. Production React

* Production builds
* Environment configuration
* Error monitoring
* Logging
* Performance monitoring
* Bundle analysis
* Code splitting
* Caching
* CDN
* Deployment
* CI/CD
* Security headers
* Accessibility audits

---

# 59. React Ecosystem

Know what each tool solves:

| Tool            | Purpose                     |
| --------------- | --------------------------- |
| React           | UI                          |
| React DOM       | Browser rendering           |
| React Router    | Routing                     |
| Vite            | Development/build tooling   |
| Next.js         | React application framework |
| Redux Toolkit   | State management            |
| Zustand         | State management            |
| TanStack Query  | Server state                |
| React Hook Form | Forms                       |
| Zod             | Validation                  |
| Testing Library | Component testing           |
| Vitest          | Testing                     |
| Playwright      | E2E testing                 |
| Storybook       | Component development       |
| TypeScript      | Static typing               |
| Tailwind CSS    | Styling                     |

---

# 60. JavaScript Prerequisites

Before going deep into React, know:

## JavaScript Basics

* Variables
* Data types
* Operators
* Functions
* Arrow functions
* Objects
* Arrays
* Destructuring
* Spread/rest
* Template literals
* Modules
* Import/export

## Important JavaScript

* `map`
* `filter`
* `reduce`
* `find`
* `some`
* `every`
* `forEach`
* Promises
* `async/await`
* Fetch
* Closures
* Scope
* Hoisting
* Event loop
* DOM
* Events
* JSON
* Error handling

---

# 61. Advanced React Mental Models

These are more important than memorizing APIs.

Understand:

* UI is a function of state
* Rendering is not the same as DOM mutation
* State belongs to a component position
* Props flow downward
* Events communicate upward
* Effects synchronize with external systems
* Derived data usually should not be stored
* State should have a clear owner
* Server state is different from UI state
* Component identity affects state preservation
* Referential equality affects optimization
* Rendering can happen without a DOM change
* Effects can run multiple times in development
* React controls rendering; you describe the desired UI

---

# 62. Advanced React Performance

Study:

* React Profiler
* Render waterfalls
* Expensive components
* Large component trees
* Context-induced renders
* Referential equality
* Memoization
* Virtualization
* Suspense
* Transitions
* Deferred rendering
* Network waterfalls
* Bundle size
* JavaScript execution cost
* Code splitting

---

# 63. Advanced Async Patterns

* Async event handlers
* Fetch cancellation
* `AbortController`
* Race conditions
* Request deduplication
* Retry
* Optimistic updates
* Suspense
* Streaming
* Server actions
* Loading boundaries
* Error boundaries

---

# 64. React Project Practices

Learn to build projects containing:

### Beginner

* Counter
* Todo app
* Calculator
* Notes app
* Weather UI

### Intermediate

* Authentication app
* Dashboard
* E-commerce frontend
* Blog
* Movie search
* Expense tracker
* Admin panel

### Advanced

* Real-time chat
* Social application
* Multi-user dashboard
* SaaS application
* E-commerce platform
* Collaborative editor

Each project should progressively introduce:

```text
Components
→ Props
→ State
→ Hooks
→ Forms
→ API
→ Routing
→ Authentication
→ Server State
→ Testing
→ Performance
→ Production
```

---

# 65. Recommended Learning Order

## Phase 1 — JavaScript

1. JavaScript fundamentals
2. Functions
3. Objects
4. Arrays
5. Destructuring
6. Modules
7. Promises
8. Async/await
9. Fetch
10. Closures

## Phase 2 — React Fundamentals

11. React
12. JSX
13. Components
14. Props
15. Events
16. Conditional rendering
17. Lists
18. Keys
19. State
20. Forms

## Phase 3 — Core React

21. Lifting state
22. Component communication
23. `useState`
24. `useEffect`
25. `useRef`
26. `useContext`
27. `useReducer`
28. Custom hooks

## Phase 4 — Application React

29. React Router
30. API calls
31. Server state
32. Forms
33. Authentication
34. Error handling
35. Loading states
36. State management

## Phase 5 — Advanced React

37. Rendering model
38. Reconciliation
39. Suspense
40. Lazy loading
41. Transitions
42. Performance
43. `memo`
44. `useMemo`
45. `useCallback`
46. Portals
47. Advanced component patterns

## Phase 6 — Professional React

48. TypeScript
49. Testing
50. Accessibility
51. Architecture
52. Storybook
53. Design systems
54. Security
55. Production optimization

## Phase 7 — Modern React

56. React Server Components
57. Actions
58. `useActionState`
59. `useOptimistic`
60. `use`
61. Server rendering
62. Streaming
63. React frameworks
64. Next.js

---

# 66. What You Should Be Able to Build

After completing these topics, you should be able to build a React application containing:

```text
Authentication
     ↓
Routing
     ↓
Reusable Components
     ↓
Forms
     ↓
Client State
     ↓
Server State
     ↓
API Integration
     ↓
Loading / Error / Empty States
     ↓
Validation
     ↓
Testing
     ↓
Accessibility
     ↓
Performance Optimization
     ↓
Production Deployment
```

The real test is not whether you can explain `useState`.

The real test is whether you can look at a product requirement and decide:

* What should be a component?
* Where should state live?
* Should this be local state or server state?
* Do I need an Effect?
* Can this value be derived instead of stored?
* Should Context be used?
* Do I need a state-management library?
* How should data be fetched and cached?
* What happens during loading?
* What happens when the request fails?
* How should the UI behave during optimistic updates?
* Where should the component render?
* What should be tested?
* What could cause unnecessary renders?
* What belongs on the server vs the client?

That decision-making layer is what separates knowing React APIs from actually knowing React.
