'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import data from '../../../public/Assets/APIs/cards.json';
import Image from 'next/image';
import Link from 'next/link';
import Favourites from '@/Favourites/page';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Project {
  id: number;
  img: string;
  title: string;
  summary: string;
  description: string;
  name: string;
  "start-date": string;
  "end-date": string;
  lastUpdated: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ position: 'absolute', width: 'calc(100vw - 6rem)', left: '0', right: '0', backgroundColor: '#F8F9FD' }}
    >
      {value === index && <Box sx={{ p: 3 }}>
        {children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const [sortedData, setSortedData] = useState<Project[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const sorted = data.slice().sort((a, b) =>
      props.newest
        ? new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        : new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
    );
    setSortedData(sorted);
  }, [props.newest]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box className="w-1/2 ">
          <Tabs value={value} onChange={handleChange} textColor='inherit' aria-label="basic tabs example">
            <Tab className='capitalize text-black font-semibold text-base' label="All Submissions" {...a11yProps(0)} />
            <Tab className='capitalize text-black font-semibold text-base' label="Favourite Submissions" {...a11yProps(1)} />
          </Tabs>
        </Box>

      </Box>
      <Box className="relative">
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
              {props.search == '' ?
                sortedData?.map((item: any, index: number) =>
                // Calculate days ago
                {
                  const uploadDate: any = new Date(item.lastUpdated);
                  const currentDate: any = new Date();
                  const differenceMs = currentDate - uploadDate;
                  const daysAgo = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
                  return (
                    <Grid item xs={12} sm={6} md={4} key={index} >
                      <Link href={`/Card/${item.id}`}>
                        <Box className="border p-4 rounded-lg bg-white h-full flex flex-col ">
                          <Box className="flex items-center gap-8">
                            <Image src={item.img} alt='card image' width={100} height={100} style={{ width: '100px', height: '100px' }} />
                            <Typography className='font-semibold text-lg'>{item.title}</Typography>
                          </Box>
                          <Box>
                            <Typography className="mt-2  flex-grow"> {item.description}</Typography>
                          </Box>
                          <Box className="text-end mt-auto  text-our-gray">
                            <Typography >uploaded {daysAgo} days ago</Typography>
                          </Box>
                          <Box></Box>
                        </Box>
                      </Link>
                    </Grid>
                  )
                }) : props.filteredData?.map((item: any, index: number) =>
                // Calculate days ago
                {
                  const uploadDate: any = new Date(item.lastUpdated);
                  const currentDate: any = new Date();
                  const differenceMs = currentDate - uploadDate;
                  const daysAgo = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
                  return (
                    <Grid item xs={12} sm={6} md={4} key={index} >
                      <Link href={`/Card/${item.id}`}>
                        <Box className="border p-4 rounded-lg bg-white h-full flex flex-col ">
                          <Box className="flex items-center gap-8">
                            <Image src={item.img} alt='card image' width={100} height={100} style={{ width: '100px', height: '100px' }} />
                            <Typography className='font-semibold text-lg'>{item.title}</Typography>
                          </Box>
                          <Box>
                            <Typography className="mt-2  flex-grow"> {item.description}</Typography>
                          </Box>
                          <Box className="text-end mt-auto  text-our-gray">
                            <Typography >uploaded {daysAgo} days ago</Typography>
                          </Box>
                          <Box></Box>
                        </Box>
                      </Link>
                    </Grid>
                  )
                })}
            </Grid>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Favourites></Favourites>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
