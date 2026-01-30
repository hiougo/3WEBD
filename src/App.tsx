// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import SearchResults from './views/SearchResults';
import BookDetails from './views/BookDetails';
import NotFound from './views/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path="book/:id" element={<BookDetails />} />
                    <Route path="*" element={<NotFound />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;