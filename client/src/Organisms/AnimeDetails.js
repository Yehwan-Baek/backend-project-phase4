import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Molecules/NavBar";
import ReviewList from "../Molecules/ReviewList";
import ReviewForm from "../Molecules/ReviewForm";
import CustomButton from "../Atoms/CustomButton";

function AnimeDetails({ isLoggedIn, handleLogout, isAdmin }) {
  const { animeId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [animeData, setAnimeData] = useState(null);
  const [animeInWatchlist, setAnimeInWatchlist] = useState(false);
  const [errorAddingToWatchlist, setErrorAddingToWatchlist] = useState(false);
  const [watchListId, setWatchListId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkIfInWatchlist();
    fetchAnimeData();
    fetchReviews();
  }, [animeId]);

  const fetchAnimeData = () => {
    fetch(`/animes/${animeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setAnimeData(data);
      })
      .catch((error) => {
        console.error("Error fetching anime data:", error);
      });
  };

  const fetchReviews = () => {
    fetch(`/animes/${animeId}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  const checkIfInWatchlist = () => {
    fetch("/me")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.watch_lists);
        setUserData(data)
        const isInWatchlist = data.watch_lists.some(
          (watchlistItem) => watchlistItem.anime_id == animeId
        );

        if (isInWatchlist) {
          const watchlistItem = data.watch_lists.find(
            (watchlistItem) => watchlistItem.anime_id == animeId
          );
          console.log(`this watchlist id is ${watchlistItem.id}`);

          setAnimeInWatchlist(true);
          setWatchListId(watchlistItem.id);
        } else {
          setAnimeInWatchlist(false);
          setWatchListId(null);
        }
      })
      .catch((error) => {
        console.error("Error checking if anime is in watchlist:", error);
        setAnimeInWatchlist(false);
        setWatchListId(null);
      });
  };

  
  const addNewReview = (review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
    updateAnimeData();
  };

  const removeReview = (reviewId) => {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review.id !== reviewId)
          );
          updateAnimeData();
        } else {
          alert("Not Authorized");
          console.error("Error deleting review:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  const updateAnimeData = () => {
    fetchAnimeData();
  };

const addToWatchlist = () => {
  fetch(`/animes/${animeId}/watch_lists`, {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        setErrorAddingToWatchlist(true);
        console.error("Error adding anime to watchlist:", response.status);
      }
    })
    .then((data) => {
      console.log(data.id)
      setUserData(data)
      setAnimeInWatchlist(true);
      setErrorAddingToWatchlist(false);
      setWatchListId(data.id);
      localStorage.setItem(`anime_${animeId}_watchlist`, "true");
    })
    .catch((error) => {
      setErrorAddingToWatchlist(true);
      console.error("Error adding anime to watchlist:", error);
    });
};

const removeFromWatchlist = () => {
  fetch(`/animes/${animeId}/watch_lists/${watchListId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("deleted")
        setAnimeInWatchlist(false);
        setErrorAddingToWatchlist(false);
        localStorage.removeItem(`anime_${animeId}_watchlist`);
      } else {
        setErrorAddingToWatchlist(true);
        console.error("Error removing anime from watchlist:", response.status);
      }
    })
    .catch((error) => {
      setErrorAddingToWatchlist(true);
      console.error("Error removing anime from watchlist:", error);
    });
};

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="anime-details">
        {animeData ? (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={animeData.image_url}
                alt={animeData.title}
                style={{ maxWidth: "100%", maxHeight: "100%", width: "50%" }}
              />
            </div>
            <div style={{ margin: "20px 300px" }}>
              <h2>{animeData.title}</h2>
              {animeInWatchlist ? (
                <CustomButton onClick={removeFromWatchlist} label="Remove from Watchlist" color="error"/>
              ) : (
                <CustomButton onClick={addToWatchlist} label="Add to Watchlist" />
              )}
              {errorAddingToWatchlist && (
                <p style={{ color: "red", marginLeft: "10px" }}>
                  Anime is already added to the Watchlist.
                </p>
              )}
              {animeData.average_rating !== null ? (
                 <p>Rating: {animeData.average_rating.toFixed(1)}</p>
              ) : (
                <p>Rating: No rating yet</p>
              )}
              <p>Genres: {animeData.genres}</p>
              <p>Release Date: {animeData.release_date}</p>
              <p>{animeData.description}</p>
            </div>
            <div style={{ margin: "20px 300px" }}>
              <h3>Reviews</h3>
              <ReviewForm animeId={animeId} updatedReviews={addNewReview} />
              <ReviewList
                reviews={reviews}
                onDeleteReview={removeReview}
                isLoggedIn={true}
                loggedInUserId={userData.id}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default AnimeDetails;
