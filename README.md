# 🚀 Piyush Osti — Cloud & DevOps Engineer Portfolio

A modern, full-stack personal portfolio website built with **Next.js 15**, **Supabase**, and deployed on the web. Features a blog system, admin dashboard, contact form, visitor counter, and AWS certifications showcase.

---

## 🌐 Live Site

> [piyushosti.com](https://piyushosti.com)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Custom CSS (globals.css) |
| Database | Supabase (PostgreSQL) |
| Font | Poppins (Google Fonts) |
| Certifications | Credly Embed |
| Deployment | Vercel / GitHub Pages |

---

## 📁 Project Structure

```
piyushosti_website/
├── app/
│   ├── globals.css          # Global design system & styles
│   ├── layout.jsx           # Root layout with Navbar & Footer
│   ├── page.jsx             # Homepage (Hero, About, Projects, Certs, Resume, Contact)
│   ├── blog/
│   │   ├── page.jsx         # Blog listing page
│   │   └── [slug]/
│   │       └── page.jsx     # Individual blog post page
│   └── admin/
│       └── page.jsx         # Admin dashboard (password protected)
├── components/
│   ├── Navbar.jsx           # Navigation bar
│   ├── Hero.jsx             # Hero section with profile photo
│   ├── About.jsx            # About me + skills grid
│   ├── Projects.jsx         # Featured AWS projects
│   ├── Certifications.jsx   # AWS badges via Credly
│   ├── Resume.jsx           # Education, experience, skills
│   ├── Contact.jsx          # Contact form → Supabase
│   ├── Footer.jsx           # Footer
│   └── VisitorCounter.jsx   # Live visitor count
├── public/
│   └── Piyush-osti-Cloud Engineer-photo.jpg
├── .env.local               # Environment variables (not committed)
└── package.json
```

---

## ✨ Features

- **Hero Section** — Profile photo, title, CTA buttons, live visitor counter
- **About** — Bio, stats (projects, certifications, years), AWS skills grid
- **Projects** — 6 real-world AWS cloud projects with tags
- **Certifications** — Live Credly badge embeds for all AWS certifications
- **Resume** — Education, experience, AWS & programming skills, languages
- **Contact Form** — Saves messages directly to Supabase database
- **Blog** — Full blog system with listing and individual post pages
- **Admin Dashboard** — Password-protected dashboard to manage blogs, view messages, and track visitor stats
- **Visitor Counter** — Increments on every page visit using a Supabase SQL function

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/piyushosti/piyushosti-website.git
cd piyushosti-website
```

### 2. Install dependencies

```bash
npm install
```


### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---


---

## 📜 License

MIT License — feel free to use this as a template for your own portfolio.

---

## 👤 Author

**Piyush Osti**
- 🌐 [piyushosti.com](https://piyushosti.com)
- 💼 [LinkedIn](https://linkedin.com/in/piyush-osti)
- ☁️ Cloud & DevOps Engineer | AWS Enthusiast