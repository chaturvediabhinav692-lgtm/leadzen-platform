
export type CourseInterest = 'JEE' | 'NEET' | 'UPSC' | 'SSC' | 'Commerce';
export type ClientStatus = 'new' | 'hot' | 'warm' | 'cold' | 'assigned' | 'converted' | 'snoozed' | 'rejected';
export type InterestLevel = 'HOT' | 'WARM' | 'COLD';
export type Timeline = 'Immediate' | '1-3 Months' | 'Exploring';
export type LeadSource = 'WhatsApp' | 'Call';

export interface ChatMessage {
  id: string;
  sender: 'client' | 'bot' | 'broker';
  text: string;
  timestamp: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'message' | 'email' | 'status_change' | 'assignment' | 'note';
  content: string;
  timestamp: string;
}

export type LeadStage = 'new' | 'active' | 'converted' | 'snoozed';

export interface Client {
  id: string;
  name: string;
  phone: string;
  courseInterest: CourseInterest;
  timeline: Timeline;
  location: string;
  source: LeadSource;
  status: ClientStatus; // "hot" | "warm" | "cold" | etc.
  stage: LeadStage; // "new" | "active" | "converted" | "snoozed"
  lastActivityAt: number; // timestamp
  assigned: boolean;
  snoozeUntil?: string;
  assignedBrokerId: string | null;
  lastActivity: string; // Maintain for compat
  lastMessage: string;
  notes: string;
  leadScore: number;
  interestLevel: InterestLevel;
  activityHistory: Activity[];
  conversation: ChatMessage[];
  completed?: boolean; // Maintain for compat
  snoozed?: boolean; // Maintain for compat
}

export interface Broker {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

const PROPERY_TYPES: CourseInterest[] = ['2BHK Flat', '3BHK Luxury', 'Penthouse', 'Villa', 'Commercial Plot'] as any;
const STATUSES: ClientStatus[] = ['new', 'hot', 'warm', 'cold', 'assigned', 'converted'];
const TIMELINES: Timeline[] = ['Immediate', '1-3 Months', 'Exploring'];
const LOCATIONS = ['South Mumbai', 'Bandra West', 'Powai', 'Andheri', 'Navi Mumbai', 'Thane', 'Worli'];

export const INITIAL_BROKERS: Broker[] = [
  { id: 'b1', name: 'Rajesh Kumar', phone: '+91 98765 43210' },
  { id: 'b2', name: 'Priya Sharma', phone: '+91 98765 43211' },
  { id: 'b3', name: 'Amit Singh', phone: '+91 98765 43212' },
  { id: 'b4', name: 'Sneha Gupta', phone: '+91 98765 43213' },
  { id: 'b5', name: 'Vikram Malhotra', phone: '+91 98765 43214' },
];

const REAL_NAMES = [
  'Aarav Patel', 'Vihaan Sharma', 'Aditya Verma', 'Sai Kumar', 'Arjun Singh',
  'Rohan Gupta', 'Ishaan Reddy', 'Reyansh Malhotra', 'Dhruv Joshi', 'Kabir Das',
  'Ananya Iyer', 'Diya Menon', 'Saanvi Nair', 'Pari Choudhury', 'Myra Kapoor',
  'Riya Jain', 'Anika Chatterjee', 'Aadhya Saxena', 'Kiara Kaur', 'Fatima Khan',
  'Mohammed Zoya', 'Yash Mehta', 'Veer Marathe', 'Shivansh Patil', 'Ayaan Khan'
];

// Deterministic Helper
// Uses a simple linear congruential generator logic relative to an index/seed
const getDeterministicVal = <T>(arr: T[], seed: number): T => {
  return arr[seed % arr.length];
};

const getDeterministicScore = (seed: number): number => {
  return (seed * 37) % 101;
};

const getInterestLevel = (score: number): InterestLevel => {
  if (score >= 70) return 'HOT';
  if (score >= 40) return 'WARM';
  return 'COLD';
};

const generateConversation = (name: string, amenity: string, score: number, seed: number): ChatMessage[] => {
  const messages: ChatMessage[] = [];
  const baseTime = Date.now() - 10000000; // Note: Date.now() will differ on server/client.
  // Ideally we should fix this too. 
  // Let's use a fixed date for mock data to be safe.
  const FIXED_NOW = new Date('2024-01-01T12:00:00Z').getTime();

  // Actually, using Date.now() in mockData executes when the module is loaded.
  // If the module is loaded once on server and once on client, they might differ.
  // Standard practice for Next.js mock data: execute once or use static.
  // But let's stick to fixed date to be 100% safe.

  // Initial Inquiry
  messages.push({
    id: `m_${seed}_1`,
    sender: 'client',
    text: `Hi, I am looking for a ${amenity} in ${getDeterministicVal(LOCATIONS, seed)}.`,
    timestamp: new Date(FIXED_NOW - 100000 * (seed % 10)).toISOString()
  });

  // Bot Response
  messages.push({
    id: `m_${seed}_2`,
    sender: 'bot',
    text: `Hello ${name.split(' ')[0]}! We have some premium options. What is your budget range?`,
    timestamp: new Date(FIXED_NOW - 50000 * (seed % 10)).toISOString()
  });

  // Hot Lead Interaction
  if (score > 60) {
    messages.push({
      id: `m_${seed}_3`,
      sender: 'client',
      text: `Budget is flexible around 2.5Cr. When can I visit the site?`,
      timestamp: new Date(FIXED_NOW - 10000 * (seed % 10)).toISOString()
    });
  } else {
    messages.push({
      id: `m_${seed}_4`,
      sender: 'client',
      text: `Just checking rates for investment purpose.`,
      timestamp: new Date(FIXED_NOW - 10000 * (seed % 10)).toISOString()
    });
  }

  return messages;
};

const generateClients = (count: number): Client[] => {
  const clients: Client[] = [];
  const max = Math.min(count, REAL_NAMES.length);

  for (let i = 0; i < max; i++) {
    // Deterministic selections
    const course = getDeterministicVal(PROPERY_TYPES, i + 5);
    const status = getDeterministicVal(STATUSES, i + 2);
    const timeline = getDeterministicVal(TIMELINES, i + 7);
    const location = getDeterministicVal(LOCATIONS, i + 11);
    const leadScore = getDeterministicScore(i + 13);

    // Deterministic broker assignment
    // Assign broker if status is not 'new' (logic was random > 0.2)
    // New logic: if (i % 5 !== 0) -> assign
    const shouldAssign = status !== 'new' && (i % 5 !== 0);
    const broker = shouldAssign ? getDeterministicVal(INITIAL_BROKERS, i) : null;

    const name = REAL_NAMES[i];
    const conversation = generateConversation(name, course, leadScore, i);
    const lastMsg = conversation[conversation.length - 1];

    // Deterministic source
    const source: LeadSource = (i % 3 === 0) ? 'Call' : 'WhatsApp';

    const stage: LeadStage = status === 'converted' ? 'converted' : status === 'snoozed' ? 'snoozed' : status === 'new' ? 'new' : 'active';
    const lastActivityAt = new Date(lastMsg.timestamp).getTime();

    clients.push({
      id: `c${i + 1}`,
      name: name,
      phone: `+91 9${(900000000 + i * 123456).toString().substring(0, 9)}`,
      courseInterest: course,
      timeline,
      location,
      source,
      status, // Mapping to interestLevel conceptually, but keeping original for now
      stage,
      lastActivityAt,
      assigned: broker !== null,
      assignedBrokerId: broker?.id || null,
      lastActivity: lastMsg.timestamp,
      lastMessage: lastMsg.text,
      notes: `Interested in ${course} near ${location}. Budget discussed.`,
      leadScore,
      interestLevel: getInterestLevel(leadScore),
      activityHistory: [
        {
          id: `a${i}_1`,
          type: 'message',
          content: `Inbound WhatsApp: "${lastMsg.text}"`,
          timestamp: lastMsg.timestamp
        }
      ],
      conversation
    });
  }
  return clients;
};

export const INITIAL_CLIENTS = generateClients(30);
