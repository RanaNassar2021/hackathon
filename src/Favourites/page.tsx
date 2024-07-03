'use client';
import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Favourites() {
    const [favouriteSubmissions, setFavouriteSubmissions] = useState<any>([]);
    useEffect(() => {
        // Fetch data from localStorage
        const data = localStorage.getItem('favouriteSubmissions');
        if (data) {
            setFavouriteSubmissions(JSON.parse(data));
        }
    }, []);

    console.log('favourite submissions ', favouriteSubmissions)
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    <Grid item xs={12} sm={6} md={4}>
                        <Link href={`/Card/${favouriteSubmissions.id}`}>
                            <Box className="border p-4 rounded-lg bg-white h-full flex flex-col ">
                                <Box className="flex items-center gap-8">
                                    <Image src={favouriteSubmissions.img} alt='card image' width={100} height={100} style={{ width: '100px', height: '100px' }} />
                                    <Typography className='font-semibold text-lg'>{favouriteSubmissions.title}</Typography>
                                </Box>
                                <Box>
                                    <Typography className="mt-2  flex-grow"> {favouriteSubmissions.description}</Typography>
                                </Box>
                                <Box></Box>
                            </Box>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
           
        </Box>
    )
}