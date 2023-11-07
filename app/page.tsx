"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Groups3Icon from '@mui/icons-material/Groups3';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import CottageIcon from '@mui/icons-material/Cottage';
import SellIcon from '@mui/icons-material/Sell';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from './page.module.css';
import Button from '@mui/material/Button';
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Image from 'next/image'
import { FETCH_LISTINGS } from './utils/queries';
import { useQuery } from 'urql';
import Footer2 from './components/footer/footer-2';
import { currencySymbols } from './lib/constants';
import moment from 'moment';
import ActivityIndicator from './components/activity-indicator';

const drawerWidth = 240;

export default function Page() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [type, setType] = React.useState('');
  const [page, setPage] = React.useState(1);
  
  const [search, setSearch] = React.useState(''); 
  const [after, setAfter] = React.useState(null);
  const first = 10;
  const [res] = useQuery({query: FETCH_LISTINGS, variables: {search, first, after} });
  const { data, fetching, error } = res;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setAfter(data?.publicListing?.pageInfo?.endCursor || null)
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#fff',
      },
    },
  });

  return (
    <main 
      style={{backgroundColor: '#fff'}}
    >
    <ThemeProvider theme={darkTheme}>
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
      >
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <CottageIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Baymoon
          </Typography>
        </Toolbar>
      </AppBar>

      {/* <Grid
          container
        >
        <Typography sx={{color: '#000'}}>
          Pssssssss
        </Typography>
      </Grid> */}

      <Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={style.board}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            xs={12}
            style={{marginTop: '5px'}}
          >
            <Typography 
                variant="h3"
                sx={{ flexGrow: 1, fontWeight: 'bold', textAlign: 'center', color: '#fff', textShadow: '2px 2px 4px #000000' }}
              >
                Find Your New Property
              </Typography>
          </Grid>
            {/* Form */}
            <Grid 
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                xs={12}
                spacing={2} 
                style={{marginTop: '5px'}}
            >
              <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                      width: '80vw',
                      height: '60px', 
                      padding: '12px 20px',
                      margin: '8px 0',
                      backgroundColor: '#fff',
                      color: '#000',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      border: '1px solid #000',
                      borderRadius: '5px',
                  }}
                />
            </Grid>

            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={6}
                sm={3}
            >
                <FormControl fullWidth style={{marginTop: '10px', background: '#fff', color: '#000'}}>
                    <InputLabel 
                      id="demo-simple-select-label"
                      style={{
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={10}>Apartment/Flat</MenuItem>
                        <MenuItem value={20}>House</MenuItem>
                        <MenuItem value={30}>Shortlet</MenuItem>
                    </Select>
                </FormControl>
            </Grid> 

            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={6}
                sm={3}
            >
                <FormControl 
                  fullWidth 
                  style={{marginTop: '10px', background: '#fff', color: '#000'}}  
                >
                    <InputLabel 
                      id="demo-simple-select-label" 
                      style={{
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                    Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Category"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={10}>Rent</MenuItem>
                        <MenuItem value={20}>Sale</MenuItem>
                        <MenuItem value={30}>Shortlet</MenuItem>
                    </Select>
                </FormControl>
            </Grid> 

            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={6}
                sm={3}
            >
                <FormControl 
                  fullWidth 
                  style={{marginTop: '10px', background: '#fff', color: '#000'}}  
                >
                    <InputLabel 
                      id="demo-simple-select-label" 
                      style={{
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                    Bedrooms</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Bedrooms"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                    </Select>
                </FormControl>
            </Grid> 

            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={6}
                sm={3}
            >
                <FormControl 
                  fullWidth 
                  style={{marginTop: '10px', background: '#fff', color: '#000'}}  
                >
                    <InputLabel 
                      id="demo-simple-select-label" 
                      style={{
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                    Min Price</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Min Price"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={10}>100</MenuItem>
                        <MenuItem value={20}>200</MenuItem>
                        <MenuItem value={30}>300</MenuItem>
                    </Select>
                </FormControl>
            </Grid> 

            <Grid 
                container 
                spacing={2} 
                style={{margin: '5px'}}
                direction="column"
                item
                xs={6}
                sm={3}
            >
                <FormControl 
                  fullWidth 
                  style={{marginTop: '10px', background: '#fff', color: '#000'}}  
                >
                    <InputLabel 
                      id="demo-simple-select-label" 
                      style={{
                        color: '#000',
                        fontWeight: 'bold',
                      }}
                    >
                    Max Price</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Max Price"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={10}>100</MenuItem>
                        <MenuItem value={20}>200</MenuItem>
                        <MenuItem value={30}>300</MenuItem>
                    </Select>
                </FormControl>
            </Grid> 
        </Grid>

        {fetching ?  
          <Grid
            container
            alignItems="center"
            justifyContent="center"
          >
            <ActivityIndicator />
          </Grid>
        : (             
        <Grid
          container
          style={{width: '100vw'}}
          direction={'column'}
          justifyItems="center"
          alignItems="center"
        >   
          <Typography>Page: {page}</Typography>
          {data?.publicListing?.edges.map((unit: { node: { name: string; currency: string; id: any; createdAt: string; images: any[]; description: string; price: string | number; propertyUnitFeatures: { bedrooms: string | number; bathrooms: string | number; toilets: string | number; parkingSpace: string | number; }; }; }, index: React.Key | null | undefined) => (
          <Grid
            container
            direction={'row'}
            style={style.card}
            key={index}
          >
            <Grid
              item
              xs={12}
            >
              <Typography style={style.label}>
                  {unit?.node?.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
              >
              <Link href={`/units/${unit?.node?.id}`}>
                <Image
                  src={unit?.node?.images.length > 0 ? `${unit?.node?.images[0]}` : '/'}
                  alt="Unit Thumbnail"
                  width={300}
                  height={250}
                />
              </Link>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Typography
                style={style.label}
                >
                  {unit?.node?.name}
              </Typography>
              <Typography>
                {unit?.node?.description}
              </Typography>
              <Typography
                style={style.price}
                >
                  {currencySymbols[unit?.node?.currency as keyof typeof currencySymbols]}{unit?.node?.price}
              </Typography>
              <Link href={`/units/${unit?.node?.id}`}>
                <Button 
                  variant="contained" 
                  style={{
                      marginLeft: 'auto', 
                      backgroundColor: '#000', 
                      height: '50px',
                      color: '#fff',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                  }}>View Property</Button>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Divider />
              <Typography style={style.label}>
                  Date Created: <i>{moment(new Date(unit?.node?.createdAt)).fromNow()}</i>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Divider />
              <Grid
                container
                direction={'row'}
              >
                {unit?.node?.propertyUnitFeatures?.bedrooms && (
                  <Typography style={style.label}>
                      {unit?.node?.propertyUnitFeatures?.bedrooms} Bedrooms
                  </Typography>
                )}
                {unit?.node?.propertyUnitFeatures?.bathrooms && (
                <Typography style={style.label}>
                    {unit?.node?.propertyUnitFeatures?.bathrooms} Bathrooms
                </Typography>
                )}
                {unit?.node?.propertyUnitFeatures?.toilets && (
                <Typography style={style.label}>
                    {unit?.node?.propertyUnitFeatures?.toilets} Toilets
                </Typography>
                )}
                {unit?.node?.propertyUnitFeatures?.parkingSpace && (
                <Typography style={style.label}>
                    {unit?.node?.propertyUnitFeatures?.parkingSpace} Parking Space(s)
                </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          ))}

          <Grid
            container
            direction={'row'}
            alignItems="center"
            justifyContent="center"
          >
            <Pagination color="secondary" count={first} page={page} onChange={handleChange} />
          </Grid>
        </Grid>
        )}
        <Footer2 />
      </Grid>

    </Box>
    </ThemeProvider>
    </main>
  );
}


const style = {
  board: {
    width: '100vw',
    minHeight: '100vh',
    marginBottom: '20px',
    marginTop: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    color: '#000',
    paddingTop: '20px',
    paddingBottom: '20px',
    backgroundImage: 'url("/4.jpg")',
    backgroundSize: 'cover', 
  },
  card: {
    width: '90vw',
    minHeight: '250px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    color: '#000',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
    margin: '10px',
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    margin: '10px',
    fontSize: '30px',
  }
}