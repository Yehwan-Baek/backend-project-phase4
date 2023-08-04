import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Molecules/NavBar";
import AnimeList from "../Molecules/AnimeList";

function AnimeIndex({ isLoggedIn, handleLogout }) {
    const { genre } = useParams();
    const navigate = useNavigate();

    const genres = {
        "action": 1,
        "adventure": 2,
        "comedy": 3,
        "drama": 4,
        "fantasy": 5,
        "music": 6,
        "romance": 7,
        "sci-Fi": 8,
        "seinen": 9,
        "shojo": 10,
        "shonen": 11,
        "slice-of-life": 12,
        "sports": 13,
        "supernatural": 14,
        "thriller": 15
    };

    const genreId = genres[genre];

    const handleAnimeCardClick = (animeId) => {
        if (isLoggedIn) {
            navigate(`/animes/${animeId}`);
        } else {
            navigate("/login");
        }
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div style={{ textAlign: "center" }}>
            <h2>{capitalizeFirstLetter(genre)} Animes</h2>
            <AnimeList url={`/genres/${genreId}/animes`} onCardClick={handleAnimeCardClick} />
            </div>
        </>
      );
}

export default AnimeIndex;
