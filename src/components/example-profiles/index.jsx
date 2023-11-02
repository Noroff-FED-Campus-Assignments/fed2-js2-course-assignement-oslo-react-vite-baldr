import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export default function ExampleProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const apiKey = localStorage.getItem("access_token");
      try {
        setIsLoading(true);
        const url = new URL(`https://api.noroff.dev/api/v1/social/profiles`);
        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");

        const response = await fetch(url.href, {
          headers: {
            method: "GET",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        // Generate and set random avatar images for profiles
        const updatedProfiles = data.map((profile) => ({
          ...profile,
          avatar: getRandomAvatarImage(profile.id),
        }));

        setProfiles(updatedProfiles);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Function to generate a random avatar image URL for a specific profile ID
  const getRandomAvatarImage = (profileid) => {
    const randomImageId = Math.floor(Math.random() * 1000);
    return `https://source.unsplash.com/random/100x100/?avatar?sig=${randomImageId}&profileId=${profileid}`;
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <h1>Index/ Home Page</h1>

      <section>
        {profiles.map((profile) => (
          <div key={profile?.name}>
            <Link to={`/profiles/${profile.name}?profileid=${profile.name}`}>
              <h2>{profile?.name}</h2>
              <h3>{profile?.email}</h3>
              <img src={profile?.avatar} alt={profile?.name} />
            </Link>
            </div>

        ))}
      </section>
    </>
  );
}