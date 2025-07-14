export interface Comment {
  id: number;
  name: string;
  avatar_url?: string | null;
  comment_text: string;
  created_at: string;
}

export interface Podcast {
  id: number;
  title: string;
  episode_number: number;
  speaker: string;
  description: string;
  media_url: string;
  thumbnail_url: string | null;
  published_on: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: 'policy_updates' | 'communication_analysis' | 'media_mentions';
  excerpt: string;
  slug: string;
  image_url: string | null;
  published_on: string;
}