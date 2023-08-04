import React from 'react';

function AnimeCard({ animeId, title, image, style, onCardClick }) {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...style,
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  };

  const handleClick = () => {
    onCardClick(animeId);
  };

  return (
        <div key={animeId} style={cardStyle} className="anime-card" onClick={handleClick}>
          <img src={image} alt={title} style={imageStyle} />
          <h3>{title}</h3>
        </div>
  );
}

export default AnimeCard;
