'use client'
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from "next/image";
import logo from '../../../public/Assets/Images/logo.png';
import { Input } from "@nextui-org/input";
import Link from "next/link";

export default function Submission() {
    const [formData, setFormData] = useState<any>({
        title: '',
        summary: '',
        description: '',
        coverImage: null,
        hackathonStartDate: null,
        hackathonEndDate: null,
        hackathonName: '',
        githubRepo: '',
        otherLinks: ''
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (name: any, date: any) => {
        setFormData({
            ...formData,
            [name]: date
        });
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    coverImage: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Basic validation
        for (let key in formData) {
            if (!formData[key]) {
                alert(`Please fill out the ${key} field.`);
                return;
            }
        }

        // Store form data in local storage
        localStorage.setItem('hackathonSubmission', JSON.stringify(formData));

        alert('Submission saved to local storage.');
    };

    return (
        <React.Fragment>
            <Box className="h-16 p-2 ps-12 bg-white">
                <Link href='/'><Image src={logo} alt="AI planet logo" /> </Link>
            </Box>
            <form onSubmit={handleSubmit} className="w-4/5 mt-8">
                <Box className="min-h-screen bg-light flex justify-center">
                    <Box className="border rounded-xl bg-white w-full md:w-2/3 mt-8 mb-8 p-4">
                        <Typography className="text-2xl font-medium">New Hackathon Submission</Typography>
                        <Box className="w-4/5 mt-8">
                            <Typography className="text-base font-normal mb-1">Title</Typography>
                            <TextField fullWidth placeholder="Title of your submission" id="title" name="title" required value={formData.title} onChange={handleInputChange}
                            />
                            <Typography className="text-base font-normal mb-1 mt-8">Summary</Typography>
                            <TextField fullWidth id="summary" name="summary" placeholder="A short summary of your submission (this will be visible with your submission)" required value={formData.summary} onChange={handleInputChange} />
                            <Typography className="text-base font-normal mb-1 mt-8">Description</Typography>
                            <TextField fullWidth id="description" name="description" multiline rows={6} placeholder="Write a long description of your project. You can describe your idea and approach here." required value={formData.description} onChange={handleInputChange} />
                            <Typography className="text-base font-normal mb-1 mt-8">Cover Image</Typography>
                            <Box className="bg-light flex flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <Input type="file" accept="image/*" required onChange={handleFileChange} />
                            </Box>
                            <Box className="md:flex justify-between">
                                <Box>
                                    <Typography className="text-base font-normal mb-1 mt-8">Hackathon Start Date</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker value={formData.hackathonStartDate} onChange={(date: any) => handleDateChange('hackathonStartDate', date)} required />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                                <Box>
                                    <Typography className="text-base font-normal mb-1 mt-8">Hackathon End Date</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker value={formData.hackathonEndDate} onChange={(date: any) => handleDateChange('hackathonEndDate', date)} required />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Typography className="text-base font-normal mb-1 mt-8">Hackathon Name</Typography>
                            <TextField fullWidth id="hackathonName" name="hackathonName" placeholder="Enter the name of the hackathon" required value={formData.hackathonName} onChange={handleInputChange} />
                            <Typography className="text-base font-normal mb-1 mt-8">GitHub Repository</Typography>
                            <TextField fullWidth id="githubRepo" name="githubRepo" placeholder="Enter your submission’s public GitHub repository link" required value={formData.githubRepo} onChange={handleInputChange} />
                            <Typography className="text-base font-normal mb-1 mt-8">Other Links</Typography>
                            <TextField fullWidth id="otherLinks" name="otherLinks" placeholder="You can upload a video demo or URL of you demo app here." value={formData.otherLinks} onChange={handleInputChange} />
                            <Button type="submit" className="mt-8 bg-green text-white p-2 font-semibold hover:bg-green hover:text-black ">upload submission</Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </React.Fragment>
    )
}