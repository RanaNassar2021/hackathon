'use client'
import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Menu, MenuItem } from "@mui/material";
import BasicTabs from "../Tab/page";
import axios from "axios";

export default function Content() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [newest, setNewest] = useState(true);
    const [choosen, setChoosen] = useState('Newest');
    const [data, setData] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value: boolean) => {
        setAnchorEl(null);
        setNewest(value)
        setChoosen(value ? 'Newest' : 'Oldest')

    };
    const fetchData = async () => {
        try {
            const response = await axios.get('/cards.json'); // Fetch data from the public folder
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((item: any) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    return (
        <React.Fragment>
            <Box className="bg-light md:ps-12 md:pe-12 pt-6 flex">
                <BasicTabs search={searchQuery} filteredData={filteredData} newest={newest}></BasicTabs>
                <Box className="w-100vw md:w-1/2 flex justify-center md:justify-end gap-5">

                    <TextField id="outlined-basic" label="Search" variant="outlined" value={searchQuery}
                        onChange={handleSearchChange} sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',

                            },
                        }} />


                    <Button className="text-slate-500  h-[56px]  border border-slate-300 rounded-full"
                        id="basic-button" variant="outlined"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        {choosen}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ms-2 size-4">
                            <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>

                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleClose(newest)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem className="border rounded w-[118px]" onClick={() => handleClose(true)}>Newest</MenuItem>
                        <MenuItem onClick={() => handleClose(false)}>Oldest</MenuItem>
                    </Menu>

                </Box>
            </Box>
        </React.Fragment>
    )
}