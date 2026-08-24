# React State & Store Management

## 1. What is State Management?

**State** = data that can change while the application is running.

Examples:

```js
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [theme, setTheme] = useState("dark");
```

The problem starts when **many components need the same data**.

### Example

```text
App
├── Navbar
│   └── User name
├── Sidebar
│   └── User profile
└── Dashboard
    └── User name
```

If all three need the same `user`, passing it through every component becomes annoying.

This is called **prop drilling**.

```text
App
 ↓ user
Navbar
 ↓ user
Profile
 ↓ user
UserName
```

State management helps us keep shared state in a place where multiple components can access it.

---

# 2. Types of State

A useful way to remember React state:

```text
State
├── Local State
├── Shared State
├── Global State
└── Server State
```

### Local State

Used by one component.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

Use:

```js
useState
```

when the state belongs mainly to one component.

---

### Shared State

Used by a few related components.

Example:

```text
ProductPage
├── ProductDetails
└── AddToCartButton
```

Both might need the selected product.

You can use:

```text
props
    ↓
lifting state up
    ↓
Context
    ↓
Zustand / Redux
```

---

# 3. The Main Problem: Prop Drilling

Imagine:

```jsx
function App() {
  const user = {
    name: "John"
  };

  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Profile user={user} />;
}

function Profile({ user }) {
  return <UserName user={user} />;
}

function UserName({ user }) {
  return <h1>{user.name}</h1>;
}
```

`Dashboard` and `Profile` don't actually need `user`.

They only pass it forward.

```text
App
 ↓ user
Dashboard
 ↓ user
Profile
 ↓ user
UserName
```

This is **prop drilling**.

For small applications, props are perfectly fine.

For deeply shared state, other solutions become useful.

---

# 4. React Context

## Simple Definition

**Context = React's built-in way to share data without passing props manually through every component.**

Think:

```text
Provider
   ↓
shared data
   ↓
any child component
```

---

# 5. Creating Context

Example: Theme Context.

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

Now wrap your application:

```jsx
function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
```

Any child can access the context.

```jsx
function Dashboard() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Theme: {theme}</p>

      <button onClick={() => setTheme("dark")}>
        Dark Mode
      </button>
    </div>
  );
}
```

No prop drilling.

---

# 6. Context Mental Model

Remember:

```text
createContext()
      ↓
   Provider
      ↓
   value
      ↓
useContext()
      ↓
Component gets data
```

Example:

```jsx
const AuthContext = createContext();

<AuthContext.Provider value={user}>
  <App />
</AuthContext.Provider>
```

Then:

```jsx
const user = useContext(AuthContext);
```

---

# 7. When Should You Use Context?

Good use cases:

* Theme
* Current user
* Authentication information
* Language
* Small shared settings
* Dependency/configuration

Example:

```text
ThemeContext
AuthContext
LanguageContext
```

### Important limitation

Context is **not automatically a complete state-management solution**.

You can put state inside Context:

```jsx
const [cart, setCart] = useState([]);
```

but as the application becomes large, you may end up with:

```text
Context
 ├── State
 ├── Actions
 ├── API logic
 ├── Reducers
 └── Many components
```

At that point, a dedicated state library may be easier.

---

# 8. Context vs Props

| Props                    | Context                        |
| ------------------------ | ------------------------------ |
| Explicit                 | Implicit                       |
| Easy to understand       | Can hide where data comes from |
| Good for parent → child  | Good for deeply shared data    |
| No Provider needed       | Requires Provider              |
| Great for component APIs | Great for app-wide values      |

### Easy rule

```text
Parent directly controls child?
        ↓
      Props

Many distant components need same data?
        ↓
      Context
```

---

# 9. Zustand

## Simple Definition

**Zustand = a small external state-management library based around a store.**

The mental model is:

```text
Store
 ↓
State + Actions
 ↓
Components
```

Unlike Context, components don't need to receive state through a Provider.

---

# 10. Installing Zustand

```bash
npm install zustand
```

---

# 11. Creating a Zustand Store

```jsx
import { create } from "zustand";

const useCounterStore = create((set) => ({
  count: 0,

  increment: () =>
    set((state) => ({
      count: state.count + 1
    })),

  decrement: () =>
    set((state) => ({
      count: state.count - 1
    }))
}));
```

Now use it inside a component:

```jsx
function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={increment}>
        +
      </button>
    </>
  );
}
```

No Provider.

---

# 12. Zustand Mental Model

Remember:

