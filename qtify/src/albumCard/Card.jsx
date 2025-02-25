import React from 'react';
import logo from '../assets/vibrating-headphone 1 (1).png';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  Typography 
} from '@mui/material';

export default function AlbumCard({image,title,follows,forAllsongs}) {
  
  
  
  return (
    <Card sx={{
      width: '159px',
      height: '232px',
      borderRadius: '12px 12px 0 0',
      overflow: 'hidden',
      backgroundColor: '#121212',
      
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }}>
      {/* Image Section */}
      <CardMedia
        component="img"
        image={image}
        sx={{ width: '100%', height: '170px', objectFit: 'cover' }}
      />

      
      <CardContent sx={{ backgroundColor: '#FFFFFF',
            color: '#121212',
            display: 'flex', 
            justifyContent: 'center', 
            padding: '8px 0',
            borderRadius: '0px  0px 12px 12px',
            height:'35px',
            position: 'relative'
            }}>
        <Chip 
          label={`${follows} ${forAllsongs ? "Likes" : "Follows"}`}
          variant="outlined"
          sx={{
            position: 'absolute', 
            left: '8px',         
            padding: "4px 8px",
            
            height: '23px',
            borderRadius: '10px',
            backgroundColor: '#121212',
            color: '#FFFFFF',
            fontSize: '10px',
            fontWeight: '400',
            fontFamily:'Poppins'
          }}
        />
      </CardContent>

      
      <Typography 
          
          sx={{
            textAlign: 'left',
            color: '#ffffff',
            fontWeight: 400, 
            paddingBottom: '8px',
            backgroundColor: '#121212',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            lineHeight: '21px',
            letterSpacing: '0px',
            
            height: '21px', 
            whiteSpace: 'nowrap',    
            overflow: 'hidden',       
            textOverflow: 'ellipsis'
          }}
        >
          {title}
      </Typography>

    </Card>
  );
}
