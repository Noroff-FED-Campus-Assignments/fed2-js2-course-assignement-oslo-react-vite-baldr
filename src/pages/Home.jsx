import { useEffect, useState } from "react";
import ExampleProfiles from "../components/example-profiles/index.jsx";

/**
 * Home Page displays a list of posts and profiles
 * @see https://docs.noroff.dev/social-endpoints/posts
 * @see https://docs.noroff.dev/social-endpoints/profiles
 */

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

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

        // Fetch profiles
        const profilesResponse = await fetch(
          "https://api.noroff.dev/api/v1/social/profiles?_author=true&_comments=true&_reactions=true",
          {
            headers: {
              method: "GET",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!profilesResponse.ok) {
          throw new Error(profilesResponse.statusText);
        }

        const profilesData = await profilesResponse.json();

        setProfiles(profilesData);
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
          .map((post) => {
            return (
              <div
                key={post.id}
                className="bg-white text-black lg shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={`https://source.unsplash.com/random?sig=${Math.floor(
                      Math.random() * 1000
                    )}`}
                    alt={post.title}
                    className="object-cover object-center lg w-full h-full rounded-lg"
                  />
                  <div className="">
                    <button>
                      <img src="Like.png" alt="Like" />
                      Like
                    </button>
                    <button>💬Comment</button>
                    <button>🖊Edit</button>
                  </div>
                </div>

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
              </div>
            );
          })}
      </section>
      <ExampleProfiles />
    </>
  );
}
