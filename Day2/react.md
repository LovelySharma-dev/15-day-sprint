# React Complete Guide — Explanations & Examples

# Chapter 1 — React Fundamentals

## 1. What is React?

React is a JavaScript library for building user interfaces.

Instead of manually changing the DOM:

```js
document.querySelector("#count").textContent = count;
```

you describe what the UI should look like:

```jsx
<h1>{count}</h1>
```

React updates the DOM when the data changes.

### Simple mental model

```text
State
  ↓
React renders UI
  ↓
User interacts
  ↓
State changes
  ↓
React renders again
```

Example:

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

When `count` changes, React updates the displayed value.

---

# 2. Why React?

Without React, large applications can become difficult to manage because you manually manipulate DOM elements.

React gives you:

* Components
* State
* Props
* Declarative UI
* Reusable logic
* Efficient rendering
* Ecosystem for large applications

Example:

```text
Website
├── Navbar
├── Sidebar
├── ProductList
│   ├── ProductCard
│   ├── ProductCard
│   └── ProductCard
└── Footer
```

Each part can be a React component.

---

# 3. Declarative UI

This is one of React's most important ideas.

### Imperative

You tell the browser **how** to change the UI.

```js
if (loggedIn) {
  document.querySelector("#login").style.display = "none";
  document.querySelector("#dashboard").style.display = "block";
}
```

### Declarative

You describe **what the UI should be**.

```jsx
return loggedIn ? <Dashboard /> : <Login />;
```

React handles the DOM changes.

---

# 4. Component-Based Architecture

A component is a reusable piece of UI.

```jsx
function Button() {
  return <button>Click me</button>;
}
```

Use it:

```jsx
function App() {
  return (
    <div>
      <Button />
      <Button />
    </div>
  );
}
```

The component can be reused multiple times.

---

# 5. Functional Components

Modern React primarily uses function components.

```jsx
function Welcome() {
  return <h1>Hello</h1>;
}
```

A component:

```text
Function
   ↓
returns JSX
   ↓
React renders UI
```

---

# 6. Component Composition

Large components should be built from smaller components.

Instead of:

```jsx
function App() {
  // 500 lines of UI
}
```

use:

```jsx
function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <MainContent />
      <Footer />
    </>
  );
}
```

This makes applications easier to maintain.

---

# Chapter 2 — JSX

# 7. What is JSX?

JSX allows you to write HTML-like syntax inside JavaScript.

```jsx
const element = <h1>Hello World</h1>;
```

JSX is not HTML.

It is syntax that React transforms into JavaScript.

---

# 8. JSX Expressions

JavaScript expressions can be inserted using `{}`.

```jsx
const name = "Rahul";

function App() {
  return <h1>Hello {name}</h1>;
}
```

Result:

```text
Hello Rahul
```

You can use expressions:

```jsx
<h1>{10 + 20}</h1>
```

Output:

```text
30
```

---

# 9. JSX Attributes

HTML:

```html
<button class="btn">
```

JSX:

```jsx
<button className="btn">
```

Another example:

```jsx
<img
  src="/profile.jpg"
  alt="Profile"
/>
```

Some HTML attributes have different names in JSX.

Common examples:

```text
class → className
for → htmlFor
onclick → onClick
tabindex → tabIndex
```

---

# 10. JSX Styles

You can use an object for inline styles.

```jsx
const style = {
  color: "red",
  fontSize: "20px"
};

function App() {
  return <h1 style={style}>Hello</h1>;
}
```

Or:

```jsx
<h1 style={{ color: "red" }}>
  Hello
</h1>
```

Notice the double braces:

```text
style={ JavaScript object }
```

---

# 11. JSX Fragments

A component normally returns one root element.

This is invalid:

```jsx
return (
  <h1>Hello</h1>
  <p>Welcome</p>
);
```

Use a fragment:

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>Welcome</p>
  </>
);
```

Or:

```jsx
return (
  <React.Fragment>
    <h1>Hello</h1>
    <p>Welcome</p>
  </React.Fragment>
);
```

Fragments avoid adding unnecessary DOM elements.

---

# 12. JSX Comments

Inside JSX:

```jsx
return (
  <div>
    {/* This is a comment */}
    <h1>Hello</h1>
  </div>
);
```

---

# Chapter 3 — Props

# 13. What are Props?

Props allow a parent component to send data to a child component.

```jsx
function User({ name }) {
  return <h1>Hello {name}</h1>;
}
```

Parent:

```jsx
function App() {
  return <User name="Rahul" />;
}
```

Result:

```text
Hello Rahul
```

Think:

```text
Parent
  │
  │ props
  ↓
