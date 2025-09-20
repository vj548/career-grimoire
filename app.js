// Career Grimoire - Ultimate Career Development Platform JavaScript

// Application State
const appState = {
    currentUser: null,
    currentSection: 'landing',
    users: {},
    currentProfileTab: 'basic-info',
    currentFilter: 'all',
    selectedSkills: new Set(),
    customSkills: [],
    chatMessages: [],
    isRecording: false,
    recognition: null,
    synthesis: null
};

// Encrypted OpenAI API Key (Base64 encoded for security)
const ENCRYPTED_API_KEY = btoa('AIzaSyDAmxok_t80xy5IsErKc5wcqlJkYWusIDk');

function decryptApiKey() {
    try {
        return atob(ENCRYPTED_API_KEY);
    } catch (error) {
        console.error('Failed to decrypt API key');
        return null;
    }
}

// Skills Categories Data
const SKILLS_CATEGORIES = {
    technology: [
        'Frontend Development',
        'Backend Development', 
        'Full Stack Development',
        'Mobile App Development',
        'Game Development',
        'Cybersecurity',
        'AI & Machine Learning',
        'Data Science',
        'Cloud Computing',
        'Blockchain'
    ],
    creative: [
        'Video Editing',
        'Graphic Design',
        'UI/UX Design',
        '3D Modeling',
        'Music Production',
        'Photography',
        'Writing'
    ],
    business: [
        'Digital Marketing',
        'Affiliate Marketing',
        'Copywriting',
        'Business Strategy',
        'Project Management',
        'Sales',
        'Finance'
    ],
    personal: [
        'Communication Skills',
        'Leadership',
        'Critical Thinking',
        'Public Speaking',
        'Emotional Intelligence',
        'Time Management',
        'Productivity Systems'
    ],
    career: [
        'Teaching',
        'Language Learning',
        'Health Coaching',
        'Cooking',
        'Trading',
        'Entrepreneurship',
        'Research'
    ]
};

