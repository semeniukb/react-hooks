import './App.css'
import { useCounter } from './hooks/useCounter/useCounter.ts'
import { useToggle } from './hooks/useToggle/useToggle.ts'

function App() {
    const counter = useCounter(1, { max: 14, min: 0 })
    const [state, toggle] = useToggle([
        'dark',
        'light',
        'blue',
        'orange',
    ] as const)
    console.log(state, 'state')
    return (
        <>
            <p>
                Count: <code>{counter.value}</code>
            </p>

            <p>
                Toggle: <code>{state}</code>
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

            <button type="button" onClick={() => toggle()}>
                Toggle
            </button>
            <button type="button" onClick={() => toggle('blue')}>
                Toggle custom to blue
            </button>
        </>
    )
}

export default App
