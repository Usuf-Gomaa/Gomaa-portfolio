// Theme and Language Management
let currentLang = localStorage.getItem('language') || 'ar';
let currentTheme = localStorage.getItem('theme') || 'dark';

document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLang);
    setTheme(currentTheme);
    addEventListeners();
    initAnimations();
});

// Add all event listeners
function addEventListeners() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skillType = this.getAttribute('data-skill');
            navigateToSection(skillType);
        });
    });
}

// Language Toggle
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(currentLang);
}

// Set Language
function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('language', lang);

    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = lang === 'ar' ? 'EN' : 'AR';
    }

    // Update all translatable text
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Refresh content if a skill section is active
    const detailSection = document.getElementById('skillDetail');
    if (detailSection && detailSection.classList.contains('active')) {
        const skillType = detailSection.getAttribute('data-active-skill');
        if (skillType) {
            detailSection.innerHTML = getSkillContent(skillType);
        }
    }
}

// Theme Toggle
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
}
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}
// Navigation to skill sections
function navigateToSection(skillType) {
    const mainContent = document.getElementById('skillsSection');
    const heroSection = document.getElementById('heroSection');
    const detailSection = document.getElementById('skillDetail');
    
    if (mainContent) mainContent.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    
    if (detailSection) {
        detailSection.classList.remove('hidden');
        detailSection.classList.add('active');
        detailSection.setAttribute('data-active-skill', skillType); // Store active skill type
        
        detailSection.innerHTML = getSkillContent(skillType);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back navigation
function goBack() {
    const mainContent = document.getElementById('skillsSection');
    const heroSection = document.getElementById('heroSection');
    const detailSection = document.getElementById('skillDetail');
    
    if (mainContent) mainContent.style.display = 'block';
    if (heroSection) heroSection.style.display = 'flex';
    
    if (detailSection) {
        detailSection.classList.add('hidden');
        detailSection.classList.remove('active');
        detailSection.removeAttribute('data-active-skill');
    }
    
    if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth' });
    }
}


// Get skill content based on type
function getSkillContent(skillType) {
    const contents = {
        embedded: {
            ar: {
                title: 'الأنظمة المدمجة والروبوتات',
                description: 'خبرة واسعة في مجال الأنظمة المدمجة والروبوتات من خلال مشاريع متعددة ودورات تدريبية متخصصة',
                experience: [
                    {
                        title: 'منحة ITI',
                        description: `
خلال الفترة من 15-07-2023 إلى 15-09-2023 التحقت ببرنامج تدريبي مكثف في Embedded Systems ضمن منحة ITI، واستمر التدريب لمدة شهرين، حيث شمل المحتوى التدريبي: 
C Programming
Embedded Systems Concepts
Microcontroller Interfacing
Communication Protocols
RTOS
Automotive Bus Technology
Embedded Systems Testing
Introduction to Tooling
Project Defense

مشروع التخرج:
مشروع التخرج كان عبارة عن خزنة إلكترونية (Electronic Safe) باستخدام ATmega32 Microcontroller بخصائص أمان عالية، وتم تنفيذه على برنامج Proteus كـ Simulation.
كانت مسؤوليتي الرئيسية في المشروع هي:
تطوير وتنفيذ جزء Interface الخاص بالنظام.
كتابة الـ Drivers اللازمة للتشغيل والتحكم.
هذه التجربة ساعدتني على الجمع بين الجانب النظري والتطبيقي، وأعطتني رؤية أوضح عن كيفية تصميم وتنفيذ حلول واقعية باستخدام تقنيات الـ Embedded Systems.`,
                    },
                    {
                        title: 'تدريب شركة بيدو',
                        description: `
منحة شركة بيدو هي منحة ممولة من جامعة أريزونا بالولايات المتحدة الأمريكية، 
وقد تمت في مصنع بيدو المتخصص في تصنيع أدوات التدريب والمتحكمات 
المستخدمة في المعامل والشركات كأجهزة محاكاة. 
كان محور المنحة الأساسي في مجال الروبوتات والأنظمة المدمجة (Embedded Systems)، 
ولكننا تطرقنا أيضًا لتعزيز فهم بعض مبادئ الأتمتة (Automation) والـ PLC، 
مما جعل التجربة غنية بالمعرفة ومتنوعة الجوانب.
`,
                        image: 'img/beedo.jpeg'
                    },
                    {
                        title: 'مسؤولية Software Head في Luminous',
                        description: `
خلال فترة عملي في النشاط الطلابي "Luminous" حيث كنت Software Head، 
قمت بتقسيم اللجنة إلى ثلاث لجان رئيسية: 
1- Basic Programming with C 
2- Embedded 
3- AI 
وضعت خارطة طريق (Roadmap) لكل تراك طوال فترة تولي المنصب، 
ونظمت تدريبات داخلية وخارجية في كل مجال. 
كما قمت بشرح كورس كامل في لغة C 
بدأ من الأساسيات وصولاً إلى مفاهيم متقدمة مرتبطة بالذاكرة (Memory). 
المحتوى شمل: 
1- Intro & Basics  
2- Loops & Compilation  
3- Array  
4- Function  
5- Struct / Union / Enum  
6- Preprocessing Directives  
7- Pointer  
كانت هذه من أكثر الفترات المميزة في حياتي، 
لأنني شعرت أنني تركت أثرًا حقيقيًا أفاد الكثير من الطلاب، 
وكل ذلك تم بشكل مجاني.
`,
                        image: 'img/c_course.jpeg'
                    },
                    {
                        title: 'دورة Learn in Depth',
                        description: `حاليًا أدرس دورة متقدمة في الأنظمة المدمجة (Embedded Systems) مع Learn In Depth، بهدف التعمق أكثر في المفاهيم المتقدمة والوصول إلى مستوى احترافي في:
CAN & LIN Protocols في مجال الـ Embedded Systems.
التعامل مع ARM-based Microcontrollers.
هذه الدراسة تمنحني أساسًا أقوى لفهم التقنيات الحديثة وتطبيقها عمليًا في تصميم أنظمة أكثر تعقيدًا وكفاءة.`,
                    },
                    {
                        title: 'ROS مع Kronton',
                        description: `
خبرتي في مجال الـ ROS ما زالت قيد التطوير 
لمواكبة معايير سوق العمل في هذه التقنية المتقدمة. 
أعمل حاليًا على دراسة هذا المجال 
من خلال كورس مخصص يهدف إلى بناء أساس قوي 
وفهم عميق يمكنني من تطبيقه عمليًا في مشاريع مستقبلية.
`,
                    }
                ],
                projects: [
                    {
                        title: 'Smart Home with Arduino',
                        description: `
قمنا بتطوير نظام ذكي متكامل للمنزل (Smart Home System)، 
يعتمد على أحدث التقنيات مثل: 
- مستشعرَي IR 
- شاشة LCD مع I2C Module 
- نظام كشف حرائق مزود بإنذار وضوء أحمر وصفارة تنبيه 
- مستشعر حرارة DHT11 للتحكم في المناخ 
- نظام إضاءة ذكي يعتمد على كشف الضوء 
- آلية أمان بكلمة مرور مع 3 محاولات فقط للوصول 
كان دوري قيادة المشروع والإشراف على جوانب السوفتوير والهاردوير، 
من الفكرة وحتى التنفيذ، لضمان تحقيق أعلى معايير الجودة والابتكار.
`,
                        video: "vid/البيت الذكي .mp4"
                        
                    },
                    {
                        title: 'Smart Green House with IoT',
                        description: `
مشروع Green Tech Hub – أول مشروع IoT أعمل عليه. 
نموذج صغير لبيت زراعي ذكي (Greenhouse) 
باستخدام تقنيات الـ IoT والـ Embedded Systems مع ESP32. 
المشروع يهدف إلى أتمتة ورقمنة العناية بالنباتات 
من خلال المراقبة اللحظية والتحكم الذكي لزيادة الكفاءة والاستدامة.  
أبرز المزايا:
- استشعار جفاف التربة والأمطار للتحكم التلقائي في النوافذ.  
- مستشعرات حرارة ولهب مع إنذار وصفارة أمان.  
- مضخة مياه أوتوماتيكية للري بدقة.  
- مراقبة مباشرة عبر لوحة تحكم ويب (Web Dashboard).  
دوري في المشروع كان كـ Project Leader: 
قيادة وتخطيط المشروع، تصميم وتوصيل الدوائر، 
المشاركة في تطوير السوفتوير، 
وتكامل الـ IoT لمتابعة البيانات في الزمن الحقيقي.
`,
                        video: "vid/Agre_Tech.mp4"
                    },
                    {
                        title: 'Dual Mode RC Car',
                        description: `
مشروع RC Car ذكية تم تطويرها بعدة أوضاع تشغيل مستقلة. 
قمت بالعمل على الجانب البرمجي (Software) لتطبيق أكثر من وضع:  
- وضع القيادة الذاتية باستخدام مستشعرات IR لتفادي العوائق.  
- وضع التحكم عبر ذراع آلي (ARM Robot).  
- وضع التحكم عن بُعد باستخدام البلوتوث (Bluetooth Control).  
هذا المشروع ساعدني على الدمج بين تقنيات التحكم المختلفة 
وبناء نظام متعدد الأنماط في التشغيل.
`,
                        image: 'img/rc_car.jpg'
                    },
                    {
                        title: 'Aquaponic System',
                        description: `
مشروع Aquaponics System لدمج تقنيات الزراعة المائية وتربية الأسماك 
مع أنظمة ذكية قائمة على الـ Embedded Systems والـ IoT. 
كنت المدير والمسؤول عن ربط الجانب الهاردوير بالأنظمة الذكية، 
وشمل دوري:  
- تصميم دوائر الهاردوير.  
- تصميم دوائر الـ Classic Control.  
- تطوير لوحة تحكم (Dashboard) لاستقبال البيانات وعرضها.  
- ربط كود الـ Dashboard مع وحدة ESP للتحكم ونقل البيانات.  
المشروع عزز خبرتي في الدمج بين الهاردوير والـ IoT 
لبناء نظام متكامل وفعال.
`,
                        image: 'img/aquabonic2.jpg'
                    }
                ],
    //              projects_videos: [
    // {
    //     title: 'نظام المنزل الذكي',
    //     description: 'مشروع يعتمد على إنترنت الأشياء للتحكم الذكي في الأجهزة باستخدام الأنظمة المدمجة وأجهزة الاستشعار.',
    //     video: "/vid/البيت الذكي .mp4"
    // },
    // {
    //     title: 'مشروع الزراعة الذكية ',
    //     description: 'نظام أكوابونيك ذكي يجمع بين الذكاء الاصطناعي وإنترنت الأشياء ولوحة تحكم ويب لمراقبة وتحسين الزراعة المستدامة.',
    //     video: "/vid/Agre_Tech.mp4"
    // }
// ],
                cvPath: 'C.V/Embedded/Yousef Gomaa.pdf'
            },
            en: {
                title: 'Embedded Systems & Robotics',
                description: 'Extensive experience in embedded systems and robotics through multiple projects and specialized training courses',
                experience: [
                    {
                        title: 'ITI Scholarship',
                        description: `
From 15-07-2023 to 15-09-2023, I joined an intensive two-month training program in Embedded Systems at ITI.
The program covered a wide range of topics, including:
C Programming
Embedded Systems Concepts
Microcontroller Interfacing
Communication Protocols
RTOS
Automotive Bus Technology
Embedded Systems Testing
Introduction to Tooling
Project Defense
Graduation Project:
The graduation project was building an Electronic Safe with high-security features using an ATmega32 Microcontroller, implemented as a Simulation on Proteus.
My main responsibilities in the project were:
Developing and implementing the Interface part of the system.
Writing the required Drivers for functionality and control.
This experience allowed me to bridge theory with practice, and gave me hands-on exposure to designing and implementing real-world solutions in the field of Embedded Systems.`,
                    },
                    {
                        title: 'Bedo Company Training',
                        description: `
The Bedo scholarship was funded by the University of Arizona in the United States, 
and took place at Bedo’s factory, which specializes in manufacturing training tools 
and controllers used in laboratories and companies as simulation devices. 
The scholarship originally focused on Robotics and Embedded Systems, 
but we also explored fundamental concepts of Automation and PLCs, 
making it a highly informative and enriching experience.
`,
                        image: 'img/beedo.jpeg'
                    },
                    {
                        title: 'Software Head at Luminous',
                        description: `
During my time at the student activity "Luminous," where I served as Software Head, 
I divided the committee into three main tracks: 
1- Basic Programming with C 
2- Embedded 
3- AI 
I created a detailed roadmap for each track and organized both internal 
and external training sessions. 
I also taught a complete C programming course, 
starting from the basics and moving into advanced concepts related to memory. 
The content included: 
1- Intro & Basics  
2- Loops & Compilation  
3- Array  
4- Function  
5- Struct / Union / Enum  
6- Preprocessing Directives  
7- Pointer  
This was one of the most rewarding periods of my life, 
as I felt I made a real impact that helped others grow — 
and all of it was offered for free.
`,
                        image: 'img/c_course.jpeg'
                    },
                    {
                        title: 'Learn in Depth Course',
                        description: `I am currently enrolled in an advanced Embedded Systems course with Learn In Depth, aiming to deepen my knowledge and reach a higher level of expertise in:
CAN & LIN protocols within the Embedded Systems field.
Working with ARM-based Microcontrollers.
This course provides me with a stronger foundation to understand advanced concepts and apply them in designing more complex and efficient systems.`,
                    },
                    {
                        title: 'ROS with Kronton',
                        description: 'Studying ROS robotics system with Kronton platform',
                    }
                ],
                projects: [
                    {
                        title: 'Smart Home with Arduino',
                        description: `
We developed a fully integrated Smart Home System, 
leveraging cutting-edge technologies such as: 
- 2 IR sensors 
- LCD with I2C module 
- Fire detection system with alarm, buzzer, and red light indicator 
- DHT11 temperature sensor for climate control 
- Intelligent light detection for energy efficiency 
- Secure password mechanism allowing only 3 attempts 
My role focused on leading the project and overseeing 
both software and hardware aspects — from concept to execution — 
to ensure top quality and innovation.
`,
                        video: "vid/البيت الذكي .mp4"
                    },
                    {
                        title: 'Smart Green House with IoT',
                        description: `
Green Tech Hub – My First IoT Project. 
A small-scale smart greenhouse model 
powered by IoT and Embedded Systems using ESP32. 
The project automates and optimizes plant care 
through real-time monitoring and smart control systems 
to ensure efficiency and sustainability in agriculture.  
Key Features:
- Soil dryness & rain detection for automated window control.  
- Temperature & flame sensors with buzzer and alarm.  
- Automated water pump for precise irrigation.  
- Live monitoring via a web dashboard.  
My Role as Project Leader:
Project planning and management, circuit design and integration, 
co-developing embedded software, 
and implementing IoT for real-time data visualization and control.
`,
                        video: "vid/Agre_Tech.mp4"
                    },
                    {
                        title: 'Dual Mode RC Car',
                        description: `
Developed a smart RC Car with multiple autonomous modes. 
My role focused on the software side, implementing:  
- Autonomous driving using IR sensors for obstacle avoidance.  
- Control via an ARM Robot.  
- Remote control through Bluetooth connectivity.  
This project enhanced my skills in integrating different control methods 
to build a multi-mode operating system.
`,
                        image: 'img/rc_car.jpg'
                    },
                    {
                        title: 'Aquaponic System',
                        description: `
Aquaponics System project combining hydroponics and aquaculture 
with smart solutions powered by Embedded Systems and IoT. 
As the Project Manager, I was responsible for bridging hardware with IoT, 
and my role included:  
- Designing hardware circuits.  
- Designing classic control circuits.  
- Developing a dashboard for data visualization and monitoring.  
- Integrating the dashboard code with the ESP for control and data transfer.  
This project strengthened my expertise in integrating hardware and IoT 
to build a fully functional and efficient system.
`,
                        image: 'img/aquabonic2.jpg'
                    }
                ],
//                 projects: [
//     {
//         title: 'Smart Home System',
//         description: 'An IoT-based smart home project integrating embedded systems, sensors, and automation for intelligent control.',
//         video: "/vid/البيت الذكي .mp4"
//     },
//     {
//         title: 'Agri-Tech ',
//         description: 'A smart aquaponic system that combines AI, IoT, and web dashboards to monitor and optimize sustainable farming.',
//         video: "/vid/Agre_Tech.mp4"
//     }
// ],

                cvPath: 'C.V/Embedded/Yousef Gomaa.pdf'
            }
        },
        ai: {
            ar: {
                title: 'الذكاء الاصطناعي',
                description: 'خبرة في مجال الذكاء الاصطناعي والتعلم الآلي',
                experience: [
                    {
                        title: 'تدريب NTI & Huawei',
                        description: `
خبرتي في مجال الذكاء الاصطناعي (AI) بدأت بشكل ذاتي 
من خلال قراءتي لمرجع Hands-On Machine Learning 
واطلاعي على كورسات تمهيدية مقدمة من HP، DataAnalytic، Bootcamp 
وغيرها من المنصات التعليمية في هذا المجال.  
بعد ذلك تقدمت لمنحة مشتركة من NTI & Huawei، 
وحصلت في مشروع التخرج على درجة 97% 
مما جعلني ضمن أفضل 2 على مستوى المنحة 
وأهّلني للتقديم في الامتحان الدولي لشركة Huawei.  
كما اجتزت الـ Mock Exam المقدم من هواوي بنسبة 85%.  
على الجانب العملي، نفذت عدة مشاريع منها: 
- Linear Regression  
- Classification  
وكان أبرزها مشروع تخرجي في مجال Computer Vision 
الذي شمل: 
- تجميع البيانات ومعالجتها  
- اختيار النموذج المناسب وتدريبه  
- نشر المشروع (Publishing)  
هذه التجربة منحتني أساسًا قويًا لفهم وتطبيق تقنيات الذكاء الاصطناعي عمليًا.
`,
                    }
                ],
                projects: [
                    {
                        title: 'Computer Vision Project',
                        description: 'مشروع متقدم في رؤية الحاسوب باستخدام OpenCV',
                        video: 'vid/Ai_final_Project - Copy.mp4'
                    }
                ],
                cvPath: 'C.V/Ai/Yousef Gomaa.pdf'
            },
            en: {
                title: 'Artificial Intelligence',
                description: 'Experience in AI and Machine Learning',
                experience: [
                    {
                        title: 'NTI & Huawei Training',
                        description: `
My experience in Artificial Intelligence (AI) started through self-learning, 
by studying the reference book Hands-On Machine Learning 
and exploring introductory courses from HP, DataAnalytic, Bootcamp, 
and other AI learning platforms.  
I then applied to the NTI & Huawei scholarship, 
where I achieved a 97% score in my graduation project, 
ranking among the top 2 participants in the program. 
This qualification allowed me to sit for Huawei’s international certification exam.  
Additionally, I scored 85% in Huawei’s official Mock Exam.  
On the practical side, I worked on several projects including: 
- Linear Regression  
- Classification  
Most notably, my graduation project was a complete Computer Vision system 
that involved: 
- Data collection and preprocessing  
- Model selection and training  
- Publishing the final solution  
This journey provided me with a solid foundation 
to understand and apply AI techniques in real-world projects.
`,
                    }
                ],
                projects: [
                    {
                        title: 'Computer Vision Project',
                        description: 'Advanced computer vision project using OpenCV',
                        video: 'vid/Ai_final_Project - Copy.mp4'
                    }
                ],
                cvPath: "C.V/Ai/Yousef Gomaa.pdf"
            }
        },
        web: {
            ar: {
                title: 'تطوير الويب',
                description: 'خبرة في تطوير تطبيقات الويب باستخدام التقنيات الحديثة',
                experience: [
                    {
                        title: 'خبرة في تطوير الويب',
                        description: `
خبرتي في مجال تطوير الويب جاءت من خلال مشاركتي 
في منحة "رواد مصر" لمدة 6 أشهر. 
خلال هذه الفترة درست الأساسيات والتقنيات الحديثة 
اللازمة لبناء مواقع وتطبيقات ويب متكاملة، 
ومنها:  
- HTML, CSS, JavaScript, TypeScript  
- Bootstrap, React, Node.js  
- WordPress  
- Figma & مبادئ UI/UX  
المنحة منحتني قاعدة قوية لفهم تطوير الويب 
من التصميم وحتى التنفيذ العملي.
`,
                    }
                ],
                projects: [
                    {
                        title: 'Service Page',
                        description: 'صفحة خدمات لبيع الكتب الإسلامية',
                        video: 'vid/service_page.mp4'
                    },
                    // {
                    //     title: 'Portfolio Page',
                    //     description: 'صفحة البورتفوليو الشخصي',
                    // },
                    {
                        title: 'Aquaponic Dashboard',
                        description: 'لوحة تحكم لمشروع Aquaponic',
                        video: 'vid/aquabonic_dashboard.mp4'
                    }
                ],
                cvPath: 'C.V/Ai/Yousef Gomaa.pdf'
            },
            en: {
                title: 'Web Development',
                description: 'Experience in web development using modern technologies',
                experience: [
                    {
                        title: 'Web Development Experience',
                        description: `
My web development experience comes from participating 
in the 6-month "Rowad Misr" scholarship program. 
Throughout this training, I learned the fundamentals and modern tools 
for building full-stack web applications, including:  
- HTML, CSS, JavaScript, TypeScript  
- Bootstrap, React, Node.js  
- WordPress  
- Figma & UI/UX principles  
This program provided me with a solid foundation 
to understand web development from design to practical implementation.
`,
                    }
                ],
                projects: [
                    {
                        title: 'Service Page',
                        description: 'Service page for selling Islamic books',
                        video: 'vid/service_page.mp4'
                    },
                    {
                        title: 'Aquaponic Dashboard',
                        description: 'Dashboard for Aquaponic project',
                        video: 'vid/aquabonic_dashboard.mp4'
                    }
                ],
                cvPath: 'C.V/Ai/Yousef Gomaa.pdf'
            }
        },
        automation: {
    ar: {
        title: 'الأتمتة',
        description: 'خبرة قوية في مجال التحكم الآلي والأتمتة الصناعية، تشمل التدريب العملي والنظري على أنظمة التحكم الكلاسيكية والـ PLC وأنظمة القيادة والمحاكاة الصناعية.',
        experience: [
            {
                title: 'دورة HA في التحكم الكلاسيكي والأتمتة',
                description: `
                    التحقت بدورة شاملة في مركز HA، تعلمت خلالها أساسيات وأنظمة التحكم الكلاسيكي (Classic Control)،
                    وأنظمة التحكم المنطقي المبرمج (PLC)، ومحركات القيادة (Motor Drivers).
                    تعاملت مع أنواع مختلفة من الـ PLC من شركات مثل Siemens وSchneider وغيرها،
                    كما استخدمت برامج المحاكاة الصناعية مثل CAD وFactory I/O لتطبيق المشاريع بشكل عملي.
                    
                    خلال التدريب، أتممت أكثر من 60 مهمة عملية، تضمنت:
                    - 30 مهمة Classic Control
                    - 10 مهام باستخدام Factory I/O أو برامج المحاكاة
                    - 10 تطبيقات فعلية على PLC من نوع Siemens
                    - 3 تطبيقات للتحكم في حساسات عبر PLC
                    - 1 تطبيق للتحكم في حساس عبر Classic Control
                    - 3 أنواع مختلفة من Motor Drivers
                    - 3 مشاريع على PLCs من شركات مختلفة
                    `,
                    image: "img/HA6jpg.jpg",
                    // image: "/img/HA7jpg.jpg",
                    // image: "/img/HA2jpg.jpg"

            },
            {
                title: 'تدريب في شركة مـام (MAM) – وكيل شنايدر إليكتريك في مصر',
                description: `
                    تشرفت بالحصول على تدريب ميداني في شركة مـام، الوكيل الرسمي لشنايدر إليكتريك في مصر.
                    كان تدريبًا مميزًا وغنيًا بالمحتوى، حيث تعلمت فيه جميع مراحل عمل الشركة بدءًا من قسم المبيعات (Sales)،
                    مرورًا بقسم العطاءات والتصميم (Tender & Design Department)، ثم الإنتاج (Production) وضبط الجودة (Quality Control).
                    
                    خلال التدريب، تعرفت على بيئة العمل الصناعية وكيفية إدارة المشاريع من مرحلة التصميم إلى التنفيذ.
                    كما أُتيحت لي الفرصة للتعامل مباشرة مع الرئيس التنفيذي للشركة (CEO)، وكانت تجربة تعليمية وإنسانية رائعة.
                `,
                 image: "img/MAM1.jpg",
            }
        ],
       projects: [
    {
        title: 'دائرة غسالة – Classic Control',
        description: 'تطبيق عملي على دائرة تحكم لغسالة باستخدام التحكم الكلاسيكي، يشمل التوصيلات الكهربية وعناصر الحماية والتتابع.',
        video: "vid/CLASSIC.mp4"
    },
    {
        title: 'محاكاة PLC – كشف الألوان (Color Detection)',
        description: 'مشروع محاكاة باستخدام PLC Simulation للتعرف على الألوان وفرز العناصر حسب اللون، ضمن تطبيقات التحكم الصناعي الذكي.',

        video: "vid/PLC_tasks/task2.mp4"
        
    },
    {
        title: 'محاكاة PLC – تعبئة الصناديق (Box Filling)',
        description: 'محاكاة متكاملة لعملية تعبئة الصناديق باستخدام PLC، تشمل الحساسات والسيور والمحركات لتنظيم عملية الإنتاج.',
        video: "vid/PLC_tasks/plc_5.mp4"
    },
    {
        title: 'محاكاة PLC – خط إنتاج بسير وبوشر (Conveyor & Pusher Line)',
        description: 'نموذج محاكاة لخط إنتاج صناعي يحتوي على سير ناقل وبوشر لفرز المنتجات بشكل آلي باستخدام PLC وبرامج المحاكاة.',
        video: "vid/PLC_tasks/PLC_1.mp4"
    }
],

        cvPath: 'C.V/Embedded/Yousef Gomaa.pdf'
    },
    en: {
        title: 'Automation',
        description: 'Strong background in automatic control and industrial automation, with both practical and theoretical experience in classic control, PLC systems, motor drivers, and industrial simulations.',
        experience: [
            {
                title: 'HA Course in Classic Control and Automation',
                description: `
                    I completed a comprehensive course at HA, covering Classic Control, PLC systems, and Motor Drivers.
                    I worked with multiple PLC types from Siemens, Schneider, and others, and practiced using industrial simulation tools such as CAD and Factory I/O.

                    Throughout the training, I accomplished over 60 technical tasks, including:
                    - 30 Classic Control tasks  
                    - 10 Factory I/O or simulation projects  
                    - 10 hands-on implementations on Siemens PLCs  
                    - 3 sensor control tasks via PLC  
                    - 1 sensor control task via Classic Control  
                    - 3 different Motor Drivers  
                    - 3 PLC projects on different brands
                    
                    
                `,
                image: "img/HA6jpg.jpg",

            },
            {
                title: 'Training at MAM – Official Schneider Electric Representative in Egypt',
                description: `
                    I had the honor of training at MAM, the official representative of Schneider Electric in Egypt.
                    It was an enriching experience where I learned about the company’s full workflow — from Sales, through Tender & Design,
                    to Production and Quality Control.

                    During the training, I gained valuable exposure to the industrial environment and project management processes.
                    I also had the opportunity to meet and communicate with the company’s CEO, which made the experience even more insightful and inspiring.
                
                `,
                 image: "img/MAM1.jpg",
            }
        ],
        projects: [
    {
        title: 'Washing Machine Circuit – Classic Control',
        description: 'A practical project implementing a washing machine circuit using classic control methods, including electrical wiring, protection devices, and relays.',
        video: "vid/CLASSIC.mp4"
    },
    {
        title: 'PLC Simulation – Color Detection',
        description: 'A PLC simulation project for color detection and sorting, demonstrating the use of sensors and logic control in smart industrial applications.',
        video: "vid/PLC_tasks/task2.mp4"
    },
    {
        title: 'PLC Simulation – Box Filling System',
        description: 'A full simulation of an automated box filling system using PLC, integrating sensors, conveyors, and actuators for efficient production control.',
        video: "vid/PLC_tasks/PLC_5.mp4"
    },
    {
        title: 'PLC Simulation – Conveyor & Pusher Production Line',
        description: 'An industrial line simulation featuring a conveyor and pusher system controlled by PLC, designed for automated product handling and sorting.',
        video: "vid/PLC_tasks/PLC_1.mp4"
    }
],

        cvPath: 'C.V/Embedded/Yousef Gomaa.pdf'
    }
},

       pm: {
    ar: {
        title: 'إدارة المشاريع',
        description: 'خبرة في إدارة وتنفيذ المشاريع التقنية والتعليمية وفق معايير PMI، مع تطبيق أساليب الإدارة المرنة Agile وScrum لتعزيز الأداء، وتحقيق الأهداف التشغيلية والاستراتيجية، وتنمية مهارات القيادة والعمل الجماعي.',
        experience: [
            {
                title: 'دورة PMP',
                description: `
- اجتزت دورة معتمدة من PMI تحت إشراف الدكتور أحمد حسن (جامعة القاهرة).  
- دراسة تفصيلية لمجالات المعرفة في إدارة المشاريع (Integration, Scope, Schedule, Cost, Quality, Risk, Stakeholder).  
- تطبيق أدوات مثل Work Breakdown Structure (WBS) وCritical Path Method (CPM).  
- تعلم إدارة فرق العمل وتخصيص الموارد ومراقبة الأداء عبر مؤشرات KPI وBaseline.  
- اكتساب مهارات إعداد Project Charter وStakeholder Register وتحليل المخاطر واتخاذ القرارات الاستراتيجية.`
            },
            {
                title: 'دورات HP في الإدارة',
                description: `
- حاصل على عدة شهادات في Agile Management وScrum من شركة HP.  
- تطبيق مبادئ Agile Mindset في إدارة الفرق والتخطيط الدوري (Sprint Planning).  
- استخدام Scrum Framework في إدارة Product Backlog وDaily Stand-ups.  
- تحسين كفاءة الفريق عبر تحليل Velocity وتنفيذ Sprint Retrospective.  
- تطوير مهارات القيادة التكيفية (Adaptive Leadership) والتواصل مع Stakeholders لتحقيق أعلى كفاءة.`
            },
            {
                title: 'برنامج Aspire الدولي (جامعة Harvest)',
                description: `
- تم قبولي في برنامج Aspire الدولي المقدم من جامعة Harvest والمتخصص في Leadership, Management, and Entrepreneurship.  
- تطوير مهارات القيادة والتخطيط الاستراتيجي وبناء فرق العمل عالية الأداء.  
- دراسة نماذج الأعمال (Business Models) وإدارة الابتكار واتخاذ القرار في بيئة عالمية.  
- تطبيق المفاهيم في مشاريع واقعية ضمن فرق متعددة الثقافات.  
- المشاركة المستمرة في البرنامج بهدف تعزيز مهارات القيادة وريادة الأعمال.`,
image: 'img/Aspire_logo.webp'
            },
            {
                title: 'مشروع Sumo Robot',
                description: `
- أول مشروع أدرت فيه فريقاً بصفتي Project Manager.  
- إدارة الفريق عن بُعد باستخدام أدوات التعاون (Trello, Slack).  
- إعداد خطة المشروع وجدول المهام باستخدام Gantt Chart ومتابعة مؤشرات الأداء.  
- تنظيم الاجتماعات الأسبوعية ومتابعة الإنجاز وتوزيع الأدوار.  
- قيادة الفريق للوصول إلى المرحلة النهائية في مسابقة IEEE على مستوى مصر.`
            },
            {
                title: 'Software Head',
                description: `
- إعادة هيكلة اللجنة وتحديد الأدوار والمسؤوليات (Roles & Responsibilities).  
- بناء نظام إدارة معرفة (Knowledge Base) يشمل التوثيق والمحتوى التدريبي.  
- تطبيق منهجية Continuous Improvement لتحسين الأداء العام.  
- إعداد خطة تطوير مستدامة تضمن استمرارية العمل وتتابع القيادة بفاعلية.`
            },
            {
                title: 'Team Leader',
                description: `
- تنفيذ جلسات TOT لتأهيل القيادات الجديدة داخل الفريق.  
- تنظيم ورش عمل خارجية (External Workshops) للتوسع المجتمعي والتفاعل المؤسسي.  
- الإشراف على عمليات التوظيف (Recruitment) وتنظيم Booths تعريفية.  
- قيادة الفريق في مسابقتين والوصول إلى النهائيات في كل منهما.  
- تطبيق أدوات مثل RACI Matrix وتحليل أداء الفرق لرفع الكفاءة والالتزام.`,
 image: 'img/team_leader.jpg'

            }
        ],
        cvPath: 'C.V/Embedded/Yousef Gomaa.pdf'
    },
    en: {
        title: 'Project Management',
        description: 'Experienced in managing technical and educational projects aligned with PMI standards, applying Agile and Scrum methodologies to enhance team efficiency, leadership performance, and strategic goal achievement.',
        experience: [
            {
                title: 'PMP Course',
                description: `
- Completed a 35-hour PMI-accredited PMP course with Dr. Ahmed Hassan (Cairo University).  
- Acquired in-depth understanding of PM knowledge areas: Integration, Scope, Schedule, Cost, Quality, Risk, and Stakeholder Management.  
- Applied professional tools like Work Breakdown Structure (WBS) and Critical Path Method (CPM).  
- Gained skills in resource allocation, baseline control, and KPI tracking.  
- Developed competencies in creating Project Charters, Stakeholder Registers, and Risk Analysis plans.`
            },
            {
                title: 'HP Management Courses',
                description: `
- Earned multiple certifications in Agile Management and Scrum from HP.  
- Applied Agile Mindset principles for adaptive planning and iterative delivery.  
- Implemented Scrum Framework including Sprint Planning, Product Backlog Management, and Daily Stand-ups.  
- Enhanced team productivity through Velocity tracking and Sprint Retrospectives.  
- Strengthened communication, stakeholder engagement, and adaptive leadership skills.`
            },
            {
                title: 'Aspire International Program (Harvest University)',
                description: `
- Accepted into the Aspire International Program by Harvest University, focusing on Leadership, Management, and Entrepreneurship.  
- Developing advanced skills in strategic planning, decision-making, and high-performance team leadership.  
- Learning business model innovation, problem-solving, and effective communication in global contexts.  
- Applying leadership principles through real-world group projects with international participants.  
- Currently enrolled and actively participating to further enhance leadership and entrepreneurial capabilities.`,

image: 'img/Aspire_logo.webp'
            },
            {
                title: 'Sumo Robot Project',
                description: `
- Served as Project Manager leading a remote multidisciplinary team.  
- Created detailed project schedules (Gantt Charts) and defined clear deliverables.  
- Utilized tools like Trello and Slack for task management and progress tracking.  
- Conducted weekly review meetings and monitored project KPIs.  
- Successfully reached the final stage of the IEEE Egypt national competition.`
            },
            {
                title: 'Software Head',
                description: `
- Restructured the software committee and established clear roles and responsibilities.  
- Built a documentation and training system (Knowledge Base) for sustainable knowledge transfer.  
- Introduced continuous improvement strategies and internal performance reviews.  
- Developed a long-term plan ensuring continuity, leadership succession, and efficiency.`
            },
            {
                title: 'Team Leader',
                description: `
- Conducted internal TOT sessions to train future leaders.  
- Organized external workshops to strengthen institutional and community engagement.  
- Supervised recruitment and managed promotional booths.  
- Led the team to the finals in two national competitions.  
- Applied RACI Matrix and performance assessment tools to optimize collaboration and accountability.`,
 image: 'img/team_leader.jpg'
            }
        ],
        cvPath: 'C.V/Embedded/Yousef Gomaa.pdf'
    }
},

        stem: {
            ar: {
                title: 'تعليم STEM',
                description: 'خبرة في تعليم العلوم والتكنولوجيا للأطفال',
                experience: [
                    {
                        title: 'BrainyNBright',
                        description: `
اكتسبت خبرة في مجال STEM من خلال عملي في شركة Brainy n Bright 
في الإمارات كمدرب برمجة (Coding Instructor) للأطفال من سن 6 إلى 18 سنة. 
قمت بتعليم الطلاب أساسيات البرمجة باستخدام Python، 
وتعريفهم بمبادئ الذكاء الاصطناعي (AI) 
إلى جانب التدريب العملي على Arduino.  
التجربة شملت العمل مع طلاب من جنسيات متعددة 
وباللغتين العربية والإنجليزية.  
في نهاية فترة التدريب، حصلت على Letter of Recommendation 
إلى جانب Job Offer للعمل في الفرع الأساسي للشركة في دبي.
`,
                        image: 'img/brainynbright2.jpeg'
                    }
                ],
                cvPath: 'C.V/Ai/Yousef Gomaa.pdf'
            },
            en: {
                title: 'STEM Education',
                description: 'Experience in teaching science and technology to children',
                experience: [
                    {
                        title: 'BrainyNBright',
                        description: `
I gained STEM teaching experience through my role as a Coding Instructor 
at Brainy n Bright in the UAE, working with children aged 6 to 18. 
I taught students programming fundamentals using Python, 
introduced them to AI concepts, 
and provided hands-on training with Arduino.  
The experience involved working with students of diverse nationalities 
in both Arabic and English.  
By the end of my training period, I received a Letter of Recommendation 
as well as a Job Offer to join the company’s main branch in Dubai.
`,
                        image: 'img/brainynbright2.jpeg'
                    }
                ],
                cvPath: 'C.V/Ai/Yousef Gomaa.pdf'
            }
        },
        volunteering: {
            ar: {
                title: 'التطوع والمسابقات',
                description: 'خبرة قيادية واسعة في الأنشطة الطلابية والمسابقات',
                experience: [
                    {
                        title: 'Team Leader - Luminous',
                        description: `قيادة فريق لوميناس المكوّن من أكثر من 80 طالب من مختلف كليات جامعة المنصورة لمدة سنة.
تنظيم بوث تعريفي للتعريف بأنشطة الفريق.
تنظيم ورش عمل داخلية وخارجية في مجالات تقنية وغير تقنية.
تجهيز الفريق والمشاركة في مسابقات على مستوى الجامعة وعلى مستوى مصر.
تنظيم ورش عمل متنوعة في مجالات تقنية وغير تقنية.
تقديم جلسات غير تقنية (Non-Technical Sessions) في مجالات مختلفة.`,
                        image: 'img/team_leader.jpeg'
                    },
                    {
                        title: 'Software Head',
                        description: `في مرحلة Software Head كنت مسؤول عن قيادة الجزء الخاص بالسوفت وير داخل الفريق. قسمت الفريق إلى ثلاثة أقسام رئيسية بثلاثة رودماب مختلفة:
Embedded Systems (ES)
Artificial Intelligence (AI)
Basic Programming بلغة C
خلال هذه المرحلة نظمت تدريبات داخلية وخارجية لتطوير مهارات الأعضاء، وكان من بينها تدريب خاص بلغة C والذي قمت بتقديمه بنفسي كـ Instructor.`,
                        image: 'img/c_onstructor.jpeg'
                    },
                    {
                        title: 'مسابقة الهلال الأحمر الإماراتي',
                        description: `المشاركة في مسابقة الهلال الأحمر الإماراتي (جائزة عون) خلال فترة الثانوية العامة كممثل للمدرسة.
التأهل للتصفيات النهائية على مستوى الدولة والفوز بالمركز الثالث.
تنفيذ مشروع تطوعي يهدف إلى خدمة المجتمع وتعزيز قيم العمل الإنساني.
اكتساب خبرة في العمل الجماعي والتخطيط والتنفيذ ضمن بيئة تنافسية.
تعزيز مهارات القيادة، المبادرة، والمسؤولية المجتمعية.`,
                    },
                    {
                        title: 'مسابقة MUTEX IEEE الزقازيق',
                        description: 'حصلت على جائزة أفضل Hardware Circuit في المسابقة',
                        image: 'img/mutex.jpeg'
                    },
                    {
                        title: 'مسابقة YLF',
                        description: 'وصلت لأفضل 5 في نهائي المسابقة على مستوى الجمهورية وكنت Presenter في المسابقة',
                        image: 'img/YLF2.jpeg'
                    }
                ],
                projects: [],
                cvPath: 'C.V/Ai/Yousef Gomaa.pdf'
            },
            en: {
                title: 'Volunteering & Competitions',
                description: 'Extensive leadership experience in student activities and competitions',
                experience: [
                    {
                        title: 'Team Leader - Luminous',
                        description: `Led Luminous Team of more than 80 students from various faculties at Mansoura University for one year.
Organized an introductory booth to showcase the team’s activities.
Conducted internal and external workshops in both technical and non-technical fields.
Prepared the team and participated in competitions at the university and national level.
Organized various workshops across different domains.
Delivered non-technical sessions in multiple fields.`,
                        image: 'img/team_leader.jpeg'
                    },
                    {
                        title: 'Software Head',
                        description: `As the Software Head, I was responsible for leading the software division within the team. I structured the team into three main tracks with dedicated roadmaps:
Embedded Systems (ES)
Artificial Intelligence (AI)
Basic Programming in C
During this stage, I organized both internal and external training sessions to enhance members’ skills. Among these was a C programming training, which I personally delivered as the Instructor.`,
                    },
                    {
                        title: 'UAE Red Crescent Competition',
                      description: `Participated in the UAE Red Crescent humanitarian competition (Awn Award) during high school as the school representative.
Qualified for the national finals and achieved 3rd place across the UAE.
Implemented a volunteer community project promoting humanitarian values and social impact.
Gained experience in teamwork, planning, and execution within a competitive environment.
Enhanced leadership, initiative, and social responsibility skills.`,
                    },
                    {
                        title: 'MUTEX IEEE Zagazig Competition',
                        description: 'Won Best Hardware Circuit award in the competition',
                        image: 'img/mutex.jpeg'
                    },
                    {
                        title: 'YLF Competition',
                        description: 'Reached top 5 in finals at national level and served as Presenter in the competition',
                        image: 'img/YLF2.jpeg'
                    }
                ],
                projects: [],
                cvPath: 'C.V/Ai/Yousef Gomaa.pdf'
            }
        }
    };

    const langContent = contents[skillType]?.[currentLang];

    if (!langContent) {
        return '<p>Content not found</p>';
    }

    // A utility function to generate HTML for a section
    const generateSection = (titleKey, icon, items, isProjects = false) => {
        if (!items || items.length === 0) return '';
        
        const titleText = currentLang === 'ar' ? contents[skillType].ar[titleKey] : contents[skillType].en[titleKey];

        return `
            <div class="content-section">
                <h2>
                    <i class="fas fa-${icon}"></i>
                    ${titleText}
                </h2>
                ${isProjects ? `
                    <div class="projects-grid">
                        ${items.map(item => `
                            <div class="project-card">
                                <div class="project-image">
                                    ${item.video ? `
                                        <video controls muted autoplay loop>
                                            <source src="${item.video}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    ` : `
                                        <img src="${item.image}" alt="${item.title}">
                                    `}
                                </div>
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    ${items.map(item => `
                        <div class="experience-item">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            ${item.image ? `
                                <div class="experience-image">
                                    <img src="${item.image}" alt="${item.title}">
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                `}
            </div>
        `;
    };

    return `
        <div class="skill-detail-container">
            <button class="back-button" onclick="goBack()">
                <i class="fas fa-arrow-${currentLang === 'ar' ? 'right' : 'left'}"></i>
                ${currentLang === 'ar' ? 'رجوع' : 'Back'}
            </button>
            
            <div class="skill-header">
                <h1 class="neon-text">${langContent.title}</h1>
                <p class="skill-description">${langContent.description}</p>
            </div>
            
            ${langContent.experience.length > 0 ? `
                <div class="content-section">
                    <h2>
                        <i class="fas fa-briefcase"></i>
                        ${currentLang === 'ar' ? 'الخبرات المسبقة' : 'Previous Experience'}
                    </h2>
                    ${langContent.experience.map(exp => `
                        <div class="experience-item">
                            <h3>${exp.title}</h3>
                            <p>${exp.description}</p>
                            ${exp.image ? `
                                <div class="experience-image">
                                    <img src="${exp.image}" alt="${exp.title}">
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

           ${langContent.projects && langContent.projects.length > 0 ? `
                <div class="content-section">
                    <h2>
                        <i class="fas fa-project-diagram"></i>
                        ${currentLang === 'ar' ? 'المشاريع التطبيقية' : 'Applied Projects'}
                    </h2>
                    <div class="projects-grid">
                        ${langContent.projects.map(project => `
                            <div class="project-card">
                                <div class="project-image">
                                    ${project.video ? `
                                        <video controls muted autoplay loop>
                                            <source src="${project.video}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    ` : `
                                        <img src="${project.image}" alt="${project.title}">
                                    `}
                                </div>
                                <h4>${project.title}</h4>
                                <p>${project.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="content-section text-center">
                <h2>
                    <i class="fas fa-file-pdf"></i>
                    ${currentLang === 'ar' ? 'السيرة الذاتية' : 'Resume'}
                </h2>
                <a href="${langContent.cvPath}" class="cv-download" download>
                    <i class="fas fa-download"></i>
                    ${currentLang === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV'}
                </a>
            </div>
            
            <div class="content-section text-center">
                <h2>
                    <i class="fas fa-award"></i>
                    ${currentLang === 'ar' ? 'جميع الشهادات' : 'All Certificates'}
                </h2>
                <a href="https://drive.google.com/drive/folders/1etCjO9YB5-BXUGNsR0LOeBNWaeSZKi4J?usp=sharing" class="cv-download" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    ${currentLang === 'ar' ? 'عرض جميع الشهادات' : 'View All Certificates'}
                </a>
            </div>
        </div>
    `;
}

// Initialize animations
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Smooth scroll for navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle navbar hide/show on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add hover effect for social links
document.querySelectorAll('.neon-social').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add loading animation when downloading CV
document.addEventListener('click', function(e) {
    if (e.target.closest('.cv-download')) {
        const button = e.target.closest('.cv-download');
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading"></span> Loading...';
        
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    }
});

// Console welcome message
console.log('%c Welcome to My Portfolio! ', 'background: #00ffff; color: #000; font-size: 20px; padding: 10px;');
console.log('%c Built with ❤️ using HTML, CSS & JavaScript ', 'background: #000000ff; color: #fff; font-size: 14px; padding: 5px;');