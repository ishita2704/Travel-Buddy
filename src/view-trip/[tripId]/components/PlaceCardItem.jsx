import React, { useEffect, useState } from 'react'
import airplane from "../../../assets/airplane.webp";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/service/Globalapi';
import { PHOTO_REF_URL } from '@/constants/options';


const PlaceCardItem = ({place}) => {
  const[photoUrl,setPhotoUrl]=useState();
   
    useEffect(() => {
     place && GetPlacePhoto();
    }, [place?.placeName]);
  
   const GetPlacePhoto = async () => {
     try {
       const data = { textQuery: place?.placeName };
       const resp = await GetPlaceDetails(data);

     

       if (!resp?.data?.places?.length) {
         console.warn("No places found for:", place?.placeName);
         setPhotoUrl(airplane); // Set default image
         return;
       }

       const placeData = resp.data.places[0];

       if (!placeData?.photos?.length) {
         console.warn("No photos available for:", place?.placeName);
         setPhotoUrl(airplane);
         return;
       }

       // Ensure the index exists before accessing
       const photoIndex = placeData.photos[2] ? 2 : 0; // Use first photo if index 2 doesn't exist
       const photoUrl = PHOTO_REF_URL.replace(
         "{NAME}",
         placeData.photos[photoIndex].name
       );

       setPhotoUrl(photoUrl);
     } catch (error) {
       console.error("Error fetching place details:", error);
       setPhotoUrl(airplane); // Fallback image on error
     }
   };



  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl?photoUrl: airplane}
          alt="placeholder"
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="font-medium text-xs text-gray-500">
            {place?.placeDetails}
          </p>
          <h2 className="font-medium text-xs text-gray-500">
            💰 {place?.ticketPricing}
          </h2>
          <h2 className="mt-2 text-sm font-medium">
            🕙 {place?.bestTimeToVisit}
          </h2>
          <Button size="sm">
            <FaLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem