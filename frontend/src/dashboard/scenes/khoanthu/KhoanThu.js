import { KhoanThuContextProvider } from "./KhoanThuContext"
import KhoanThuView from "./component/KhoanThuView"

export default function KhoanThu(){
    return(
        <KhoanThuContextProvider>
            <KhoanThuView/>
        </KhoanThuContextProvider>
    )
}
