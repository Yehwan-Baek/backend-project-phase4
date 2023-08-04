import React from "react";


function GenreCheckbox({ animeData, handleInputChange }) {
    if (!animeData) {
        animeData = { genres: [] };
      }

  return (
    <div>
      <label>Genres:</label>
      <div>
        <input
          type="checkbox"
          value="Action"
          checked={animeData.genres.includes("Action")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Action</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Adventure"
          checked={animeData.genres.includes("Adventure")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Adventure</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Comedy"
          checked={animeData.genres.includes("Comedy")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Comedy</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Drama"
          checked={animeData.genres.includes("Drama")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Drama</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Fantasy"
          checked={animeData.genres.includes("Fantasy")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Fantasy</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Music"
          checked={animeData.genres.includes("Music")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Music</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Romance"
          checked={animeData.genres.includes("Romance")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Romance</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Sci-Fi"
          checked={animeData.genres.includes("Sci-Fi")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Sci-Fi</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Seinen"
          checked={animeData.genres.includes("Seinen")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Seinen</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Shojo"
          checked={animeData.genres.includes("Shojo")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Shojo</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Shonen"
          checked={animeData.genres.includes("Shonen")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Shonen</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Slice of Life"
          checked={animeData.genres.includes("Slice of Life")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Slice of Life</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Sports"
          checked={animeData.genres.includes("Sports")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Sports</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Supernatural"
          checked={animeData.genres.includes("Supernatural")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Supernatural</span>
      </div>
      <div>
        <input
          type="checkbox"
          value="Thriller"
          checked={animeData.genres.includes("Thriller")}
          onChange={(e) =>
            handleInputChange(
              "genres",
              e.target.checked
                ? [...animeData.genres.split(", "), e.target.value]
                : animeData.genres
                    .split(", ")
                    .filter((genre) => genre !== e.target.value)
            )
          }
        />
        <span>Thriller</span>
      </div>
    </div>
  );
}

export default GenreCheckbox;
