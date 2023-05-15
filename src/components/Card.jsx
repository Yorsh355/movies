import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Card = ({
  titulo,
  descripcion,
  director,
  genero,
  anio,
  id,
  favorita,
  handleUpdate,
}) => {
  const putMovie = async () => {
    const updatedMovie = {
      favorita: !favorita,
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
      // Muestra un mensaje de error al usuario
    }
  };

  const deleteMovie = async () => {
    try {
      await fetch(
        `https://pruebatoc-production.up.railway.app/peliculas/${id}`,
        { method: "DELETE" }
      );

      handleUpdate();
    } catch (error) {
      console.error(error);
      // Muestra un mensaje de error al usuario
    }
  };

  return (
    <div className="card mb-4 container-fluid card-shadow border-0 bg-transparent">
      <div className="position-relative p-1">
        {/* <img src="..." className="card-img-top w-100 h-100" alt="... " /> */}
        <button
          className="border-0 bg-transparent btn btn-lg p-0"
          onClick={putMovie}
        >
          {!favorita ? <AiOutlineHeart /> : <AiFillHeart color="red" />}
        </button>
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">{titulo}</h5>
        <div className="d-md-block card-text mb-2">
          <p className="card-text">{descripcion}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Director: {director}</li>
          <li className="list-group-item">Género: {genero}</li>
          <li className="list-group-item">Año: {anio}</li>
        </ul>
      </div>
      <div className="card-body d-flex align-items-end">
        <div>
          <Link to={`update/${id}`}>
            <button type="button" className="btn btn-outline-primary">
              Actualizar
            </button>
          </Link>
        </div>
        <div className="ms-auto">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={deleteMovie}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
