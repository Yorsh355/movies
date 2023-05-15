const Error = ({ children }) => {
  return (
    <div className="alert alert-danger text-center" role="alert">
      {children}
    </div>
  );
};

export default Error;
