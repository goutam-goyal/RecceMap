import React from "react";

import GoogleMapReact from "google-map-react";
import {Paper, Typography, useMediaQuery} from '@material-ui/core';

import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles'; 
import { useState } from "react";
import mapStyles from  './mapStyles';
const Map = ({setCoords, setBounds, coords,places, setChildClicked}) =>{
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coords}
                center={coords}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI:true, zoomControl: true, styles: mapStyles} } 
                onChange={(e) =>{

                    setCoords({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place,i)=>(
                    <div 
                    className ={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                    >{
                        !isDesktop ?(
                            <LocationOnOutlinedIcon  color="priamry" fontSize="large" />
                        ) : (
                            <Paper elevation= {3}  className={classes.paper} >
                                <Typography className = {classes.typography} variant="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img
                                    className = {classes.pointer}
                                    src ={place.photo?place.photo.images.large.url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}
                                    alt={place.name}    
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly />
                            </Paper>
                        )
}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;