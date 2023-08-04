import React, { useState, useEffect } from "react";
import Button from "../Atoms/CustomButton";

function UpdateAnime() {
  const [animes, setAnimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("/animes")
      .then((response) => response.json())
      .then((data) => {
        setAnimes(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSearch = () => {
    const filteredAnimes = animes.filter((anime) =>
      anime.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredAnimes);
  };

  const handleDeleteAnime = (animeId) => {
    fetch(`/animes/${animeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setAnimes((prevAnimes) => prevAnimes.filter((anime) => anime.id !== animeId));
          setSearchResults((prevResults) => prevResults.filter((anime) => anime.id !== animeId));
          console.log("Anime deleted successfully.");
        } else {
          console.error("Failed to delete anime.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch} label="Search" />

      {searchQuery
        ? searchResults.map((anime) => (
            <div key={anime.id}>
              <span>{anime.title}</span>
              <Button onClick={() => handleDeleteAnime(anime.id)} label="Delete" />
            </div>
          ))
        : animes.map((anime) => (
            <div key={anime.id}>
              <span>{anime.title}</span>
              <Button onClick={() => handleDeleteAnime(anime.id)} label="Delete" />
            </div>
          ))}
    </div>
  );
}

export default UpdateAnime;
