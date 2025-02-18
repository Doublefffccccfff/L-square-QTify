import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AlbumCard from '../albumCard/Card';

export default function Section({ title,loc }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [isSliderView, setIsSliderView] = useState(false); // State to toggle between views

    const fetchData = async (loc) => {
        try {
            const response = await axios.get(`https://qtify-backend-labs.crio.do/albums/${loc}`);
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
            console.log(albumData);
            if (albumData) {
                setData(albumData);
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        onHandler();
    }, []);

    useEffect(() => {
        console.log('Fetched Data:', data);
    }, [data]);

    // Slider settings
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: true,
    };

    return (
        <Box sx={{backgroundColor: '#121212',mb:'40px' }}>
            <Box sx={{
                
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb:'40px',
                mx: '31px' 
            }}>
                <Typography sx={{ color: '#FFFFFF' }}>
                    {title}
                </Typography>
                <Button
                    onClick={() => setIsSliderView(!isSliderView)} // Toggle view on button click
                    sx={{ color: '#FFFFFF' }}
                >
                    {!isSliderView ? 'Show All' : 'Collapse'}
                </Button>
            </Box>

            <Box sx={{
                
                paddingLeft: 6,
                paddingRight: 6,
            }}>
                {
                    !isSliderView ? ( // Conditional rendering for slider or grid view
                        <Slider {...sliderSettings}
                        sx={{mb:'40px'}}>
                            {data.map((album) => (
                                <div key={album.id}>
                                    <AlbumCard title={album.title} image={album.image} follows={album.follows} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <Grid container spacing={2}>
                        {data.map((album) => (
                            <Grid 
                                item 
                                key={album.id} 
                                xs={12/7}  
                                sx={{mb:'40px'}}
                            >
                                <AlbumCard 
                                    title={album.title} 
                                    image={album.image} 
                                    follows={album.follows}
                                />
                            </Grid>
                            ))}
                        </Grid>
                    )
                }
            </Box>
        </Box>
    );
}
