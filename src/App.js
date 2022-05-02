import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Pages/Home/Header/Header";
import Home from "./Pages/Home/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
