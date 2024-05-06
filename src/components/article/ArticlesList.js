import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./article.css";
import Home from "../../pages/Home";
import { useArticleContext } from "../../hooks/useArticleContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { FaRegTrashAlt } from "react-icons/fa";
function ArticlesList() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const { articles, dispatch } = useArticleContext();
  console.log(articles);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mernback-875f.onrender.com/api/blogs/articles");
        const json = await response.json();
        dispatch({ type: "GET_ARTICLES", payload: json });
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [articles]);

  const handleDelete = async (articleId) => {
    try {
      // Perform the deletion request here
      await fetch(`https://mernback-875f.onrender.com/api/blogs/articles/${articleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
          // You may need to include authorization headers if required
        },
      });
      // Update the UI by removing the deleted article from the articles array
      dispatch({ type: "DELETE_ARTICLE", payload: articleId });
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  return (
    <>
      <Home />
      <div className="articles_container">
        {articles && (
          <p
            style={{
              textAlign: "center",
              fontFamily: "Poppins",
              marginBottom: "10px",
              marginTop: "10px",
            }}>
            {articles.length === 1 ? articles.length + " article" : articles.length + " articles"}
          </p>
        )}

        {isLoading ? (
          <>
            <div className="hidden lg:block mt-[2.5rem] ml-[10px] rounded-[20px]">
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                animation="wave"
                variant="rounded"
                width={770}
                height={200}
              />
            </div>
            <div className=" lg:hidden mt-[2.5rem] ml-[10px] rounded-[20px]">
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                animation="wave"
                variant="rounded"
                width={400}
                height={300}
              />
            </div>
          </>
        ) : (
          articles?.map((a) => (
            <>
              <div className="articles">
                <Link to={`/article/${a._id}`} className="title">
                  {a.title}
                </Link>
                <p className="author">By {a.author}</p>
                <div className="tag_holder">
                  {a.tags.map((tag) => (
                    <>
                      <span className="tag">{tag}</span>
                    </>
                  ))}
                </div>
                <div className="article_footer">
                  <p>{format(new Date(a.createdAt), "MMM dd, yyyy | h:mm a")}</p>
                  {user && <FaRegTrashAlt onClick={() => handleDelete(a._id)} />}
                </div>
              </div>
            </>
          ))
        )}

        {/*    {isLoading && <Skeleton variant="rectangular" width={300} height={400} />}
        {articles ? (
          Array.isArray(articles) &&
          articles.map((a) => (
            <>
              <div className="articles">
                <Link to={`/article/${a._id}`} className="title">
                  {a.title}
                </Link>
                <p className="author">By {a.author}</p>
                <div className="tag_holder">
                  {a.tags.map((tag) => (
                    <>
                      <span className="tag">{tag}</span>
                    </>
                  ))}
                </div>
                <div className="article_footer">
                  <p>{format(new Date(a.createdAt), "MMM dd, yyyy | h:mm a")}</p>
                  {user?.role === "admin" && (
                    <>
                      <span class="material-symbols-outlined delete">delete</span>
                    </>
                  )}
                </div>
              </div>
            </>
          ))
        ) : (
          <Skeleton animation="wave" variant="rectangular" width={300} height={400} />
        )} */}
      </div>
    </>
  );
}

export default ArticlesList;
