import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Molecules/NavBar";
import AnimeList from "../Molecules/AnimeList";

function MainPage({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleAnimeCardClick = (animeId) => {
    if (isLoggedIn) {
      navigate(`/animes/${animeId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div
        className="main-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 100px",
        }}
      >
        <h1>Welcome to Anime Reviews Website</h1>
        <p style={{ margin: "0 300px", textIndent: "20px" }}>
          This website is dedicated to providing anime enthusiasts with a
          platform to discover, review, and share their favorite anime series.
          Whether you are a seasoned anime fan or new to the world of anime, you
          can find a wide selection of anime titles to explore and enjoy.
        </p>
        <div style={{ textAlign: "center" }}>
          <h3>User's Recommendation</h3>
          <AnimeList
            url={"/animes/order_by_average_rating"}
            onCardClick={handleAnimeCardClick}
            limit={3}
          />
        </div>
        <div>
          <h3>New Release</h3>
          <AnimeList
            url={"/release_dates/1/animes"}
            onCardClick={handleAnimeCardClick}
            limit={3}
          />
        </div>
      </div>
    </>
  );
}

export default MainPage;
