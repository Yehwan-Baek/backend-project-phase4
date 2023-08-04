import React, { useState, useEffect } from "react";
import AnimeCard from "../Atoms/AnimeCard";

function AnimeList({ url, onCardClick, limit }) {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAnimeList(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [url]);

  return (
    <div className="anime-list">
      {animeList.length === 0 ? (
        <p>Sorry, there are no animes available.</p>
      ) : (
        animeList.slice(0, limit).map((anime) => (
          <AnimeCard
            key={anime.id}
            animeId={anime.id}
            title={anime.title}
            image={anime.image_url}
            style={{ width: '25%', height: '25%', display: 'inline-block', margin: '10px' }}
            onCardClick={onCardClick}
          />
        ))
      )}
    </div>
  );
}

export default AnimeList;
