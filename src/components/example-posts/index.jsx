import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Posts() {
  /** @type {[Post[], React.Dispatch<Data>]} */
  //const [posts, setPosts] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  //const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      //setIsLoading(true);

      try {
        const accessToken = localStorage.getItem("access_token");
        const url = new URL("https://api.noroff.dev/api/v1/social/posts");
        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");

        const res = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();

        //setPosts(data);
      } catch (error) {
        //setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);
}