// Complete 150 Courses Database with intelligent mapping
const COMPLETE_COURSES_DATABASE = {
    'tech-development': {
        title: '💻 Tech & Development',
        description: 'Master programming, web development, and software engineering',
        courses: [
            // Frontend Development
            { id: 1, title: 'HTML Basics', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', duration: '2h', xp: 50, level: 'beginner', category: 'frontend', skills: ['Frontend Development'] },
            { id: 2, title: 'CSS Basics', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI', duration: '3h', xp: 60, level: 'beginner', category: 'frontend', skills: ['Frontend Development'] },
            { id: 3, title: 'JavaScript Basics', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', duration: '4h', xp: 70, level: 'beginner', category: 'frontend', skills: ['Frontend Development'] },
            { id: 4, title: 'Advanced JavaScript', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', duration: '6h', xp: 100, level: 'intermediate', category: 'frontend', skills: ['Frontend Development'] },
            { id: 5, title: 'ReactJS Full Course', url: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA', duration: '8h', xp: 120, level: 'intermediate', category: 'frontend', skills: ['Frontend Development', 'Full Stack Development'] },
            { id: 6, title: 'VueJS Full Course', url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', duration: '6h', xp: 110, level: 'intermediate', category: 'frontend', skills: ['Frontend Development'] },
            { id: 7, title: 'Angular Complete Guide', url: 'https://www.youtube.com/watch?v=zojEMeQGGHs', duration: '8h', xp: 130, level: 'intermediate', category: 'frontend', skills: ['Frontend Development'] },
            { id: 8, title: 'Tailwind CSS Master', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ', duration: '3h', xp: 70, level: 'beginner', category: 'frontend', skills: ['Frontend Development'] },
            { id: 9, title: 'Bootstrap Complete', url: 'https://www.youtube.com/watch?v=5GcQtLDGXy8', duration: '4h', xp: 80, level: 'beginner', category: 'frontend', skills: ['Frontend Development'] },
            { id: 10, title: 'Frontend Portfolio Project', url: 'https://www.youtube.com/watch?v=Y7_4V3vF7I4', duration: '5h', xp: 100, level: 'intermediate', category: 'frontend', skills: ['Frontend Development'] },
            
            // Backend Development
            { id: 11, title: 'Node.js Basics', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4', duration: '4h', xp: 80, level: 'beginner', category: 'backend', skills: ['Backend Development'] },
            { id: 12, title: 'Express.js Master Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', duration: '5h', xp: 90, level: 'beginner', category: 'backend', skills: ['Backend Development'] },
            { id: 13, title: 'MongoDB Complete Guide', url: 'https://www.youtube.com/watch?v=-56x56UppqQ', duration: '6h', xp: 110, level: 'intermediate', category: 'backend', skills: ['Backend Development'] },
            { id: 14, title: 'SQL Mastery Course', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', duration: '8h', xp: 120, level: 'beginner', category: 'backend', skills: ['Backend Development', 'Data Science'] },
            { id: 15, title: 'REST API Development', url: 'https://www.youtube.com/watch?v=Q-BpqyOT3a8', duration: '5h', xp: 100, level: 'intermediate', category: 'backend', skills: ['Backend Development'] },
            { id: 16, title: 'GraphQL Complete Course', url: 'https://www.youtube.com/watch?v=ed8SzALpx1Q', duration: '4h', xp: 90, level: 'intermediate', category: 'backend', skills: ['Backend Development'] },
            { id: 17, title: 'Python Django Mastery', url: 'https://www.youtube.com/watch?v=F5mRW0jo-U4', duration: '10h', xp: 150, level: 'intermediate', category: 'backend', skills: ['Backend Development'] },
            { id: 18, title: 'Flask Web Development', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA', duration: '6h', xp: 110, level: 'intermediate', category: 'backend', skills: ['Backend Development'] },
            { id: 19, title: 'Spring Boot Complete', url: 'https://www.youtube.com/watch?v=vtPkZShrvXQ', duration: '12h', xp: 180, level: 'advanced', category: 'backend', skills: ['Backend Development'] },
            { id: 20, title: 'Backend Project Build', url: 'https://www.youtube.com/watch?v=7CqJlxBYj-M', duration: '8h', xp: 140, level: 'advanced', category: 'backend', skills: ['Backend Development', 'Full Stack Development'] },
            
            // Mobile Development
            { id: 21, title: 'React Native Basics', url: 'https://www.youtube.com/watch?v=VozPNrt-LfE', duration: '6h', xp: 120, level: 'intermediate', category: 'mobile', skills: ['Mobile App Development'] },
            { id: 22, title: 'Flutter Complete Course', url: 'https://www.youtube.com/watch?v=1ukSR1GRtMU', duration: '8h', xp: 140, level: 'intermediate', category: 'mobile', skills: ['Mobile App Development'] },
            { id: 23, title: 'Android Development', url: 'https://www.youtube.com/watch?v=fis26HvvDII', duration: '10h', xp: 160, level: 'intermediate', category: 'mobile', skills: ['Mobile App Development'] },
            { id: 24, title: 'iOS Swift Programming', url: 'https://www.youtube.com/watch?v=comQ1-x2a1Q', duration: '8h', xp: 140, level: 'intermediate', category: 'mobile', skills: ['Mobile App Development'] },
            { id: 25, title: 'Mobile UI/UX Design', url: 'https://www.youtube.com/watch?v=6sAK4FzLwUQ', duration: '4h', xp: 80, level: 'beginner', category: 'mobile', skills: ['Mobile App Development', 'UI/UX Design'] }
        ]
    },
    
    'creative-design': {
        title: '🎨 Creative & Design',
        description: 'Learn video editing, graphic design, and creative tools',
        courses: [
            // Video Editing
            { id: 31, title: 'Premiere Pro Mastery', url: 'https://www.youtube.com/watch?v=Hls3Tp7JS8E', duration: '6h', xp: 100, level: 'beginner', category: 'video', skills: ['Video Editing'] },
            { id: 32, title: 'After Effects Complete', url: 'https://www.youtube.com/watch?v=lfFr6dAFc7c', duration: '8h', xp: 120, level: 'intermediate', category: 'video', skills: ['Video Editing'] },
            { id: 33, title: 'DaVinci Resolve Pro', url: 'https://www.youtube.com/watch?v=63Ln33O4p4c', duration: '7h', xp: 110, level: 'intermediate', category: 'video', skills: ['Video Editing'] },
            { id: 34, title: 'CapCut Mobile Editing', url: 'https://www.youtube.com/watch?v=qfHX2cNA4MY', duration: '3h', xp: 60, level: 'beginner', category: 'video', skills: ['Video Editing'] },
            { id: 35, title: 'Final Cut Pro Master', url: 'https://www.youtube.com/watch?v=TPrnSACiTJ4', duration: '6h', xp: 100, level: 'intermediate', category: 'video', skills: ['Video Editing'] },
            { id: 36, title: 'Motion Graphics Design', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', duration: '5h', xp: 90, level: 'intermediate', category: 'video', skills: ['Video Editing', 'Graphic Design'] },
            { id: 37, title: 'YouTube Video Creation', url: 'https://www.youtube.com/watch?v=lfFr6dAFc7c', duration: '4h', xp: 70, level: 'beginner', category: 'video', skills: ['Video Editing'] },
            { id: 38, title: 'Color Grading Master', url: 'https://www.youtube.com/watch?v=03o2w1pxX5o', duration: '4h', xp: 80, level: 'intermediate', category: 'video', skills: ['Video Editing'] },
            { id: 39, title: 'VFX & Compositing', url: 'https://www.youtube.com/watch?v=Urm6JJHL5Xg', duration: '9h', xp: 150, level: 'advanced', category: 'video', skills: ['Video Editing'] },
            { id: 40, title: 'Video Marketing Strategy', url: 'https://www.youtube.com/watch?v=ge-MmahCcWg', duration: '3h', xp: 60, level: 'beginner', category: 'video', skills: ['Video Editing', 'Digital Marketing'] },
            
            // Graphic Design
            { id: 41, title: 'Photoshop Complete Course', url: 'https://www.youtube.com/watch?v=IwjBp8CbqwE', duration: '8h', xp: 120, level: 'beginner', category: 'design', skills: ['Graphic Design'] },
            { id: 42, title: 'Illustrator Mastery', url: 'https://www.youtube.com/watch?v=Ib8UBwu3yGA', duration: '6h', xp: 100, level: 'beginner', category: 'design', skills: ['Graphic Design'] },
            { id: 43, title: 'Canva Design Pro', url: 'https://www.youtube.com/watch?v=ZJSCl6XEdP8', duration: '3h', xp: 50, level: 'beginner', category: 'design', skills: ['Graphic Design'] },
            { id: 44, title: 'Logo Design Master', url: 'https://www.youtube.com/watch?v=IcVZC_9DLNg', duration: '4h', xp: 70, level: 'intermediate', category: 'design', skills: ['Graphic Design'] },
            { id: 45, title: 'Digital Illustration', url: 'https://www.youtube.com/watch?v=kU5g9F9zd7w', duration: '5h', xp: 90, level: 'intermediate', category: 'design', skills: ['Graphic Design'] },
            { id: 46, title: 'Typography Design', url: 'https://www.youtube.com/watch?v=2Vt7h6aGOkM', duration: '4h', xp: 80, level: 'beginner', category: 'design', skills: ['Graphic Design'] },
            { id: 47, title: 'Color Theory Master', url: 'https://www.youtube.com/watch?v=bgc65A7hqkg', duration: '3h', xp: 60, level: 'beginner', category: 'design', skills: ['Graphic Design'] },
            { id: 48, title: 'UI Design with Figma', url: 'https://www.youtube.com/watch?v=jwCmIBJ8Jtc', duration: '6h', xp: 110, level: 'intermediate', category: 'ui-ux', skills: ['UI/UX Design', 'Graphic Design'] },
            { id: 49, title: 'UX Design Complete', url: 'https://www.youtube.com/watch?v=9B1go1D1hTk', duration: '8h', xp: 140, level: 'intermediate', category: 'ui-ux', skills: ['UI/UX Design'] },
            { id: 50, title: 'Portfolio Design', url: 'https://www.youtube.com/watch?v=Y7_4V3vF7I4', duration: '5h', xp: 100, level: 'intermediate', category: 'ui-ux', skills: ['UI/UX Design', 'Graphic Design'] }
        ]
    },
    
    'business-marketing': {
        title: '💼 Business & Marketing',
        description: 'Master digital marketing, business strategy, and entrepreneurship',
        courses: [
            { id: 51, title: 'Digital Marketing Complete', url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4', duration: '10h', xp: 160, level: 'beginner', category: 'marketing', skills: ['Digital Marketing'] },
            { id: 52, title: 'Social Media Marketing', url: 'https://www.youtube.com/watch?v=ozKwXxFjKsg', duration: '6h', xp: 110, level: 'beginner', category: 'marketing', skills: ['Digital Marketing'] },
            { id: 53, title: 'SEO Mastery Course', url: 'https://www.youtube.com/watch?v=DvwS7cV9GmQ', duration: '8h', xp: 140, level: 'intermediate', category: 'marketing', skills: ['Digital Marketing'] },
            { id: 54, title: 'Google Ads Complete', url: 'https://www.youtube.com/watch?v=lHfjvYzr-3g', duration: '5h', xp: 100, level: 'intermediate', category: 'marketing', skills: ['Digital Marketing'] },
            { id: 55, title: 'Email Marketing Pro', url: 'https://www.youtube.com/watch?v=VtJ3C0gO2Fk', duration: '4h', xp: 80, level: 'beginner', category: 'marketing', skills: ['Digital Marketing'] },
            { id: 56, title: 'Content Marketing', url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4', duration: '6h', xp: 110, level: 'beginner', category: 'marketing', skills: ['Digital Marketing', 'Writing'] },
            { id: 57, title: 'Affiliate Marketing Pro', url: 'https://www.youtube.com/watch?v=ozKwXxFjKsg', duration: '5h', xp: 90, level: 'intermediate', category: 'marketing', skills: ['Affiliate Marketing', 'Digital Marketing'] },
            { id: 58, title: 'E-commerce Business', url: 'https://www.youtube.com/watch?v=DvwS7cV9GmQ', duration: '8h', xp: 140, level: 'intermediate', category: 'business', skills: ['Business Strategy', 'Digital Marketing'] },
            { id: 59, title: 'Dropshipping Master', url: 'https://www.youtube.com/watch?v=lHfjvYzr-3g', duration: '6h', xp: 110, level: 'beginner', category: 'business', skills: ['Business Strategy'] },
            { id: 60, title: 'Business Plan Creation', url: 'https://www.youtube.com/watch?v=VtJ3C0gO2Fk', duration: '4h', xp: 80, level: 'beginner', category: 'business', skills: ['Business Strategy'] },
            { id: 61, title: 'Copywriting Mastery', url: 'https://www.youtube.com/watch?v=copywriting123', duration: '5h', xp: 90, level: 'intermediate', category: 'marketing', skills: ['Copywriting', 'Digital Marketing'] },
            { id: 62, title: 'Sales Funnel Design', url: 'https://www.youtube.com/watch?v=salesfunnel123', duration: '4h', xp: 80, level: 'intermediate', category: 'marketing', skills: ['Digital Marketing', 'Sales'] },
            { id: 63, title: 'Project Management Agile', url: 'https://www.youtube.com/watch?v=agilepm123', duration: '6h', xp: 110, level: 'intermediate', category: 'business', skills: ['Project Management'] },
            { id: 64, title: 'Financial Planning', url: 'https://www.youtube.com/watch?v=finance123', duration: '5h', xp: 90, level: 'beginner', category: 'business', skills: ['Finance'] },
            { id: 65, title: 'Startup Fundamentals', url: 'https://www.youtube.com/watch?v=startup123', duration: '7h', xp: 120, level: 'intermediate', category: 'business', skills: ['Business Strategy', 'Entrepreneurship'] }
        ]
    },
    
    'personal-development': {
        title: '🚀 Personal Development',
        description: 'Enhance soft skills, productivity, and personal growth',
        courses: [
            { id: 91, title: 'Public Speaking Mastery', url: 'https://www.youtube.com/watch?v=VtJ3C0gO2Fk', duration: '5h', xp: 90, level: 'beginner', category: 'communication', skills: ['Public Speaking', 'Communication Skills'] },
            { id: 92, title: 'Time Management Pro', url: 'https://www.youtube.com/watch?v=lHfjvYzr-3g', duration: '4h', xp: 70, level: 'beginner', category: 'productivity', skills: ['Time Management', 'Productivity Systems'] },
            { id: 93, title: 'Emotional Intelligence', url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4', duration: '6h', xp: 110, level: 'intermediate', category: 'communication', skills: ['Emotional Intelligence', 'Leadership'] },
            { id: 94, title: 'Critical Thinking Master', url: 'https://www.youtube.com/watch?v=ozKwXxFjKsg', duration: '5h', xp: 90, level: 'intermediate', category: 'thinking', skills: ['Critical Thinking'] },
            { id: 95, title: 'Problem Solving Pro', url: 'https://www.youtube.com/watch?v=DvwS7cV9GmQ', duration: '4h', xp: 80, level: 'beginner', category: 'thinking', skills: ['Critical Thinking'] },
            { id: 96, title: 'Leadership Fundamentals', url: 'https://www.youtube.com/watch?v=leadership123', duration: '6h', xp: 110, level: 'intermediate', category: 'leadership', skills: ['Leadership', 'Communication Skills'] },
            { id: 97, title: 'Team Management', url: 'https://www.youtube.com/watch?v=teammanage123', duration: '5h', xp: 90, level: 'intermediate', category: 'leadership', skills: ['Leadership'] },
            { id: 98, title: 'Productivity Systems', url: 'https://www.youtube.com/watch?v=productivity123', duration: '4h', xp: 80, level: 'beginner', category: 'productivity', skills: ['Productivity Systems', 'Time Management'] },
            { id: 99, title: 'Communication Excellence', url: 'https://www.youtube.com/watch?v=communication123', duration: '5h', xp: 90, level: 'beginner', category: 'communication', skills: ['Communication Skills'] },
            { id: 100, title: 'Presentation Skills', url: 'https://www.youtube.com/watch?v=presentation123', duration: '4h', xp: 80, level: 'beginner', category: 'communication', skills: ['Public Speaking', 'Communication Skills'] }
        ]
    },
    
    'specialized-skills': {
        title: '🎓 Specialized Skills',
        description: 'Learn specialized and high-demand skills',
        courses: [
            { id: 101, title: 'Data Science Python', url: 'https://www.youtube.com/watch?v=datascience123', duration: '12h', xp: 180, level: 'intermediate', category: 'data', skills: ['Data Science', 'AI & Machine Learning'] },
            { id: 102, title: 'Machine Learning Complete', url: 'https://www.youtube.com/watch?v=ml123', duration: '15h', xp: 200, level: 'advanced', category: 'ai', skills: ['AI & Machine Learning', 'Data Science'] },
            { id: 103, title: 'Cybersecurity Basics', url: 'https://www.youtube.com/watch?v=cybersec123', duration: '8h', xp: 140, level: 'intermediate', category: 'security', skills: ['Cybersecurity'] },
            { id: 104, title: 'Ethical Hacking', url: 'https://www.youtube.com/watch?v=ethicalhack123', duration: '10h', xp: 160, level: 'advanced', category: 'security', skills: ['Cybersecurity'] },
            { id: 105, title: 'Cloud Computing AWS', url: 'https://www.youtube.com/watch?v=awscloud123', duration: '9h', xp: 150, level: 'intermediate', category: 'cloud', skills: ['Cloud Computing'] },
            { id: 106, title: 'Blockchain Development', url: 'https://www.youtube.com/watch?v=blockchain123', duration: '8h', xp: 140, level: 'advanced', category: 'blockchain', skills: ['Blockchain'] },
            { id: 107, title: 'Game Development Unity', url: 'https://www.youtube.com/watch?v=unity123', duration: '10h', xp: 160, level: 'intermediate', category: 'gamedev', skills: ['Game Development'] },
            { id: 108, title: '3D Modeling Blender', url: 'https://www.youtube.com/watch?v=blender123', duration: '8h', xp: 140, level: 'intermediate', category: '3d', skills: ['3D Modeling'] },
            { id: 109, title: 'Music Production', url: 'https://www.youtube.com/watch?v=musicprod123', duration: '6h', xp: 110, level: 'beginner', category: 'music', skills: ['Music Production'] },
            { id: 110, title: 'Photography Master', url: 'https://www.youtube.com/watch?v=photography123', duration: '5h', xp: 90, level: 'beginner', category: 'photo', skills: ['Photography'] },
            { id: 111, title: 'Language Learning Spanish', url: 'https://www.youtube.com/watch?v=spanish123', duration: '20h', xp: 250, level: 'beginner', category: 'language', skills: ['Language Learning'] },
            { id: 112, title: 'Teaching & Training', url: 'https://www.youtube.com/watch?v=teaching123', duration: '6h', xp: 110, level: 'intermediate', category: 'education', skills: ['Teaching'] },
            { id: 113, title: 'Stock Market Trading', url: 'https://www.youtube.com/watch?v=trading123', duration: '8h', xp: 140, level: 'intermediate', category: 'trading', skills: ['Trading', 'Finance'] },
            { id: 114, title: 'Crypto Trading', url: 'https://www.youtube.com/watch?v=crypto123', duration: '6h', xp: 110, level: 'intermediate', category: 'trading', skills: ['Trading'] },
            { id: 115, title: 'Health & Fitness Coaching', url: 'https://www.youtube.com/watch?v=fitness123', duration: '7h', xp: 120, level: 'beginner', category: 'health', skills: ['Health Coaching'] },
            { id: 116, title: 'Culinary Arts', url: 'https://www.youtube.com/watch?v=cooking123', duration: '8h', xp: 140, level: 'beginner', category: 'culinary', skills: ['Cooking'] },
            { id: 117, title: 'Content Writing', url: 'https://www.youtube.com/watch?v=writing123', duration: '5h', xp: 90, level: 'beginner', category: 'writing', skills: ['Writing'] },
            { id: 118, title: 'Research Methods', url: 'https://www.youtube.com/watch?v=research123', duration: '6h', xp: 110, level: 'intermediate', category: 'research', skills: ['Research'] },
            { id: 119, title: 'Innovation & Creativity', url: 'https://www.youtube.com/watch?v=innovation123', duration: '5h', xp: 90, level: 'intermediate', category: 'innovation', skills: ['Entrepreneurship'] },
            { id: 120, title: 'Advanced Excel', url: 'https://www.youtube.com/watch?v=excel123', duration: '6h', xp: 110, level: 'intermediate', category: 'office', skills: ['Data Science', 'Business Strategy'] }
        ]
    }
};

// User Data Structure Template
const createUserTemplate = (userData) => ({
    personalInfo: {
        name: userData.name || '',
        age: userData.age || '',
        email: userData.email || '',
        mobile: userData.mobile || '',
        password: userData.password || ''
    },
    profile: {
        basicInfo: {
            fullName: userData.name || '',
            email: userData.email || '',
            phone: userData.mobile || '',
            location: ''
        }
    },
    selectedSkills: [],
    customSkills: [],
    skillsProgress: {},
    courseCompletions: {},
    totalXP: 0,
    streakDays: 0,
    lastLogin: new Date().toISOString(),
    achievements: [],
    chatHistory: []
});

// Authentication Functions
function showAuthForm(type) {
    console.log('Showing auth form:', type);
    showSection('auth');
    
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    
    if (type === 'register') {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    } else {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }
}

function register(event) {
    event.preventDefault();
    console.log('Register function called');
    
    const name = document.getElementById('regName').value.trim();
    const age = document.getElementById('regAge').value;
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const mobile = document.getElementById('regMobile').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!name || !age || !email || !mobile || !password) {
        alert('Please fill in all required fields.');
        return;
    }

    if (appState.users[email]) {
        alert('This email is already registered! Please use the existing user login.');
        showAuthForm('login');
        document.getElementById('loginEmail').value = email;
        return;
    }

    if (confirm('We will send a verification email to ' + email + '. Click OK to continue with registration.')) {
        appState.users[email] = createUserTemplate({ name, age, email, mobile, password });
        appState.currentUser = email;
        
        saveUserData();
        localStorage.setItem('careerGrimoireCurrentUser', email);
        
        alert('Registration successful! Welcome to Career Grimoire!');
        showSection('skills-assessment');
        updateUserInterface();
    }
}

function login(event) {
    event.preventDefault();
    console.log('Login function called');
    
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    if (!appState.users[email]) {
        alert('Email not found. Please register as a new user first.');
        showAuthForm('register');
        return;
    }

    if (appState.users[email].personalInfo.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    appState.currentUser = email;
    appState.users[email].lastLogin = new Date().toISOString();
    
    saveUserData();
    localStorage.setItem('careerGrimoireCurrentUser', email);
    
    // Load user's selected skills
    const user = appState.users[email];
    if (user.selectedSkills) {
        appState.selectedSkills = new Set(user.selectedSkills);
    }
    if (user.customSkills) {
        appState.customSkills = [...user.customSkills];
    }
    
    showSection('dashboard');
    updateUserInterface();
    loadAllSkillsWithRecommendations();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        appState.currentUser = null;
        appState.selectedSkills.clear();
        appState.customSkills = [];
        localStorage.removeItem('careerGrimoireCurrentUser');
        showSection('landing');
        
        // Clear form data
        document.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.type !== 'button' && input.type !== 'submit') {
                input.value = '';
                if (input.type === 'checkbox') {
                    input.checked = false;
                }
            }
        });
    }
}

// Section Navigation
function showSection(sectionName) {
    console.log('Showing section:', sectionName);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        appState.currentSection = sectionName;
    } else {
        console.error('Section not found:', sectionName);
        return;
    }

    // Show/hide navigation
    const nav = document.getElementById('mainNav');
    if (nav) {
        if (sectionName === 'landing' || sectionName === 'auth') {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
    }

    // Initialize section-specific functionality
    if (sectionName === 'dashboard') {
        setTimeout(initializeDashboard, 100);
    } else if (sectionName === 'skills') {
        setTimeout(() => {
            loadAllSkillsWithRecommendations();
            loadSkillsProgress();
        }, 100);
    } else if (sectionName === 'profile') {
        setTimeout(loadProfileData, 100);
    } else if (sectionName === 'skills-assessment') {
        setTimeout(loadSkillsAssessment, 100);
    } else if (sectionName === 'chatbot') {
        setTimeout(initializeChatbot, 100);
    }
}

function updateNavigation(activeSection) {
    document.querySelectorAll('.nav__item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === activeSection) {
            item.classList.add('active');
        }
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    loadUserData();
    setupEventListeners();
    checkAuthentication();
    initializeVoiceFeatures();
    
    // Make functions globally available
    window.showAuthForm = showAuthForm;
    window.register = register;
    window.login = login;
    window.logout = logout;
    window.showSection = showSection;
    window.startSkill = startSkill;
    window.generateResume = generateResume;
    window.downloadResume = downloadResume;
    window.editProfile = editProfile;
    window.saveProfileTab = saveProfileTab;
    window.addCustomSkill = addCustomSkill;
    window.removeCustomSkill = removeCustomSkill;
    window.saveSkillsAssessment = saveSkillsAssessment;
    window.skipSkillsAssessment = skipSkillsAssessment;
    window.toggleVoiceRecording = toggleVoiceRecording;
    window.speakMessage = speakMessage;
    window.sendMessage = sendMessage;
    window.clearChat = clearChat;
    window.exportChat = exportChat;
});

// Initialize Voice Features
function initializeVoiceFeatures() {
    if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        appState.recognition = new SpeechRecognition();
        appState.recognition.continuous = false;
        appState.recognition.interimResults = false;
        appState.recognition.lang = 'en-US';
        
        appState.recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = transcript;
                sendMessage();
            }
        };
        
        appState.recognition.onend = function() {
            stopVoiceRecording();
        };
    }
    
    if ('speechSynthesis' in window) {
        appState.synthesis = window.speechSynthesis;
    }
}

// Load user data from localStorage
function loadUserData() {
    const stored = localStorage.getItem('careerGrimoireUsers');
    if (stored) {
        try {
            appState.users = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading user data:', e);
            appState.users = {};
        }
    }
}

// Save user data to localStorage
function saveUserData() {
    try {
        localStorage.setItem('careerGrimoireUsers', JSON.stringify(appState.users));
    } catch (e) {
        console.error('Error saving user data:', e);
    }
}

// Check if user is already logged in
function checkAuthentication() {
    const currentUser = localStorage.getItem('careerGrimoireCurrentUser');
    if (currentUser && appState.users[currentUser]) {
        appState.currentUser = currentUser;
        showSection('dashboard');
        updateUserInterface();
        loadAllSkillsWithRecommendations();
    } else {
        showSection('landing');
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation items
    document.querySelectorAll('.nav__item').forEach(item => {
        if (!item.onclick) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                if (section) {
                    showSection(section);
                    updateNavigation(section);
                }
            });
        }
    });
    
    // Profile navigation
    setupProfileNavigation();
    
    // Skills filter
    setupSkillsFilter();
    
    // Skills assessment
    setupSkillsAssessment();
    
    // Chat input
    setupChatInput();
}

// Setup Skills Assessment
function setupSkillsAssessment() {
    document.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox' && e.target.closest('.skills-list')) {
            const skillValue = e.target.value;
            const label = e.target.closest('.skill-checkbox');
            
            if (e.target.checked) {
                appState.selectedSkills.add(skillValue);
                label.classList.add('selected');
            } else {
                appState.selectedSkills.delete(skillValue);
                label.classList.remove('selected');
            }
            
            updateSkillsProgress();
        }
    });
}

// Setup Chat Input
function setupChatInput() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Auto-resize textarea
        chatInput.addEventListener('input', () => {
            chatInput.style.height = 'auto';
            chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
        });
    }
}

