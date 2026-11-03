const Options = ({ options }) => {
  return (
    <div className="options">
      {options.map((curr) => {
        return (
          <button className="btn btn-option" key={curr}>
            {curr}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
