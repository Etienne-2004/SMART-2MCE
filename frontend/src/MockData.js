export const INITIAL_DATA = {
  user: {
    name: "Admin Etienne",
    role: "Institution", // 'Institution', 'Technician', 'Supplier'
    organization: "University of Rwanda",
    lastLogin: "Today 08:14"
  },
  stats: {
    totalDevices: 47,
    openRequests: 3,
    lateTasks: 2,
    activeTechnicians: 12
  },
  requests: [
    { id: "SR-001", device: "Epson Projector — Lab A", dept: "Computer Science", priority: "HIGH", deadline: "28 Apr", countdown: "1d 4h 22m", status: "In Progress" },
    { id: "SR-002", device: "Network Switch — Server Room", dept: "IT Department", priority: "CRITICAL", deadline: "26 Apr", countdown: "LATE 2h 14m", status: "LATE" },
    { id: "SR-003", device: "Office Chair x4", dept: "Admin Block", priority: "LOW", deadline: "02 May", countdown: "5d 6h", status: "Open" },
    { id: "SR-004", device: "Generator UR/EL/001", dept: "Power Room", priority: "HIGH", deadline: "29 Apr", countdown: "2d 8h", status: "Assigned" },
    { id: "SR-005", device: "Dell Laptop UR/CS/005", dept: "CS Lab 2", priority: "MEDIUM", deadline: "01 May", countdown: "4d 2h", status: "Under Review" }
  ],
  marketplaceTasks: [
    { id: "SR-014", institution: "King Faisal Hospital", item: "Generator (KFH/PWR/002)", skills: "Electrical Eng.", deadline: "28 Apr", budget: "60k-100k", status: "NEW" },
    { id: "SR-017", institution: "REB — Kigali", item: "Network Switch Rack", skills: "IT / Networking", deadline: "30 Apr", budget: "40k-70k", status: "OPEN" },
    { id: "SR-019", institution: "Equity Bank — Remera", item: "ATM Machine (EBR/BR/004)", skills: "Electronics", deadline: "01 May", budget: "90k-140k", status: "OPEN" },
    { id: "SR-022", institution: "MTN Rwanda HQ", item: "Server Rack — Room B2", skills: "IT / Server Mgmt", deadline: "03 May", budget: "70k-120k", status: "OPEN" },
    { id: "SR-025", institution: "MININFRA Office", item: "Office Printer Fleet x6", skills: "IT / Printing", deadline: "05 May", budget: "30k-50k", status: "NEW" }
  ],
  technician: {
    name: "Jean Paul Mugisha",
    role: "External Technician",
    skills: "Electrical & IT",
    district: "Gasabo, Kigali",
    stats: {
      jobsAvailable: 7,
      activeAssignments: 2,
      rating: 4.9,
      earnings: "RWF 320k"
    },
    activeTasks: [
      { id: "SR-014", institution: "King Faisal Hospital", title: "Generator Repair", priority: "CRITICAL", timeLeft: "14h 22m left", color: "#d32f2f" },
      { id: "SR-031", institution: "RURA Office, Kigali", title: "Network Configuration", priority: "HIGH", timeLeft: "3d 6h left", color: "#2e7d32" }
    ],
    nearbyJobs: [
      { id: "SR-017", institution: "REB Kigali", title: "Network Switch", category: "IT/Networking", deadline: "30 Apr", budget: "RWF 40k-70k" },
      { id: "SR-019", institution: "Equity Bank Remera", title: "ATM Machine", category: "Electronics", deadline: "01 May", budget: "RWF 90k-140k" },
      { id: "SR-025", institution: "MININFRA Office", title: "Printer Fleet x6", category: "IT / Printing", deadline: "05 May", budget: "RWF 30k-50k" },
      { id: "SR-035", institution: "MTN Rwanda HQ", title: "Server Rack", category: "IT / Server", deadline: "08 May", budget: "RWF 70k-120k" }
    ]
  },
  devices: [
    { code: "UR/CS/001", name: "Dell Laptop 15\"", category: "Computer", location: "CS Lab 1, Huye", condition: "Working", lastMaintained: "12 Feb 2026" },
    { code: "UR/CS/002", name: "Epson Projector", category: "AV Equipment", location: "Lecture Hall A", condition: "Faulty", lastMaintained: "-" },
    { code: "UR/EL/001", name: "Generator 60kVA", category: "Power Equipment", location: "Power Room, Huye", condition: "Maintenance", lastMaintained: "20 Mar 2026" },
    { code: "UR/NET/001", name: "Cisco Switch 24p", category: "Networking", location: "Server Room B", condition: "Working", lastMaintained: "05 Jan 2026" },
    { code: "UR/CS/003", name: "HP Printer LaserJet", category: "Printing", location: "Admin Block", condition: "Working", lastMaintained: "08 Mar 2026" },
    { code: "UR/MED/001", name: "Autoclave Machine", category: "Medical", location: "Health Centre", condition: "Faulty", lastMaintained: "-" },
    { code: "UR/SEC/001", name: "CCTV System x12", category: "Security", location: "Campus Wide", condition: "Working", lastMaintained: "15 Feb 2026" }
  ],
  negotiation: {
    details: {
      id: "SR-014",
      title: "Generator Repair",
      institution: "King Faisal Hospital",
      device: "KFH/PWR/002 — Generator 100kVA",
      problem: "Generator fails to start on auto-mode",
      skills: "Electrical Engineering, Generator Maint.",
      duration: "4-8 hours expected",
      budget: "RWF 60,000 — 100,000",
      location: "King Faisal Hospital, Kigali City",
      deadline: "28 April 2026",
      status: "Under Negotiation"
    },
    thread: [
      { sender: "Jean Paul M.", message: "I am available 27 Apr. My quote: RWF 75,000 for 6 hrs.", time: "09:14", type: "tech" },
      { sender: "KFH Admin", message: "Thank you. We need completion within 4 hrs. Can you adjust?", time: "09:22", type: "admin" },
      { sender: "Jean Paul M.", message: "Yes — 4 hrs for RWF 85,000 incl. parts inspection.", time: "09:31", type: "tech" },
      { sender: "KFH Admin", message: "Agreed. Issuing formal acceptance now. Please confirm.", time: "09:35", type: "admin" },
      { sender: "Jean Paul M.", message: "Confirmed. I will arrive by 10:00 AM tomorrow.", time: "09:37", type: "tech" }
    ]
  },
  supplier: {
    name: "TechParts Rwanda Ltd",
    stats: {
      newRequests: 8,
      activeQuotes: 3,
      ordersDelivered: 12,
      avgRating: 4.8
    },
    requests: [
      { id: "PR-005", item: "UPS Battery 12V 9Ah", institution: "RURA — Kigali", qty: "4 units", location: "Gasabo, Kigali", urgency: "HIGH", quoteBy: "28 Apr" },
      { id: "PR-007", item: "Network Cable Cat6", institution: "UR Huye Campus", qty: "100 metres", location: "Huye, Southern", urgency: "MEDIUM", quoteBy: "30 Apr" },
      { id: "PR-009", item: "Printer Toner HP 85A", institution: "MININFRA Office", qty: "10 units", location: "Nyarugenge, Kigali", urgency: "LOW", quoteBy: "05 May" },
      { id: "PR-011", item: "Generator Fuel Filter", institution: "King Faisal Hospital", qty: "2 units", location: "Gasabo, Kigali", urgency: "CRITICAL", quoteBy: "27 Apr" },
      { id: "PR-013", item: "Server RAM DDR4 16GB", institution: "MTN Rwanda HQ", qty: "8 units", location: "Kicukiro, Kigali", urgency: "HIGH", quoteBy: "01 May" },
      { id: "PR-015", item: "Office Chair Gas Lift", institution: "Equity Bank Remera", qty: "15 units", location: "Gasabo, Kigali", urgency: "LOW", quoteBy: "07 May" }
    ]
  },
  analytics: {
    tasksByStatus: [
      { label: "Completed", value: 58, color: "var(--primary-green)" },
      { label: "In Progress", value: 29, color: "var(--primary-blue)" },
      { label: "Open", value: 19, color: "var(--primary-orange)" },
      { label: "Late", value: 10, color: "var(--accent-red)" }
    ],
    monthlyVolume: [42, 58, 71, 89, 63, 55],
    technicianPerformance: [
      { name: "Jean Paul Mugisha", completed: 18, late: 0, time: "3.2 hrs", rating: 4.9 },
      { name: "Alice Niyonzima", completed: 15, late: 1, time: "4.1 hrs", rating: 4.8 },
      { name: "Eric Kamana", completed: 12, late: 0, time: "2.8 hrs", rating: 4.7 },
      { name: "Grace Uwimana", completed: 10, late: 2, time: "5.4 hrs", rating: 4.2 },
      { name: "Patrick Nkurunziza", completed: 8, late: 3, time: "6.1 hrs", rating: 3.9 },
      { name: "Claudine Mukamana", completed: 14, late: 0, time: "3.8 hrs", rating: 4.8 },
      { name: "David Niyigena", completed: 11, late: 1, time: "4.5 hrs", rating: 4.4 }
    ],
    aiMessages: [
      { role: "user", text: "Which institution has most late tasks?" },
      { role: "ai", text: "University of Rwanda — Huye: 3 late tasks in April 2026." },
      { role: "user", text: "Top rated technicians for electrical work in Kigali?" },
      { role: "ai", text: "Top 3: Jean Paul M. (4.9), Alice N. (4.8), Eric K. (4.7)" },
      { role: "user", text: "Fastest UPS battery supplier in Gasabo?" },
      { role: "ai", text: "TechParts Rwanda — avg. delivery 1.2 days, rating 4.8" },
      { role: "user", text: "Devices due for replacement this quarter?" },
      { role: "ai", text: "3 devices flagged: UR/CS/002, KFH/PWR/001, REB/OFF/007 — 4+ repairs each." }
    ]
  },
  materials: [
    { id: "MAT-001", name: "CAT6 Ethernet Cable", desc: "High-speed networking cable", qty: "450m", min: "100m", price: "500 RWF/m", supplier: "Kigali Tech", status: "In Stock" },
    { id: "MAT-002", name: "HP 85A Toner", desc: "LaserJet cartridge", qty: "2 units", min: "5 units", price: "45,000 RWF", supplier: "TechParts Ltd", status: "Low Stock" },
    { id: "MAT-003", name: "UPS Battery 12V", desc: "9Ah lead acid battery", qty: "12 units", min: "10 units", price: "25,000 RWF", supplier: "Power Solutions", status: "In Stock" },
    { id: "MAT-004", name: "RJ45 Connectors", desc: "Pack of 100", qty: "5 packs", min: "2 packs", price: "12,000 RWF", supplier: "Kigali Tech", status: "In Stock" },
    { id: "MAT-005", name: "Thermal Paste", desc: "High conductivity", qty: "0 units", min: "3 units", price: "8,500 RWF", supplier: "IT Depot", status: "Out of Stock" }
  ],
  alertsList: [
    { time: "10 mins ago", type: "CRITICAL", msg: "Server Rack Room B2 temperature exceeding 35°C", related: "UR/NET/002", action: "Check Cooling" },
    { time: "1 hour ago", type: "WARNING", msg: "Low Stock: HP 85A Toner (2 units remaining)", related: "MAT-002", action: "Order Now" },
    { time: "2 hours ago", type: "INFO", msg: "Maintenance completed for Generator UR/EL/001", related: "UR/EL/001", action: "View Report" },
    { time: "5 hours ago", type: "CRITICAL", msg: "Device UR/CS/002 (Projector) reported as Faulty", related: "UR/CS/002", action: "Assign Technician" }
  ],
  learning: [
    { title: "Projector Maintenance 101", desc: "Basic filter cleaning and lamp replacement guide.", duration: "15 mins", cat: "Device Maintenance" },
    { title: "Electrical Safety in Labs", desc: "Essential safety protocols for handling power equipment.", duration: "45 mins", cat: "Safety" },
    { title: "Networking Troubleshooting", desc: "Step-by-step guide to fixing common connectivity issues.", duration: "30 mins", cat: "Troubleshooting" },
    { title: "Asset Tracking Best Practices", desc: "How to use SMART-2MCE for optimal inventory management.", duration: "20 mins", cat: "Management" }
  ],
  settings: {
    org: {
      name: "University of Rwanda",
      type: "Public University",
      contact: "admin@ur.ac.rw",
      phone: "+250 788 000 000"
    },
    notifications: {
      email: true,
      sms: false,
      browser: true
    }
  }
};
