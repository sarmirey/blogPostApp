import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import PostView from "./components/PostView";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/blog/:id" element={<PostView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
