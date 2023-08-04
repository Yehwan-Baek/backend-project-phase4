import React from "react";
import CustomButton from "../Atoms/CustomButton";
import { useNavigate } from "react-router-dom";

function WatchList({ watchList, onRemoveItem }) {
  const navigate = useNavigate();

  const handleRemove = (animeId, watchListId) => {
    onRemoveItem(animeId, watchListId);
  };

  const handleReviewClick = (animeId) => {
    navigate(`/animes/${animeId}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Watch List</h1>
      <h4>Click on Watch List to View Anime</h4>
      {watchList.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {watchList.map((item) => (
              <li
                key={item.id}
                style={{
                  width: "400px",
                  padding: "10px",
                  margin: "10px",
                  cursor: "pointer",
                  border: "2px solid green",
                  textAlign: "center",
                }}
                onClick={() => handleReviewClick(item.anime_id)}
              >
                <p>Title: {item.title}</p>
                <CustomButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the li's onClick event from being triggered
                    handleRemove(item.anime_id, item.id);
                  }}
                  label="Remove"
                  color="error"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No items in the watch list.</p>
      )}
    </div>
  );
}

export default WatchList;
