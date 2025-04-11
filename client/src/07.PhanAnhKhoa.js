import { useState, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams,
    useNavigate,
} from "react-router";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { GameDetail } from "./components/DetailG";
import { FormAdd } from "./components/FormAdd";
import { FormUpdate } from "./components/FormUpdate";

function App() {
    const [games, setGames] = useState([]);

    return (
        <BrowserRouter>
            <div className="min-h-[567px] w-screen bg-slate-900">
                <header className="">
                    <Navbar />
                </header>
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <HomePage games={games} setGames={setGames} />
                            }
                        />
                        <Route path="/games/about" element={<About />} />
                        <Route path="/games/contact" element={<Contact />} />
                        <Route
                            path="/games"
                            element={
                                <HomePage games={games} setGames={setGames} />
                            }
                        />
                        <Route
                            path="/games/:id"
                            element={<GameDetail games={games} />}
                        />
                        <Route
                            path="/games/create"
                            element={
                                <FormAdd setGames={setGames} games={games} />
                            }
                        />
                        <Route
                            path="/games/update/:id"
                            element={
                                <FormUpdate setGames={setGames} games={games} />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