```text
create()
   ↓
Store
   ↓
state + actions
   ↓
useStore()
   ↓
Component
```

Example:

```text
useCartStore
├── items
├── addItem()
├── removeItem()
└── clearCart()
```

Component:

```jsx
const items = useCartStore((state) => state.items);
const addItem = useCartStore((state) => state.addItem);
```

---

# 13. Zustand Example: Shopping Cart

```jsx
import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => ({
      items: [...state.items, product]
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    })),

  clearCart: () =>
    set({
      items: []
    })
}));
```

Use it:

```jsx
function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          {item.name}

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

# 14. Why Zustand Feels Simple

With Context, you typically have:

```text
Context
Provider
useContext
state
actions
```

With Zustand:

```text
Store
   ↓
useStore()
```

This makes Zustand attractive for applications where you want shared client state without Redux's larger architecture.

---

# 15. Redux

## Simple Definition

**Redux = predictable state management using a centralized store and explicit state updates.**

Mental model:

```text
Component
   ↓
dispatch(action)
   ↓
Reducer
   ↓
Store changes
   ↓
Component gets new state
```

The key idea:

> Components don't directly change the Redux state. They dispatch actions, and reducers calculate the next state.

---

# 16. Redux Architecture

Remember this:

```text
UI
 ↓
Action
 ↓
Reducer
 ↓
Store
 ↓
UI
```

Example:

```text
Click "+"
   ↓
dispatch(increment())
   ↓
reducer
   ↓
count becomes 1
   ↓
UI updates
```

This is the most important Redux flow to remember.

---

# 17. Redux Toolkit

Modern Redux applications generally use **Redux Toolkit (RTK)** rather than writing Redux from scratch.

Install:

```bash
npm install @reduxjs/toolkit react-redux
```

---

# 18. Create a Slice

A slice contains:

```text
state
+
reducers
+
actions
```

Example:

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    }
  }
});

export const {
  increment,
  decrement
} = counterSlice.actions;

export default counterSlice.reducer;
```

---

# 19. Create Redux Store

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

---

# 20. Give Store to React

Use `Provider`.

```jsx
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

Notice something important:

**Redux uses Context internally through its Provider mechanism, but Redux itself provides much more structure than plain Context.**

---

# 21. Reading Redux State

Use `useSelector`.

```jsx
import { useSelector } from "react-redux";

function Counter() {
  const count = useSelector(
    (state) => state.counter.value
  );

  return <h1>{count}</h1>;
}
```

---

# 22. Updating Redux State

Use `useDispatch`.

```jsx
import { useDispatch } from "react-redux";
import { increment } from "./counterSlice";

function Counter() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      +
    </button>
  );
}
```

Flow:

```text
button click
     ↓
dispatch(increment())
     ↓
counterSlice reducer
     ↓
state.value += 1
     ↓
Redux store
     ↓
useSelector sees new value
     ↓
component re-renders
```

---

# 23. Why Does Redux Look Like It Mutates State?

This:

```js
state.value += 1;
```

looks like direct mutation.

But Redux Toolkit uses **Immer** internally, allowing this style while producing the required immutable state updates.

So this is valid inside an RTK reducer:

```js
increment: (state) => {
  state.value += 1;
}
```

But don't assume you can freely mutate Redux state directly inside components.

---

# 24. Zustand vs Redux

| Feature             | Zustand    | Redux Toolkit       |
| ------------------- | ---------- | ------------------- |
| Setup               | Very small | More structured     |
| Provider            | Usually no | Yes                 |
| Boilerplate         | Low        | Moderate            |
| Architecture        | Flexible   | Strong conventions  |
| DevTools            | Supported  | Excellent           |
| Large teams         | Good       | Often excellent     |
| Complex state flows | Good       | Excellent           |
| Learning curve      | Easy       | Higher              |
| Middleware          | Available  | Extensive ecosystem |
| Explicit actions    | Optional   | Core pattern        |

---

# 25. Context vs Zustand vs Redux

The easiest way to remember them:

```text
Context
= Share values

Zustand
= Simple shared store

