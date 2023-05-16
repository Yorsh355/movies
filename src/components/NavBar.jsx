import SearchBar from "./SearchBar";
import SearchCombine from "./SearshCombine";

const NavBar = ({ filterYear, filterDirector, filterGenere, handleSearch }) => {
  return (
    <div>
      <nav className="navbar bg-body-tertiary p-3 mb-4 d-flex justify-content-center">
        <SearchBar
          filterYear={filterYear}
          filterDirector={filterDirector}
          filterGenere={filterGenere}
          handleSearch={handleSearch}
        />
        <div className=" d-flex flex-column align-items-center mt-4">
          <h3>Busqueda Combinada</h3>
          <SearchCombine handleSearch={handleSearch} />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
