import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Molecules/NavBar";
import InputField from "../Atoms/InputField";
import AnimeCard from "../Atoms/AnimeCard"; // Make sure to import the AnimeCard component

function Search({ isLoggedIn, handleLogout }) {
  const [allAnime, setAllAnime] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [displayedAnime, setDisplayedAnime] = useState([]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    fetchAnimeData();
  }, []);

  useEffect(() => {
    const filteredAnime = allAnime.filter((anime) =>
      anime.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setDisplayedAnime(filteredAnime);
  }, [searchInput, allAnime]);

  const fetchAnimeData = () => {
    fetch("/animes")
      .then((response) => response.json())
      .then((data) => {
        setAllAnime(data);
        setDisplayedAnime(data); // Initially, display all anime
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 100px",
          textAlign: "center", // Center-align the content
        }}
      >
        <div>
          <h1>All Anime and Search</h1>
          <InputField
            type="text"
            name="search"
            placeholder="Search by title"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        <div>
          {displayedAnime.map((anime) => (
            <AnimeCard
              key={anime.id}
              animeId={anime.id}
              title={anime.title}
              image={anime.image_url}
              style={{ width: '25%', height: '25%', display: 'inline-block', margin: '10px' }}
              onCardClick={handleAnimeCardClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
