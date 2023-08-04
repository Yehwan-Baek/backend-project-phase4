import React, { useState, useEffect } from "react";
import CustomButton from "../Atoms/CustomButton";
import InputField from "../Atoms/InputField";
import AnimeTable from "./AnimeTable";
import GenreCheckbox from "./GenreCheckbox";

function CreateAnime() {
  const [animeData, setAnimeData] = useState({
    title: "",
    genres: "",
    description: "",
    release_date: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [allAnime, setAllAnime] = useState([]);
  const [displayedAnime, setDisplayedAnime] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDuplicateWarningVisible, setDuplicateWarningVisible] = useState(false);

  const handleInputChange = (name, value) => {
    if (name === "genres") {
      const genresArray = value.map((genre) => genre.trim()).filter(Boolean);
      const genresString = genresArray.join(", ");
      setAnimeData((prevData) => ({
        ...prevData,
        [name]: genresString,
      }));
    } else {
      setAnimeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("Selected file:", file);
      setImageFile(file);
    } else {
      console.log("No file selected.");
      setImageFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = new FormData();
  
    data.append("anime[title]", animeData.title);
    data.append("anime[genres]", animeData.genres);
    data.append("anime[description]", animeData.description);
    data.append("anime[release_date]", animeData.release_date);
  
    if (imageFile) {
      data.append("image[file_path]", imageFile);
      data.append("image[file_name]", imageFile.name);
    }
  
    const isDuplicate = displayedAnime.some(
      (anime) => anime.title.toLowerCase() === animeData.title.toLowerCase()
    );
  
    if (isDuplicate) {
      setDuplicateWarningVisible(true);
    } else {
      fetch("/animes", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setDisplayedAnime((prevDisplayedAnime) => [...prevDisplayedAnime, data]);
          setAnimeData({
            title: "",
            genres: "",
            description: "",
            release_date: "",
          });
          setImageFile(null);
          setDuplicateWarningVisible(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };  

  const handleDelete = (id) => {
    fetch(`/animes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (response.status === 204) {
          console.log("Anime deleted successfully!");
          setDisplayedAnime((prevDisplayedAnime) =>
            prevDisplayedAnime.filter((anime) => anime.id !== id)
          );
        } else {
          return response.json().then((data) => {
            console.log(data);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
    fetch("/animes/all")
      .then((response) => response.json())
      .then((data) => {
        setAllAnime(data);
        setDisplayedAnime(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleToggleForm = () => {
    setFormVisible((prevVisible) => !prevVisible);
  }

const generateReleaseYearOptions = () => {
  const options = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const startYear = currentYear - 20;
  const endYear = currentYear;
  for (let year = startYear; year <= endYear; year++) {
    options.push(year.toString());
  }
  return options.reverse();
};

  
  return (
    <>
      <div >
        <h2>All Anime</h2>
        <InputField
          type="text"
          name="search"
          placeholder="Search by title"
          value={searchInput}
          onChange={handleSearch}
        />
        <AnimeTable displayedAnime={displayedAnime} handleDelete={handleDelete} />
        <CustomButton type="button" label={isFormVisible ? "Hide Form" : "Create an Anime"} onClick={handleToggleForm} />
        {isDuplicateWarningVisible && <p style={{ color: "red" }}>Warning: This anime already exists!</p>}
      </div>
    <div> 
    </div>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="title"
            placeholder="Title"
            value={animeData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            width="500px"
          />
          <GenreCheckbox animeData={animeData} handleInputChange={handleInputChange} />
          <InputField
            type="text"
            name="description"
            placeholder="Description"
            value={animeData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            width="500px"
            height="150px"
          />
          <div>
            <select
              name="release_date"
              value={animeData.release_date}
              onChange={(e) => handleInputChange("release_date", e.target.value)}
              style={{ width: "100px" }}
            >
              <option value="">Select Release Year</option>
              {generateReleaseYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <input
            type="file"
            name="image"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
          <CustomButton type="submit" label="Create Anime" />
        </form>
      )}
      
    </>
  );
}

export default CreateAnime;
