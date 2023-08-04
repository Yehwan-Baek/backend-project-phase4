import React, { useState } from "react";
import InputField from "../Atoms/InputField";
import CustomButton from "../Atoms/CustomButton";

function ReviewForm({ animeId, updatedReviews }) {
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null); // Added: State to store error message

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const reviewData = {
      rating: parseInt(rating, 10),
      comment: comment,
    };
  
    fetch(`/animes/${animeId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 422) {
          setError("You have already written a review for this anime.");
          throw new Error("Review already exists.");
        } else {
          setError(
            "Failed to submit review. Please check your input and try again."
          );
          throw new Error("Failed to submit review.");
        }
      })
      .then((data) => {
        updatedReviews(data);
        setRating("5");
        setComment("");
        setError(null);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  };
  

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating (1 to 5):</label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <InputField
            id="comment"
            name="comment"
            rows="4"
            value={comment}
            onChange={handleCommentChange}
            width="700px"
            height="100px"
            multiline
          />
        </div>
        <div>
          <CustomButton type="submit" label="Submit Review" />
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
