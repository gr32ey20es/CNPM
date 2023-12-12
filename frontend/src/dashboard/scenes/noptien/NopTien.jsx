import { NopTienContextProvider } from "./NopTienContext";
import NopTienView from "./component/NopTienView";
export default function NopTien(){
    return (
        <NopTienContextProvider>
            <NopTienView/>
        </NopTienContextProvider>
    )
}