import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import './SearchBar.css';
import  SearchBar  from './SearchBar';
import  SearchResultsList  from './SearchResultsList';

 const Search=()=> {
  const [state, setState] = React.useState({
    
    left: false,

});
const [results, setResults] = React.useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ 
        width: anchor === 'left' || anchor === 'bottom' ? '250' : 350, backgroundColor:"white" // Apply a common left margin for all anchors
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <Divider />
      
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <Button onClick={toggleDrawer('left', true)}>left</Button>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: "450px",
              marginLeft:"65px" // Apply a common left margin
            },
          }}
        >
         
         <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>

        </Drawer>
      </React.Fragment>
    </div>
  );
}
export default Search;