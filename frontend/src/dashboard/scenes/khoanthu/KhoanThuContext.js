import { useState } from "react";
import { createContext } from "react";
import {data} from './fakeData'
export const KhoanThuContext = createContext();
export const KhoanThuContextProvider = (props)=>{
    const [listKhoanThu,setListKhoanThu] = useState(data);
    return (
        <KhoanThuContext.Provider value = {{listKhoanThu,setListKhoanThu}}>
            {props.children}
        </KhoanThuContext.Provider>
    )
}