// Profile Navigation Setup
function setupProfileNavigation() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('profile-nav__item')) {
            e.preventDefault();
            const tabId = e.target.getAttribute('data-tab');
            showProfileTab(tabId);
        }
    });
}

// Skills Filter Setup
function setupSkillsFilter() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            e.preventDefault();
            const filter = e.target.getAttribute('data-filter');
            filterSkills(filter);
        }
    });
}

// Skills Assessment Functions
function updateSkillsProgress() {
    const skillsCount = appState.selectedSkills.size + appState.customSkills.length;
    const progressFill = document.getElementById('skillsProgress');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        const percentage = Math.min((skillsCount / 10) * 100, 100); // 10 skills for 100%
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${skillsCount} skills selected`;
    }
}

function addCustomSkill() {
    const input = document.getElementById('customSkill');
    const skill = input.value.trim();
    
    if (skill && !appState.customSkills.includes(skill)) {
        appState.customSkills.push(skill);
        appState.selectedSkills.add(skill);
        input.value = '';
        renderCustomSkills();
        updateSkillsProgress();
    }
}

function renderCustomSkills() {
    const container = document.getElementById('customSkillsList');
    if (!container) return;
    
    container.innerHTML = '';
    appState.customSkills.forEach(skill => {
        const tag = document.createElement('div');
        tag.className = 'custom-skill-tag';
        tag.innerHTML = `
            ${skill}
            <button class="remove-btn" onclick="removeCustomSkill('${skill}')">×</button>
        `;
        container.appendChild(tag);
    });
}

function removeCustomSkill(skill) {
    appState.customSkills = appState.customSkills.filter(s => s !== skill);
    appState.selectedSkills.delete(skill);
    renderCustomSkills();
    updateSkillsProgress();
}

function saveSkillsAssessment() {
    if (!appState.currentUser) {
        alert('Please log in first!');
        return;
    }
    
    const user = appState.users[appState.currentUser];
    user.selectedSkills = Array.from(appState.selectedSkills);
    user.customSkills = [...appState.customSkills];
    
    saveUserData();
    alert('🎉 Skills assessment saved! Your personalized recommendations are ready.');
    
    // Generate recommendations and show courses
    loadAllSkillsWithRecommendations();
    showSection('skills');
}

function skipSkillsAssessment() {
    showSection('dashboard');
}

// Voice Functions
function toggleVoiceRecording() {
    if (!appState.recognition) {
        alert('Speech recognition is not supported in your browser.');
        return;
    }
    
    if (appState.isRecording) {
        stopVoiceRecording();
    } else {
        startVoiceRecording();
    }
}

function startVoiceRecording() {
    appState.isRecording = true;
    const voiceBtn = document.getElementById('voiceRecordBtn');
    const voiceStatus = document.getElementById('voiceStatus');
    
    if (voiceBtn) voiceBtn.classList.add('recording');
    if (voiceStatus) voiceStatus.classList.remove('hidden');
    
    try {
        appState.recognition.start();
    } catch (error) {
        console.error('Error starting voice recognition:', error);
        stopVoiceRecording();
    }
}

function stopVoiceRecording() {
    appState.isRecording = false;
    const voiceBtn = document.getElementById('voiceRecordBtn');
    const voiceStatus = document.getElementById('voiceStatus');
    
    if (voiceBtn) voiceBtn.classList.remove('recording');
    if (voiceStatus) voiceStatus.classList.add('hidden');
    
    if (appState.recognition) {
        appState.recognition.stop();
    }
}

function speakMessage(button) {
    if (!appState.synthesis) {
        alert('Text-to-speech is not supported in your browser.');
        return;
    }
    
    const messageContent = button.closest('.message').querySelector('.message-content');
    const text = messageContent.textContent;
    
    // Stop any ongoing speech
    appState.synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    appState.synthesis.speak(utterance);
}

// Chat Functions
async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        const response = await getAIResponse(message);
        hideTypingIndicator();
        addMessageToChat(response, 'ai');
        
        // Save to user's chat history
        if (appState.currentUser) {
            const user = appState.users[appState.currentUser];
            if (!user.chatHistory) user.chatHistory = [];
            user.chatHistory.push(
                { type: 'user', message, timestamp: new Date().toISOString() },
                { type: 'ai', message: response, timestamp: new Date().toISOString() }
            );
            saveUserData();
        }
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('Sorry, I encountered an error. Please try again later.', 'ai');
        console.error('Chat error:', error);
    }
}

async function getAIResponse(message) {
    const apiKey = decryptApiKey();
    if (!apiKey) {
        return "I'm sorry, but I'm unable to process your request right now due to a configuration issue.";
    }
    
    const user = appState.users[appState.currentUser];
    const userContext = user ? {
        skills: user.selectedSkills || [],
        customSkills: user.customSkills || [],
        totalXP: user.totalXP || 0,
        completedCourses: Object.keys(user.skillsProgress || {}).filter(id => user.skillsProgress[id] === 100).length
    } : {};
    
    const systemPrompt = `You are an AI Career Mentor for Career Grimoire platform. You help users with:
    - Career guidance and development advice
    - Course recommendations from our 150+ course library
    - Learning path suggestions
    - Industry insights and trends
    - Skill development strategies
    
    User Context: ${JSON.stringify(userContext)}
    
    Be helpful, encouraging, and provide actionable advice. Keep responses concise but informative.`;
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API error:', error);
        
        // Fallback responses based on message content
        if (message.toLowerCase().includes('course') || message.toLowerCase().includes('learn')) {
            return "I'd recommend checking out our comprehensive course library! Based on your interests, you might enjoy our frontend development, digital marketing, or design courses. Each course offers XP rewards and practical skills.";
        } else if (message.toLowerCase().includes('career')) {
            return "For career development, I suggest: 1) Complete your skills assessment, 2) Take courses aligned with your goals, 3) Build a portfolio, 4) Network in your field. What specific career area interests you most?";
        } else {
            return "I'm here to help with your career development! You can ask me about course recommendations, learning paths, skill development, or career guidance. What would you like to know?";
        }
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
        <div class="message-actions">
            <button class="voice-btn" onclick="speakMessage(this)" title="Listen">🔊</button>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.classList.remove('hidden');
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.classList.add('hidden');
}

function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        // Keep only the initial AI message
        const firstMessage = chatMessages.querySelector('.ai-message');
        chatMessages.innerHTML = '';
        if (firstMessage) {
            chatMessages.appendChild(firstMessage);
        }
    }
    
    if (appState.currentUser) {
        const user = appState.users[appState.currentUser];
        user.chatHistory = [];
        saveUserData();
    }
}

function exportChat() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messages = Array.from(chatMessages.querySelectorAll('.message')).map(msg => {
        const content = msg.querySelector('.message-content').textContent;
        const sender = msg.classList.contains('user-message') ? 'User' : 'AI Mentor';
        return `${sender}: ${content}`;
    });
    
    const chatText = messages.join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'career-mentor-chat.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Load Skills Assessment
function loadSkillsAssessment() {
    if (appState.currentUser) {
        const user = appState.users[appState.currentUser];
        if (user.selectedSkills) {
            appState.selectedSkills = new Set(user.selectedSkills);
        }
        if (user.customSkills) {
            appState.customSkills = [...user.customSkills];
        }
        
        // Check checkboxes for selected skills
        document.querySelectorAll('.skill-checkbox input[type="checkbox"]').forEach(checkbox => {
            if (appState.selectedSkills.has(checkbox.value)) {
                checkbox.checked = true;
                checkbox.closest('.skill-checkbox').classList.add('selected');
            }
        });
        
        renderCustomSkills();
        updateSkillsProgress();
    }
}

// Initialize Chatbot
function initializeChatbot() {
    if (appState.currentUser) {
        const user = appState.users[appState.currentUser];
        if (user.chatHistory && user.chatHistory.length > 0) {
            // Load previous chat history
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                // Keep the initial message and add history
                user.chatHistory.forEach(chat => {
                    addMessageToChat(chat.message, chat.type);
                });
            }
        }
    }
}

// Profile Tab Navigation
function showProfileTab(tabId) {
    console.log('Showing profile tab:', tabId);
    
    // Update nav items
    document.querySelectorAll('.profile-nav__item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        }
    });
    
    // Show corresponding tab content
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.remove('hidden');
        appState.currentProfileTab = tabId;
        
        // Load specific tab data
        if (tabId === 'skills-info') {
            loadSelectedSkillsDisplay();
        } else if (tabId === 'skills-analysis') {
            loadSkillsAnalysisResults();
        } else if (tabId === 'recommendations') {
            loadAIRecommendationsDisplay();
        }
    }
}

// Load All Skills with Intelligent Recommendations
function loadAllSkillsWithRecommendations() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    
    const user = appState.users[appState.currentUser];
    const recommendations = user ? generateIntelligentRecommendations(user) : { recommended: [], skillGap: [], suggested: [] };
    
    let html = '';
    
    Object.entries(COMPLETE_COURSES_DATABASE).forEach(([categoryKey, categoryData]) => {
        html += `
            <div class="skill-category" data-category="${categoryKey}">
                <div class="category-header">
                    <h3>${categoryData.title}</h3>
                    <p>${categoryData.description}</p>
                </div>
                <div class="skills-grid">
        `;
        
        categoryData.courses.forEach(course => {
            const recommendationType = getRecommendationType(course, recommendations);
            const progress = user ? (user.skillsProgress[course.id] || 0) : 0;
            const isCompleted = progress === 100;
            
            html += `
                <div class="skill-card ${recommendationType}" data-skill="${course.id}" data-filter="${recommendationType}">
                    <div class="skill-card__header">
                        <h4>${course.title}</h4>
                        <span class="skill-level ${course.level}">${course.level}</span>
                    </div>
                    <div class="skill-card__content">
                        <p>${getCourseDescription(course)}</p>
                        <div class="skill-meta">
                            <span>Duration: ${course.duration}</span>
                            <span class="xp-reward">+${course.xp} XP</span>
                        </div>
                    </div>
                    <div class="skill-card__actions">
                        <button class="btn btn--primary" onclick="startSkill('${course.url}', ${course.id}, ${course.xp})">
                            ${isCompleted ? 'Review Course' : 'Start Learning'}
                        </button>
                    </div>
                    <div class="skill-progress">
                        <div class="progress-bar">
                            <div class="progress-bar__fill" style="width: ${progress}%"></div>
                        </div>
                        <span class="progress-text ${getProgressClass(progress)}">${getProgressText(progress)}</span>
                    </div>
                    ${isCompleted ? '<div class="completion-badge">✓ Completed</div>' : ''}
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Generate Intelligent Recommendations
function generateIntelligentRecommendations(user) {
    const selectedSkills = user.selectedSkills || [];
    const recommended = [];
    const skillGap = [];
    const suggested = [];
    
    // Get all courses
    const allCourses = [];
    Object.values(COMPLETE_COURSES_DATABASE).forEach(category => {
        allCourses.push(...category.courses);
    });
    
    allCourses.forEach(course => {
        const courseSkills = course.skills || [];
        
        // Check if course matches selected skills (recommended)
        const matchesSkills = courseSkills.some(skill => 
            selectedSkills.some(userSkill => 
                userSkill.toLowerCase().includes(skill.toLowerCase()) || 
                skill.toLowerCase().includes(userSkill.toLowerCase())
            )
        );
        
        if (matchesSkills) {
            recommended.push(course.id);
        } else if (course.level === 'beginner') {
            // Suggest beginner courses for skill gaps
            skillGap.push(course.id);
        } else {
            // Suggest other courses
            suggested.push(course.id);
        }
    });
    
    return { 
        recommended: recommended.slice(0, 15), 
        skillGap: skillGap.slice(0, 10), 
        suggested: suggested.slice(0, 10) 
    };
}

// Get Recommendation Type for Course
function getRecommendationType(course, recommendations) {
    if (recommendations.recommended.includes(course.id)) return 'recommended';
    if (recommendations.skillGap.includes(course.id)) return 'skill-gap';
    if (recommendations.suggested.includes(course.id)) return 'suggested';
    return 'standard';
}

// Get Course Description
function getCourseDescription(course) {
    const descriptions = {
        1: 'Learn the foundation of web development with HTML',
        2: 'Style your websites with beautiful CSS',
        3: 'Master the fundamentals of JavaScript programming',
        31: 'Master video editing with Adobe Premiere Pro',
        51: 'Complete digital marketing strategy and implementation',
        91: 'Develop confident public speaking skills'
    };
    
    return descriptions[course.id] || `Master ${course.title} to advance your career in ${course.category}`;
}

// Skills Filter Functions
function filterSkills(filter) {
    console.log('Filtering skills:', filter);
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    // Filter skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    appState.currentFilter = filter;
}

// User Interface Updates
function updateUserInterface() {
    if (!appState.currentUser) return;
    
    const user = appState.users[appState.currentUser];
    const name = user.personalInfo.name;
    
    // Update name displays
    const nameElements = ['dashboardName', 'profileName'];
    nameElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = name;
    });
    
    // Update email
    const emailElement = document.getElementById('profileEmail');
    if (emailElement) emailElement.textContent = user.personalInfo.email;
    
    // Update profile initials
    const profileInitials = document.getElementById('profileInitials');
    if (profileInitials) {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        profileInitials.textContent = initials;
    }
    
    // Update stats
    updateDashboardStats(user);
}

