
export type RideApp = 'Uber' | '99' | 'Indriver' | 'Outro';

export interface DailyLog {
  id: string;
  user_id: string;
  km_driven: number;
  fuel_cost: number;
  earnings: number;
  app_name: RideApp | string;
  logged_at: string;
  notes?: string;
  created_at: string;
}

export interface FinancialStats {
  dailyProfit: number;
  totalEarnings: number;
  totalExpenses: number;
  costPerKm: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  avatarUrl?: string;
  preferredApp: string;
}
