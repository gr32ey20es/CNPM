import {react,createContext, useState} from 'react';
export const AppContext = createContext();
export const AppContextProvider  =(props)=>{
    const [listItem,setListItem] = useState([]);
    return(
        <AppContext.Provider value = {{listItem,setListItem}}>
            {props.children}
        </AppContext.Provider>
    )
}