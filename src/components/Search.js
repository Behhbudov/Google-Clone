import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import "./Search.css";
import { Button } from "@mui/material";
import { useStateValue } from "../store/StateProvider";
import { actionTypes } from "../store/reducer";

const Search = ({ hideButtons = false }) => {
  const [{}, dispatch] = useStateValue();

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const searchHandler = (event) => {
    event.preventDefault();

    console.log("Input button >> ", inputValue);

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: inputValue,
    });

    navigate("/search");
  };

  return (
    <form className="search">
      <div className="search--input">
        <SearchIcon className="search--input-icon" />
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <MicIcon />
      </div>
      {!hideButtons ? (
        <div className="search--buttons">
          <Button type="submit" onClick={searchHandler} variant="outlined">
            Google Search
          </Button>
          <Button variant="outlined">I'm Feeling Lucky</Button>
        </div>
      ) : (
        <div className="search--buttons">
          <Button
            className="search--buttons-hidden"
            type="submit"
            onClick={searchHandler}
            variant="outlined"
          >
            Google Search
          </Button>
          <Button className="search--buttons-hidden" variant="outlined">
            I'm Feeling Lucky
          </Button>
        </div>
      )}
    </form>
  );
};

export default Search;
