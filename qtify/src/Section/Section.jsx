import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Grid 
  } from '@mui/material';
  import AlbumCard from '../albumCard/Card';
export default function Section({title}) {
    const [data ,SetData]= useState([])

    const fetchData = async () => {
        try {
          const response = await axios.get('https://qtify-backend-labs.crio.do/albums/top');
          console.log(response);
          
          return response.data; 
        } catch (error) {
          console.error('Error fetching data:', error.message);
          return null; 
        }
      };
      useEffect(() => {
        const onHandler = async () => {
          const albumData = await fetchData();
          console.log(albumData)
            if(albumData){
                SetData(albumData)
                
                
            }
          
        };
    
        onHandler();
      }, []);

      useEffect(() => {
        console.log('Fetched Data:', data);
    }, [data]);

      return(
        <Box sx={{ mb: 4 ,backgroundColor:'#121212',}}>
                <Box sx={{ 
                
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2 
                }}>
                <Typography sx={{ color: '#1ED760' }}>
                    {title}
                </Typography>
                <Button sx={{ color: '#1ED760' }}>
                    Collapse
                </Button>
                </Box>
  
        
        
         
          <Box sx={{ position: 'relative' }}>
            <Grid container spacing={2}>
              {data.map((album) => (
                <Grid item key={album.id}>
                  <AlbumCard title={album.title} image={album.image} follows={album.follows}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        
      </Box>
    
      )
}