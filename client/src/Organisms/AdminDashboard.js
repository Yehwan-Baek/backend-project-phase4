import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../Molecules/NavBar";
import CreateAnime from "../Molecules/CreateAnime";
// import UpdateUserRole from "../Molecules/UpdateUserRole";
import Reviews from "../Molecules/Reviews"; // Import the Reviews component
import WatchList from "../Molecules/WatchList"; // Import the Watchlist component
import CustomButton from "../Atoms/CustomButton";

function AdminDashboard({ isLoggedIn, handleLogout }) {
  const [activeTab, setActiveTab] = useState("createAnime");
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    fetch("/me")
      .then((response) => response.json())
      .then((data) => {
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

  return (
    <React.Fragment>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div style={{ textAlign: "center" }}>
        <h1>Admin Dashboard</h1>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <CustomButton
            onClick={() => handleTabChange("createAnime")}
            className={activeTab === "createAnime" ? "active" : ""}
            label="Managing Animes"
          />
          {/* <CustomButton
            onClick={() => handleTabChange("updateUserRole")}
            className={activeTab === "updateUserRole" ? "active" : ""}
            label="Update User Role"
          /> */}
          <CustomButton
            onClick={() => handleTabChange("watchlist")}
            className={activeTab === "watchlist" ? "active" : ""}
            label="Watchlist"
          />
          <CustomButton
            onClick={() => handleTabChange("reviews")}
            className={activeTab === "reviews" ? "active" : ""}
            label="Reviews"
          />
 
        </div>

        {activeTab === "createAnime" && <CreateAnime />}
        {/* {activeTab === "updateUserRole" && <UpdateUserRole />} */}
        {activeTab === "watchlist" && (!userData.watch_lists || userData.watch_lists.length === 0) && noWatchlistText}
        {activeTab === "reviews" && (!userData.reviews || userData.reviews.length === 0) && noReviewsText}

        {activeTab === "watchlist" && userData.watch_lists && userData.watch_lists.length > 0 && <WatchList watchList={userData.watch_lists} onRemoveItem={handleRemoveFromWatchlist} />}
        {activeTab === "reviews" && userData.reviews && userData.reviews.length > 0 && <Reviews reviews={userData.reviews}/>}
      </div>
    </React.Fragment>
  );
}

export default AdminDashboard;
