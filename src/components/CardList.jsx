import { Link } from "react-router-dom";
import Card from "./Card";
import { useState } from "react";

const CardList = ({ movies, filterFavorites, handleUpdate }) => {
  console.log(movies);

  const [page, setPage] = useState(1); // Estado de la página actual

  const moviesPerPage = 6; // Películas por página

  const start = (page - 1) * moviesPerPage; // Índice de inicio

  const end = start + moviesPerPage; // Índice de fin

  const displayedMovies = movies.slice(start, end); // Películas que se van a mostrar en la página actual

  return (
    <div className="m-5 ">
      {/* Boton para agregar peliculas a la lista */}
      <div className="d-flex justify-content-between">
        <div className="mb-4">
          <Link to={"create"}>
            <button type="button" className="btn btn-outline-primary">
              Nueva Película
            </button>
          </Link>
        </div>

        {/* Favoritos */}
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => filterFavorites()}
          >
            Favoritos
          </button>
        </div>
      </div>

      {/* Aqui se renderizan todas las Cards */}
      <div className="row justify-content-center row-gap-4">
        {displayedMovies.length !== 0 ? (
          displayedMovies.map((m) => (
            <div key={m.id} className="col-12 col-md-4">
              <Card
                titulo={m.titulo}
                descripcion={m.descripcion}
                director={m.director}
                genero={m.genero}
                anio={m.anio}
                id={m.id}
                favorita={m.favorita}
                handleUpdate={handleUpdate}
              />
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Paginado */}
      <div className="pagination-container">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {Array(Math.ceil(movies.length / moviesPerPage))
              .fill()
              .map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CardList;
