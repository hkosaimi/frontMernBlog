import { useState, useContext } from "react";
import { ArticleContext } from "../../context/ArticleContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ArticleForm() {
  const context2 = useContext(ArticleContext);
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { dispatch } = context2;
  const { user } = userContext;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("Uncategorized");
  const [error, setError] = useState(null);
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch("https://api.icosmicdust.blog/api/blogs/articles", {
      method: "POST",
      body: JSON.stringify({ title, content, author, tags: tags.split(" ") }),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      dispatch({ type: "POST_ARTICLE", payload: json });
      navigate("/");
    } else {
      console.log(response.statusCode);
    }
  };
  return (
    <>
      <div className="newArticleForm">
        <form onSubmit={handleSubmit}>
          <h1>Add a new article</h1>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

          <textarea
            placeholder="Content"
            rows="7"
            cols="50"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />

          <button>Submit</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}

export default ArticleForm;