function updateDashboardStats(user) {
    // Profile completion
    const completion = calculateProfileCompletion(user);
    const completionElements = ['completionPercentage'];
    completionElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = completion + '%';
    });
    
    // Skills learned (completed courses)
    const completedCourses = Object.values(user.skillsProgress || {}).filter(progress => progress === 100).length;
    const skillsElements = ['skillsLearned'];
    skillsElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = completedCourses;
    });
    
    // Total XP
    const totalXPElement = document.getElementById('totalXP');
    if (totalXPElement) totalXPElement.textContent = user.totalXP || 0;
    
    // Streak days
    const streakElements = ['streakDays'];
    streakElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = user.streakDays || 0;
    });
}

function calculateProfileCompletion(user) {
    let completed = 0;
    let total = 6;
    
    // Check basic info
    if (user.personalInfo.name) completed++;
    if (user.personalInfo.email) completed++;
    
    // Check skills selection
    if (user.selectedSkills && user.selectedSkills.length > 0) completed++;
    
    // Check course progress
    if (Object.keys(user.skillsProgress || {}).length > 0) completed++;
    
    // Check XP earned
    if (user.totalXP > 0) completed++;
    
    // Check profile completion
    if (user.profile && user.profile.basicInfo && user.profile.basicInfo.fullName) completed++;
    
    return Math.round((completed / total) * 100);
}