Child
```

---

# 14. Multiple Props

```jsx
function User({ name, age, city }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}
```

Usage:

```jsx
<User
  name="Rahul"
  age={22}
  city="Delhi"
/>
```

---

# 15. Props Can Contain Anything

Props can contain:

* Strings
* Numbers
* Booleans
* Arrays
* Objects
* Functions
* Components
* JSX

Example:

```jsx
<User
  name="Rahul"
  age={22}
  skills={["React", "JavaScript"]}
  isAdmin={true}
/>
```

---

# 16. Function Props

A parent can pass a function to a child.

```jsx
function App() {
  function handleClick() {
    console.log("Clicked");
  }

  return <Button onClick={handleClick} />;
}
```

Child:

```jsx
function Button({ onClick }) {
  return (
    <button onClick={onClick}>
      Click
    </button>
  );
}
```

This is commonly used for child → parent communication.

---

# 17. children Prop

Anything placed inside a component becomes `children`.

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

Usage:

```jsx
<Card>
  <h2>Hello</h2>
  <p>Welcome</p>
</Card>
```

This is powerful for reusable layouts.

---

# Chapter 4 — State

# 18. What is State?

State is data that can change during a component's lifetime.

Examples:

```text
Counter value
Modal open/closed
Logged-in user
Input value
Selected tab
Shopping cart
```

React provides `useState`.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

There are two values:

```text
count
   ↓
current state

setCount
   ↓
function that updates state
```

---

# 19. Why Not Use a Normal Variable?

This doesn't work as expected:

```jsx
function Counter() {
  let count = 0;

  function increment() {
    count++;
  }

  return (
    <button onClick={increment}>
      {count}
    </button>
  );
}
```

Changing `count` does not tell React to render again.

Use state:

```jsx
const [count, setCount] = useState(0);
```

---

# 20. Functional State Updates

Suppose the next state depends on the previous state.

Prefer:

```jsx
setCount(prev => prev + 1);
```

instead of repeatedly depending on the captured value.

Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function incrementThreeTimes() {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }

  return (
    <>
      <p>{count}</p>
      <button onClick={incrementThreeTimes}>
        +3
      </button>
    </>
  );
}
```

The updater function tells React:

```text
Give me the latest state
        ↓
calculate next state
```

---

# 21. State with Objects

You should not directly mutate state.

Bad:

```jsx
user.name = "Alex";
```

Better:

```jsx
setUser(prev => ({
  ...prev,
  name: "Alex"
}));
```

Example:

```jsx
const [user, setUser] = useState({
  name: "Rahul",
  age: 22
});
```

Update:

```jsx
setUser(prev => ({
  ...prev,
  age: 23
}));
```

---

# 22. State with Arrays

Bad:

```jsx
items.push(newItem);
setItems(items);
```

Better:

```jsx
setItems(prev => [
  ...prev,
  newItem
]);
```

Remove:

```jsx
setItems(prev =>
  prev.filter(item => item.id !== id)
);
```

Update:

```jsx
setItems(prev =>
  prev.map(item =>
    item.id === id
      ? { ...item, completed: true }
      : item
  )
);
```

---

# Chapter 5 — Events

# 23. React Events

React uses event props:

```jsx
<button onClick={handleClick}>
  Click
</button>
```

Common events:

```text
onClick
onChange
onSubmit
onFocus
onBlur
onMouseEnter
onKeyDown
onKeyUp
```

---

# 24. onClick

```jsx
function App() {
  function handleClick() {
    alert("Hello");
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

Do not do:

```jsx
<button onClick={handleClick()}>
```

because that calls the function during rendering.

---

# 25. Passing Arguments to Events

Use a function:

```jsx
<button
  onClick={() => deleteUser(10)}
>
  Delete
</button>
```

Here:

```text
click
 ↓
arrow function runs
 ↓
deleteUser(10)
```

---

# 26. Forms and onChange

```jsx
function Form() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}
```

The flow:

```text
User types
   ↓
onChange
   ↓
setName()
   ↓
state changes
   ↓
