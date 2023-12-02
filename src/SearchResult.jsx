// import "./SearchResult.css";

import { useNavigate } from "react-router-dom";

 const SearchResult = ({ result }) => {
  const navigate = useNavigate();
  const userName=result;
  console.log(result);
  const handleClick = ()=>{
    navigate('/profile', { state: { yourProps: { userName } } });
  }

  return (
    <div
      className="search-result" onClick={handleClick}
      // onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};

export default SearchResult;