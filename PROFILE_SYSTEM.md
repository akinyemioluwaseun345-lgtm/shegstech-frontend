# SHEGSTECH Profile System Documentation

## Overview

A complete, production-ready Next.js App Router profile management system with dark fintech aesthetics, built for SHEGSTECH's device valuation platform. Includes user profile management, password security, OAuth connections, and avatar uploads.

## Project Structure

```
app/
├── layout.tsx                    # Root layout with metadata
├── layout-client.tsx             # Client-side provider wrapper
└── profile/
    ├── page.tsx                  # Main profile page (protected)
    ├── edit/
    │   └── page.tsx              # Edit profile subpage
    └── security/
        └── page.tsx              # Security & password settings

components/
└── profile/
    ├── ProfileHeader.tsx         # User info + action buttons
    ├── ProfileCard.tsx           # Contact & account info display
    ├── EditableForm.tsx          # Profile update form
    ├── PasswordChangeForm.tsx    # Password change with strength meter
    ├── OAuthConnections.tsx      # OAuth provider management
    └── AvatarUploader.tsx        # Image upload component

lib/
├── useAuth.ts                    # Auth hooks (useAuth, useRequireAuth)
└── userApi.ts                    # Mock API handlers with realistic delays

types/
└── user.ts                       # TypeScript interfaces for User, OAuth, etc.
```

## Core Features

### 1. Protected Routes
Routes require authentication. Unauthenticated users are redirected to `/auth/login` with a `returnTo` query parameter.

```tsx
// useRequireAuth hook handles redirection automatically
const auth = useRequireAuth();
```

### 2. User Profile Management
- Display user information: name, email, phone, avatar
- Email verification status badge
- Account metadata: ID, creation date, last login, KYC status

### 3. Profile Editing
- Update first name, last name, phone number
- Avatar upload with preview
- Real-time validation & error handling
- Success messages with auto-dismiss

### 4. Security Settings
- **Password Change**: 
  - Current password verification
  - New password with strength meter (5 levels)
  - Password confirmation matching
  - Visibility toggle for all fields
  
- **OAuth Management**:
  - Connect/disconnect Google, GitHub, Microsoft accounts
  - Display connection status & email
  - Confirmation dialogs for destructive actions

### 5. Mock API Layer
All API calls are mocked in `lib/userApi.ts` with:
- Realistic 800-1500ms delays
- Full validation & error handling
- Type-safe responses using `ApiResponse<T>`
- Example: `GET /api/user/profile`, `POST /api/user/profile`, etc.

## Getting Started

### Installation
```bash
npm install
# or
yarn install
pnpm install
```

### Environment Setup
No additional environment variables needed for the mock implementation. For production:

```bash
# Add to .env.local
NEXT_PUBLIC_API_URL=https://api.shegstech.com
```

### Development
```bash
npm run dev
# Visit http://localhost:3000/profile (requires auth)
```

### Build & Deploy
```bash
npm run build
npm run start
```

## Mock API Implementation

All API handlers are in `lib/userApi.ts`. To replace with real endpoints:

### Example: Update Profile

**Current (Mock)**
```ts
// lib/userApi.ts
export async function updateUserProfile(payload: UpdateProfilePayload) {
  await delay(1000); // Simulate network latency
  // Validation & mock response...
  return { success: true, data: updatedUser };
}
```

**Production (Real API)**
```ts
export async function updateUserProfile(payload: UpdateProfilePayload) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(payload),
    }
  );
  return response.json();
}
```

### API Endpoints to Implement

