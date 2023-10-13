import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE";

const FetchSpecific = () => {
  const { postid } = useSearch();
  console.log(postid);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${postid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        // Post has been successfully deleted. You can handle this as needed.
      } else {
        // Handle the error here, e.g., display an error message.
      }
    } catch (error) {
      // Handle network or other errors here.
    }
  };

  useEffect(() => {
    const fetchSpecificPost = async () => {
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/social/posts/${postid}?_author=true&_comments=true&_reactions=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          // Handle the error here, e.g., display an error message.
        }
      } catch (error) {
        // Handle network or other errors here.
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecificPost();
  }, [postid]);

  return (
    <div className="bg-white text-black p-4">
      <div className="specific">
        {isLoading ? (
          <p>Loading...</p>
        ) : post ? (
          <div>
            {post.author && (
              <div className="mt-2 text-sm font-semibold">
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

            <h1 className="text-xl font-bold">{post.title}</h1>
            <p>{post.created}</p>
            <img
              src={`https://source.unsplash.com/random?sig=${Math.floor(
                Math.random() * 1000
              )}`}
              alt={post.title}
              className="object-cover object-center lg w-full h-full rounded-lg"
            />
            <p>{post.body}</p>

            <button
              onClick={handleDeletePost}
              className="bg-red-500 text-white p-2 rounded mt-4"
            >
              Delete Post
            </button>
          </div>
        ) : (
          <p>Error loading post.</p>
        )}
      </div>
    </div>
  );
};

export default FetchSpecific;
