// Constants for WorkSpace Finder application

export const TIME_SLOTS = [
  { id: '1', time: '09:00 - 11:00' },
  { id: '2', time: '11:00 - 13:00' },
  { id: '3', time: '13:00 - 15:00' },
  { id: '4', time: '15:00 - 17:00' },
  { id: '5', time: '17:00 - 19:00' },
];

export const WORKSPACES = [
  {
    id: 'ws-1',
    name: 'The Quiet Corner',
    location: 'Hitech City, Hyderabad',
    description: 'A serene and focused environment perfect for deep work sessions and individual productivity.',
    pricePerHour: 499,
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800',
    amenities: ['High-speed WiFi', 'Masala Chai', 'Ergonomic Chair'],
    type: 'Desk'
  },
  {
    id: 'ws-2',
    name: 'Summit Meeting Room',
    location: 'Madhapur ,Hyderabad',
    description: 'Professional meeting space equipped with modern presentation tools and comfortable seating for up to 10 people.',
    pricePerHour: 599,
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800',
    amenities: ['Projector', 'Whiteboard', 'Air Conditioning', 'Catering available'],
    type: 'Meeting Room'
  },
  {
    id: 'ws-3',
    name: 'Executive Suite 101',
    location: 'kondapur , Hyderabad',
    description: 'A private, luxurious office space for executives who value privacy and high-end aesthetics.',
    pricePerHour: 349,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    amenities: ['Private Balcony', 'Mini Fridge', 'Personal Assistant Support'],
    type: 'Private Office'
  },
  {
    id: 'ws-4',
    name: 'Creative Loft',
    location: 'Gachibowli, Hyderabad',
    description: 'Inspiring open-plan loft space with natural light and industrial design elements.',
    pricePerHour: 659,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',
    amenities: ['Natural Light', 'Lounge Area', 'Creative Library'],
    type: 'Desk'
  },
  {
    id: 'ws-5',
    name: 'Nexus Tech Lab',
    location: 'Nanakramguda, Hyderabad',
    description: 'Cutting-edge workspace designed for tech enthusiasts and small startups.',
    pricePerHour: 650,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    amenities: ['Dual Monitors', 'Server Rack Access', 'Podcast Studio'],
    type: 'Meeting Room'
  },
  {
    id: 'ws-6',
    name: 'Skyline Penthouse Office',
    location: 'Wipro Circle, Hyderabad',
    description: 'Elevate your business in this high-rise private office with panoramic city views and premium concierge services.',
    pricePerHour: 450,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    amenities: ['Panoramic View', 'Smart Lighting', 'Shower Access', 'Concierge'],
    type: 'Private Office'
  },
  {
    id: 'ws-7',
    name: 'Heritage Library Nook',
    location: 'kukatpally, Hyderabad',
    description: 'Work amidst history. This classic library-themed desk space offers a sophisticated, academic atmosphere for deep focus.',
    pricePerHour: 499,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
    amenities: ['Reference Library', 'Premium Coffee', 'Silent Zone'],
    type: 'Desk'
  },
  {
    id: 'ws-8',
    name: 'Marina Meeting Hub',
    location: 'KPHB, Hyderabad',
    description: 'A modern, tech-enabled meeting room near the coast, perfect for coastal startup strategy sessions and client pitches.',
    pricePerHour: 299,
    image: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?auto=format&fit=crop&q=80&w=800',
    amenities: ['Video Conferencing', 'Fiber Internet', 'Sea View', 'Parking'],
    type: 'Meeting Room'
  },
  {
    id: 'ws-9',
    name: 'Zen Co-working Garden',
    location: 'Ameerpet, Hyderabad',
    description: 'An indoor-outdoor hybrid workspace filled with greenery to boost creativity and reduce stress.',
    pricePerHour: 399,
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=800',
    amenities: ['Greenery', 'Standing Desks', 'Fresh Juice Bar'],
    type: 'Desk'
  },
  {
    id: 'ws-10',
    name: 'Victoria Boardroom',
    location: 'Punjagutta, Hyderabad',
    description: 'A prestigious boardroom with Victorian-inspired decor and modern AV facilities for high-stakes decisions.',
    pricePerHour: 340,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    amenities: ['Leather Chairs', '4K TV', 'Waitstaff', 'Fine Tea'],
    type: 'Meeting Room'
  },
  {
    id: 'ws-11',
    name: 'Cloud Nine Cabin',
    location: 'Sr-nagar, Hyderabad',
    description: 'A minimalist private cabin designed for maximum focus, located in the heart of the tech corridor.',
    pricePerHour: 230,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    amenities: ['Soundproof', 'Dual AC', 'Private Network', 'Nap Room access'],
    type: 'Private Office'
  },





  {
    id: 'ws-12',
    name: 'Lanc work-garden',
    location: 'Uppal, Hyderabad',
    description: 'A minimalist private cabin designed for maximum focus, located in the heart of the tech corridor.',
    pricePerHour: 230,
    image: 'https://d33wubrfki0l68.cloudfront.net/a74fc32e02e54217c645a8efe036b83f064d503c/35899/assets/img/previews/hb-workspace-0008.jpg',
    amenities: [  'Private Network', 'Nap Room access','Fine Coffee', 'Dual Ac'],
    type: 'Private Office'
  }
];