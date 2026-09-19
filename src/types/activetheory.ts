export interface ProjectMediaSize {
  width: number;
  height: number;
  mimeType: string;
  filesize?: number;
  filename?: string;
  url: string;
}

export interface ProjectLogo {
  id: string;
  filename: string;
  url: string;
  sizes?: Record<string, ProjectMediaSize>;
}

export interface ProjectVideo {
  id?: string;
  thumbnail: string;
  filename?: string;
  mimeType?: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  clientName: string;
  completionDate?: string;
  projectLogo?: ProjectLogo;
  video: ProjectVideo;
  uiColor: string; // hex without #, e.g. "ba7cde"
  tags: string;
  priority?: number;
  caseStudyURL?: string;
  projectURL?: string;
}

export interface ContactLink {
  id: string;
  title: string;
  url: string;
}

export interface ContactData {
  links: ContactLink[];
}

export interface MetadataData {
  title: string;
  description: string;
  ogImage?: {
    url: string;
  };
}

export type ActiveSection = 'home' | 'work' | 'about' | 'contact';
