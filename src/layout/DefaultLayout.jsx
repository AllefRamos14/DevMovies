import Hearder from "../components/Header"
import { Outlet } from "react-router-dom"



function DefaultLayout() {

    return (
        <>
            {<Hearder />}
            <Outlet />
        </>
    )
}
export default DefaultLayout