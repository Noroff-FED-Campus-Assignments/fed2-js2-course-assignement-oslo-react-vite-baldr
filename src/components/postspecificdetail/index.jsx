import React, { useState } from "react";

function CommentModal({ isOpen, onClose, onCommentSubmit }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    onCommentSubmit(comment);
    setComment("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container">
        <div className="bg-white p-4">
          <textarea
            rows="4"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-2 border rounded-md mb-2"
          />
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