Redux
= Structured predictable state system
```

### Context

```text
"I need to make this value available
to many components."
```

### Zustand

```text
"I need shared state,
but I don't want much ceremony."
```

### Redux

```text
"I need a strict, observable,
structured state architecture."
```

---

# 26. Which One Should You Choose?

Don't choose based only on popularity.

Choose based on the **complexity of state and the team maintaining it**.

### Use `useState`

When:

```text
State belongs to one component
```

Example:

```jsx
const [isOpen, setIsOpen] = useState(false);
```

---

### Use Context

When:

```text
Many components need the same
relatively stable value
```

Examples:

```text
theme
language
current user
configuration
```

---

### Use Zustand

When:

```text
Many components need shared client state
+
you want minimal setup
```

Examples:

```text
cart
UI state
filters
wizard state
selected items
```

---

### Use Redux Toolkit

When:

```text
Application has complex shared state
+
many updates/actions
+
large team
+
need strong conventions/debugging
```

Examples:

```text
large e-commerce application
complex admin dashboard
large enterprise application
complex workflows
```

---

# 27. A Simple Decision Tree

Remember this:

```text
Does only one component need the state?
        │
       YES
        ↓
    useState

        │ NO
        ↓

Is it mostly a shared value/config?
        │
       YES
        ↓
     Context

        │ NO
        ↓

Do you want a simple global store?
        │
       YES
        ↓
     Zustand

        │ NO
        ↓

Do you need highly structured,
complex global state?
        │
       YES
        ↓
 Redux Toolkit
```

This isn't an absolute rule. Context can manage state, Zustand can handle complex applications, and Redux can be overkill for a small project.

---

# 28. Server State vs Client State

This distinction is frequently missed.

Not every piece of data belongs in Redux/Zustand/Context.

### Client State

Created/controlled by the UI.

```text
sidebarOpen
theme
modalOpen
selectedProduct
cart
form state
```

### Server State

Comes from your backend.

```text
users
products
orders
comments
posts
```

Server state has problems like:

```text
loading
error
caching
refetching
stale data
pagination
synchronization
```

A server-state library such as TanStack Query is often more appropriate for this problem than putting every API response into Redux or Zustand.

---

# 29. Don't Put Everything in Global State

This is a common mistake.

Bad:

```text
Global Store
├── modalOpen
├── inputValue
├── buttonHovered
├── username
├── products
├── theme
└── everything else
```

Global state should be used when the data genuinely needs to be shared.

Prefer:

```text
Local UI state → useState
Shared configuration → Context
Shared client state → Zustand/Redux
Server data → server-state solution
```

---

# 30. Example: E-Commerce App

Imagine:

```text
E-commerce
│
├── Navbar
│   └── Cart count
│
├── Product Page
│   └── Add to cart
│
├── Cart Page
│   └── Cart items
│
└── Checkout
    └── Order information
```

Cart data is shared by many distant components.

A store makes sense:

```text
Cart Store
├── items
├── addItem()
├── removeItem()
├── updateQuantity()
└── clearCart()
```

Zustand could be a simple choice:

```jsx
const useCartStore = create((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item]
    }))
}));
```

---

# 31. Common Mistakes

## Mistake 1: Using Redux for everything

Redux is powerful, but complexity has a cost.

Don't use Redux just because:

```text
"large applications use Redux"
```

Use it when its structure solves an actual problem.

---

## Mistake 2: Using Context for everything

Context can become difficult when you have:

```text
many contexts
+
frequent updates
+
complex state logic
```

For example:

```text
AuthContext
ThemeContext
CartContext
ProductContext
FilterContext
NotificationContext
...
```

At some point, you may have created your own state-management framework out of Context.

---

## Mistake 3: Making everything global

Ask:

> "Who actually needs this state?"

If the answer is:

```text
one component
```

keep it local.

---

## Mistake 4: Confusing server state with client state

Don't automatically put every API response into:

```text
Redux
```

or:

```text
Zustand
```

API data has its own caching and synchronization requirements.

---

# 32. One-Line Memory Trick

Memorize this:

```text
useState → One component

Props → Parent → Child

Context → Share values

Zustand → Simple global store

Redux → Structured global state

Server-state library → Backend data
```

Or even shorter:

```text
LOCAL → useState
SHARE → Context
STORE → Zustand
STRUCTURE → Redux
SERVER → Query/cache
```

---

# 33. Final Comparison

```text
                 React State Management

                        State
                          │
          ┌───────────────┼────────────────┐
          ↓               ↓                ↓
       Local           Shared           Server
          │               │                │
      useState       Context/Store     Query/Cache
                          │
                   ┌──────┴──────┐
                   ↓             ↓
                Zustand        Redux
                   │             │
                 Simple       Structured
```

### The key idea

**State management is not about picking the most powerful library. It is about putting state at the simplest place where all required consumers can access it.**
