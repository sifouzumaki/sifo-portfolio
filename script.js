// 1. بيانات المشاريع (تقدر تعدلها أو تزود عليها براحتك)
const saifProjects = [
    {
        titleAr: "أداة تشفير النصوص",
        titleEn: "CryptoShield CLI",
        descAr: "تطبيق لتشفير وفك تشفير الرسائل باستخدام خوارزميات التشفير المتماثل وغير المتماثل.",
        descEn: "A tool for encrypting and decrypting messages using symmetric & asymmetric cryptography.",
        tech: ["JS", "Security"]
    },
    {
        titleAr: "استوديو الراب والموسيقى",
        titleEn: "Alexandria Beats & Bars",
        descAr: "مجموعة تراكات راب مكتوبة وممنتجة بالكامل باللهجة المصرية والإنجليزية.",
        descEn: "Original bilingual rap tracks written, recorded, and engineered from scratch.",
        tech: ["Audio", "BandLab"]
    },
    {
        titleAr: "متتبع التمارين والسعرات",
        titleEn: "Calisthenics & Macro Log",
        descAr: "نظام لحساب السعرات وتطور الأوزان في الجيم وتمارين وزن الجسم.",
        descEn: "System for tracking daily macros, progressive overload, and calisthenics milestones.",
        tech: ["Web", "Fitness"]
    }
];

// 2. عرض المشاريع في الصفحة
let currentLang = 'ar';
const projectsContainer = document.getElementById('projects-container');

function renderProjects() {
    projectsContainer.innerHTML = '';
    saifProjects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${currentLang === 'ar' ? proj.titleAr : proj.titleEn}</h3>
            <p>${currentLang === 'ar' ? proj.descAr : proj.descEn}</p>
            <div>${proj.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        `;
        projectsContainer.appendChild(card);
    });
}
renderProjects();

// 3. زر تبديل اللغة (عربي / إنجليزي)
const langBtn = document.getElementById('lang-toggle');
langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-ar]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    renderProjects();
});

// 4. التيرمينال التفاعلي
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
    help: "Available commands: <span class='white-text'>about, skills, location, cats, clear</span>",
    about: "Saif Walid | Developer, Cybersecurity learner & Rap artist.",
    skills: "HTML, CSS, JavaScript, Cryptography, Music Production, Video Editing.",
    location: "Alexandria, Egypt [31.2001° N, 29.9187° E]",
    cats: "System Guardians online: Ziko, Lolo, Misho & Zizi 🐾",
};

terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const cmd = this.value.trim().toLowerCase();
        if (cmd === '') return;

        // طباعة الأمر اللي المستخدم كتبه
        terminalOutput.innerHTML += `<p><span class="green-text">guest@saif:~$</span> <span class="white-text">${cmd}</span></p>`;

        if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (commands[cmd]) {
            terminalOutput.innerHTML += `<p class="green-text">> ${commands[cmd]}</p>`;
        } else {
            terminalOutput.innerHTML += `<p style="color:#ff5f56;">Command not found: '${cmd}'. Type 'help' for options.</p>`;
        }

        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// 5. تأثير خلفية الماتريكس (Matrix Rain)
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "01SAIFCYBERPUNKALEXANDRIA#$@%&*";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 45);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});