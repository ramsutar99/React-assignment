import React from "react";
import axios from "axios";

class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      search: "",
      loading: false,
    };
  }

  componentDidMount() {
    const loadMovies = async () => {
      this.setState({ loading: true });
      const response = await axios.get(
        "https://www.omdbapi.com/?apikey=45f0782a&s=war"
      );
      this.setState({ data: response.data.Search });
      this.setState({ loading: false });
    };
    loadMovies();
  }

  render() {
    return (
      <>
        <form className="search" id="searchInput">
          <input
            type="search"
            placeholder="Search Movie Name"
            onChange={(e) => {
              this.setState({ search: e.target.value.toLowerCase() });
            }}
          />
        </form>
        <ul className="movies">
          {/* //========================= */}
          {this.state.loading ? (
            <h3 className="loading">Loading....</h3>
          ) : (
            this.state.data
              .filter((value) => {
                if (this.state.search === "") {
                  return value;
                } else if (
                  value.Title.toLowerCase().includes(this.state.search)
                ) {
                  return value
                }
              })
              .map((item, i) => (
                <li key={item.imdbID}>
                  <div className="movie">
                    <figure>
                      <img src={`${item.Poster}`} alt="" />
                      <figcaption>
                        <h2 className="movie__title">{item.Title}</h2>
                      </figcaption>
                    </figure>
                  </div>
                </li>
              ))
          )}
          {/* //===================== */}
        </ul>
      </>
    );
  }
}

export default Movies;
