import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Atoms/CustomButton";

function Reviews({ reviews, onDeleteReview }) {
  const navigate = useNavigate();

  const handleReviewClick = (animeId) => {
    navigate(`/animes/${animeId}`);
  };

  const handleRemoveReview = (reviewId) => {
    onDeleteReview(reviewId);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Reviews</h1>
      <h4>Click on Review to View Anime</h4>
      <ul
        style={{
          padding: 0,
          listStyle: "none", // Remove the default list-style
        }}
      >
        {reviews.map((review) => (
          <li
            key={review.id}
            style={{
              display: "inline-block",
              width: "400px",
              padding: "10px",
              margin: "10px",
              cursor: "pointer",
              border: "2px solid green",
              textAlign: "center",
            }}
            onClick={() => handleReviewClick(review.anime_id)}
          >
            <div>
              <h2>{review.title}</h2>
              <h4>Rating: {review.rating}</h4>
              <p style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                {truncateText(review.comment, 100)}
              </p>
              <CustomButton
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the li's onClick event from being triggered
                  handleRemoveReview(review.id);
                }}
                label="Remove"
                color="error"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
