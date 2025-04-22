const axios = require('axios');

const getDrivingDistance = async (startLat, startLng, endLat, endLng) => {
    const apiKey = process.env.ORS_API_KEY;

    const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

    try {   
        const response = await axios.post(url, {
            coordinates: [
                [parseFloat(startLng), parseFloat(startLat)], // origin
                [parseFloat(endLng), parseFloat(endLat)]      // destination
            ]
        }, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (
            response.data &&
            response.data.routes &&
            response.data.routes[0] &&
            response.data.routes[0].summary
        ) {
            const distanceInMeters = response.data.routes[0].summary.distance;
            return distanceInMeters / 1000; // convert to KM
        } else {
            console.error("ORS response missing expected structure:", JSON.stringify(response.data));
            return null;
        }

    } catch (error) {
        console.error("Error fetching driving distance:", error.message);
        return null;
    }
};

module.exports = getDrivingDistance;