import {
  User,
  UpdateProfilePayload,
  ChangePasswordPayload,
  OAuthProvider,
  ProfileResponse,
  ApiResponse,
} from '@/types/user';

// Mock user data for demonstration
const mockUser: User = {
  id: 'usr_12345',
  email: 'james.doe@example.com',
  firstName: 'James',
  lastName: 'Doe',
  phoneNumber: '+234 801 234 5678',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  emailVerified: true,
  kycVerified: false,
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
};

const mockOAuthProviders: OAuthProvider[] = [
  {
    provider: 'google',
    connected: true,
    connectedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    email: 'james.doe@gmail.com',
  },
  {
    provider: 'github',
    connected: false,
  },
  {
    provider: 'microsoft',
    connected: false,
  },
];

// Simulated API calls with realistic delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchUserProfile(): Promise<ApiResponse<ProfileResponse>> {
  await delay(800);
  return {
    success: true,
    data: {
      user: mockUser,
      oauthProviders: mockOAuthProviders,
    },
  };
}

export async function updateUserProfile(
  payload: UpdateProfilePayload
): Promise<ApiResponse<User>> {
  await delay(1000);
  
  // Validation
  if (!payload.firstName?.trim()) {
    return {
      success: false,
      error: 'First name is required',
    };
  }
  
  if (!payload.lastName?.trim()) {
    return {
      success: false,
      error: 'Last name is required',
    };
  }

  const updatedUser: User = {
    ...mockUser,
    firstName: payload.firstName,
    lastName: payload.lastName,
    phoneNumber: payload.phoneNumber,
  };

  return {
    success: true,
    data: updatedUser,
    message: 'Profile updated successfully',
  };
}

export async function uploadAvatar(file: File): Promise<ApiResponse<{ url: string }>> {
  await delay(1500);

  if (!file.type.startsWith('image/')) {
    return {
      success: false,
      error: 'Please upload an image file',
    };
  }

  if (file.size > 5 * 1024 * 1024) {
    return {
      success: false,
      error: 'File size must be less than 5MB',
    };
  }

  // Simulate file upload
  return {
    success: true,
    data: {
      url: URL.createObjectURL(file),
    },
    message: 'Avatar uploaded successfully',
  };
}

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<ApiResponse<void>> {
  await delay(1200);

  // Validation
  if (!payload.currentPassword) {
    return {
      success: false,
      error: 'Current password is required',
    };
  }

  if (payload.currentPassword !== 'password123') {
    return {
      success: false,
      error: 'Current password is incorrect',
    };
  }

  if (payload.newPassword !== payload.confirmPassword) {
    return {
      success: false,
      error: 'Passwords do not match',
    };
  }

  if (payload.newPassword.length < 8) {
    return {
      success: false,
      error: 'Password must be at least 8 characters',
    };
  }

  return {
    success: true,
    message: 'Password changed successfully',
  };
}

export async function connectOAuthProvider(
  provider: 'google' | 'github' | 'microsoft'
): Promise<ApiResponse<OAuthProvider>> {
  await delay(1500);

  const providerConfig = mockOAuthProviders.find(p => p.provider === provider);
  if (!providerConfig) {
    return {
      success: false,
      error: `Provider ${provider} not found`,
    };
  }

  if (providerConfig.connected) {
    return {
      success: false,
      error: `${provider} is already connected`,
    };
  }

  const connected: OAuthProvider = {
    provider,
    connected: true,
    connectedAt: new Date().toISOString(),
    email: `user.${provider}@example.com`,
  };

  return {
    success: true,
    data: connected,
    message: `${provider} connected successfully`,
  };
}

export async function disconnectOAuthProvider(
  provider: 'google' | 'github' | 'microsoft'
): Promise<ApiResponse<void>> {
  await delay(1200);

  return {
    success: true,
    message: `${provider} disconnected successfully`,
  };
}

export async function sendVerificationEmail(): Promise<ApiResponse<void>> {
  await delay(800);
  return {
    success: true,
    message: 'Verification email sent. Please check your inbox.',
  };
}
