import React from "react";
import logo from "./logo.svg";
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import Homepage from "./pages/Homepage";

function App() {
    return (
        <div className='App'>
            <Navigation />
            <Routes>
                <Route path='/' element={<Homepage />} />
            </Routes>
        </div>
    );
}

export default App;
