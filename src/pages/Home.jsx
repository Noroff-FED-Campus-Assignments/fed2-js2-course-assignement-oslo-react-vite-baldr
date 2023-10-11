import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]); // State to store profiles
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE"; // Replace with your access token

        const postsUrl = new URL(`https://api.noroff.dev/api/v1/social/posts`);
        postsUrl.searchParams.append("_author", "true");
        postsUrl.searchParams.append("_comments", "true");
        postsUrl.searchParams.append("_reactions", "true");

        const postsResponse = await fetch(postsUrl.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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

  // Fetch profiles and store them in the profiles state
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE"; // Replace with your access token

        const profilesUrl = new URL("https://api.noroff.dev/api/v1/social/profiles");
        profilesUrl.searchParams.append("_author", "true");

        const profilesResponse = await fetch(profilesUrl.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (profilesResponse.ok) {
          const profilesData = await profilesResponse.json();

          // Generate and set random avatar images for profiles
          const updatedProfiles = profilesData.map((profile) => ({
            ...profile,
            avatar: getRandomAvatarImage(),
          }));

          setProfiles(updatedProfiles);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []); // Run this effect once on component mount

  // Function to generate a random avatar image URL
  const getRandomAvatarImage = () => {
    const randomImageId = Math.floor(Math.random() * 1000);
    return `https://source.unsplash.com/random/100x100/?avatar?sig=${randomImageId}`;
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Index/Home Page</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => {
          const postProfile = profiles.find((profile) => profile.id === post.authorId);

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
              <div className="mt-2">
                {/* Use the postProfile to display the correct profile information */}
                <img
                  src={postProfile.avatar}
                  alt={post.title}
                  className="w-8 h-8 rounded-full inline-block mr-2"
                />
                <span className="text-sm">{postProfile.name}</span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
