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

  useEffect(() => {
    const getLS = () => {
      const moviesLS = JSON.parse(localStorage.getItem("movies")) ?? [];
      console.log(moviesLS);
    };
    getLS();
  });

  /* useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);
 */
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

  /* Filtrar por año */
  const filterDirector = (d) => {
    const director = copy.filter(
      (m) => m.director.toLowerCase() === d.toLowerCase()
    );
    setMovies(director);
  };

  const filterGenere = (g) => {
    const genere = copy.filter(
      (m) => m.genero.toLowerCase() === g.toLowerCase()
    );
    setMovies(genere);
  };

  //Filtrar por Favoritos
  const filterFavorites = () => {
    const favorites = copy.filter((m) => m.favorita === true);
    console.log("Favoritos");
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
