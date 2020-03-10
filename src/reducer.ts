import { useState } from "react"

// import { createContext, useContext } from 'react'

type AppState = {
    count: number
    input: string
}

const initialAppState: AppState = {
    count: 0,
    input: ""
}

// type Actions<S> = {

// }

// const AppContext = createContext<AppState>(initialAppState)

const __state: [AppState] = [initialAppState]
type RegisteredDispatcher = React.Dispatch<React.SetStateAction<AppState>> & {__registeredDispatcher: boolean}
const __observers: RegisteredDispatcher[] = []

export const useAppState = () => {

    const [_, _setState] = useState(initialAppState);
    const _secureSetState = (_setState as unknown as RegisteredDispatcher);
    if (!_secureSetState.__registeredDispatcher) {
        _secureSetState.__registeredDispatcher = true;
        __observers.push(_secureSetState)
    }
    const updateState = (change: Partial<AppState>) => {
        __state[0] = {...__state[0], ...change}
        __observers.forEach(secureSetState => {
            const setState = secureSetState as unknown as React.Dispatch<React.SetStateAction<AppState>>
            setState(__state[0])
        })
    }

    const state = __state[0]

    const _log = () => {
        // console.log(JSON.stringify(state, null, 4))
    }

    const actions = {
        counter: {
            increment: () => {
                _log()
                updateState({ count: state.count+1 })
            },
            decrement: () => {
                _log()
                updateState({ count: state.count-1 })
            },
            reset: () => {
                _log()
                updateState({ count: 0 })
            }
        },
        input: {
            update: (val: string) => {
                _log()
                updateState({ input: val })
            }
        },
        randomize: () => {
            _log()

            const rndLength: number = Math.floor(Math.random()*6)+2
            let str = ""
            for (let i=0; i<rndLength; i++) {
                str += String.fromCharCode(Math.floor(Math.random()*26)+97)
            }

            updateState({
                count: Math.floor(Math.random()*100),
                input: str
            })
        }
    }

    return [state, actions] as [AppState, typeof actions]
}

function _extend<E, K extends PropertyKey, V>(extendable: E, key: K, val: V): E & Record<K, V> {
    (extendable as unknown as Record<K, V>)[key] = val;
    return extendable as E & Record<K, V>
}

export const useExtendedAppState = function <M extends PropertyKey, S, A>(moduleName: M, state: S, actions: A) {
    const [appState, appActions] = useAppState()

    const extendedState = _extend(appState, moduleName, state)
    const extendedActions = _extend(appActions, moduleName, actions)

    return [extendedState, extendedActions] as [typeof extendedState, typeof extendedActions]
}