import { BrowserRouter , Route , Routes } from "react-router-dom";
import App from "./page/App";
import { ShipsSelecctions } from "./page/shipsSelecction";
import injectContext from "./store/appContext";

const Layout = () => {
    return(

        <BrowserRouter>
            <Routes>
                <Route element={<ShipsSelecctions/>} path='/selecction' />
                <Route element={<App/>} path='/' />
            </Routes>
        </BrowserRouter>
    )
}

export default injectContext(Layout)