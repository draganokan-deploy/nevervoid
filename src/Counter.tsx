import React from 'react'
import { useAppState } from './reducer'

export const Counter: React.FC = () => {
    // const [state, actions] = useExtendedAppState("counter", defaultState, counterActions)

    const [state, actions] = useAppState()

    return (
        <div>
            <p>Count is: {state.count}</p>
            <button onClick={()=>{ actions.counter.increment() }}>+1</button>
            <button onClick={()=>{ actions.counter.decrement() }}>-1</button>
            <button onClick={()=>{ actions.counter.reset() }}>reset</button>
        </div>
    )
}