import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AlbumCard from '../albumCard/Card';

export default function Section({ title, loc }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSliderView, setIsSliderView] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://qtify-backend-labs.crio.do/albums/${loc}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return null;
        }
    };

    useEffect(() => {
        const onHandler = async () => {
            const albumData = await fetchData();
            if (albumData) {
                setData(albumData);
                setLoading(false);
            }
        };
        onHandler();
    }, [loc]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        responsive: [
            {
                breakpoint: 3000, // xl and above
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7
                }
            },
            {
                breakpoint: 1200, // lg
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 900, // md
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 600, // sm
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400, // xs
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Box sx={{ backgroundColor: '#121212', mb: '40px' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '40px',
                mx: { xs: '16px', sm: '24px', md: '31px' }
            }}>
                <Typography 
                    sx={{ 
                        color: '#FFFFFF',
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
                    }}
                >
                    {title}
                </Typography>
                <Button
                    onClick={() => setIsSliderView(!isSliderView)}
                    sx={{ 
                        color: '#FFFFFF',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                    }}
                >
                    {!isSliderView ? 'Show All' : 'Collapse'}
                </Button>
            </Box>

            <Box sx={{
                paddingX: { xs: 2, sm: 4, md: 6 }
            }}>
                {!isSliderView ? (
                    <Slider {...sliderSettings} sx={{ mb: '40px' }}>
                        {data.map((album) => (
                            <Box 
                                key={album.id} 
                                sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}
                            >
                                <AlbumCard 
                                    title={album.title} 
                                    image={album.image} 
                                    follows={album.follows} 
                                />
                            </Box>
                        ))}
                    </Slider>
                ) : (
                    <Grid 
                        container 
                        spacing={{ xs: 1, sm: 2, md: 2 }}
                    >
                        {data.map((album) => (
                            <Grid 
                                item 
                                key={album.id}
                                xs={12}          // 1 card per row on mobile
                                sm={6}           // 2 cards per row on tablet
                                md={3}           // 4 cards per row on small desktop
                                lg={2}           // 6 cards per row on desktop
                                xl={12/7}        // 7 cards per row on large desktop
                                sx={{ mb: '40px' }}
                            >
                                <AlbumCard 
                                    title={album.title} 
                                    image={album.image} 
                                    follows={album.follows}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
}