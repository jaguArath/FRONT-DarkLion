import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import RouterApp from "./routes/RouterApp.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<RouterApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
