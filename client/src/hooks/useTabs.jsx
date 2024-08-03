import TabContext from "../context/TabContext"
import { useContext } from "react"

function useTab() {
    const context = useContext(TabContext) 
    return context
}

export default useTab
