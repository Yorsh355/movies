import { useEffect, useState } from "react";
import Error from "./Error";
import Success from "./Success";
import { useParams, useNavigate } from "react-router-dom";

const FormMovie = ({ handleUpdate }) => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [director, setDirector] = useState("");
  const [anio, setAnio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  //Crear película en la API
  const postMovie = async () => {
    const newMovie = {
      titulo,
      genero,
      director,
      anio,
      descripcion,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    };

    try {
      await fetch(
        "https://pruebatoc-production.up.railway.app/peliculas",
        options
      );
      handleUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const putMovie = async () => {
    const updatedMovie = {
      titulo,
      genero,
      director,
      anio,
      descripcion,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    };

    try {
      await fetch(
        `https://pruebatoc-production.up.railway.app/peliculas/${id}`,
        options
      );

      handleUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Validacion del formulario */
    if ([titulo, genero, director, anio, descripcion].includes("")) {
      setError(true);
      return;
    }
    setError(false);

    if (!id) {
      postMovie();

      setSuccess(true);

      //Reiniciar el Formulario
      setTitulo("");
      setGenero("");
      setDirector("");
      setAnio("");
      setDescripcion("");

      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 1000);
    } else {
      putMovie();

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 1000);
    }
  };

  useEffect(() => {
    if (id) {
      const consultarAPI = async () => {
        const url = `https://pruebatoc-production.up.railway.app/peliculas/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setTitulo(resultado?.titulo);
        setGenero(resultado?.genero);
        setDirector(resultado?.director);
        setAnio(resultado?.anio);
        setDescripcion(resultado?.descripcion);
      };
      consultarAPI();
    }
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "90vh" }}
    >
      <form
        className="shadow p-3 mb-5 bg-body rounded w-50"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <div className="d-flex align-items-center justify-content-center p-2">
          <h2>{!id ? "Crear película" : "Actualizar película"}</h2>
        </div>

        {error && <Error>Todos los campos son obligatorios</Error>}
        {success && <Success>Operación exitosa!!!</Success>}

        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Titulo
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="titulo"
            placeholder="Titulo de la película"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genero" className="form-label">
            Género
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="genero"
            placeholder="Género de la película"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="director" className="form-label">
            Director
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="director"
            placeholder="Director de la película"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="anio" className="form-label">
            Año
          </label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="anio"
            placeholder="Año de estreno"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control form-control-sm"
            id="descripcion"
            placeholder="Descripción de la película"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100 btn-sm">
          {!id ? "Crear" : "Actualizar"}
        </button>
      </form>
    </div>
  );
};

export default FormMovie;
