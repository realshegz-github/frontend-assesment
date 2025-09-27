export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface PerformanceMetrics {
  successRate: number;
  customerSatisfaction: number;
  avgResponseSpeed: number;
  monthlyInteractions: number;
  avgDuration: number;
}
export interface Assistant {
  id: string;
  name: string;
  openingPhrase: string;
  endingPhrase: string;
  description: string;
  instructions: string;
  voice: string;
  performanceMetrics?: PerformanceMetrics;
}
