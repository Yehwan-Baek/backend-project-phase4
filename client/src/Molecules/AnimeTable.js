import React from "react";
import CustomButton from "../Atoms/CustomButton";

const AnimeTable = ({ displayedAnime, handleDelete }) => {
  return (
    // Step 1: Wrap the AnimeTable inside a <div> container
    <div style={{ display: "flex", justifyContent: "center" ,margin:"50px"}}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genres</th>
            <th>Release Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedAnime.map((anime) => (
            <tr key={anime.id}>
              <td>{anime.title}</td>
              <td>{anime.genres}</td>
              <td>{anime.release_date}</td>
              <td>
                <CustomButton
                  label="Delete"
                  onClick={() => handleDelete(anime.id)}
                  color="error"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimeTable;
