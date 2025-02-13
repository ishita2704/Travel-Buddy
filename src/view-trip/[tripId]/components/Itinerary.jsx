import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const Itinerary = ({ trip }) => {
  if (!trip?.tripData?.itinerary) {
    console.error("Itinerary is undefined or null", trip?.tripData);
    return <p>No itinerary data available.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {Object.entries(trip.tripData.itinerary || {}) // Default to an empty object
          .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
          .map(([dayKey, item], index) => (
            <div key={index} className="mt-5">
              <h2 className="font-medium text-lg">{dayKey}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {Array.isArray(item?.plan) &&
                  item.plan.map((place, idx) => (
                    <div key={idx}>
                      <h2 className="font-medium text-sm text-blue-600">
                        {place?.bestTimeToVisit}
                      </h2>
                      <PlaceCardItem place={place} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};


export default Itinerary;
