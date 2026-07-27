# Profile System Quick Setup

## What's Included

✅ Complete Next.js App Router profile system  
✅ Dark fintech UI matching SHEGSTECH brand  
✅ User profile, edit, and security pages  
✅ Password change with strength meter  
✅ OAuth provider management (Google, GitHub, Microsoft)  
✅ Avatar upload component  
✅ Mock API layer (easily swappable with real endpoints)  
✅ Type-safe TypeScript throughout  
✅ Fully responsive design  

## Files Created

### Pages (App Router)
```
app/
├── layout.tsx
├── layout-client.tsx
└── profile/
    ├── page.tsx              (Main profile page)
    ├── edit/page.tsx         (Edit profile)
    └── security/page.tsx     (Password & OAuth)
```

### Components
```
components/profile/
├── ProfileHeader.tsx         (User info + buttons)
├── ProfileCard.tsx           (Contact & account info)
├── EditableForm.tsx          (Profile edit form)
├── PasswordChangeForm.tsx    (Password change)
├── OAuthConnections.tsx      (OAuth management)
└── AvatarUploader.tsx        (Avatar upload)
```

### Utilities
```
lib/
├── useAuth.ts                (Auth hooks)
└── userApi.ts                (Mock API + endpoints)

types/
└── user.ts                   (TypeScript interfaces)
```

## Quick Start

### 1. Access the Pages
```
http://localhost:3000/profile           # Main profile
http://localhost:3000/profile/edit      # Edit profile
http://localhost:3000/profile/security  # Security settings
```

### 2. Test Mock Data
All pages are protected. First, log in at `/auth/login`:
- Email: `james.doe@example.com`
- Password: `password123` (for mock password change demo)

### 3. Try Features
- **Edit Profile**: Change name, phone, upload avatar
- **Change Password**: Update password with strength meter
- **OAuth**: Connect/disconnect providers (all work in mock mode)
- **Email Verification**: Resend verification email

## Integration with Real API

### Step 1: Set API URL
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.shegstech.com
```

### Step 2: Replace Mock Handlers
Edit `lib/userApi.ts` to call your API instead:

```ts
// Before (Mock)
export async function fetchUserProfile() {
  await delay(800);
  return { success: true, data: { user: mockUser, ... } };
}

// After (Real API)
export async function fetchUserProfile() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
    {
      headers: { 
        'Authorization': `Bearer ${getAuthToken()}`
      }
    }
  );
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
}
```

### Step 3: Implement Auth Token Management
```ts
// lib/useAuth.ts - Replace mock auth check
function getAuthToken() {
  return localStorage.getItem('auth_token');
}

function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}
```

## API Endpoints Reference

Your backend should implement these endpoints:

### User Profile
```
GET /api/user/profile
Response: { success, data: { user: User, oauthProviders: OAuthProvider[] } }

POST /api/user/profile
Body: { firstName, lastName, phoneNumber }
Response: { success, data: User }
```

### Avatar
```
POST /api/user/avatar
Body: FormData with file
Response: { success, data: { url: string } }
```

### Password
```
POST /api/user/change-password
Body: { currentPassword, newPassword, confirmPassword }
Response: { success, message }
```

### OAuth
```
POST /api/user/oauth/{provider}/connect
Response: { success, data: OAuthProvider }

DELETE /api/user/oauth/{provider}
Response: { success }
```

### Email Verification
```
POST /api/user/verify-email
Response: { success, message }
```

## Component Usage

### Using ProfileHeader
```tsx
import { ProfileHeader } from '@/components/profile/ProfileHeader';

<ProfileHeader 
  user={user} 
  onSignOut={() => router.push('/auth/login')}
/>
```

### Using EditableForm
```tsx
import { EditableForm } from '@/components/profile/EditableForm';

<EditableForm
  user={user}
  onSuccess={(updatedUser) => setUser(updatedUser)}
