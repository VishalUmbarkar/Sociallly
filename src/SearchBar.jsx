import { useState } from "react";


import "./SearchBar.css";

 const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");
  const fetchData = (value) => {
    fetch("http://localhost:8080/search/users",{
        headers:{
            "Authorization":`Bearer ${accessToken}`
        }
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.userName &&
           ( user.userName.toLowerCase().includes(value) || user.firstName.toLowerCase().includes(value) || user.lastName.toLowerCase().includes(value) )
            
          );
        });
        console.log(accessToken);
        setResults(results);
        console.log(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      
      <input id="input"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;