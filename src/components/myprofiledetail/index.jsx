import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";

export default function ProfileDetail() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const apiKey = localStorage.getItem("access_token");
  const profileid = localStorage.getItem("user_name")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await fetch(`https://api.noroff.dev/api/v1/social/profiles/${profileid}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const profileData = await profileResponse.json();
        setProfile(profileData);

        const postsResponse = await fetch(`https://api.noroff.dev/api/v1/social/profiles/${profileid}/posts`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [profileid, apiKey]);

  return (
    <div>
      <h1>Profile Details</h1>
      {profile && (
        <div>
          <h2>{profile.name}</h2>
          <h3>{profile.email}</h3>
          <img src={profile.avatar} alt={profile.name} />
        </div>
      )}
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
