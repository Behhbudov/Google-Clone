import React from "react";
import useGoogleSearch from "../hooks/useGoogleSearch";
import { useStateValue } from "../store/StateProvider";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import "./SearchPage.css";
// import Response from "../store/response";

const SearchPage = () => {
  const [{ term }, dispatch] = useStateValue();

  // Live API call
  const { data } = useGoogleSearch(term);

  // Mock API Call
  // const data = Response;

  console.log(data);

  return (
    <div className="search--page">
      <div className="search--page-header">
        <Link to="/">
          <img
            className="search--page-logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="Google Logo"
          />
        </Link>
        <div className="search---page--header-body">
          <Search hideButtons />
          <div className="search--page-options">
            <div className="search---page--options-left">
              <div className="search--page-option">
                <Link to="/all">All</Link>
              </div>
              <div className="search--page-option">
                <Link to="/news">News</Link>
              </div>
              <div className="search--page-option">
                <Link to="/images">Images</Link>
              </div>
              <div className="search--page-option">
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="search--page-option">
                <Link to="/maps">Maps</Link>
              </div>
              <div className="search--page-option">
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="search---page--options-right">
              <div className="search--page-option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="search--page-option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {term && (
        <div className="search--page-results">
          <p className="search---page--result-count">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>
          {data?.items.map((item) => (
            <div className="search--page-result">
              <a href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0].src && (
                    <img
                      className="search---page--result-image"
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0].src
                      }
                      alt="Link Logo"
                    />
                  )}
                <div>{item.displayLink}</div>
              </a>
              <a className="search---page--result-title" href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <p className="search---page--result-snippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
