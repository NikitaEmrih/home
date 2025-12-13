import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import PostsPage from "./pages/PostsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </Main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
