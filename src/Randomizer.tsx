import React from 'react'
import { useAppState } from './reducer'

export const Randomizer: React.FC = () => {
    // const [state, actions] = useExtendedAppState("counter", defaultState, counterActions)

    const [state, actions] = useAppState()

    return (
        <div>
            <p>Count: {state.count}</p>
            <p>Input: {state.input}</p>
            <button onClick={()=>{
                actions.randomize()
            }}>randomize</button>
        </div>
    )
}