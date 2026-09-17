export interface WebService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startingPrice: number;
  badge?: string;
  deliveryDays: string;
  features: string[];
  techStack: string[];
  ebayListingUrl?: string;
  popular?: boolean;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  budget: string;
  description: string;
}
