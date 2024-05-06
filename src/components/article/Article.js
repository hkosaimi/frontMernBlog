import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "../Navbar";
import { FaReact } from "react-icons/fa";
import { useArticleContext } from "../../hooks/useArticleContext";

const Article = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { articles, dispatch } = useArticleContext();
  // Fetch the specific article data based on the ID
  const [article, setArticle] = useState(null);
  console.log(article);
  useEffect(() => {
    const fetchData = async () => {
      // Set isLoading to true while fetching data
      setIsLoading(true);

      // Fetch data
      try {
        const response = await fetch(`https://mernback-875f.onrender.com/api/blogs/articles/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Set the fetched data
        setArticle(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }

      // Set isLoading to false when data fetching is complete
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      {isLoading ? (
        <FaReact className="loading" />
      ) : (
        article && (
          <div className="article">
            <h2>{article.title}</h2>
            <span>By {article.author}</span>
            <span>{format(new Date(article.createdAt), "dd/MM/yyyy h:mm a")}</span>
            <p>{article.content}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Article;

/*     <div style={{ height: "100vh" }}>
      <Navbar />
      {isLoading ? (
        <FaReact className="loading" />
      ) : (
        article &&
        Array.isArray(article) &&
        article.map((a) => (
          <div className="article">
            <h2>{a.title}</h2>
            <span>By {a.author}</span>
            <span>{format(new Date(a.createdAt), "dd/MM/yyyy h:mm a")}</span>
            <p>{a.content}</p>
          </div>
        ))
      )}
       {article && (
        <>
          <div className="article">
            <h2>{article.title}</h2>
            <span>By {article.author}</span>
            <span>{format(new Date(article.createdAt), "dd/MM/yyyy h:mm a")}</span>
            <p>{article.content}</p>
          </div>
        </>
      )} 
    </div> */
