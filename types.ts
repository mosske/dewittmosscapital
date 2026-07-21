/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface FinancingService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  qualifications: string[];
  typicalTerms: {
    amount: string;
    rate: string;
    term: string;
    speed: string;
  };
  iconName: string;
}

export interface RecentDeal {
  id: string;
  type: string;
  amount: number;
  location: string;
  industry: string;
  status: 'Funded' | 'In Progress';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ApplicationFormData {
  // Step 1: Funding Request
  fundingAmount: number;
  fundingPurpose: string;
  fundingTimeline: string;
  // Step 2: Company Info
  companyName: string;
  industry: string;
  yearsInBusiness: string;
  annualRevenue: number;
  monthlyCreditCardSales?: number;
  // Step 3: Contact Info
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  additionalNotes?: string;
  files: File[];
}
