"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Groups3Icon from '@mui/icons-material/Groups3';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import CottageIcon from '@mui/icons-material/Cottage';
import SellIcon from '@mui/icons-material/Sell';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import stylesMain from '../../page.module.css'
import Button from '@mui/material/Button';
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ImageCarousel from '../../components/units/image-carousel';
import { UNIT_BY_ID } from '@/app/utils/queries';
import { useQuery } from 'urql';

const drawerWidth = 240;
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  params?: any;
}

export default function Page(props: Props) {
  const router = useRouter()
  const { params } = props;

  const [res] = useQuery({query: UNIT_BY_ID, variables: {id: params?.id} });
  const { data, fetching, error } = res;

  
  const [files, setFiles] = React.useState<{ preview: string }[]>([]);

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);


  const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: 'rgb(244, 253, 232)',
      },
    },
  });

  return (
    <main
      style={{backgroundColor: 'rgb(244, 253, 232)'}}
    >
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }}>
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

      <Grid>

        <Grid
          container
          style={style.board}
        >
          <Grid item xs={12}>
          <Typography 
                variant="h6" 
                component="div" 
                sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                {data?.unitById?.name}
            </Typography>
            <Divider style={{margin: '10px'}} />

            <Grid
              container
              justifyContent={'space-between'}
              sx={{margin: '10px'}}
            >
              <Grid
                item
                xs={8}
              >
                <Typography
                  variant={'h5'}
                  style={style.label}
                >
                  {data?.unitById?.name}
                </Typography>
                <Grid
                  container
                  alignContent={'center'}
                >
                  <LocationOnIcon />
                  <Typography
                    style={style.value}
                  >
                    Allen, Ikeja, Lagos
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={4}
              >
                <Typography
                  variant={'h5'}
                  style={style.value}
                >
                  ${data?.unitById?.price}
                </Typography>
              </Grid>

            </Grid>
            <ImageCarousel images={data?.unitById?.images || []} />
          </Grid>

          {/* Details */}
          <Grid item xs={12}>
          <Typography 
              variant="h6" 
              component="div" 
              sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
            >
                Details
            </Typography>
            <Divider style={{margin: '10px'}} />
            <Divider style={{margin: '10px'}} />
            <Grid
              container
              rowSpacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <Typography
                  style={style.value}
                >
                  Description
                </Typography>
                <Typography
                  style={style.label}
                >
                  {data?.unitById?.description}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Price
                </Typography>
                <Typography
                  style={style.value}
                >
                  ${data?.unitById?.price}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Location
                </Typography>
                <Typography
                  style={style.value}
                >
                  Allen Ikeja, Lagos
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Bedrooms
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.propertyUnitFeatures?.bedrooms || 0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Bathrooms
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.propertyUnitFeatures?.bathrooms || 0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Toilets
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.propertyUnitFeatures?.toilets || 0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Parking Space
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.propertyUnitFeatures?.parkingSpace || 0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Floor Number
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.propertyUnitFeatures?.floorNumber || 0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Category
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.category}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Property Type
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.type}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Furnishing
                </Typography>
                <Typography
                  style={style.value}
                >
                  {data?.unitById?.furnishing}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
              >
              <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}
                >
                    Property Contact
                </Typography>
                <Divider style={{margin: '10px'}} />
                <Divider style={{margin: '10px'}} />
              </Grid>

              <Grid
                item
                xs={6}
              >
                <Typography
                  style={style.label}
                >
                  Phone number
                </Typography>
                <Typography
                  style={style.value}
                >
                  08109599594
                </Typography>
                
              </Grid>

            </Grid>
          </Grid>
          {/* End of Details */}

          <Grid 
            item 
            xs={12}
          >
            <Grid
              container 
              spacing={2} 
              style={{margin: '25px'}}
              alignItems={'center'}
              justifyContent={'center'}
              item
              xs={10}
            >
              {/* Create User button */}
              <Button 
                  variant="contained" 
                  style={{
                      backgroundColor: '#000', 
                      height: '50px',
                      color: '#fff',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      width: '250px'
                  }}
              >
                      Place A Call
              </Button>
            </Grid>
          </Grid> 

        </Grid>

      </Grid>

    </Box>
    </ThemeProvider>
    </main>
  );
}

const style = {
  board: {
    width: '100vw',
    borderRadius: '10px',
    minHeight: '200px',
    marginBottom: '20px',
    marginTop: '60px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    color: '#000',
  },
  splitboard: {
    borderRadius: '10px',
    height: '300px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  value: {
    color: 'rgb(43, 92, 159)',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  label: {
      color: '#000',
      fontWeight: 'bold',
      marginLeft: '10px',
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  },
}
