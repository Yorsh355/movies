import { FaHome } from "react-icons/fa";
import { useState } from "react";

const SearchBar = ({ filterYear, filterDirector, filterGenere }) => {
  const [anio, setAnio] = useState("");
  const [director, setDirector] = useState("");
  const [genere, setGenere] = useState("");

  const handleSubmit = (e, filterType) => {
    e.preventDefault();

    switch (filterType) {
      case "year":
        filterYear(anio);
        setAnio("");
        break;
      case "director":
        filterDirector(director);
        setDirector("");
        break;
      case "genere":
        filterGenere(genere);
        setGenere("");
        break;
      default:
        break;
    }
  };

  return (
    /* Estilos navbar */
    <div className="container-fluid d-flex flex-md-row flex-column gap-2">
      {/* Botón de Inicio */}
      <div className="d-flex align-items-center">
        <a href="/" className="btn btn-outline-success">
          <FaHome />
        </a>
      </div>

      {/* Filtro año */}
      <form
        className="d-flex"
        role="search"
        onSubmit={(e) => handleSubmit(e, "year")}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Año"
          aria-label="Search"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      {/* Filtro Director */}
      <form
        className="d-flex"
        role="search"
        onSubmit={(e) => handleSubmit(e, "director")}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Director"
          aria-label="Search"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      {/* Filtro Genero */}
      <form
        className="d-flex"
        role="search"
        onSubmit={(e) => handleSubmit(e, "genere")}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Género"
          aria-label="Search"
          value={genere}
          onChange={(e) => setGenere(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Género
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
