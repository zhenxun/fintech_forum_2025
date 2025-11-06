import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Committee from './Committee/Committee';
import Home from './Home/Home';
// import Check from './Register/Check';
import Agenda from './Agenda/Agenda';
import Epass from './Register/Epass';
import Register from './Register/Register';

function Index() {
    const searchParams = new URLSearchParams(document.location.search);
    const locale=searchParams.get("locale")
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' index element={<Home locale={locale} />} />
                <Route path='/agenda' element={<Agenda locale={locale} />} />
                <Route path='/committee' element={<Committee locale={locale} />} />
                <Route path='/register' element={<Register locale={locale} />} />
                <Route path='/check' element={<Epass />} />
            </Routes>
        </BrowserRouter>
    );
}

if (document.getElementById('index')) {
    ReactDOM.createRoot(document.getElementById("index")).render(<Index />)
}