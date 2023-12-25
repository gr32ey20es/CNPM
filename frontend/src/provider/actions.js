import { SET_DARK_MODE, SET_HO_KHAU, SET_NHAN_KHAU } from "./constants";

export const setDarkMode = (payload) => {
    return {
        type: SET_DARK_MODE,
        payload
    }
}

export const setHoKhau = (payload) => {
    return {
        type: SET_HO_KHAU,
        payload
    }
}

export const setNhanKhau = (payload) => {
    return {
        type: SET_NHAN_KHAU,
        payload
    }
}

