# George Concepts Design Studio

A modern, luxury, highly responsive full-stack website and portfolio platform built for **George Concepts (Concepts Design Studio)** — an architecture, interior design, home renovation, and turnkey residential construction firm.

---

## 🌟 Brand & Visual Identity

- **Primary Colors**: Deep Architectural Forest Green (`#0C3B2E` / `#07251D`)
- **Secondary Colors**: Muted Leaf Green (`#5B8A3C`)
- **Accent Colors**: Sage Green (`#76A035`) & Teal Green (`#166556`)
- **Backgrounds**: Warm Architectural Cream (`#FAF9F5`) & Clean Surface Beige (`#F3F1EA`)
- **Typography**: Modern Architectural Sans (`Plus Jakarta Sans` & `Outfit`)

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router, React 19, TypeScript strict mode)
- **Styling**: Tailwind CSS v4, custom brand design system & glassmorphism
- **Icons**: `lucide-react`
- **Database & Storage**: Supabase (PostgreSQL, Storage Buckets, Auth, RLS Policies)
- **Data Access Layer**: Dual-mode unified data service (`src/lib/services/dataService.ts`) supporting zero-config local seed preview & live Supabase syncing.
- **SEO & Accessibility**: WAI-ARIA compliance, Schema.org `ArchitectureFirm` JSON-LD markup, `sitemap.ts`, `robots.ts`, OpenGraph metadata.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Admin Portal Access (`/admin`)

The website includes an integrated Content Management System (CMS) for the business owner to add, edit, publish, and delete projects, photo gallery entries, before & after sliders, client testimonials, and view incoming customer inquiries.

- **Admin Login Route**: `http://localhost:3000/admin/login`
- **Demo Credentials**:
  - **Email**: `admin@georgeconcepts.com`
  - **Password**: `admin123`

---

## 🗄️ Supabase Setup & Production Deployment

To connect the application to your live Supabase cloud database:

### 1. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Provision Database Schema
Go to your **Supabase Dashboard -> SQL Editor**, paste the contents of `supabase/schema.sql`, and click **Run**.

This will automatically create:
1. `projects` table
2. `project_images` table
3. `gallery_images` table
4. `before_after` table
5. `testimonials` table
6. `contact_submissions` table
7. Storage buckets (`portfolio`, `gallery`)
8. Row Level Security (RLS) policies

---

## 📋 Content Management Walkthrough

### How to Add a New Portfolio Project
1. Log in to the Admin Portal at `/admin`.
2. Navigate to **Projects CMS**.
3. Click **Add New Project**.
4. Fill in title, category (*Interior*, *Turnkey*, *Renovation*, *Planning*), location, cover image URL, short summary, detailed description, and toggle **Published**.
5. Save the project — it will immediately reflect dynamically on the public `/projects` page and homepage!

### How to Manage Before & After Renovation Sliders
1. Navigate to **Before & After** in the Admin panel.
2. Enter Before Image URL and After Image URL along with a description.
3. Save the pair — visitors can immediately drag the interactive comparison handle on the homepage.

### How to Review Customer Enquiries
1. Navigate to **Client Enquiries** in the Admin panel.
2. View submitted customer consultation requests with contact number, service type, and location.
3. Update lead status (`new`, `read`, `contacted`, `archived`).

---

## 🏗️ Production Build & Verification

To verify and test production build locally:
```bash
npm run build
npm run start
```

---

## 📄 License & Ownership

© 2026 George Concepts Design Studio. All Rights Reserved.
