
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
    photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'],
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
    interestedCount: 5,
    reviews: []
  },
  {
    id: '2',
    landlordId: 'l2',
    title: 'Cozy Studio near HSR Layout',
    description: 'Perfect for bachelors working in nearby tech parks. Fully furnished with high-speed internet.',
    photos: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'],
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
    interestedCount: 12,
    reviews: []
  },
  {
    id: '3',
    landlordId: 'l3',
    title: 'Luxury 3BHK Penthouse',
    description: 'Spacious penthouse with a private terrace. Prime location in Koregaon Park.',
    photos: ['https://images.unsplash.com/photo-1600585154340-be6199bc3a07?auto=format&fit=crop&w=800&q=80'],
    videos: [],
    rent: 85000,
    deposit: 200000,
    location: {
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Koregaon Park',
      area: 'Lane 7',
      address: 'Penthouse 1, Riverview',
      landmark: 'Near German Bakery',
      houseNumber: '1',
      coordinates: { lat: 18.5362, lng: 73.8940 }
    },
    furnishing: 'Furnished',
    tenantType: 'Family',
    foodPreference: 'Veg/Non-Veg',
    facilities: ['Swimming Pool', 'Gym', 'Parking', 'Modular Kitchen'],
    createdAt: Date.now() - 172800000,
    interestedCount: 3,
    reviews: []
  },
  {
    id: '4',
    landlordId: 'l4',
    title: 'Compact 1BHK in Andheri',
    description: 'Minimalist living for young professionals. Great connectivity to Western Express Highway.',
    photos: ['https://images.unsplash.com/photo-1536376074432-bf12178d1f4a?auto=format&fit=crop&w=800&q=80'],
    videos: [],
    rent: 35000,
    deposit: 100000,
    location: {
      country: 'India',
      state: 'Maharashtra',
      district: 'Mumbai Suburban',
      city: 'Andheri',
      area: 'West',
      address: 'Flat 402, Sunshine Apts',
      landmark: 'Near Shoppers Stop',
      houseNumber: '402',
      coordinates: { lat: 19.1136, lng: 72.8697 }
    },
    furnishing: 'Unfurnished',
    tenantType: 'Bachelor',
    foodPreference: 'Veg/Non-Veg',
    facilities: ['Lift', 'Security', 'Power Backup'],
    createdAt: Date.now() - 259200000,
    interestedCount: 8,
    reviews: []
  },
  {
    id: '5',
    landlordId: 'l5',
    title: 'Heritage Villa in Mysore',
    description: 'Experience the royal charm. Traditional architecture with modern internal amenities.',
    photos: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'],
    videos: [],
    rent: 45000,
    deposit: 150000,
    location: {
      country: 'India',
      state: 'Karnataka',
      district: 'Mysore',
      city: 'Mysore',
      area: 'Jayalakshmipuram',
      address: '22/A, Heritage Enclave',
      landmark: 'Near Palace Ground',
      houseNumber: '22',
      coordinates: { lat: 12.2958, lng: 76.6394 }
    },
    furnishing: 'Semi-furnished',
    tenantType: 'Family',
    foodPreference: 'Veg Only',
    facilities: ['Parking', 'CCTV', 'Modular Kitchen'],
    createdAt: Date.now() - 345600000,
    interestedCount: 2,
    reviews: []
  },
  {
    id: '6',
    landlordId: 'l6',
    title: 'Bachelor Pad in Noida Sector 62',
    description: 'Walkable distance to major IT hubs. Fully serviced apartment with laundry facilities.',
    photos: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'],
    videos: [],
    rent: 15000,
    deposit: 30000,
    location: {
      country: 'India',
      state: 'Uttar Pradesh',
      district: 'Noida',
      city: 'Noida',
      area: 'Sector 62',
      address: 'Tower C, PG Heights',
      landmark: 'Near Stellar IT Park',
      houseNumber: 'C-501',
      coordinates: { lat: 28.6258, lng: 77.3639 }
    },
    furnishing: 'Furnished',
    tenantType: 'Bachelor',
    foodPreference: 'Veg/Non-Veg',
    facilities: ['WiFi', 'Power Backup', 'Gym'],
    createdAt: Date.now() - 432000000,
    interestedCount: 25,
    reviews: []
  },
  {
    id: '7',
    landlordId: 'l7',
    title: 'Sea Facing Apartment, Worli',
    description: 'Uninterrupted views of the Arabian Sea. Elite gated community with premium features.',
    photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
    videos: [],
    rent: 120000,
    deposit: 500000,
    location: {
      country: 'India',
      state: 'Maharashtra',
      district: 'Mumbai City',
      city: 'Worli',
      area: 'Worli Sea Face',
      address: 'Floor 18, Ocean Crest',
      landmark: 'Near Sea Link',
      houseNumber: '1802',
      coordinates: { lat: 19.0000, lng: 72.8150 }
    },
    furnishing: 'Furnished',
    tenantType: 'Family',
    foodPreference: 'Veg/Non-Veg',
    facilities: ['Swimming Pool', 'Gym', 'Parking', 'CCTV', 'Lift'],
    createdAt: Date.now() - 518400000,
    interestedCount: 4,
    reviews: []
  },
  {
    id: '8',
    landlordId: 'l8',
    title: '1BHK Near Anna Nagar',
    description: 'Well-ventilated flat in a residential hotspot. Easy access to shops and parks.',
    photos: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80'],
    videos: [],
    rent: 18000,
    deposit: 60000,
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      city: 'Anna Nagar',
      area: 'Shanti Colony',
      address: '4th Avenue, Green Leaf',
      landmark: 'Near Tower Park',
      houseNumber: '44',
      coordinates: { lat: 13.0850, lng: 80.2101 }
    },
    furnishing: 'Semi-furnished',
    tenantType: 'Both',
    foodPreference: 'Veg Only',
    facilities: ['Parking', 'Security', 'Lift'],
    createdAt: Date.now() - 604800000,
    interestedCount: 7,
    reviews: []
  },
  {
    id: '9',
    landlordId: 'l9',
    title: 'Contemporary Flat in Salt Lake',
    description: 'Modern interiors with a touch of elegance. Located in the tech hub of Kolkata.',
    photos: ['https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&w=800&q=80'],
    videos: [],
    rent: 28000,
    deposit: 75000,
    location: {
      country: 'India',
      state: 'West Bengal',
      district: 'Kolkata',
      city: 'Kolkata',
      area: 'Salt Lake Sector V',
      address: 'Block EP, IT Towers',
      landmark: 'Near Wipro Circle',
      houseNumber: 'EP-12',
      coordinates: { lat: 22.5726, lng: 88.4339 }
    },
    furnishing: 'Furnished',
    tenantType: 'Both',
    foodPreference: 'Veg/Non-Veg',
    facilities: ['WiFi', 'Power Backup', 'Air Conditioning'],
    createdAt: Date.now() - 691200000,
    interestedCount: 15,
    reviews: []
  },
  {
    id: '10',
    landlordId: 'l10',
    title: 'Studio Apartment, Ahmedabad',
    description: 'Perfect for students or solo travelers. Close to top universities and shopping hubs.',
    photos: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'],
    videos: [],
    rent: 9000,
    deposit: 20000,
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Ahmedabad',
      city: 'Ahmedabad',
      area: 'Navrangpura',
      address: 'Flat 10, Student Haven',
      landmark: 'Near Gujarat University',
      houseNumber: '10',
      coordinates: { lat: 23.0373, lng: 72.5524 }
    },
    furnishing: 'Semi-furnished',
    tenantType: 'Bachelor',
    foodPreference: 'Veg Only',
    facilities: ['WiFi', 'CCTV'],
    createdAt: Date.now() - 777600000,
    interestedCount: 30,
    reviews: []
  }
];
