import { hokhau, nhankhau } from './fakeData'   // temporary
import { 
    setDarkMode, setHoKhau, setNhanKhau 
} from '../../provider'

export const _setDarkMode = (state, dispatch) => {
    dispatch(setDarkMode(!state.darkMode))
}

export const _setHoKhau = (state, dispatch) => {
    dispatch(setHoKhau(hokhau))
}

export const _setNhanKhau = (state, dispatch) => {
    dispatch(setNhanKhau(nhankhau))
}


