import { useState } from "react";

function SearchCombine({ handleSearch }) {
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");

  return (
    <div className="d-flex justify-content-center mt-2">
      <input
        className="form-control me-2"
        type="text"
        placeholder="Año"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        className="form-control me-2"
        type="text"
        placeholder="Género"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        className="form-control me-2"
        type="text"
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <button
        className="btn btn-outline-success"
        onClick={() => handleSearch(year, genre, director)}
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchCombine;
