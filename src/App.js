import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Forecast from "./pages/forecast";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/forecast" element={<Forecast/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
