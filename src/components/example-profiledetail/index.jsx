import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function ProfileDetail() {
  const [profile, setProfile] = useState();
  const { profileid } = useSearch();

  useEffect(() => {
    const apiKey = localStorage.getItem("access_token")
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/social/profiles/${profileid}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
        const json = await response.json();
        console.log("json", json);
        setProfile(json);
      } catch(error) {
        console.log(error);
      }
    }
    fetchProfile();
  },[])

  return (
    <div>
      <h1>Profile Details</h1>
      <h2>{profile?.name}</h2>
      <h3>{profile?.email}</h3>
      <img src={profile?.avatar} alt={profile?.name} />
    </div>
  );
}