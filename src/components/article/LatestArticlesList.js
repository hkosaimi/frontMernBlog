import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./article.css";
import Home from "../../pages/Home";
import { useArticleContext } from "../../hooks/useArticleContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { FaRegTrashAlt } from "react-icons/fa";
import Footer from "./../Footer";
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
  }, []);

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
          <div className="mb-[150px]">
            <h1 className="font-[Poppins] text-[30px] px-2 mb-5 text-left mt-[30px]">
              Latest Articles
            </h1>
            {articles?.slice(0, 3).map((a) => (
              <div className="p-[2rem] font-[Poppins] mb-[30px] w-[100%] m-auto cursor-pointer rounded-[20px] text-white text-[20px] bg-[#121212] shadow-[5px_5px_5px_#000]">
                <Link
                  to={`/article/${a._id}`}
                  className="text-[25px] font-bold leading-[30px] lg:text-[25px]">
                  {a.title}
                </Link>
                <p className="author">By {a.author}</p>
                <div className="tag_holder">
                  {a.tags.map((tag) => (
                    <span className="tag">{tag}</span>
                  ))}
                </div>
                <div className="article_footer">
                  <p>{format(new Date(a.createdAt), "MMM dd, yyyy | h:mm a")}</p>
                  {user && <FaRegTrashAlt onClick={() => handleDelete(a._id)} />}
                </div>
              </div>
            ))}
            <div className="float-right mt-5 bg-teal-700 rounded-lg py-2 px-3 font-[Poppins] hover:bg-teal-900">
              <Link to="/all-articles">View all</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ArticlesList;

{
  /*    {isLoading && <Skeleton variant="rectangular" width={300} height={400} />}
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
        )} */
}
