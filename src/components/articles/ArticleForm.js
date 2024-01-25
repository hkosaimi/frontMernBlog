import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function BlogForm() {
  const context = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("Uncategorized");
  const [img, setImg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/blogs/articles", {
      method: "POST",
      body: JSON.stringify({ title, content, author, tags: tags.split(" ") }),
      headers: {
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      console.log(img);
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
          <input
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}></input>
          <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
          <input
            type="file"
            placeholder="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default BlogForm;
