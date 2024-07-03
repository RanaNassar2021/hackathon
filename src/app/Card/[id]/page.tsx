'use client';
import React from "react";
import { useState } from 'react';
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import logo from '../../../../public/Assets/Images/logo.png';
import gitHub from '../../../../public/Assets/Images/github.png';
import Link from "next/link";
import axios from 'axios';

export default function CardDetails() {
    const [card, setCard] = useState<any>([]);
    const [selectedCard, setSelectedCard] = useState<any>({});
    const [isFav,setIsFav] = useState(false);
    const [favData, setFavData] = useState<any>({
        img: '',
        title:'',
        summary: '',
        lastUpdated: ''
    })

    const path = usePathname();
    const id = (path: any) => {
        let arr;
        let answer;
        arr = path.split('/');
        for (let i = 0; i < arr.length; i++) {
            answer = arr[2]
        }
        return answer
    }
    const handleFav =(e:any)=>{
        e.preventDefault();
        localStorage.setItem('favouriteSubmissions', JSON.stringify(selectedCard));
        alert('Submission saved to Favourites .');
        setIsFav(!isFav)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        localStorage.setItem('favouriteSubmissions', JSON.stringify(selectedCard));
        alert('Submission saved to Favourites .');
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('/cards.json'); // Fetch data from the public folder
            setCard(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filteredCard = card.find((card: any) => card.id == id(path));
        setSelectedCard(filteredCard || {});
    }, [id(path), card]);

    return (
        <React.Fragment>
            <Box className="h-16 p-2 ps-12">
                <Link href='/'>
                    <Image src={logo} alt="AI planet logo" />
                </Link>
            </Box>
            <Box className="h-[416px] bg-navy-blue p-2 md:ps-12 md:pe-12">
                <Box className="h-full md:flex gap-4">
                    <Box className="w-100vw md:w-2/3 flex items-center">
                        <Box className="md:w-[792px] h-[240px] p-4">
                            <Box className="flex items-center gap-5">
                                <Image src={selectedCard.img} alt="interview me" width={120} height={120} style={{ width: '120px', height: '120px', borderRadius: '10px' }} />
                                <Typography className="text-white font-semibold text-4xl">{selectedCard.title}</Typography>
                            </Box>
                            <Typography className="text-white mt-5">{selectedCard.summary}</Typography>
                            <Box className="text-white flex items-center mt-5 gap-4" onClick={handleFav} >
                                {isFav?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>


                                }
                              
                                <Box className="bg-btn-blue p-2 border rounded-xl flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                                 12 March
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className=" w-1/3 flex flex-col items-center justify-center gap-5">
                        <Box className="border border-white rounded-lg p-2 min-w-32 flex justify-center text-white items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                            <Button className="text-white capitalize ">edit</Button>
                        </Box>
                        <Box className="border border-white rounded-lg p-2 min-w-32 flex justify-center text-white items-center" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                            <Button className="text-white">delete</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="ps-12 pe-12 md:flex pb-10">
                <Box className="w-full md:w-2/3 pt-4">
                    <Typography className="text-xl mb-4">Description</Typography>
                    <Typography className="text-justify text-sm">Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam vivamus sodales a integer justo elit. Mattis urna non parturient est non faucibus pretium morbi. Mattis condimentum arcu sapien nunc semper in laoreet amet cursus. At purus consectetur orci morbi at. Gravida consectetur nunc in quis vitae egestas. Fermentum pellentesque ullamcorper nisl massa penatibus condimentum non imperdiet. Porttitor a hendrerit pellentesque enim mus congue. Vitae interdum fusce duis ac posuere in aliquam risus aenean. Mi aliquet viverra ipsum lacus condimentum tincidunt. In bibendum imperdiet nullam eget tincidunt. Ut lorem id enim interdum lobortis aliquam risus elementum aliquet. Placerat fusce proin diam sollicitudin netus tincidunt sit ultricies. Varius convallis ultrices fermentum in commodo ut posuere. Lacus luctus lacus consequat dolor. Lacus vulputate molestie mattis penatibus risus quam elit gravida auctor. Eget morbi maecenas nam in. Felis urna non id adipiscing sed cursus nec arcu. Egestas placerat blandit sed quis sed vitae. Porta at ac turpis gravida leo. Ipsum in laoreet facilisi arcu. Proin vulputate mi viverra dignissim sollicitudin interdum ultrices. Habitant eget dapibus pharetra blandit quis sagittis pulvinar fames vel. Sit gravida cursus ligula fames lacus. Bibendum lectus nunc dapibus dui lectus velit porta. Sit id elementum urna at ut lorem aliquet. Pharetra sit malesuada tellus eget urna ultrices lectus et cursus. Bibendum leo id consectetur vel lectus mi urna in diam. Egestas metus enim elementum turpis felis. Leo ultrices adipiscing viverra ac. Maecenas a odio ac velit in tortor faucibus quam quis. Ut sapien auctor lacus pretium nec eu sed sit. Nulla quis sed massa maecenas.</Typography>
                </Box>
                <Box className="w-full md:w-1/3 pt-4  felx flex-col justify-center">
                    <Typography className=" ps-5 pb-4 flex text-start text-our-grap">Hackathon</Typography>
                    <Typography className=" ps-5 font-semibold">Prestige Interview Challenge</Typography>
                    <Box className=" ps-5 flex text-our-gray "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                        24 Feb 2023 - 24 March 2023
                    </Box>
                    <Box className="ms-5 mt-5 w-2/3 border rounded-lg border-our-gray text-center">
                        <Link href='https://github.com/' target="#">
                            <Button className="text-our-gray gap-4 w-full"><Image src={gitHub} alt="github" width={20} height={20} style={{ width: '20px', height: '20px' }} /> GitHub Repository</Button>
                        </Link>
                    </Box>
                    <Box className="ms-5 mt-5 w-2/3 border rounded-lg border-our-gray text-center">
                        <Link href='https://www.atlassian.com/agile' target="#">
                            <Button className="text-our-gray gap-4 w-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>Other Links</Button>
                        </Link>
                    </Box>
                </Box>

            </Box>
        </React.Fragment>
    )
}