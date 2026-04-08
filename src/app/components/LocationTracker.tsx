import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import haversine from 'haversine';

const LocationTracker = () => {
    const [location, setLocation] = useState(null);
    const [nearbyZones, setNearbyZones] = useState([]);
    const [auraRewards, setAuraRewards] = useState(0);

    const zones = [
        { id: 1, name: 'Zone 1', latitude: 37.33233141, longitude: -122.0312186 },
        { id: 2, name: 'Zone 2', latitude: 37.33182, longitude: -122.02965 },
        // Add more zones as needed
    ];

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            }
        };

        requestLocationPermission();
        const watchPosition = navigator.geolocation.watchPosition(position => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            detectNearbyZones(latitude, longitude);
        });

        return () => navigator.geolocation.clearWatch(watchPosition);
    }, []);

    const detectNearbyZones = (latitude, longitude) => {
        const updatedZones = zones.filter(zone => {
            const zoneLocation = { latitude: zone.latitude, longitude: zone.longitude };
            const distance = haversine(location, zoneLocation, { unit: 'meter' });
            return distance <= 1000; // within 1 km
        });
        setNearbyZones(updatedZones);
        setAuraRewards(updatedZones.length * 10); // Example reward calculation
    };

    return (
        <div>
            <h1>Location Tracker</h1>
            {location && <p>Current Location: {location.latitude}, {location.longitude}</p>}
            <h2>Nearby Zones</h2>
            <ul>
                {nearbyZones.map(zone => (
                    <li key={zone.id}>{zone.name}</li>
                ))}
            </ul>
            <h2>Aura Rewards: {auraRewards}</h2>
        </div>
    );
};

export default LocationTracker;