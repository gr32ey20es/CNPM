import { 
    SET_DARK_MODE, SET_HO_KHAU, SET_NHAN_KHAU
} from "./constants"

export const initState = {
    darkMode: false,
    hoKhau: [],
    nhanKhau: [],
}

const reducer = (state, action) => {
    console.log('Action: ', action)
    // console.log('Prev state: ', state)

    let newState

    switch (action.type) {
        case SET_DARK_MODE:
            newState = {
                ...state,
                darkMode: action.payload
            }
            break;
        
        case SET_HO_KHAU:
            newState = {
                ...state,
                hoKhau: action.payload
            }
            break;
        
        case SET_NHAN_KHAU:
            newState = {
                ...state,
                nhanKhau: action.payload
            }
            break;

        default:
            break;
    }

    console.log('New state: ', newState)

    return newState
}

export default reducer