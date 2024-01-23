import UserLogin from "./components/user/UserLogin.js";
import UserSignup from "./components/user/UserSignup.js";
import Navbar from "./components/Navbar.js";
import ArticlesList from "./components/articles/ArticlesList.js";
import ArticleForm from "./components/articles/ArticleForm.js";
import Article from "./components/articles/Article.js";
import { HashRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/create-article" element={<ArticleForm />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
