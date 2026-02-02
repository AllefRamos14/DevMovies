import { Routes, Route } from 'react-router-dom'
import Home from '../containers/Home'
import Movies from '../containers/Movies'
import Series from '../containers/Series'
import DefaultLayout from '../layout/DefaultLayout'
import Detalhe from '../containers/Detalhe'


function Router() {
    return (

        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/filmes' element={<Movies />} />
                <Route path='/series' element={<Series />} />
                <Route path="/detalhe/:type/:id" element={<Detalhe />} />

            </Route>
        </Routes>


    )

}
export default Router