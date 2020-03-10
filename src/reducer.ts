import { useState } from "react"

type AppState = {
    count: number
    input: string
}

const initialAppState: AppState = {
    count: 0,
    input: ""
}

const __state: [AppState] = [initialAppState]
type RegisteredSetter = React.Dispatch<React.SetStateAction<AppState>> & {__registered: boolean}
const __registeredSetters: RegisteredSetter[] = []

export const useAppState = () => {

    const [, stateSetter] = useState(initialAppState);
    const setter = (stateSetter as unknown as RegisteredSetter);
    if (!setter.__registered) {
        setter.__registered = true;
        __registeredSetters.push(setter)
    }
    const updateState = (change: Partial<AppState>) => {
        __state[0] = {...__state[0], ...change}
        __registeredSetters.forEach(registeredDispatcher => {
            registeredDispatcher(__state[0])
        })
    }

    const state = __state[0]

    const actions = {
        counter: {
            increment: () => {
                updateState({ count: state.count+1 })
            },
            decrement: () => {
                updateState({ count: state.count-1 })
            },
            reset: () => {
                updateState({ count: 0 })
            }
        },
        input: {
            update: (val: string) => {
                updateState({ input: val })
            }
        },
        randomize: () => {
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