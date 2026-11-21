import { Project, GalleryItem, BeforeAfterItem, Testimonial, ContactSubmission } from "@/types";
import { initialProjects, initialGallery, initialBeforeAfter, initialTestimonials } from "../mockData";
import { supabase, isSupabaseConfigured } from "../supabase/client";

// Storage Key for Local Cache (fallback when Supabase is not connected)
const LOCAL_PROJECTS_KEY = "gc_projects_v1";
const LOCAL_GALLERY_KEY = "gc_gallery_v1";
const LOCAL_BEFORE_AFTER_KEY = "gc_ba_v1";
const LOCAL_TESTIMONIALS_KEY = "gc_testimonials_v1";
const LOCAL_CONTACTS_KEY = "gc_contacts_v1";

// Helper for local storage access (SSR safe)
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Local storage error:", e);
    return fallback;
  }
}

function setLocalItem<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage write error:", e);
  }
}

export const dataService = {
  // ==========================================
  // PROJECTS SERVICE
  // ==========================================
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*, gallery_images(*)")
        .order("sort_order", { ascending: true });
      
      if (!error && data && data.length > 0) {
        return data as Project[];
      }
    }
    
    // Fallback to local store with non-destructive reconciliation
    const cached = getLocalItem<Project[]>(LOCAL_PROJECTS_KEY, initialProjects);
    if (typeof window !== "undefined" && Array.isArray(cached)) {
      const cachedSlugs = new Set(cached.map((p) => p.slug || p.id));
      const missingInitial = initialProjects.filter(
        (p) => !cachedSlugs.has(p.slug) && !cachedSlugs.has(p.id)
      );
      if (missingInitial.length > 0) {
        const merged = [...cached, ...missingInitial];
        merged.sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99));
        setLocalItem(LOCAL_PROJECTS_KEY, merged);
        return merged;
      }
    }
    return cached;
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.getProjects();
    return projects.filter((p) => p.featured && p.published);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug && p.published) || null;
  },

  async saveProject(project: Partial<Project>): Promise<Project> {
    if (isSupabaseConfigured && supabase) {
      if (project.id) {
        const { data, error } = await supabase
          .from("projects")
          .update(project)
          .eq("id", project.id)
          .select()
          .single();
        if (!error && data) return data as Project;
      } else {
        const { data, error } = await supabase
          .from("projects")
          .insert([{ ...project, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (!error && data) return data as Project;
      }
    }

    // Local Fallback
    const current = getLocalItem<Project[]>(LOCAL_PROJECTS_KEY, initialProjects);
    let updated: Project[];
    let target: Project;

    if (project.id) {
      target = { ...current.find((p) => p.id === project.id), ...project } as Project;
      updated = current.map((p) => (p.id === project.id ? target : p));
    } else {
      target = {
        ...project,
        id: "proj-" + Date.now(),
        slug: project.slug || (project.title || "new-project").toLowerCase().replace(/\s+/g, "-"),
        created_at: new Date().toISOString(),
        published: project.published ?? true,
        featured: project.featured ?? false,
      } as Project;
      updated = [target, ...current];
    }

    setLocalItem(LOCAL_PROJECTS_KEY, updated);
    return target;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (!error) return true;
    }

    const current = getLocalItem<Project[]>(LOCAL_PROJECTS_KEY, initialProjects);
    const updated = current.filter((p) => p.id !== id);
    setLocalItem(LOCAL_PROJECTS_KEY, updated);
    return true;
  },

  // ==========================================
  // GALLERY SERVICE
  // ==========================================
  async getGallery(): Promise<GalleryItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (!error && data && data.length > 0) {
        return data as GalleryItem[];
      }
    }

    const cached = getLocalItem<GalleryItem[]>(LOCAL_GALLERY_KEY, initialGallery);
    if (typeof window !== "undefined" && Array.isArray(cached)) {
      const hasBroken = cached.some((g) => g.image_url?.includes("photo-1541888946425-d0fbb186a5b3"));
      if (hasBroken) {
        const fixed = cached.map((g) => {
          if (g.image_url?.includes("photo-1541888946425-d0fbb186a5b3")) {
            const initialMatch = initialGallery.find((ig) => ig.id === g.id);
            return initialMatch ? { ...g, image_url: initialMatch.image_url } : g;
          }
          return g;
        });
        setLocalItem(LOCAL_GALLERY_KEY, fixed);
        return fixed;
      }
    }
    return cached;
  },

  async saveGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
    if (isSupabaseConfigured && supabase) {
      if (item.id) {
        const { data, error } = await supabase
          .from("gallery_images")
          .update(item)
          .eq("id", item.id)
          .select()
          .single();
        if (!error && data) return data as GalleryItem;
      } else {
        const { data, error } = await supabase
          .from("gallery_images")
          .insert([{ ...item, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (!error && data) return data as GalleryItem;
      }
    }

    const current = getLocalItem<GalleryItem[]>(LOCAL_GALLERY_KEY, initialGallery);
    let target: GalleryItem;
    let updated: GalleryItem[];

    if (item.id) {
      target = { ...current.find((g) => g.id === item.id), ...item } as GalleryItem;
      updated = current.map((g) => (g.id === item.id ? target : g));
    } else {
      target = {
        ...item,
        id: "gal-" + Date.now(),
        published: true,
        created_at: new Date().toISOString(),
      } as GalleryItem;
      updated = [target, ...current];
    }

    setLocalItem(LOCAL_GALLERY_KEY, updated);
    return target;
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (!error) return true;
    }

    const current = getLocalItem<GalleryItem[]>(LOCAL_GALLERY_KEY, initialGallery);
    const updated = current.filter((g) => g.id !== id);
    setLocalItem(LOCAL_GALLERY_KEY, updated);
    return true;
  },

  // ==========================================
  // BEFORE & AFTER SERVICE
  // ==========================================
  async getBeforeAfter(): Promise<BeforeAfterItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("before_after")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (!error && data && data.length > 0) {
        return data as BeforeAfterItem[];
      }
    }

    return getLocalItem<BeforeAfterItem[]>(LOCAL_BEFORE_AFTER_KEY, initialBeforeAfter);
  },

  async saveBeforeAfter(item: Partial<BeforeAfterItem>): Promise<BeforeAfterItem> {
    if (isSupabaseConfigured && supabase) {
      if (item.id) {
        const { data, error } = await supabase
          .from("before_after")
          .update(item)
          .eq("id", item.id)
          .select()
          .single();
        if (!error && data) return data as BeforeAfterItem;
      } else {
        const { data, error } = await supabase
          .from("before_after")
          .insert([{ ...item, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (!error && data) return data as BeforeAfterItem;
      }
    }

    const current = getLocalItem<BeforeAfterItem[]>(LOCAL_BEFORE_AFTER_KEY, initialBeforeAfter);
    let target: BeforeAfterItem;
    let updated: BeforeAfterItem[];

    if (item.id) {
      target = { ...current.find((b) => b.id === item.id), ...item } as BeforeAfterItem;
      updated = current.map((b) => (b.id === item.id ? target : b));
    } else {
      target = {
        ...item,
        id: "ba-" + Date.now(),
        published: true,
        created_at: new Date().toISOString(),
      } as BeforeAfterItem;
      updated = [target, ...current];
    }

    setLocalItem(LOCAL_BEFORE_AFTER_KEY, updated);
    return target;
  },

  async deleteBeforeAfter(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("before_after").delete().eq("id", id);
      if (!error) return true;
    }

    const current = getLocalItem<BeforeAfterItem[]>(LOCAL_BEFORE_AFTER_KEY, initialBeforeAfter);
    const updated = current.filter((b) => b.id !== id);
    setLocalItem(LOCAL_BEFORE_AFTER_KEY, updated);
    return true;
  },

  // ==========================================
  // TESTIMONIALS SERVICE
  // ==========================================
  async getTestimonials(): Promise<Testimonial[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data && data.length > 0) {
        return data as Testimonial[];
      }
    }

    return getLocalItem<Testimonial[]>(LOCAL_TESTIMONIALS_KEY, initialTestimonials);
  },

  async saveTestimonial(testimonial: Partial<Testimonial>): Promise<Testimonial> {
    if (isSupabaseConfigured && supabase) {
      if (testimonial.id) {
        const { data, error } = await supabase
          .from("testimonials")
          .update(testimonial)
          .eq("id", testimonial.id)
          .select()
          .single();
        if (!error && data) return data as Testimonial;
      } else {
        const { data, error } = await supabase
          .from("testimonials")
          .insert([{ ...testimonial, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (!error && data) return data as Testimonial;
      }
    }

    const current = getLocalItem<Testimonial[]>(LOCAL_TESTIMONIALS_KEY, initialTestimonials);
    let target: Testimonial;
    let updated: Testimonial[];

    if (testimonial.id) {
      target = { ...current.find((t) => t.id === testimonial.id), ...testimonial } as Testimonial;
      updated = current.map((t) => (t.id === testimonial.id ? target : t));
    } else {
      target = {
        ...testimonial,
        id: "test-" + Date.now(),
        published: true,
        created_at: new Date().toISOString(),
      } as Testimonial;
      updated = [target, ...current];
    }

    setLocalItem(LOCAL_TESTIMONIALS_KEY, updated);
    return target;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (!error) return true;
    }

    const current = getLocalItem<Testimonial[]>(LOCAL_TESTIMONIALS_KEY, initialTestimonials);
    const updated = current.filter((t) => t.id !== id);
    setLocalItem(LOCAL_TESTIMONIALS_KEY, updated);
    return true;
  },

  // ==========================================
  // CONTACT SUBMISSIONS SERVICE
  // ==========================================
  async submitContact(enquiry: Omit<ContactSubmission, "id" | "created_at" | "status">): Promise<ContactSubmission> {
    const payload = {
      ...enquiry,
      status: "new" as const,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("contact_submissions")
        .insert([payload])
        .select()
        .single();
      if (!error && data) return data as ContactSubmission;
    }

    const current = getLocalItem<ContactSubmission[]>(LOCAL_CONTACTS_KEY, []);
    const newSubmission: ContactSubmission = {
      ...payload,
      id: "contact-" + Date.now(),
    };
    setLocalItem(LOCAL_CONTACTS_KEY, [newSubmission, ...current]);
    return newSubmission;
  },

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        return data as ContactSubmission[];
      }
    }

    return getLocalItem<ContactSubmission[]>(LOCAL_CONTACTS_KEY, [
      {
        id: "c-demo-1",
        name: "Rahul Sharma",
        phone: "+91 98470 12345",
        email: "rahul.s@example.com",
        project_type: "Turnkey Residential Projects",
        location: "Kochi",
        message: "Looking to build a 3,800 sq ft contemporary home in Kochi. Would like to discuss architectural planning and turnkey execution timeline.",
        status: "new",
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: "c-demo-2",
        name: "Sowmya Nair",
        phone: "+91 94471 98765",
        email: "sowmya.nair@example.com",
        project_type: "Interior Design",
        location: "Ernakulam",
        message: "We just acquired an apartment and need complete interior design & joinery works.",
        status: "read",
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ]);
  },

  async updateContactStatus(id: string, status: ContactSubmission["status"]): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status })
        .eq("id", id);
      if (!error) return true;
    }

    const current = getLocalItem<ContactSubmission[]>(LOCAL_CONTACTS_KEY, []);
    const updated = current.map((c) => (c.id === id ? { ...c, status } : c));
    setLocalItem(LOCAL_CONTACTS_KEY, updated);
    return true;
  },

  // ==========================================
  // UTILITIES (Class Merge Helper)
  // ==========================================
  async uploadImage(file: File, bucket = "portfolio"): Promise<string> {
    if (isSupabaseConfigured && supabase) {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { data, error } = await supabase.storage.from(bucket).upload(filename, file);
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filename);
        return publicUrlData.publicUrl;
      }
    }

    // Local Object URL fallback for previewing uploaded images
    return URL.createObjectURL(file);
  },
};
