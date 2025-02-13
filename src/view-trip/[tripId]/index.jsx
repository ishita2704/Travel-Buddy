import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import Itinerary from "./components/Itinerary";

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  //used to get trip information from firebase

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("No trip Found!");
    }
  };
  return (
    <div>
      <div className="p-10 md:px-20 lg:px-44 xl:px-56'">
        {/* Information Section */}
        <InfoSection trip={trip} />
        {/* Recommended Hotels */}
        <Hotels trip={trip} />
        {/* Daily Plan */}
        <Itinerary trip={trip} /> 
      </div>
    </div>
  );
};

export default Viewtrip;
