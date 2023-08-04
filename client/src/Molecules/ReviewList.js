import React from "react";
import CustomButton from "../Atoms/CustomButton";

function ReviewList({ reviews, onDeleteReview, isLoggedIn, loggedInUserId, isAdmin }) {
  const handleDelete = (reviewId) => {
    onDeleteReview(reviewId);
  };

  return (
    <div>
      {reviews?.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reviews.map((review) => (
            <li key={review.id} style={{ border: "1px solid green", padding: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ width: "150px", marginRight: "10px" }}>
                <p>Reviewer: {review.username}</p>
                <p>Rating: {review.rating}</p>
              </div>
              <div style={{ flex: 1, width: "400px" }}>
                <p>{review.comment}</p>
              </div>
              {isLoggedIn && (
                (review.user_id === loggedInUserId || isAdmin) && ( 
                  <CustomButton
                    onClick={() => handleDelete(review.id)}
                    label="Delete"
                    color="error"
                  />
                )
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
}

export default ReviewList;