input renders updated value
```

---

# 27. preventDefault

Normally submitting a form can reload/navigate the page.

React:

```jsx
function handleSubmit(e) {
  e.preventDefault();

  console.log("Submitted");
}
```

Usage:

```jsx
<form onSubmit={handleSubmit}>
  <button type="submit">
    Submit
  </button>
</form>
```

---

# Chapter 6 — Conditional Rendering

# 28. Ternary Operator

```jsx
function App({ isLoggedIn }) {
  return (
    <>
      {isLoggedIn
        ? <Dashboard />
        : <Login />
      }
    </>
  );
}
```

Think:

```text
condition
   ?
true UI
   :
false UI
```

---

# 29. Logical AND

```jsx
{isAdmin && <AdminPanel />}
```

If:

```text
isAdmin = true
```

React renders:

```jsx
<AdminPanel />
```

If false, it renders nothing.

---

# 30. Early Return

Sometimes this is cleaner:

```jsx
function Dashboard({ user }) {
  if (!user) {
    return <Login />;
  }

  return <h1>Dashboard</h1>;
}
```

This avoids deeply nested JSX.

---

# 31. Loading / Error / Success UI

A common React pattern:

```jsx
if (loading) {
  return <Loading />;
}

if (error) {
  return <ErrorMessage />;
}

return <Data />;
```

This is much better than pretending the data always exists.

Real applications must handle:

```text
Loading
Error
Empty
Success
```

---

# Chapter 7 — Lists

# 32. Rendering Arrays

Suppose:

```jsx
const users = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Aman" },
  { id: 3, name: "Priya" }
];
```

Render:

```jsx
function Users() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

---

# 33. Why key?

React needs a stable identity for list items.

```jsx
<li key={user.id}>
```

The key helps React understand:

```text
Which item is this?
Was it added?
Removed?
Moved?
Updated?
```

Use a stable ID:

```jsx
key={user.id}
```

Avoid:

```jsx
key={Math.random()}
```

because the key changes every render.

Using array index as a key can also cause bugs when list items are inserted, removed, or reordered.

---

# 34. Filtering Lists

```jsx
const activeUsers = users.filter(
  user => user.active
);
```

Then:

```jsx
activeUsers.map(user => (
  <User key={user.id} user={user} />
))
```

---

# 35. Lists with Components

Instead of putting everything inside one component:

```jsx
function UserList({ users }) {
  return (
    <>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </>
  );
}
```

Child:

```jsx
function UserCard({ user }) {
  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  );
}
```

Now:

```text
UserList
   │
   ├── UserCard
   ├── UserCard
   └── UserCard
```

---

# Chapter 8 — Controlled Forms

# 36. Controlled Component

React owns the input value.

```jsx
function Login() {
  const [email, setEmail] = useState("");

  return (
    <input
      value={email}
      onChange={e =>
        setEmail(e.target.value)
      }
    />
  );
}
```

Flow:

```text
Input
 ↓
onChange
 ↓
State
 ↓
React
 ↓
Input
```

This gives React complete control over the value.

---

# 37. Multiple Inputs

```jsx
function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <form>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
    </form>
  );
}
```

The important part:

```jsx
[e.target.name]: e.target.value
```

This dynamically updates the correct field.

---

# Chapter 9 — Lifting State Up

# 38. The Problem

Suppose two components need the same state:

```text
Parent
├── Input
└── Preview
```

If `Input` owns the state, `Preview` cannot directly access it.

Move the state to their common parent.

```jsx
function App() {
  const [text, setText] = useState("");

  return (
    <>
      <Input
        text={text}
        setText={setText}
      />

      <Preview text={text} />
    </>
  );
}
```

Now:

```text
             App
          /       \
       Input     Preview
          │          ↑
          └── state ─┘
```

This is called **lifting state up**.

---

# Chapter 10 — useEffect

# 39. What is an Effect?

An Effect is used when a component needs to synchronize with something outside React.

Examples:

* Browser APIs
* Timers
* Event subscriptions
* Network synchronization
* External libraries

Example:

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

When `count` changes:

```text
count changes
     ↓
React renders
     ↓
effect runs
     ↓
document title changes
```

---

# 40. Dependency Array

```jsx
useEffect(() => {
  console.log("effect");
}, []);
```

Empty dependency array means the Effect does not depend on changing reactive values.

With dependencies:

```jsx
useEffect(() => {
  console.log(count);
}, [count]);
```

The Effect re-runs when `count` changes.

---

# 41. Cleanup

