export interface User {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  password?: string; // Optionnel si tu ne l'envoies pas côté client
  role: number;
  verificationToken?: string;
  isEmailVerified: boolean;
  image?: string;
  cv?:string;
}
