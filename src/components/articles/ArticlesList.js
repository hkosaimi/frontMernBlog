import { useEffect, useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../context/AuthContext";
import { ArticleContext } from "../../context/ArticleContext";
import { Link } from "react-router-dom";
import "./blog.css";

function BlogDetails() {
  const context2 = useContext(ArticleContext);
  const context = useContext(AuthContext);
  const { user } = context;
  const { state, dispatch } = context2;
  const { articles } = state;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://mernback-875f.onrender.com/api/blogs/articles", {
        /*   headers: {
          "Authorization": `Bearser ${user.token}`,
        }, */
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "GET_ARTICLES", payload: json });
      }
    };

    fetchData();

    console.log(articles);
  }, [dispatch]);

  return (
    <>
      <div className="articles_container">
        {articles && (
          <p style={{ textAlign: "center", fontFamily: "Poppins", marginBottom: "10px" }}>
            {articles.length === 1 ? articles.length + " article" : articles.length + " articles"}
          </p>
        )}
        {articles &&
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
                      <span
                        class="material-symbols-outlined delete"
                        onClick={async () => {
                          const response = await fetch("https://mernback-875f.onrender.com/api/blogs/articles/" + a._id, {
                            method: "DELETE",
                            headers: {
                              "content-type": "application/json",
                              "Authorization": `Bearer ${user.token}`,
                            },
                          });
                          const json = await response.json();

                          if (response.ok) {
                            dispatch({ type: "DELETE_ARTICLE", payload: json });
                          }
                        }}>
                        delete
                      </span>
                    </>
                  )}
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default BlogDetails;
