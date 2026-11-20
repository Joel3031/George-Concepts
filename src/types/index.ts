export type ProjectCategory = 'Interior' | 'Turnkey' | 'Renovation' | 'Planning';

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption?: string;
  sort_order?: number;
  created_at?: string;
  high_res_url?: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  aspect_ratio?: string;
}

export interface ProjectGallerySection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  images: ProjectImage[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  short_description: string;
  description: string;
  cover_image: string;
  year?: string;
  client_name?: string;
  area?: string;
  services_involved?: string[];
  featured: boolean;
  published: boolean;
  sort_order?: number;
  gallery_images?: ProjectImage[];
  gallery_sections?: ProjectGallerySection[];
  before_image?: string;
  after_image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  category: 'Interiors' | 'Exteriors' | 'Architecture' | 'Renovation' | 'Construction' | 'Details' | string;
  description?: string;
  sort_order?: number;
  published: boolean;
  created_at?: string;
  high_res_url?: string;
}

export interface BeforeAfterItem {
  id: string;
  project_id?: string;
  title: string;
  category?: string;
  before_image: string;
  after_image: string;
  description?: string;
  published: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  location: string;
  project_type: string;
  rating: number; // 1-5
  testimonial: string;
  image_url?: string;
  published: boolean;
  created_at?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  location: string;
  message: string;
  status: 'new' | 'read' | 'contacted' | 'archived';
  created_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}
