import { Box, Typography, Button } from "@mui/material";
import React from "react";
import Link from "next/link";
// Images
import Image from "next/image";
import logo from '../../public/Assets/Images/logo.png';
import hand from '../../public/Assets/Images/Hand-holding.png';
// components
import Content from "./Content/page";
export default function Home() {
  return (
    <React.Fragment>
      <Box className="h-16 p-2 ps-12">
        <Image src={logo} alt="AI planet logo" />
      </Box>
      <Box className="h-[416px] bg-navy-blue p-2 md:ps-12 md:pe-12">
        <Box className="h-full md:flex gap-4">
          <Box className="w-100vw md:w-2/3 flex items-center">
            <Box className="md:w-[792px] h-[240px] p-4">
              <Typography className="text-white font-semibold text-4xl">Hackathon Submissions</Typography>
              <Typography className="text-white mt-5">Lorem ipsum dolor sit amet consectetur. Urna cursus amet pellentesque in parturient purus feugiat faucibus. Congue laoreet duis porta turpis eget suspendisse ac pharetra amet. Vel nisl tempus nec vitae. </Typography>
              <Link href='/Submission'><Button className="mt-8 bg-green text-white p-2 font-semibold ">upload submission</Button></Link>
            </Box>
          </Box>
          <Box className=" w-1/3 hidden  md:flex justify-center">
            <Image src={hand} alt="hand holding bulb" width={0}
              height={0}
              style={{ width: '70%', height: '100%' }} />
          </Box>
        </Box>
      </Box>
      <Content></Content>
    </React.Fragment>

  );
}
