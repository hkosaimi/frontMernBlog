import UserLogin from "./components/user/UserLogin.js";
import UserSignup from "./components/user/UserSignup.js";

import ArticlesList from "./components/articles/ArticlesList.js";
import ArticleForm from "./components/articles/ArticleForm.js";
import Article from "./components/articles/Article.js";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import { useContext } from "react";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./components/Home.js";
function App() {
  const userContext = useContext(AuthContext);
  const { user } = userContext;

  return (
    <>
      <Home />
      <HashRouter>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/signup" element={!user ? <UserSignup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <UserLogin /> : <Navigate to="/" />} />
          <Route
            path="/create-article"
            element={user ? <ArticleForm /> : <Navigate to="/login" />}
          />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