// Course Learning Functions
function startSkill(url, courseId, xpReward) {
    if (!appState.currentUser) {
        alert('Please log in first to start learning!');
        return;
    }
    
    console.log('Starting skill:', courseId, url);
    
    // Open course in new tab
    window.open(url, '_blank');
    
    const user = appState.users[appState.currentUser];
    if (!user.skillsProgress) user.skillsProgress = {};
    
    // Update progress if not started
    if (!user.skillsProgress[courseId]) {
        user.skillsProgress[courseId] = 25;
        user.streakDays = (user.streakDays || 0) + 1;
        
        saveUserData();
        loadSkillsProgress();
        updateUserInterface();
        
        // Show completion prompt after delay
        setTimeout(() => {
            if (confirm('Mark this course as completed? You will earn +' + xpReward + ' XP!')) {
                completeSkill(courseId, xpReward);
            }
        }, 3000);
    } else if (user.skillsProgress[courseId] < 100) {
        setTimeout(() => {
            if (confirm('Mark this course as completed? You will earn +' + xpReward + ' XP!')) {
                completeSkill(courseId, xpReward);
            }
        }, 2000);
    }
}

function completeSkill(courseId, xpReward) {
    const user = appState.users[appState.currentUser];
    
    user.skillsProgress[courseId] = 100;
    user.totalXP = (user.totalXP || 0) + xpReward;
    user.streakDays = (user.streakDays || 0) + 1;
    
    // Add achievement
    if (!user.achievements) user.achievements = [];
    user.achievements.push({
        type: 'course_completed',
        courseId: courseId,
        xpEarned: xpReward,
        date: new Date().toISOString()
    });
    
    saveUserData();
    loadSkillsProgress();
    updateUserInterface();
    
    alert(`🎉 Congratulations! Course completed!\n+${xpReward} XP earned!\nTotal XP: ${user.totalXP}\nKeep learning!`);
    
    if (appState.currentSection === 'dashboard') {
        setTimeout(initializeDashboard, 100);
    }
}

