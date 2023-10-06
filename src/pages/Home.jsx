import { useEffect, useState } from "react";
/**
 * @typedef {import('../lib/types.js').PostModel} Post
 */

/**
 * Home Page displays a list of posts
 * @see https://docs.noroff.dev/social-endpoints/posts
 */

export default function HomePage() {
  /** @type {[Post[], React.Dispatch<Data>]} */
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE";
        console.log(accessToken);

        const url = new URL(`https://api.noroff.dev/api/v1/social/posts`);
        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");
        url.searchParams.append("sortOrder", "asc");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        setPosts(data);
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
          .filter((post) => post.title !== "string") // Filter out posts with 'string' media
          .map((post) => (
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
                  className="object-cover object-center lg w-full h-full"
                />
                <div className="">
                  <button>
                    <img src="Like.png" />
                    Like
                  </button>
                  <button>💬Comment</button>
                  <button>🖊Edit</button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
