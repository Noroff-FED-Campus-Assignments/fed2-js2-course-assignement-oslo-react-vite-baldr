import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiKey } from "../lib/api";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [, setIsLoading] = useState(true);
  const [, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [filterUser, setFilterUser] = useState("");

  const handleCreatePost = async () => {
    try {
      const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE";
      console.log("Creating a new post...");
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/posts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newPostContent, body: newPostContent }),
        }
      );

      const data = await response.json();
      console.log(data);
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user_name", data.name);

      setData(data);

      console.log("Post creation response:", response);

      if (response.ok) {
        // Post has been successfully created.
        setIsCreating(false);
        setNewPostContent(""); // Clear the input field

        console.log("Fetching updated posts...");
        const postsResponse = await fetch(
          "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sortOrder=asc",
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        console.log("Updated posts response:", postsResponse);

        if (postsResponse.ok) {
          // Update the list of posts with the newly created one
          const postsData = await postsResponse.json();
          setPosts(postsData);
        } else {
          console.error("Error fetching updated posts:", postsResponse.statusText);
          // Handle the error here, e.g., display an error message.
        }
      } else {
        // Handle the error here, e.g., display an error message.
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network or other errors here.
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const postsResponse = await fetch(
          "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sortOrder=asc",
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
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

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.body
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesUser = post.author?.name
      .toLowerCase()
      .includes(filterUser.toLowerCase());
    return matchesSearch && (filterUser === "" || matchesUser);
  });

  return (
    <>
      <div className="bg-white text-black">
        <h1 className="text-2xl font-bold mb-4">Index/ Home Page</h1>
        <div className="create-post">
          {isCreating ? (
            <div>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md mt-4"
              ></textarea>
              <button
                onClick={handleCreatePost}
                className="bg-green-500 text-white p-2 rounded mt-4"
              >
                Create Post
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="bg-blue-500 text-white p-2 rounded mt-4"
            >
              Create New Post
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="Search by body content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        <input
          type="text"
          placeholder="Filter by user"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
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
              <Link to={`/post/${post.id}?postid=${post.id}`}>
                <div className="aspect-w-3 aspect-h-2 mt-4">
                  <img
                    src={`https://source.unsplash.com/random?sig=${(
                      Math.random() * 1000
                    )}`}
                    alt={post.title}
                    className="object-cover object-center lg w-full h-full rounded-lg"
                  />
                  <div className="mt-4">{post.body}</div>
                </div>
              </Link>
              <div className="flex items-center mt-4">
                <button className="flex items-center mr-4 text-sm font-normal">
                  <img src="Like.png" alt="Like" className="w-5 h-5 mr-2" />
                  Like
                </button>
                <button className="mr-4 text-sm font-normal">💬 Comment</button>
                <button className="text-sm font-normal">🖊 Edit</button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default HomePage;