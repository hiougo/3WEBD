// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import SearchResults from './views/SearchResults';
import BookDetails from './views/BookDetails';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route parente qui contient le Header/Footer */}
                <Route path="/" element={<Layout />}>

                    {/* ✅ La page par défaut (Accueil) */}
                    <Route index element={<Home />} />

                    {/* Les autres pages */}
                    <Route path="search" element={<SearchResults />} />
                    <Route path="book/:id" element={<BookDetails />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;