export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatar?: string;
  emailVerified: boolean;
  kycVerified: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface OAuthProvider {
  provider: 'google' | 'github' | 'microsoft';
  connected: boolean;
  connectedAt?: string;
  email?: string;
}

export interface ProfileResponse {
  user: User;
  oauthProviders: OAuthProvider[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
