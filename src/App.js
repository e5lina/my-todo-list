import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Todolist } from "./component/Todolist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todolist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
