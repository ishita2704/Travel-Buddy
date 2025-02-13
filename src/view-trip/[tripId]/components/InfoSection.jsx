import React, { useEffect } from "react";
import airplane from "../../../assets/airplane.webp";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from "@/service/Globalapi";
import { useState } from "react";


const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key="+
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
  
const InfoSection = ({ trip }) => {
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
     <div>
       <img
          src={photoUrl?photoUrl: airplane}
         alt=""
         className="h-[350px] w-full object-cover rounded-xl"
       />
       <div className="flex justify-between items-center">
         <div className="my-5 flex flex-col gap-2">
           <h1 className="font-bold text-2xl">
             {trip?.userSelection?.location?.label}
           </h1>
           <div className="flex gap-5">
             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md font-medium ">
               🗓️{trip?.userSelection?.noOfDays} Day
             </h2>
             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md  font-medium ">
               💰{trip?.userSelection?.budget} Budget
             </h2>
             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-md font-medium  ">
               🥂Number Of Travellers: {trip?.userSelection?.traveller}
             </h2>
           </div>
         </div>
         <Button>
           <IoIosSend />{" "}
         </Button>
       </div>
     </div>
   );
};

export default InfoSection;
