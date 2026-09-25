export type PageId = 'home' | 'about' | 'education' | 'cgm' | 'blog' | 'faq' | 'contact';

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Diabetes Basics' | 'Glucose Monitoring' | 'Food & Lifestyle' | 'CGM' | 'Diabetes Complications' | 'Practical Tips';
  summary: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  keyTakeaways: string[];
  content: string[];
  references?: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'CGM' | 'Diet & Lifestyle' | 'Monitoring';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}

export interface TrackingEvent {
  eventName: 'whatsapp_click' | 'contact_form_submission' | 'cgm_page_view' | 'article_view' | 'cta_click';
  params?: Record<string, any>;
  timestamp: string;
}

export interface SourceReference {
  id: string;
  topic: string;
  claimOrContext: string;
  citation: string;
  organization: string;
  year: string;
}

export interface UtmParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}