Replace mock handlers with real API calls:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/user/profile` | Fetch full profile + OAuth providers |
| POST | `/api/user/profile` | Update profile (name, phone) |
| POST | `/api/user/avatar` | Upload avatar image |
| POST | `/api/user/change-password` | Update password |
| POST | `/api/user/oauth/:provider/connect` | Connect OAuth provider |
| DELETE | `/api/user/oauth/:provider` | Disconnect OAuth provider |
| POST | `/api/user/verify-email` | Resend verification email |

## Type Definitions

### User
```ts
interface User {
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
```

### OAuthProvider
```ts
interface OAuthProvider {
  provider: 'google' | 'github' | 'microsoft';
  connected: boolean;
  connectedAt?: string;
  email?: string;
}
```

### API Response
```ts
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## Authentication Flow

### Login Flow
1. User logs in at `/auth/login`
2. On success, token stored in `localStorage` as `auth_token`
3. User email stored in `localStorage` as `user_email`
4. Redirect to original page via `returnTo` query param

### Protected Access
```tsx
// This hook protects your component
const auth = useRequireAuth();

if (auth.isLoading) return <LoadingSpinner />;
if (!auth.isAuthenticated) return null; // Will redirect
return <YourContent />;
```

## Styling & Design

### Colors
- **Primary**: Indigo-600 (`#4f46e5`)
- **Background**: Zinc-950 (`#09090b`)
- **Cards**: Zinc-900 (`#18181b`)
- **Borders**: Zinc-800 (`#27272a`)
- **Success**: Emerald-500 (`#10b981`)
- **Error**: Red-500 (`#ef4444`)

### Responsive Design
- Mobile-first approach
- `max-w-2xl` container for narrow layout
- Tailwind grid for multi-column on desktop
- Full-width on mobile

### Accessibility
- Semantic HTML (`<label>`, `<input>`, etc.)
- ARIA attributes for interactive elements
- Keyboard focus states on all buttons/inputs
- Color contrast meets WCAG standards

## Testing

### Unit Test Stubs

Create `__tests__/profile.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { EditableForm } from '@/components/profile/EditableForm';

describe('EditableForm', () => {
  it('validates required fields', () => {
    const mockUser = { /* ... */ };
    render(
      <EditableForm 
        user={mockUser} 
        onSuccess={jest.fn()} 
      />
    );
    
    const submitBtn = screen.getByText('Update Profile');
    fireEvent.click(submitBtn);
    
    // Assert validation error appears
  });
  
  it('submits form with valid data', async () => {
    // Test successful form submission
  });
});
```

## Customization

### Adding New Fields
1. Update `User` interface in `types/user.ts`
2. Add field to `EditableForm.tsx`
3. Update mock API in `lib/userApi.ts`

### Adding New OAuth Providers
1. Add provider to `OAuthProvider['provider']` type
2. Update `providerConfig` in `OAuthConnections.tsx`
3. Add handler in `lib/userApi.ts`

### Changing Colors
Edit Tailwind classes in component files. Example:
```tsx
// Change primary button color
className="bg-indigo-600 hover:bg-indigo-700"
// to
className="bg-purple-600 hover:bg-purple-700"
```

## Security Considerations

### Current (Mock) Implementation
- Auth token stored in `localStorage` (for demo only)
- No actual password verification
- No real OAuth flow

### Production Checklist
- [ ] Use HttpOnly cookies for auth tokens (not localStorage)
- [ ] Implement CSRF protection
- [ ] Add rate limiting on password change endpoint
- [ ] Validate file uploads server-side
- [ ] Use OAuth provider SDKs (Auth0, NextAuth.js, etc.)
- [ ] Add two-factor authentication
- [ ] Encrypt sensitive data in transit (HTTPS)
- [ ] Implement session timeouts
- [ ] Add audit logging for security events

## Performance

- **Lazy Loading**: Profile pages use React suspense (via App Router)
- **Code Splitting**: Each profile page is a separate chunk
- **Mock Delays**: 800-1500ms simulates realistic network latency
- **Optimization**: Images use Next.js `<Image>` component (when adding)

## Error Handling

All components include:
- Input validation with user-friendly messages
- Try-catch blocks for API calls
- Error state UI with red alert boxes
- Success messages with auto-dismiss
- Loading states during API calls

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Troubleshooting

### "Auth check failed" error
- Ensure `auth_token` is in localStorage
- Check browser console for auth errors
- Verify auth endpoint is accessible

### Form not submitting
- Check browser console for validation errors
- Verify all required fields are filled
- Check API response format matches `ApiResponse<T>`

### Password strength meter not showing
- Ensure `formData.newPassword` is not empty
- Check Tailwind classes are loaded

## Future Enhancements

- [ ] Real OAuth provider integration
- [ ] Two-factor authentication
- [ ] Session management & timeout
- [ ] Activity log / device management
- [ ] Billing & subscription info
- [ ] Download personal data (GDPR)
- [ ] Account deletion
- [ ] Login history
- [ ] Notification preferences
- [ ] API key management for developers

## Support

For issues or questions:
1. Check console logs with `[v0]` prefix
2. Review TypeScript errors in IDE
3. Verify mock API handlers in `lib/userApi.ts`
4. Check component props match interface definitions