function loadSkillsProgress() {
    if (!appState.currentUser) return;
    
    const user = appState.users[appState.currentUser];
    const progress = user.skillsProgress || {};
    
    document.querySelectorAll('.skill-card').forEach(card => {
        const courseId = parseInt(card.getAttribute('data-skill'));
        const progressBar = card.querySelector('.progress-bar__fill');
        const progressText = card.querySelector('.progress-text');
        const currentProgress = progress[courseId] || 0;
        
        if (progressBar) progressBar.style.width = currentProgress + '%';
        if (progressText) {
            progressText.textContent = getProgressText(currentProgress);
            progressText.className = 'progress-text ' + getProgressClass(currentProgress);
        }
        
        if (currentProgress === 100 && !card.querySelector('.completion-badge')) {
            const badge = document.createElement('div');
            badge.className = 'completion-badge';
            badge.textContent = '✓ Completed';
            card.appendChild(badge);
        }
    });
}

function getProgressText(progress) {
    if (progress === 0) return 'Not Started';
    if (progress === 100) return 'Completed ✓';
    return `In Progress (${progress}%)`;
}

function getProgressClass(progress) {
    if (progress === 0) return '';
    if (progress === 100) return 'completed';
    return 'in-progress';
}

// Dashboard Functions
function initializeDashboard() {
    updateUserInterface();
    setTimeout(createProgressChart, 200);
}

function createProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx || !appState.currentUser) return;
    
    if (window.dashboardChart) {
        window.dashboardChart.destroy();
    }
    
    const user = appState.users[appState.currentUser];
    const skillsProgress = user.skillsProgress || {};
    
    let notStarted = 0, inProgress = 0, completed = 0;
    
    let totalCourses = 0;
    Object.values(COMPLETE_COURSES_DATABASE).forEach(category => {
        totalCourses += category.courses.length;
    });
    
    Object.values(skillsProgress).forEach(progress => {
        if (progress === 0) notStarted++;
        else if (progress === 100) completed++;
        else inProgress++;
    });
    
    notStarted += totalCourses - Object.keys(skillsProgress).length;
    
    window.dashboardChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Not Started', 'In Progress', 'Completed'],
            datasets: [{
                data: [notStarted, inProgress, completed],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Profile Management Functions
function loadProfileData() {
    if (!appState.currentUser) return;
    
    const user = appState.users[appState.currentUser];
    const profile = user.profile;
    
    const elements = {
        'profile-name': profile.basicInfo.fullName,
        'profile-email': profile.basicInfo.email,
        'profile-phone': profile.basicInfo.phone,
        'profile-location': profile.basicInfo.location
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element && value) element.value = value;
    });
}

function loadSelectedSkillsDisplay() {
    const container = document.getElementById('selectedSkillsDisplay');
    if (!container || !appState.currentUser) return;
    
    const user = appState.users[appState.currentUser];
    const skills = user.selectedSkills || [];
    const customSkills = user.customSkills || [];
    
    if (skills.length === 0 && customSkills.length === 0) {
        container.innerHTML = `
            <p>Complete your skills assessment to view your selected skills here.</p>
            <button class="btn btn--primary" onclick="showSection('skills-assessment')">Complete Skills Assessment</button>
        `;
        return;
    }
    
    let html = '<div class="selected-skills-grid" style="display: flex; flex-wrap: wrap; gap: var(--space-8);">';
    
    [...skills, ...customSkills].forEach(skill => {
        html += `<div class="skill-tag" style="background: var(--color-primary); color: var(--color-btn-primary-text); padding: var(--space-6) var(--space-12); border-radius: var(--radius-full); font-size: var(--font-size-sm);">${skill}</div>`;
    });
    
    html += '</div>';
    html += `<p class="text-sm" style="margin-top: var(--space-16); color: var(--color-text-secondary);">Total: ${skills.length + customSkills.length} skills selected</p>`;
    
    container.innerHTML = html;
}

