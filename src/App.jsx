import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FormMovie from "./components/FormMovie";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  /* Estado para las peliculas */
  const [movies, setMovies] = useState([]);
  const [copy, setCopy] = useState([]);
  const [update, setUpdate] = useState(false);

  /* Leer los datos del localStorage al cargar la aplicación */
  useEffect(() => {
    const getLS = () => {
      const moviesLS = JSON.parse(localStorage.getItem("movies")) ?? [];
      setMovies(moviesLS);
      setCopy(moviesLS);
    };
    getLS();
  }, []);

  /* Guardar los datos en el localStorage cada vez que se actualiza el estado de películas */
  useEffect(() => {
    const saveToLS = () => {
      localStorage.setItem("movies", JSON.stringify(movies));
    };
    saveToLS();
  }, [movies]);

  /* Cargar todas las peliculas desde la API al cargar la APP */
  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://pruebatoc-production.up.railway.app/peliculas";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setMovies(resultado);
      setCopy(resultado);
    };
    consultarAPI();
  }, [update]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  /* Filtrar por año */
  const filterYear = (a) => {
    const year = copy.filter((m) => m.anio === parseInt(a));
    setMovies(year);
  };

  /* Filtrar por director */
  const filterDirector = (d) => {
    const director = copy.filter(
      (m) =>
        m.director
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") ===
        d
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
    );
    setMovies(director);
  };

  /* Filtrar por género */
  const filterGenere = (g) => {
    const genere = copy.filter(
      (m) =>
        m.genero
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") ===
        g
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
    );
    setMovies(genere);
  };

  //Filtrar por Favoritos
  const filterFavorites = () => {
    const favorites = copy.filter((m) => m.favorita === true);
    setMovies(favorites);
  };

  return (
    <div>
      <NavBar
        filterYear={filterYear}
        filterDirector={filterDirector}
        filterGenere={filterGenere}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              setMovies={setMovies}
              filterFavorites={filterFavorites}
              handleUpdate={handleUpdate}
            />
          }
        />
        <Route
          path="create"
          element={<FormMovie handleUpdate={handleUpdate} />}
        />
        <Route
          path="update/:id"
          element={<FormMovie handleUpdate={handleUpdate} />}
        />
      </Routes>
    </div>
  );
}

export default App;
