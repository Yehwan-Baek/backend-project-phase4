import React from "react";
import { Link } from 'react-router-dom';

function GenreList() {
    const linkStyle = {
      color: "white",
      textDecoration: "none", // Optional: Remove underline on links
    };

    return(
        <ul>
        <li>
          <Link to="/genre/action" style={linkStyle}>Action</Link>
        </li>
        <li>
          <Link to="/genre/adventure" style={linkStyle}>Adventure</Link>
        </li>
        <li>
          <Link to="/genre/comedy" style={linkStyle}>Comedy</Link>
        </li>
        <li>
          <Link to="/genre/drama" style={linkStyle}>Drama</Link>
        </li>
        <li>
          <Link to="/genre/fantasy" style={linkStyle}>Fantasy</Link>
        </li>
        <li>
          <Link to="/genre/music" style={linkStyle}>Music</Link>
        </li>
        <li>
          <Link to="/genre/romance" style={linkStyle}>Romance</Link>
        </li>
        <li>
          <Link to="/genre/sci-fi" style={linkStyle}>Sci-Fi</Link>
        </li>
        <li>
          <Link to="/genre/seinen" style={linkStyle}>Seinen</Link>
        </li>
        <li>
          <Link to="/genre/shojo" style={linkStyle}>Shojo</Link>
        </li>
        <li>
          <Link to="/genre/shonen" style={linkStyle}>Shonen</Link>
        </li>
        <li>
          <Link to="/genre/slice-of-life" style={linkStyle}>Slice of Life</Link>
        </li>
        <li>
          <Link to="/genre/sports" style={linkStyle}>Sports</Link>
        </li>
        <li>
          <Link to="/genre/supernatural" style={linkStyle}>Supernatural</Link>
        </li>
        <li>
          <Link to="/genre/thriller" style={linkStyle}>Thriller</Link>
        </li>
      </ul>
    )
}

export default GenreList;