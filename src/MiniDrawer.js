import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Drawer.css';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

export default function MiniDrawer() {
  const icons = ['/home.png', '/explore.png', '/avatar.png', '/create.png']; // Add more icons as needed
  const URLs = ['http://localhost:3000/feed','http://localhost:3000/explore','http://localhost:3000/profile','http://localhost:3000/create'];
  
  const isSmallScreen = useMediaQuery('(max-width:600px)');



  return (
    <Box sx={{ display: 'flex' }}>
      
      <Drawer className='drawer'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background:'transparent',
            overflow:'clip',
            borderRight:'1px solid #ccc',
            backgroundColor: 'rgba(231, 229, 234, 0.3)',
            boxShadow: '0 1px 12px rgba(0, 0, 0, 0.25)',
            /* Adjust the blur value as needed */
            backdropFilter: 'blur(5px)',
            '@media (max-width: 600px)': {
              width: '63px', // Adjust the width for smaller screens
              marginLeft:'none',
              flex:'1'
            },
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        {/* <h1 style={{ margin: '20px' }}>Socially</h1> */}
        <div style={{ width: isSmallScreen ? "40px" : "100%" }}>
        <img src={isSmallScreen ? '/logo.png' : '/new_logo.png'} style={{width:"80%", margin:"20px", objectFit:"contain"}}></img>
        </div>

        <List>
          {['Home', 'Explore', 'Profile', 'Create'].map((text, index) => (
            <ListItem key={text} disablePadding style={{ margin: '20px' }}>
              {index < icons.length && <img src={icons[index]} alt={`${text} icon`} style={{ marginRight: '10px' }} />}
              
              <ListItemButton  component={Link} to ={URLs[index]} >
                <ListItemText primary={text} style={{color:"black", fontWeight:"100"}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        {/* Your main content goes here */}
      </Box>
    </Box>
    
  );
}
