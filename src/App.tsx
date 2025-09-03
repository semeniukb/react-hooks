import './App.css'
import { useCounter } from './hooks/useCounter/useCounter.ts'

function App() {
    const counter = useCounter(1, { max: 14, min: 0 })

    return (
        <>
            <p>
                Count: <code>{counter.value}</code>
            </p>
            <button type="button" onClick={() => counter.inc()}>
                Increment
            </button>
            <button type="button" onClick={() => counter.dec()}>
                Decrement
            </button>
            <button type="button" onClick={() => counter.set(55)}>
                Set (5)
            </button>
            <button type="button" onClick={counter.reset}>
                Reset
            </button>
        </>
    )
}

export default App
