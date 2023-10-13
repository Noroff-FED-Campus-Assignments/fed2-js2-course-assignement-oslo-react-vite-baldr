import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE";

const FetchSpecific = () => {
  const { postid } = useSearch();
  console.log(postid);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="specific">
      <h2>Individual Post</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : post ? (
        <div>
          <p>Post ID: {post.id}</p>
          <p>Title: {post.title}</p>
          <img
            src={`https://source.unsplash.com/random?sig=${Math.floor(
              Math.random() * 1000
            )}`}
            alt={post.title}
            className="object-cover object-center lg w-full h-full rounded-lg"
          />
          {/* You can display other post details here */}
        </div>
      ) : (
        <p>Error loading post.</p>
      )}
    </div>
  );
};

export default FetchSpecific;
