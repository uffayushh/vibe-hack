// GPS Tracker Service Implementation

// Required libraries
const geolib = require('geolib');

// Zone definitions
const campusZones = [
    { name: 'Recycling Hub', coords: { latitude: 40.123456, longitude: -75.123456 } },
    { name: 'Energy Center', coords: { latitude: 40.654321, longitude: -75.654321 } },
    { name: 'Walking Path', coords: { latitude: 40.234567, longitude: -75.234567 } },
    { name: 'Water Station', coords: { latitude: 40.345678, longitude: -75.345678 } },
    { name: 'Green Space', coords: { latitude: 40.456789, longitude: -75.456789 } }
];

// Location history
let locationHistory = [];

// Function to track real-time location
function trackLocation(position) {
    const { latitude, longitude } = position.coords;
    locationHistory.push({ latitude, longitude, timestamp: new Date().toISOString() });
    checkZone(latitude, longitude);
}

// Check for zone entry
function checkZone(latitude, longitude) {
    campusZones.forEach(zone => {
        const distance = geolib.getDistance(
            { latitude, longitude },
            zone.coords
        );
        // If within 50 meters, trigger rewards
        if (distance < 50) {
            triggerRewards(zone.name);
        }
    });
}

// Award aura rewards
function triggerRewards(zoneName) {
    console.log(`You have entered the ${zoneName}. Aura rewards awarded!`);
    // Implement reward logic here
}

// Proximity event callbacks
function setupProximityCallbacks() {
    navigator.geolocation.watchPosition(trackLocation);
}

// Initial setup
setupProximityCallbacks();

// Export functions if needed
module.exports = { setupProximityCallbacks, trackLocation, locationHistory };