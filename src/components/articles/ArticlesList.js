import { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Article from "./Article";
import "./blog.css";

function BlogDetails() {
  const [articles, setArticles] = useState(null);
  const context = useContext(AuthContext);
  const { user } = context;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/blogs/articles");
      if (response.ok) {
        const json = await response.json();
        setArticles(json);
        console.log(json);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="articles_container">
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
                  <p>{format(new Date(a.createdAt), "dd/m/yyyy h:mm a")}</p>
                  {user?.success && (
                    <>
                      <span
                        class="material-symbols-outlined delete"
                        onClick={async () => {
                          const response = await fetch("/api/blogs/articles/" + a._id, {
                            method: "DELETE",
                          });
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
