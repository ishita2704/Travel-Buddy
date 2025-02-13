import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/service/Globalapi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import airplane from "../../assets/airplane.webp";

const UserTripCardItem = ({ trip }) => {
   const[photoUrl,setPhotoUrl]=useState();
  
   useEffect(() => {
     trip && GetPlacePhoto();
   }, [trip]);
 
  const GetPlacePhoto = async () => {
    const locationLabel = trip?.userSelection?.location?.label;
 
    if (!locationLabel) {
      console.warn("Skipping API call: Location label is undefined");
      setPhotoUrl(airplane); // Set a default image
      return;
    }
 
    const data = { textQuery: locationLabel };
    console.log("Querying Google Places API with:", data);
 
    try {
      const result = await GetPlaceDetails(data);
      console.log("API Response:", result);
 
      if (!result?.data?.places?.length) {
        console.warn("No places found for:", locationLabel);
        setPhotoUrl(airplane);
        return;
      }
 
      const placeData = result.data.places[0];
 
      if (!placeData?.photos?.length) {
        console.warn("No photos available for:", locationLabel);
        setPhotoUrl(airplane);
        return;
      }
 
      const photoIndex = placeData.photos[2] ? 2 : 0;
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        placeData.photos[photoIndex].name
      );
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error(
        "Error fetching place details:",
        error.response?.data || error.message
      );
      setPhotoUrl(airplane);
    }
  };
 
 
  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-md">
        <img
          className="object-cover rounded-xl mx-auto w-80  h-[220px]"
          src={photoUrl?photoUrl:  airplane}
        />
        <h2 className="font-bold text-lg">
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} days trip with "
          {trip?.userSelection?.budget}" budget.
        </h2>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
