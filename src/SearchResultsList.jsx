import "./SearchResultsList.css";
import  SearchResult  from "./SearchResult";

 const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list" >
      {results.map((result, id) => {
        return <SearchResult result={result.firstName+' '+result.lastName} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;