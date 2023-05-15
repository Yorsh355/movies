import SearchBar from "./SearchBar";

const NavBar = ({ filterYear, filterDirector, filterGenere }) => {
  return (
    <div className="">
      <nav className="navbar bg-body-tertiary p-3 mb-4">
        <SearchBar
          filterYear={filterYear}
          filterDirector={filterDirector}
          filterGenere={filterGenere}
        />
      </nav>
    </div>
  );
};

export default NavBar;