Suppose you create an event listener:

```jsx
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener(
    "resize",
    handleResize
  );

  return () => {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}, []);
```

The returned function is cleanup.

Think:

```text
Start synchronization
        ↓
Effect
        ↓
Cleanup when synchronization ends
```

Without cleanup, subscriptions and timers can continue unnecessarily.

---

# 42. Important useEffect Mistake

Don't use an Effect just to calculate normal derived data.

Unnecessary:

```jsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);
```

Better:

```jsx
const fullName =
  firstName + " " + lastName;
```

Why?

Because `fullName` is derived from existing state.

You don't need another state variable or Effect.

---

# Chapter 11 — useRef

# 43. useRef for DOM Elements

```jsx
function Search() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />

      <button onClick={focusInput}>
        Focus
      </button>
    </>
  );
}
```

React gives you access to the DOM element through:

```jsx
inputRef.current
```

---

# 44. useRef vs useState

### State

Use when changing the value should cause a render.

```jsx
const [count, setCount] = useState(0);
```

### Ref

Use when you need a value to survive renders without causing a render when it changes.

```jsx
const timerRef = useRef(null);
```

Simple rule:

```text
Need UI to update?
→ State

Need to remember something without rendering?
→ Ref
```

---

# Chapter 12 — useContext

# 45. The Prop Drilling Problem

Imagine:

```text
App
 ↓
Navbar
 ↓
UserMenu
 ↓
Avatar
```

If `Avatar` needs the user:

```text
App
 ↓ user
Navbar
 ↓ user
UserMenu
 ↓ user
Avatar
```

Intermediate components don't actually need the user.

This is prop drilling.

Context can help.

---

# 46. Creating Context

```jsx
const UserContext = createContext(null);
```

Provider:

```jsx
<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>
```

Consume:

```jsx
const user = useContext(UserContext);
```

Now deeply nested components can access the context.

---

# Chapter 13 — useReducer

# 47. Why useReducer?

`useState` is excellent for simple state.

For complex state transitions, a reducer can make the logic clearer.

Example:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1
      };

    case "decrement":
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
}
```

Use:

```jsx
const [state, dispatch] =
  useReducer(reducer, {
    count: 0
  });
```

Dispatch:

```jsx
dispatch({
  type: "increment"
});
```

Mental model:

```text
Current State
      +
    Action
      ↓
   Reducer
      ↓
 New State
```

---

# Chapter 14 — Custom Hooks

# 48. What is a Custom Hook?

A custom hook extracts reusable React logic.

Example:

```jsx
function useCounter() {
  const [count, setCount] =
    useState(0);

  function increment() {
    setCount(prev => prev + 1);
  }

  return {
    count,
    increment
  };
}
```

Use it:

```jsx
function Counter() {
  const {
    count,
    increment
  } = useCounter();

  return (
    <button onClick={increment}>
      {count}
    </button>
  );
}
```

The important idea:

```text
Component
   ↓
uses custom hook
   ↓
reusable logic
```

---

# Chapter 15 — React Mental Model

The most important React concept is not memorizing hooks.

Understand this:

```text
             STATE
               ↓
             RENDER
               ↓
               UI
               ↓
            USER EVENT
               ↓
          STATE UPDATE
               ↓
             RENDER
```

For example:

```jsx
const [count, setCount] = useState(0);
```

Initially:

```text
count = 0
```

Button:

```jsx
<button onClick={() => setCount(c => c + 1)}>
  +
</button>
```

User clicks.

```text
0
↓
setCount
↓
1
↓
React renders
↓
UI shows 1
```

That cycle is the foundation of React.

---

# Chapter 16 — What to Learn Next

The next major layer should be learned in this order:

```text
1. Forms
       ↓
2. useEffect deeply
       ↓
3. useRef
       ↓
4. useContext
       ↓
5. useReducer
       ↓
6. Custom Hooks
       ↓
7. React Router
       ↓
8. API / Data Fetching
       ↓
9. Server State
       ↓
10. Authentication
       ↓
11. TypeScript
       ↓
12. Testing
       ↓
13. Performance
       ↓
14. Advanced React
       ↓
15. React Server Components
       ↓
16. Next.js
```

Do **not** jump straight to Redux, `useMemo`, `useCallback`, or advanced optimization before understanding state ownership, rendering, props, effects, and component composition. Those tools solve specific problems; they are not prerequisites for understanding React.
