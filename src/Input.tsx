import React from 'react'
import { useAppState } from './reducer'

export const Input: React.FC = () => {
    // const [state, actions] = useExtendedAppState("counter", defaultState, counterActions)

    const [state, actions] = useAppState()

    return (
        <div>
            <p>Input:</p>
            <input value={state.input} onChange={e=>{ actions.input.update(e.target.value) }} />
        </div>
    )
}