/>
```

### Using PasswordChangeForm
```tsx
import { PasswordChangeForm } from '@/components/profile/PasswordChangeForm';

<PasswordChangeForm />
```

### Using OAuthConnections
```tsx
import { OAuthConnections } from '@/components/profile/OAuthConnections';

<OAuthConnections
  providers={oauthProviders}
  onUpdate={(updated) => setProviders(updated)}
/>
```

## Authentication Hook Usage

### Protect a Page
```tsx
'use client';

import { useRequireAuth } from '@/lib/useAuth';

export default function ProtectedPage() {
  const auth = useRequireAuth(); // Auto-redirects if not authenticated
  
  if (auth.isLoading) return <Loading />;
  return <YourContent />;
}
```

### Get Auth State (No Redirect)
```tsx
import { useAuth } from '@/lib/useAuth';

const auth = useAuth();
if (auth.isAuthenticated) {
  console.log('Logged in as:', auth.user?.email);
}
```

## Styling Customization

### Change Primary Color
Replace `indigo-600` with your color throughout components:
```tsx
// Before
className="bg-indigo-600 hover:bg-indigo-700"

// After (e.g., for purple)
className="bg-purple-600 hover:bg-purple-700"
```

### Dark Mode
Profile system uses dark theme by default. Theme toggle is in sidebar (from existing dashboard).

### Responsive Breakpoints
- Mobile: `sm:` (640px)
- Tablet: `md:` (768px)
- Desktop: `lg:` (1024px)

## Type Safety

All components are fully typed. Key types in `types/user.ts`:

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

Extend as needed for your use case.

## Common Customizations

### Add New User Field
1. Update `User` interface in `types/user.ts`
2. Add field to `EditableForm.tsx`
3. Update mock data in `lib/userApi.ts`

### Add New OAuth Provider
1. Add to `OAuthProvider['provider']` type
2. Add icon/config to `providerConfig` in `OAuthConnections.tsx`
3. Add API handler to `lib/userApi.ts`

### Change Form Validation
Edit validation in component or `lib/userApi.ts`:
```ts
if (!payload.firstName?.trim()) {
  return { success: false, error: 'First name is required' };
}
```

## Performance Tips

- Page routes use App Router code splitting (automatic)
- Mock API includes realistic delays (remove `await delay()` in production)
- Consider adding loading skeletons for better UX
- Avatar uploader includes file size validation

## Security Reminders

**This is a mock implementation for demonstration.** For production:

- [ ] Use HttpOnly cookies (not localStorage) for auth tokens
- [ ] Validate all inputs server-side
- [ ] Use HTTPS for all API calls
- [ ] Implement CSRF protection
- [ ] Add rate limiting
- [ ] Hash & salt passwords
- [ ] Implement proper OAuth flow
- [ ] Add audit logging
- [ ] Encrypt sensitive data

## Troubleshooting

### Pages show "loading..." forever
- Check browser console for errors
- Verify auth token is in localStorage
- Ensure `useRequireAuth()` is working

### Form won't submit
- Check all required fields are filled
- Open browser console for validation errors
- Verify API response format matches `ApiResponse<T>`

### Styles look broken
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind is configured correctly

### OAuth buttons not working
- This is normal in mock mode (simulates OAuth flow)
- In production, integrate with OAuth provider SDKs

## Next Steps

1. **Integrate Real API**: Replace mock handlers in `lib/userApi.ts`
2. **Add OAuth**: Implement actual OAuth flow (Auth0, NextAuth.js, etc.)
3. **Security**: Add 2FA, rate limiting, session management
4. **Analytics**: Track user profile views/edits
5. **Testing**: Write unit tests for forms & components
6. **Deployment**: Deploy to Vercel for SHEGSTECH production

## Support

See `PROFILE_SYSTEM.md` for full documentation.

Questions? Check:
- Console logs with `[v0]` prefix
- Component prop types in `types/user.ts`
- Mock API implementations in `lib/userApi.ts`
