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

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

> Get your Supabase URL and anon key from: **Supabase Dashboard → Project Settings → API**

### 4. Set up Supabase database

Run the following SQL in **Supabase Dashboard → SQL Editor**:

```sql
-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON contacts FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Service read contacts" ON contacts FOR SELECT USING (true);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published blogs" ON blogs FOR SELECT TO anon USING (published = true);
CREATE POLICY "Service manage blogs" ON blogs FOR ALL USING (true);

-- Visitor counter table
CREATE TABLE IF NOT EXISTS visitors (
  id INTEGER PRIMARY KEY DEFAULT 1,
  count BIGINT DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO visitors (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read visitors" ON visitors FOR SELECT USING (true);
CREATE POLICY "Service update visitors" ON visitors FOR UPDATE USING (true);

-- Visitor increment function
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS BIGINT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE new_count BIGINT;
BEGIN
  UPDATE visitors SET count = count + 1, last_updated = NOW()
  WHERE id = 1 RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;
GRANT EXECUTE ON FUNCTION increment_visitor_count() TO anon;
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Dashboard

Access the admin panel at `/admin`.

**Features:**
- 📊 Overview — visitor count, total messages, published blogs
- 📬 Messages — view and delete contact form submissions
- 📝 Blogs — manage all blog posts (publish/unpublish/edit/delete)
- ➕ New Blog — write and publish blog posts with title, slug, excerpt, tags, and HTML content

---

## 📝 Writing Blog Posts

1. Go to `yoursite.com/admin`
2. Login with your admin username and password
3. Click **➕ New Blog** tab
4. Fill in: Title, Slug, Excerpt, Tags, Content (HTML supported)
5. Check **Publish immediately** and click **🚀 Publish Post**

Your post will appear live at `yoursite.com/blog` instantly.

---

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all environment variables in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## 📜 License

MIT License — feel free to use this as a template for your own portfolio.

---

## 👤 Author

**Piyush Osti**
- 🌐 [piyushosti.com](https://piyushosti.com)
- 💼 [LinkedIn](https://linkedin.com/in/piyush-osti)
- ☁️ Cloud & DevOps Engineer | AWS Enthusiast