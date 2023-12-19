// Dummy data for e-waste locations
const eWasteLocations = [
    { id: 1, name: 'Delhi', lat: 28.7041, lon: 77.1025 },
    { id: 2, name: 'Ghazipur (mini e-centre)', lat: 25.5878, lon: 83.5783 },
    { id: 3, name: 'Amravati', lat: 20.9320, lon: 77.7523 },
    { id: 4, name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
    { id: 5, name: 'Agartala', lat: 23.8315, lon: 91.2868},
    { id: 6, name: 'Bengaluru', lat: 12.9716, lon: 77.5946},
    { id: 7, name: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366},
    { id: 8, name: 'Chandigarh', lat: 30.7333, lon: 76.7794},
    { id: 9, name: 'Raipur', lat: 23.3441, lon: 76.9366},
    { id: 10, name: 'Jalgaon (mini e-centre)', lat: 21.0077, lon: 75.5626},
    


    // Add more locations with their coordinates
  ];

  // Initialize Leaflet map
  const map = L.map('map').setView([23.2599, 77.4126], 5);

  // Add a tile layer to the map (you can use your preferred tile layer)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '©️ OpenStreetMap contributors'
  }).addTo(map);

  // Function to calculate distance between two points
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  // Function to get user's current location and update the dropdown
  function getUserLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Sort eWasteLocations based on distance from the user's location
        eWasteLocations.sort((a, b) => {
          const distanceA = calculateDistance(userLat, userLon, a.lat, a.lon);
          const distanceB = calculateDistance(userLat, userLon, b.lat, b.lon);
          return distanceA - distanceB;
        });

        // Populate the dropdown with sorted eWasteLocations
        const dropdown = document.getElementById('locationDropdown');
        dropdown.innerHTML = '<option value="" disabled selected>Select a location</option>';
        eWasteLocations.forEach(location => {
          dropdown.innerHTML += `<option value="${location.id}">${location.name} - ${calculateDistance(userLat, userLon, location.lat, location.lon).toFixed(2)} km</option>`;
        });
      }, error => {
        console.error('Error getting user location:', error.message);
      });
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }

  // Function to find the nearest e-waste location and update the map
  function findNearestLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Sort eWasteLocations based on distance from the user's location
        eWasteLocations.sort((a, b) => {
          const distanceA = calculateDistance(userLat, userLon, a.lat, a.lon);
          const distanceB = calculateDistance(userLat, userLon, b.lat, b.lon);
          return distanceA - distanceB;
        });

        // Get the nearest location
        const nearestLocation = eWasteLocations[0];

        // Clear previous markers
        clearMarkers();

        // Add a marker for the nearest location
        const marker = L.marker([nearestLocation.lat, nearestLocation.lon]).addTo(map);
        marker.bindPopup(nearestLocation.name).openPopup();

        // Set the map view to the nearest location
        map.setView([nearestLocation.lat, nearestLocation.lon], 15);

        // Display the name of the nearest location on the webpage
        document.getElementById('nearestLocationName').textContent = `Nearest E-Waste Location: ${nearestLocation.name}`;
      }, error => {
        console.error('Error getting user location:', error.message);
      });
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }

  // Function to show all e-waste locations on the map
  function showAllLocations() {
    // Clear previous markers
    clearMarkers();

    // Add markers for all e-waste locations
    eWasteLocations.forEach(location => {
      const marker = L.marker([location.lat, location.lon]).addTo(map);
      marker.bindPopup(location.name);
    });

    // Set the map view to include all e-waste locations
    const group = new L.featureGroup(eWasteLocations.map(location => L.latLng(location.lat, location.lon)));
    map.fitBounds(group.getBounds());
  }

  // Function to clear existing markers on the map
  function clearMarkers() {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  }

  // Call the function to get user's location and populate the dropdown
  getUserLocation();

  // Initialize Flatpickr date picker
  flatpickr("#datePicker", {
    dateFormat: "Y-m-d",
    enableTime: false,
    minDate: "today"
  });