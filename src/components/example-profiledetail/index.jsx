import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";

export default function ProfileDetail() {
  const { profileid } = useSearch();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsIm5hbWUiOiJmcm9kbG8iLCJlbWFpbCI6ImZpcnN0Lmxhc3RAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk2NDExMTMyfQ.5rZZV8ic8pB0zNR_fLzZyHmOgteJA4HE5AbB4iPvNNE';
        const response = await fetch(`https://api.noroff.dev/api/v1/social/profiles/${profileid}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const json = await response.json();
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