import { Input } from "../components/ui/input";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logo from "../assets/travelbuddy_no_bg.png";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from "react-router-dom";



const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        toast.success("Logged in successfully");
        OnGenerateTrip();
      });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }
    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
     
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
    console.log(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  };

  return (
    <div className="mt-24 sm:px-10 md:px-32 lg:px-10 px-5 ml-10 max-w-7xl">
      <div className="mt-24 sm:px-10 md:px-32 lg:px-10 px-5 ml-28 ">
        <h2 className="font-bold text-3xl ">
          Share your travel preferences ✈ & let’s plan your perfect trip!
        </h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on <br /> your preferences.
        </p>
        <div className="mt-14 flex flex-col gap-10">
          <div>
            <h2 className=" text-xl my-3 font-medium">
              Pick your dream destination! 🌴
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </div>
          <div>
            <h2 className="py-3 text-xl my-3 font-medium ">
              How long do you want your adventure to last? ⏳
              <Input
                placeholder={"Ex.3"}
                type="number"
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              />
            </h2>
          </div>
        </div>

        <div>
          <h2 className=" text-xl my-3 font-medium">
            How much are you looking to spend on this trip? ✨
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.budget == item.title && "shadow-lg border-black"}
                `}
              >
                <h2 className="text-4xl">{item.icon} </h2>
                <h2 className="font-bold text-lg">{item.title} </h2>
                <h2 className=" text-sm text-gray-500">{item.desc} </h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="py-4 text-xl my-3 font-medium">
            Who’s joining you on this amazing adventure? 🚀
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.traveller == item.people &&
                    "shadow-lg border-black"
                  }
                `}
              >
                <h2 className="text-4xl">{item.icon} </h2>
                <h2 className="font-bold text-lg">{item.title} </h2>
                <h2 className=" text-sm text-gray-500">{item.desc} </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex ">
        <button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src={logo} height={200} width={250} />
              <h2 className="font-bold text-lg ">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication securely.</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
