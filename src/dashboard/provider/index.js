import { createContext, useReducer } from 'react'
import reducer, { initState } from './reducer'

export const DashboardContext = createContext()

export default function DashboardProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <DashboardContext.Provider value={ [state, dispatch] }>
            { children }
        </DashboardContext.Provider>
    )
}

export * from './actions'