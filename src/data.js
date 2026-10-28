export const links = {
  email: 'arshadsahabdeen05@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arshad-sahabdeen-61454a299/',
  github: 'https://github.com/Arshadsahabdeen',
  resume: 'https://drive.google.com/file/d/1SKroKlq3SfpxQAAKhkWV1uYkHkBYeVFV/view?usp=sharing',
}

export const featured = [
  {
    id: 'forensight',
    label: 'Personal build',
    status: 'In progress',
    title: 'Forensight',
    tagline: 'Mobile forensic investigation platform',
    summary:
      'A full-stack platform for analysing UFDR-based mobile evidence, with secure case management and an AI service layer for timelines and relationship analysis.',
    stack: ['React', 'Spring Boot', 'PostgreSQL', 'FastAPI'],
    built: [
      'Case and evidence management with secure, role-based access.',
      'Processing pipeline for UFDR mobile extraction reports.',
      'Spring Boot + PostgreSQL core with a React investigator interface.',
      'A FastAPI AI service layer designed to extend into timeline reconstruction and relationship analysis.',
    ],
    source: 'https://github.com/Arshadsahabdeen/Forensight---AI-powered-Mobile-Forensic-data-Analytics-App',
  },
  {
    id: 'devsphere',
    label: 'Full-stack · Machine learning',
    status: 'Completed',
    title: 'DevSphere',
    tagline: 'Collaborative project development platform',
    summary:
      'A MERN project-management platform with a Random Forest model that reads progress, delays and team activity to flag risky projects in real time.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.IO', 'Python'],
    built: [
      'Project and task collaboration with real-time updates over Socket.IO.',
      'A Random Forest risk model in Python using progress, task delays, risks and team activity.',
      'Predictive dashboards that surface at-risk projects as data changes.',
      'REST APIs connecting the MERN app to the ML service.',
    ],
    source: 'https://github.com/Arshadsahabdeen/DevSphereProject',
  },
  {
    id: 'garment',
    label: 'Internship · Nous Infosolutions',
    status: 'Completed',
    title: 'Garment Management System',
    tagline: 'Production and inventory platform for garment manufacturing',
    summary:
      'One platform for a garment unit’s whole flow: materials, processing, stitching, tailors, dispatch and reports, replacing manual records and disconnected tools.',
    problem:
      'Garment production often runs on manual records and disconnected workflows, so stock is hard to track and production and dispatch are slow to monitor.',
    stack: ['Angular', 'TypeScript', 'FastAPI', 'Python', 'MySQL', 'JWT'],
    built: [
      'Material master and inventory, with processing that deducts used quantities from stock.',
      'Stitching records that calculate stitched quantities from garment sizes, plus tailor management.',
      'Dispatch management for finished goods, with dashboards and reports on inventory and production.',
      'JWT login protecting the API; Angular standalone components integrated with FastAPI and MySQL.',
    ],
    impact:
      'Code splitting and fewer unnecessary re-renders cut dashboard re-renders by 30% and load time by about 1.5 seconds.',
    source: 'https://github.com/Arshadsahabdeen/GarmentManagementSystem',
  },
]

export const others = [
  {
    title: 'GridX7',
    context: 'Smart India Hackathon 2025',
    text: 'Flutter app for IoT solar grid monitoring: live ESP32 sensor data through Firebase, maintenance alerts and an AI troubleshooting chatbot.',
    stack: 'Flutter / ESP32 / Firebase',
  },
  {
    title: 'Adaptive CAPTCHA',
    context: 'Smart India Hackathon 2024',
    text: 'ML-based adaptive CAPTCHA prototype for UIDAI, aimed at stronger security without hurting accessibility.',
    stack: 'Machine learning',
  },
  {
    title: 'SWS Document Dashboard',
    context: 'Web app',
    text: 'Upload company PDFs, follow upload progress in real time, and get notified when background processing finishes.',
    stack: 'JavaScript',
    href: 'https://github.com/Arshadsahabdeen/SWS-Document-Management-Dashboard',
  },
]

export const principles = [
  ['Build the whole path.', "I'd rather ship one flow that works end to end than five half-finished features."],
  ['Start from the data.', 'Schemas and APIs first; the interface is easier to get right once the data is.'],
  ['Make it hold up.', 'Dashboards that load fast, evidence that stays traceable, alerts that fire when they should.'],
]

export const timeline = [
  ['2025', 'Software Development Intern, Nous Infosolutions'],
  ['2025', 'Smart India Hackathon, GridX7'],
  ['2024', 'Smart India Hackathon, Adaptive CAPTCHA'],
  ['2023–27', 'B.E. Computer Science and Design, SKCET'],
]
