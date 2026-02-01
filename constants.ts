
export const COUNTRIES = ['India'];

export const INDIA_STATES = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'West Bengal'
];

export const STATE_DISTRICTS: Record<string, string[]> = {
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
  'Maharashtra': ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Thane', 'Nagpur', 'Nashik'],
  'Karnataka': ['Bangalore Urban', 'Bangalore Rural', 'Mysore', 'Hubli', 'Mangalore'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Noida'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'West Bengal': ['Kolkata', 'Howrah', 'Hooghly', 'Darjeeling']
};

export const DISTRICT_AREAS: Record<string, string[]> = {
  'South Delhi': ['Saket', 'Hauz Khas', 'Greater Kailash', 'Malviya Nagar', 'Green Park'],
  'New Delhi': ['Connaught Place', 'Chanakyapuri', 'Lodhi Colony'],
  'Mumbai City': ['Colaba', 'Worli', 'Parel', 'Dadra'],
  'Pune': ['Koregaon Park', 'Kothrud', 'Baner', 'Viman Nagar'],
  'Bangalore Urban': ['HSR Layout', 'Indiranagar', 'Koramangala', 'Whitefield', 'JP Nagar'],
  'Chennai': ['Adyar', 'T. Nagar', 'Mylapore', 'Anna Nagar']
};

export const FACILITIES_LIST = [
  'WiFi', 'Parking', 'Gym', 'Power Backup', 'Air Conditioning', 'CCTV', 'Lift', 'Security', 'Swimming Pool', 'Modular Kitchen'
];

export const MOCK_PROPERTIES = [
  {
    id: '1',
    landlordId: 'l1',
    title: 'Modern 2BHK in Saket',
    description: 'Beautiful sunlight-facing apartment near Metro Station. Quiet neighborhood with 24/7 security.',
    photos: ['https://picsum.photos/seed/prop1/800/600', 'https://picsum.photos/seed/prop1b/800/600'],
    videos: [],
    rent: 25000,
    deposit: 50000,
    location: {
      country: 'India',
      state: 'Delhi',
      district: 'South Delhi',
      city: 'Saket',
      area: 'Block J',
      address: 'J-123, Saket',
      landmark: 'Near DLF Avenue',
      houseNumber: '123',
      coordinates: { lat: 28.5244, lng: 77.2103 }
    },
    furnishing: 'Semi-furnished',
    tenantType: 'Both',
    foodPreference: 'Veg/Non-Veg',
    facilities: ['Parking', 'Security', 'Lift', 'WiFi'],
    createdAt: Date.now(),
    interestedCount: 5
  },
  {
    id: '2',
    landlordId: 'l2',
    title: 'Cozy Studio near HSR Layout',
    description: 'Perfect for bachelors working in nearby tech parks. Fully furnished with high-speed internet.',
    photos: ['https://picsum.photos/seed/prop2/800/600'],
    videos: [],
    rent: 12000,
    deposit: 30000,
    location: {
      country: 'India',
      state: 'Karnataka',
      district: 'Bangalore Urban',
      city: 'HSR Layout',
      area: 'Sector 2',
      address: 'No 45, Sector 2',
      landmark: 'Near BDA Complex',
      houseNumber: '45',
      coordinates: { lat: 12.9141, lng: 77.6411 }
    },
    furnishing: 'Furnished',
    tenantType: 'Bachelor',
    foodPreference: 'Veg Only',
    facilities: ['WiFi', 'CCTV', 'Power Backup'],
    createdAt: Date.now() - 86400000,
    interestedCount: 12
  }
];
