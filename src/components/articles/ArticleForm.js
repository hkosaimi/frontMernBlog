import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function BlogForm() {
  const context = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  /* const handleSubmit = async ()=>{
    const response = await fetch("/api/blogs/articles",{
        method: "POST",
        body: JSON.stringify({title,content,author}),
        headers: {
            "content-type": "application/json",

        }
    })
  } */
  return (
    <>
      <div>
        <form>
          <input placeholder="Title"></input>
          <input placeholder="Content"></input>
          <input placeholder="Author"></input>
        </form>
      </div>
    </>
  );
}

export default BlogForm;
