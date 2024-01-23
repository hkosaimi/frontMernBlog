import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
const Article = () => {
  const { id } = useParams();

  // Fetch the specific article data based on the ID
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch article data based on the ID from the server
    fetch(`/api/blogs/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.error("Error fetching article:", error));
  }, [id]);

  return (
    <div>
      {article ? (
        <>
          <div className="article">
            <h2>{article.title}</h2>
            <span>By {article.author}</span>
            <span>{format(new Date(article.createdAt), "dd/MM/yyyy h:mm a")}</span>

            <p>{article.content}</p>
          </div>
        </>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
};

export default Article;