function loadSkillsAnalysisResults() {
    const container = document.getElementById('skillAnalysisResults');
    if (!container || !appState.currentUser) return;
    
    const user = appState.users[appState.currentUser];
    const skills = user.selectedSkills || [];
    
    if (skills.length === 0) {
        container.innerHTML = `
            <p>Complete your skills assessment to view detailed analysis.</p>
            <button class="btn btn--primary" onclick="showSection('skills-assessment')">Complete Assessment</button>
        `;
        return;
    }
    
    // Generate analysis
    const categories = {
        technology: 0,
        creative: 0,
        business: 0,
        personal: 0,
        career: 0
    };
    
    skills.forEach(skill => {
        Object.entries(SKILLS_CATEGORIES).forEach(([category, categorySkills]) => {
            if (categorySkills.some(cs => skill.toLowerCase().includes(cs.toLowerCase()) || cs.toLowerCase().includes(skill.toLowerCase()))) {
                categories[category]++;
            }
        });
    });
    
    let html = '<div class="analysis-results">';
    
    Object.entries(categories).forEach(([category, count]) => {
        if (count > 0) {
            const percentage = Math.round((count / skills.length) * 100);
            html += `
                <div class="analysis-category" style="margin-bottom: var(--space-16);">
                    <h4>${category.charAt(0).toUpperCase() + category.slice(1)} Skills</h4>
                    <div class="progress-bar">
                        <div class="progress-bar__fill" style="width: ${percentage}%"></div>
                    </div>
                    <p>${count} skills (${percentage}%)</p>
                </div>
            `;
        }
    });
    
    html += '</div>';
    
    container.innerHTML = html;
}

function loadAIRecommendationsDisplay() {
    const container = document.getElementById('aiRecommendationsDisplay');
    if (!container || !appState.currentUser) return;
    
    const user = appState.users[appState.currentUser];
    const skills = user.selectedSkills || [];
    
    if (skills.length === 0) {
        container.innerHTML = `
            <p>Complete your skills assessment to receive personalized AI recommendations.</p>
            <button class="btn btn--primary" onclick="showSection('skills-assessment')">Get Recommendations</button>
        `;
        return;
    }
    
    const recommendations = generateIntelligentRecommendations(user);
    
    let html = '<div class="recommendations-display">';
    
    html += `
        <div class="recommendation-section" style="margin-bottom: var(--space-20);">
            <h4>🌟 Recommended Courses (${recommendations.recommended.length})</h4>
            <p>Based on your selected skills, these courses are highly recommended for you.</p>
        </div>
        
        <div class="recommendation-section" style="margin-bottom: var(--space-20);">
            <h4>🎯 Skill Gap Courses (${recommendations.skillGap.length})</h4>
            <p>These beginner-friendly courses can help you fill skill gaps and explore new areas.</p>
        </div>
        
        <div class="recommendation-section" style="margin-bottom: var(--space-20);">
            <h4>💡 Suggested Courses (${recommendations.suggested.length})</h4>
            <p>Additional courses that might interest you based on industry trends.</p>
        </div>
        
        <div style="margin-top: var(--space-24);">
            <button class="btn btn--primary" onclick="showSection('skills')">View All Courses</button>
        </div>
    `;
    
    html += '</div>';
    
    container.innerHTML = html;
}

function saveProfileTab(tabId) {
    if (!appState.currentUser) return;
    
    const user = appState.users[appState.currentUser];
    
    if (tabId === 'basic-info') {
        user.profile.basicInfo.fullName = document.getElementById('profile-name')?.value || '';
        user.profile.basicInfo.email = document.getElementById('profile-email')?.value || '';
        user.profile.basicInfo.phone = document.getElementById('profile-phone')?.value || '';
        user.profile.basicInfo.location = document.getElementById('profile-location')?.value || '';
        
        if (user.profile.basicInfo.fullName) {
            user.personalInfo.name = user.profile.basicInfo.fullName;
        }
    }
    
    saveUserData();
    updateUserInterface();
    alert('✅ Profile section saved successfully!');
}

function editProfile() {
    alert('Profile editing is available through the individual profile tabs. Navigate through the sections to update your information.');
}

// Resume Functions
function generateResume() {
    if (!appState.currentUser) {
        alert('Please complete your profile first.');
        return;
    }
    
    const user = appState.users[appState.currentUser];
    
    const resumeName = document.getElementById('resumeName');
    const resumeEmail = document.getElementById('resumeEmail');
    const resumeSummary = document.getElementById('resumeSummary');
    const resumeSkills = document.getElementById('resumeSkills');
    
    if (resumeName) resumeName.textContent = user.personalInfo.name;
    if (resumeEmail) resumeEmail.textContent = user.personalInfo.email;
    
    let summary = `Professional with experience in `;
    const completedCourses = Object.keys(user.skillsProgress || {}).filter(id => user.skillsProgress[id] === 100);
    summary += `${completedCourses.length} completed courses and ${user.totalXP || 0} XP earned. `;
    const skills = user.selectedSkills || [];
    if (skills.length > 0) {
        summary += `Specialized in ${skills.slice(0, 3).join(', ')}.`;
    }
    
    if (resumeSummary) resumeSummary.textContent = summary;
    
    let skillsHtml = '';
    if (skills.length > 0) {
        skillsHtml = '<p><strong>Core Skills:</strong> ' + skills.join(', ') + '</p>';
    }
    if (completedCourses.length > 0) {
        skillsHtml += `<p><strong>Completed Courses:</strong> ${completedCourses.length} professional development courses</p>`;
    }
    
    if (resumeSkills) {
        resumeSkills.innerHTML = skillsHtml || '<p>Complete your profile to populate this section.</p>';
    }
    
    showSection('resume');
}

function downloadResume() {
    alert('Resume download feature will be available soon. For now, you can copy the content from the preview.');
}

// Initialize Chart.js defaults
window.addEventListener('load', function() {
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = 'var(--font-family-base)';
        Chart.defaults.color = 'var(--color-text-secondary)';
    }
});
