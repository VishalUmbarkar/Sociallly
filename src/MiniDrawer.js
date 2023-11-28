import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './Drawer.css';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

export default function MiniDrawer() {
  const icons = ['/home.png', '/explore.png', '/avatar.png', '/create.png']; // Add more icons as needed
  const URLs = ['http://localhost:3000/feed','http://localhost:3000/explore','http://localhost:3000/profile','http://localhost:3000/create'];

  return (
    <Box sx={{ display: 'flex' }}>
      
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        {/* <h1 style={{ margin: '20px' }}>Socially</h1> */}
        <div >
        <img src='/new logo.png' alt='logo' style={{width:"80%", margin:"20px"}}></img>
        </div>

        <List>
          {['Home', 'Explore', 'Profile', 'Create'].map((text, index) => (
            <ListItem key={text} disablePadding style={{ margin: '20px' }}>
              {index < icons.length && <img src={icons[index]} alt={`${text} icon`} style={{ marginRight: '10px' }} />}
              
              <ListItemButton  component={Link} to ={URLs[index]} >
                <ListItemText primary={text} />
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
