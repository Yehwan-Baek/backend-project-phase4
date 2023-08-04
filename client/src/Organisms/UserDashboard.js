import React, { useState, useEffect } from "react";
import Navbar from "../Molecules/NavBar";
import Reviews from "../Molecules/Reviews";
import WatchList from "../Molecules/WatchList";
import { Link } from 'react-router-dom';
import CustomButton from "../Atoms/CustomButton";

function UserDashboard({ isLoggedIn, handleLogout }) {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("watchlist");

  useEffect(() => {
    fetch("/me")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleRemoveFromWatchlist = (animeId, watchListId) => {
    fetch(`/animes/${animeId}/watch_lists/${watchListId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            watch_lists: prevUserData.watch_lists.filter((item) => item.id !== watchListId),
          }));
        } else {
          console.error("Error removing item from watchlist:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error removing item from watchlist:", error);
      });
  };

  const handleDeleteReview = (reviewId) => {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            reviews: prevUserData.reviews.filter((review) => review.id !== reviewId),
          }));
        } else {
          alert("Not Authorized");
          console.error("Error deleting review:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  let noReviewsText = (
    <p>
      No reviews available. <Link to="/search">Write a review</Link>
    </p>
  );

  let noWatchlistText = (
    <p>
      No watch list available. <Link to="/search">Add anime to watch list</Link>
    </p>
  );

  return (
    <React.Fragment>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div style={{ textAlign: "center" }}>
        <h1>User Dashboard</h1>

        <div>
          <CustomButton
            onClick={() => handleTabChange("watchlist")}
            className={activeTab === "watchlist" ? "active" : ""}
            label="Watch List"
          />
          <CustomButton
            onClick={() => handleTabChange("reviews")}
            className={activeTab === "reviews" ? "active" : ""}
            label="Reviews"
          />
        </div>

        {activeTab === "watchlist" && (!userData.watch_lists || userData.watch_lists.length === 0) && noWatchlistText}
        {activeTab === "reviews" && (!userData.reviews || userData.reviews.length === 0) && noReviewsText}

        {activeTab === "watchlist" && userData.watch_lists && userData.watch_lists.length > 0 && <WatchList watchList={userData.watch_lists} onRemoveItem={handleRemoveFromWatchlist} />}
        {activeTab === "reviews" && userData.reviews && userData.reviews.length > 0 && <Reviews reviews={userData.reviews} onDeleteReview={handleDeleteReview}/>}
      </div>
    </React.Fragment>
  );
}

export default UserDashboard;
