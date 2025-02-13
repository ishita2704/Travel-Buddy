import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import airplane from "../../../assets/airplane.webp";
import { GetPlaceDetails } from "@/service/Globalapi";
import { PHOTO_REF_URL } from "@/constants/options";

const HotelCardItem = ({ hotel }) => {

const[photoUrl,setPhotoUrl]=useState();
 
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

const GetPlacePhoto = async () => {
  try {
    const data = { textQuery: hotel?.hotelName }; 
    const resp = await GetPlaceDetails(data);

    if (!resp?.data?.places?.length) {
      console.error("No places found for:", hotel?.hotelName);
      return;
    }

    const placeData = resp.data.places[0];
    if (!placeData?.photos?.length) {
      console.warn("No photos available for:", hotel?.hotelName);
      return;
    }

    const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", placeData.photos[0].name);
    setPhotoUrl(PhotoUrl);
  } catch (error) {
    console.error("Error fetching place details:", error);
  }
};

  return (
    <Link
      // Add a unique key here
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer ">
        <img  src={photoUrl?photoUrl: airplane} alt="" className="rounded-xl h-[200px] w-full object-cover  " />
        <div className="my-3 flex flex-col gap-3">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="font-medium text-xs text-gray-500">
            📍 {hotel?.hotelAddress}
          </h2>
          <h2 className="font-medium text-xs text-gray-500">
            ✅ {hotel?.description}
          </h2>
          <h2 className=" font-medium text-xs text-gray-600">
            ⭐ {hotel?.rating} 
          </h2>
          {/* <h2 className="text-sm font-medium ">💰 {hotel?.hotelPrice}</h2> */}
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
