import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        // Replace with your access token
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE";

        // Fetch posts
        const postsResponse = await fetch(
          "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sortOrder=asc",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!postsResponse.ok) {
          throw new Error(postsResponse.statusText);
        }

        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Index/ Home Page</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts
          .filter((post) => post.title !== "string")
          .map((post) => (
            <div
              key={post.id}
              className="bg-white text-black lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              {post.author && (
                <div className="mt-2">
                  <img
                    src={
                      post.author.avatar ??
                      `https://source.unsplash.com/random?sig=${Math.floor(
                        Math.random() * 1000
                      )}`
                    }
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full inline-block mr-2"
                  />
                  <span className="text-sm">{post.author.name}</span>
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">
                <Link to={`/post/${post.id}?postid=${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={`https://source.unsplash.com/random?sig=${Math.floor(
                    Math.random() * 1000
                  )}`}
                  alt={post.title}
                  className="object-cover object-center lg w-full h-full rounded-lg"
                />
                <div className="flex items-center">
                  <button className="flex items-center mr-4">
                    <img src="Like.png" alt="Like" className="w-5 h-5 mr-2" />
                    Like
                  </button>
                  <button className="mr-4">💬Comment</button>
                  <button onClick={() => handleEditPost(post.id)}>🖊Edit</button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

export default HomePage;
