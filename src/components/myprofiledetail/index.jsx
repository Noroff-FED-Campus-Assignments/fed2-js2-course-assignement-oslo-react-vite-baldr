import { useEffect, useState } from "react";

export default function MyProfileDetail() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const apiKey = localStorage.getItem("access_token");
  const profileid = localStorage.getItem("user_name");
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await fetch(
          `https://api.noroff.dev/api/v1/social/profiles/${profileid}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const profileData = await profileResponse.json();
        setProfile(profileData);

        const postsResponse = await fetch(
          `https://api.noroff.dev/api/v1/social/profiles/${profileid}/posts`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [profileid, apiKey]);

  const handleEditPost = (post) => {
    // Open the edit form or modal and populate it with the post data.
    setEditingPost(post);
  };

  const handleUpdatePost = (updatedPost) => {
    // Handle the PUT request to update the post.
    fetch(`https://api.noroff.dev/api/v1/social/posts/${editingPost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => {
        if (response.ok) {
          // Post updated successfully.
          // You may want to update the local state or re-fetch posts here if needed.
          setEditingPost(null); // Close the edit form or modal.
        } else {
          // Handle error if the update request is not successful.
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  const handleDeletePost = (postId) => {
    // Handle the DELETE request to delete the post.
    fetch(`https://api.noroff.dev/api/v1/social/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Post deleted successfully.
          // You may want to update the local state or re-fetch posts here if needed.
        } else {
          // Handle error if the delete request is not successful.
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Profile Details</h1>
      {profile && (
        <div>
          <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
          <h3 className="text-lg text-gray-600 mb-4">{profile.email}</h3>
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-full mb-4"
          />
        </div>
      )}
      <h1 className="text-2xl font-semibold mt-8 mb-4">Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            <div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
              <button
                onClick={() => handleEditPost(post)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingPost && (
        <div>
          <h2 className="text-xl font-semibold mt-8 mb-4">Edit Post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdatePost({
                ...editingPost,
                title: e.target.elements.title.value,
              });
            }}
          >
            <input
              type="text"
              name="title"
              value={editingPost.title}
              onChange={(e) => {
                const updatedTitle = e.target.value;
                setEditingPost({ ...editingPost, title: updatedTitle });
              }}
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
