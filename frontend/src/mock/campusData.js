export const INITIAL_RESOURCES = [
  {
    id: 'res-1',
    name: 'Seminar Hall B',
    type: 'Seminar Hall',
    capacity: 150,
    location: 'Block A, 2nd Floor',
    facilities: ['Projector', 'WiFi', 'Microphone', 'Air Conditioning', 'Smart Board'],
    status: 'AVAILABLE',
  },
  {
    id: 'res-2',
    name: 'Auditorium',
    type: 'Auditorium',
    capacity: 500,
    location: 'Main Block, Ground Floor',
    facilities: ['Projector', 'WiFi', 'Microphone', 'Air Conditioning'],
    status: 'PENDING',
  },
  {
    id: 'res-3',
    name: 'Computer Lab 1',
    type: 'Computer Lab',
    capacity: 60,
    location: 'IT Wing, 3rd Floor',
    facilities: ['WiFi', 'Smart Board', 'Air Conditioning'],
    status: 'AVAILABLE',
  },
  {
    id: 'res-4',
    name: 'Seminar Hall A',
    type: 'Seminar Hall',
    capacity: 120,
    location: 'Block B, 1st Floor',
    facilities: ['Projector', 'WiFi', 'Microphone'],
    status: 'OCCUPIED',
  },
  {
    id: 'res-5',
    name: 'Conference Room',
    type: 'Conference Room',
    capacity: 25,
    location: 'Admin Block, 4th Floor',
    facilities: ['WiFi', 'Smart Board', 'Air Conditioning', 'Projector'],
    status: 'AVAILABLE',
  },
  {
    id: 'res-6',
    name: 'Sports Ground',
    type: 'Sports Facility',
    capacity: 800,
    location: 'North Campus Quad',
    facilities: ['Microphone'],
    status: 'AVAILABLE',
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'b-101',
    resourceName: 'Seminar Hall B',
    date: '2026-09-15',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'AI/ML Guest Lecture',
    status: 'APPROVED',
    user: 'Bhoomi Arora',
    location: 'Block A'
  },
  {
    id: 'b-102',
    resourceName: 'Auditorium',
    date: '2026-09-16',
    startTime: '14:00',
    endTime: '17:00',
    purpose: 'Hackathon Inauguration',
    status: 'PENDING',
    user: 'Tech Club ABGI',
    location: 'Main Block'
  }
];

// Smart Match Calculation: Total 100 Points
export function calculateMatchScore(resource, requirements) {
  let score = 0;

  // 1. Availability: 30 pts
  if (resource.status === 'AVAILABLE') score += 30;
  else if (resource.status === 'PENDING') score += 15;

  // 2. Capacity Match: 30 pts
  const reqCapacity = Number(requirements.people) || 1;
  if (resource.capacity >= reqCapacity) {
    score += 30;
    // 3. Optimal fit: 10 pts (Not wasting massive surplus space)
    if (resource.capacity <= reqCapacity * 1.5) {
      score += 10;
    }
  }

  // 4. Facilities Match: 30 pts
  const reqFacilities = requirements.facilities || [];
  if (reqFacilities.length > 0) {
    const matched = reqFacilities.filter(f => resource.facilities.includes(f));
    score += Math.round((matched.length / reqFacilities.length) * 30);
  } else {
    score += 30;
  }

  return Math.min(score, 100);
}