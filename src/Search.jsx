import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

// import './Search.css';
import  SearchBar  from './SearchBar';
import  SearchResultsList  from './SearchResultsList';

 const Search=( {toggle, onClose })=> {
  
const [results, setResults] = React.useState([]);
const [open, setOpen] = React.useState(true);

const handleClickAway = (event) => {
    const drawer = document.getElementById('search-drawer');
    if (drawer && !drawer.contains(event.target)) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickAway);
    } else {
      document.removeEventListener('mousedown', handleClickAway);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [open, onClose]);

  const customClasses = {
    paper: 'my-custom-drawer', // Add your custom class here
  };
    


  return (
    <div id='kare'>
      <React.Fragment>
        
        <Drawer
        id='search-drawer'
          
        classes={customClasses}
          open={open}
          onClose={onClose}
          hideBackdrop={true}
          PaperProps={{
            style: { display: 'flex', marginLeft:"64px", alignItems:"center", width:"350px", backgroundColor: "rgba(231, 229, 234, 0.001)",zIndex :"1",backdropFilter:" blur(40px)"},
          }}
          
          sx={{
              width: "250px",
              marginLeft:"64px"          }}
        >
         
         
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
     
        </Drawer>
      </React.Fragment>
    </div>
  );
}
export default Search;