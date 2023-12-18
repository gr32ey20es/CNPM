import { createContext, useState } from "react";
import { data } from "./fakedata";

export const NopTienContext = createContext();
export const NopTienContextProvider = (props)=>{
    const [listNopTien,setListNopTien] = useState(data);
    return (
        <NopTienContext.Provider value = {{listNopTien,setListNopTien}}>
            {props.children}
        </NopTienContext.Provider>
    )
}