import CardList from "./CardList";

const Home = ({ movies, filterFavorites, handleUpdate }) => {
  return (
    <div>
      <CardList
        movies={movies}
        filterFavorites={filterFavorites}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Home;
