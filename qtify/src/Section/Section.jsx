import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AlbumCard from '../albumCard/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



export default function Section({ title, loc ,forAllsongs}) {
    const [data, setData] = useState([]);
    
    const [isSliderView, setIsSliderView] = useState(false);
    const [genreData,setGenreData]=useState([])
    const [value, setValue] = useState('ALL');
    const [filteredData, setFilteredData] = useState([]);


    const handleChange = (event, newValue) => {
        setValue(newValue);  
        console.log(filteredData);
    
        if (newValue === "ALL") {
            setFilteredData(data);  // Show all albums
            console.log("Filtered Data (All):", data);
        } else {
            setFilteredData(data.filter(album => album.genre.key === newValue));  
        }
    };
    
    const fetchData = async () => {
        try {
            let url = forAllsongs 
                ? "https://qtify-backend-labs.crio.do/songs"  // Fetch all songs if forAllsongs is true
                : `https://qtify-backend-labs.crio.do/albums/${loc}`; // Fetch specific album if false
    
            const response = await axios.get(url);

            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return null;
        }
    };

    const fetchGenre = async () => {
        try {
            const response = await axios.get(`https://qtify-backend-labs.crio.do/genres`);
            
            return response.data;
        } catch (error) {
            console.error('Error fetching genre:', error.message);
            return null;
        }
    };


    useEffect(() => {
        const onHandler = async () => {
            const albumData = await fetchData();
            if (albumData) {
                setData(albumData);
                
            }

            const genreDatafromapi = await fetchGenre()
            if(genreData){
                setGenreData(genreDatafromapi.data)
                
            }
            
            
        };
        onHandler();
        
        
        
    }, []);


    useEffect(() => {
        if (forAllsongs) {  // Only filter when forAllsongs is true
            setFilteredData(data); // Initialize filteredData with all data
            console.log("Data in the useEffect",data)
        }
    }, [data, forAllsongs]);
    
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        responsive: [
            {
                breakpoint: 3000, 
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7
                }
            },
            {
                breakpoint: 1200, 
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
                     {forAllsongs?'Songs':title}   
                </Typography>
                {!forAllsongs?(
                    <Button
                    onClick={() => setIsSliderView(!isSliderView)}
                    sx={{ 
                        color: '#34C94B',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                    }}
                >
                    {!isSliderView ? 'Show All' : 'Collapse'}
                </Button>
                )
                :null}
                
            </Box>
            {forAllsongs && (
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"  
                    indicatorColor="secondary"  
                    
                    sx={{
                        "& .MuiTab-root": { color: "white" }, // Default color for all tabs
                        
                        "& .MuiTabs-indicator": { backgroundColor: "green" }, // Indicator color
                        mb:4,
                        mt:-2

                    }}
                >
                    <Tab key="ALL" value="ALL" label="ALL"/>
                    {genreData.map((genre) => (
                    <Tab key={genre.key} value={genre.key} label={genre.label} />
                    ))}
                </Tabs>
            )}



            <Box sx={{
                paddingX: { xs: 2, sm: 4, md: 6 }
            }}>
                {!isSliderView ? (
                    <Slider {...sliderSettings} sx={{ mb: "40px" }}>
                    {(forAllsongs ? filteredData : data).map((album) =>
                      forAllsongs ? (
                        <Box key={album.id} sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
                          <AlbumCard title={album.title} image={album.image} follows={album.likes} forAllsongs={true}/>
                        </Box>
                      ) : (
                        
                        <Box key={album.id} sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
                        <AlbumCard title={album.title} image={album.image} follows={album.follows} />
                      </Box>
                      )
                    )}
                  </Slider>
                  
                ) : (
                    <Grid 
                        container 
                        spacing={{ xs: 1, sm: 2, md: 2 }}
                    >
                        {(forAllsongs ? filteredData : data).map((album) => (
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