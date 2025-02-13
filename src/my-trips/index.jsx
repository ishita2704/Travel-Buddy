import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";


const MyTrips = () => {

useEffect(() => {
  GetUserTrips();
}, []);
 const navigation = useNavigation();
   const [userTrips, setUserTrips] = useState([]);

//used to get all users trips

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
   
    if (!user) {
      navigation("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    setUserTrips([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };


   return (
     <div className="mt-24 sm:px-10 md:px-32 lg:px-10 px-5 ml-10 max-w-7xl">
       <h2 className="font-bold text-4xl text-center">My Trips</h2>
       <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
         {userTrips?.length>0?userTrips.map((trip, index) => (
           <UserTripCardItem trip={trip} key={index} />
         ))
        :[1,2,3,4,5,6].map((item,index)=>{
           <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl">

           </div>

        })
        }
       </div>
     </div>
   );
}

export default MyTrips