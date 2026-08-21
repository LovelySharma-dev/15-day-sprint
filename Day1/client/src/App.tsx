import {formatCurrency} from '../../shared/src/formatCurrency'
import './App.css'

function App() {
  const price = 79.99

  return (
    <main>
      <h1>Primitive Mono repo Example</h1>

      <p>
        Client Formatted Price: <strong> 
          {formatCurrency(price)}
        </strong>
      </p>
    </main>
  )
}

export default App
