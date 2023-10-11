import { useParams } from "react-router-dom";

const fetchSpecific = () => {
  const { postId } = useParams();
  return (
    <div className="specific">
      <div>
        <h2>Individual Post</h2>
        <p>Post ID: {postId}</p>
        {/* Display the content of the specific post */}
      </div>
      <h2>A single Post Page hei julia dette er riktig side</h2>
    </div>
  );
};

export default fetchSpecific;
