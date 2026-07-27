# Spec Comparator Page Documentation

## Overview

The Spec Comparator is a fully responsive device comparison tool that allows users to select 2-3 devices and compare their specifications, prices, and value scores side by side. Built with Next.js, React, and Tailwind CSS, it provides an intuitive interface for making informed device purchasing decisions.

## File Structure

```
pages/
  └── spec-comparator.tsx          # Main page (266 lines)

components/spec-comparator/
  ├── DeviceSelector.tsx            # Device selection component (111 lines)
  ├── ValueScoreRing.tsx            # Circular value score indicator (74 lines)
  ├── SpecsTable.tsx                # Specs comparison table (150 lines)
  └── EmptyState.tsx                # Empty state view (31 lines)

Total: 5 files, 627 lines of code
```

## Design System

### Colors
- **Background**: `#0B0F1A` (near-black navy)
- **Card Background**: `#151B2C`
- **Card Border**: `#262E42`
- **Primary Accent**: `#6C63FF` (indigo)
- **Success/Legit**: `#34D399` (emerald green)
- **Warning/Overpriced**: `#F5A524` (amber)
- **Error/Scam**: `#EF4444` (red)
- **Text Primary**: `#F4F5F9` (white)
- **Text Secondary**: `#9AA3B7` (light gray)
- **Text Faint**: `#5C6478` (dim gray)

### Typography
- Font Family: Inter
- Font Weights: 400 (regular), 500 (medium), 700 (bold), 800 (black)
- Page Titles: 800-weight, uppercase 11px letter-spaced labels

### Layout
- Mobile-first design (~430px max-width)
- Responsive grid layouts (2-3 columns)
- 16px border radius for cards
- Consistent spacing rhythm

## Components

### 1. DeviceSelector Component

**File**: `components/spec-comparator/DeviceSelector.tsx`

**Purpose**: Allows users to select or remove devices from comparison.

**Props**:
```typescript
interface DeviceSelectorProps {
  device: Device | null;                    // Currently selected device
  onSelect: (device: Device) => void;      // Callback when device is selected
  onRemove: () => void;                     // Callback to remove device
  placeholder?: string;                     // Placeholder text for empty slot
  availableDevices: Device[];               // List of devices to choose from
}
```

**Features**:
- Empty state: dashed border card with "+" icon
- Filled state: displays device with logo, name, storage
- Dropdown menu for device selection
- Remove button (X icon) on filled cards
- Filters out already selected devices from dropdown

**Usage**:
```tsx
<DeviceSelector
  device={selectedDevice}
  onSelect={(d) => handleSelect(d)}
  onRemove={() => handleRemove()}
  availableDevices={filteredDevices}
/>
```

### 2. ValueScoreRing Component

**File**: `components/spec-comparator/ValueScoreRing.tsx`

**Purpose**: Displays a circular progress indicator showing device value score (0-10).

**Props**:
```typescript
interface ValueScoreRingProps {
  score: number;                            // Value score (0-10)
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
  deviceName?: string;                      // Optional device name label
}
```

**Features**:
- SVG-based circular progress ring
- Indigo color (#6C63FF) for progress
- Verdict badge with color coding
- Animated stroke-dash transition
- Device name label below

**Usage**:
```tsx
<ValueScoreRing
  score={8.2}
  verdict="LEGIT"
  deviceName="iPhone 15 Pro Max"
/>
```

### 3. SpecsTable Component

**File**: `components/spec-comparator/SpecsTable.tsx`

**Purpose**: Renders a comprehensive specs comparison table with best-value highlighting.

**Props**:
```typescript
interface SpecsTableProps {
  devices: Device[];                        // Devices to compare
}
```

**Specification Rows** (13 total):
1. Display (text)
2. Chipset (text)
3. RAM (value, higher is better)
4. Storage (value, higher is better)
5. Main Camera (value, higher is better)
6. Battery (value, higher is better)
7. OS (text)
8. Weight (text)
9. 5G (text)
10. Release Year (value, higher is better)
11. Vendor Price (price, lower is better)
12. Market Value (price, lower is better)
13. Value Score (score, higher is better)

**Features**:
- Sticky first column for horizontal scrolling
- Auto-highlights best value per category (indigo + checkmark)
- Color-coded comparison (emerald for better specs)
- Formatted prices (₦M, ₦K notation)
- Smart comparison logic for different value types
- Legend explaining highlight convention

**Usage**:
```tsx
<SpecsTable devices={selectedDevices} />
```

### 4. EmptyState Component

**File**: `components/spec-comparator/EmptyState.tsx`

**Purpose**: Shows guidance when no devices are selected.

**Props**:
```typescript
interface EmptyStateProps {
  scrollToSelectors: () => void;            // Callback to scroll to device selectors
}
```

**Features**:
- Centered messaging
- Device icon in background
- Call-to-action button to scroll to selectors

**Usage**:
```tsx
<EmptyState scrollToSelectors={() => selectorsRef.current?.scrollIntoView()} />
```

## Main Page Structure

**File**: `pages/spec-comparator.tsx`

### Page Sections

1. **Header**
   - DashboardLayout with sidebar and top navigation
   - Hero block with title and description

2. **Devices to Compare Section**
   - Two mandatory device selector slots (2-column grid)
   - Optional third device slot (toggle button)
   - Add third device button (appears after 2 devices selected)

3. **Value Score Section**
   - Displays circular progress rings for each device
   - Shows verdict badges (LEGIT/SCAM/OVERPRICED)
   - Responsive grid (2-3 columns based on selection)

4. **Full Specification Section**
   - SpecsTable component
   - Horizontal scrollable on mobile

5. **CTA Row**
   - "Buy from SHEGSTECH" buttons (only for in-stock devices)
   - Rounded outline buttons in indigo
   - One button per selected device

6. **Empty State**
   - Shown when fewer than 2 devices selected
   - Includes device icon and guidance text

## Data Structures

### Device Interface
```typescript
interface Device {
  id: string;
  name: string;
  storage: string;
  price: number;                   // Vendor price
  marketValue: number;
  condition: string;
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
  logoUrl?: string;                // Brand logo URL
  specs?: {
    display?: string;              // e.g., "6.7\" OLED"
    chipset?: string;              // e.g., "A17 Pro"
    ram?: string;                  // e.g., "8GB"
    storage?: string;              // e.g., "256GB"
    mainCamera?: string;           // e.g., "48MP"
    battery?: string;              // e.g., "4685 mAh"
    os?: string;                   // e.g., "iOS 17"
    weight?: string;               // e.g., "221g"
    connectivity?: string;         // e.g., "Yes" or "No"
    releaseYear?: number;          // e.g., 2023
  };
  valueScore?: number;             // 0-10 score
  inStock?: boolean;               // For CTA button visibility
}
```

## State Management

**Main Page State** (`pages/spec-comparator.tsx`):
```typescript
const [selectedDevices, setSelectedDevices] = useState<(Device | null)[]>([null, null]);
const [showThirdSlot, setShowThirdSlot] = useState(false);
const selectorsRef = useRef<HTMLDivElement>(null);
```

**DeviceSelector State**:
```typescript
const [showDropdown, setShowDropdown] = useState(false);
```

## Features

### Device Selection
- Click dashed card to open device dropdown
- Select from available devices (excludes already selected)
- Click X button to remove device
- Option to add third device (toggle)

### Comparison Logic
- Supports 2-3 device comparison
- Auto-calculates best values per spec
- Different comparison rules (higher/lower/text)
- Price formatting with ₦M/₦K notation

### Highlighting
- Best value highlighted in indigo (#6C63FF)
- Green checkmark (✓) for best category
- Works for numeric specs and prices only
- Text specs not highlighted

### Responsive Design
- 2-column device selectors (mobile)
- Scales to 3-column for third device
- Horizontal scrolling specs table on mobile
- Sticky spec labels for easy reference

## Usage Guide

### Basic Flow
1. Page loads with empty state
2. Click first device selector card
3. Choose device from dropdown
4. Repeat for second device
5. View comparison automatically
6. Optionally add third device
7. Click "Buy from SHEGSTECH" to proceed to checkout

### Accessing the Page
```
http://localhost:3002/spec-comparator
```

## Integration Points

### API Integration
Replace mock data in `pages/spec-comparator.tsx`:

```typescript
// Instead of:
const AVAILABLE_DEVICES: Device[] = [...]

// Use:
const [devices, setDevices] = useState<Device[]>([]);
useEffect(() => {
  fetch('/api/devices')
    .then(res => res.json())
    .then(data => setDevices(data));
}, []);
```

### Shopping Cart
Update buy button handler:
```typescript
const handleBuyClick = (device: Device) => {
  // Add to cart or redirect to checkout
  router.push(`/checkout?device=${device.id}`);
};
```

### Analytics
Track comparison events:
```typescript
useEffect(() => {
  if (activeDevices.length > 0) {
    analytics.track('compare_devices', {
      deviceCount: activeDevices.length,
      deviceIds: activeDevices.map(d => d.id),
    });
  }
}, [activeDevices]);
```

## Customization

### Color Theming
Update colors in component `className` attributes:
```tsx
// Change primary accent color
className="... border-indigo-600 ..." // Change indigo-600 to desired color
```

### Adding Specifications
Add new rows to `SPEC_ROWS` in SpecsTable:
```typescript
const SPEC_ROWS = [
  // ... existing rows
  { key: 'newSpec', label: 'New Spec', type: 'value', compare: 'higher' },
];
```

### Device Data
Modify `AVAILABLE_DEVICES` array or fetch from API.

## Performance Considerations

- Components are memoized where appropriate
- Table uses CSS scrolling (not JS)
- SVG progress ring uses CSS transforms
- No heavy external libraries
- Efficient comparison logic

## Accessibility

- Semantic HTML structure
- ARIA labels for buttons and interactive elements
- Keyboard navigable dropdowns
- Color contrast meets WCAG AA
- Clear visual hierarchy

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Testing Stubs

### Unit Test Example
```typescript
import { render, screen } from '@testing-library/react';
import { DeviceSelector } from './DeviceSelector';

describe('DeviceSelector', () => {
  it('renders empty state correctly', () => {
    render(
      <DeviceSelector
        device={null}
        onSelect={jest.fn()}
        onRemove={jest.fn()}
        availableDevices={[]}
      />
    );
    expect(screen.getByText(/Add device/i)).toBeInTheDocument();
  });

  it('shows device when selected', () => {
    const device = { id: '1', name: 'iPhone 15', storage: '256GB' };
    render(
      <DeviceSelector
        device={device}
        onSelect={jest.fn()}
        onRemove={jest.fn()}
        availableDevices={[]}
      />
    );
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });
});
```

## Future Enhancements

- [ ] Save comparisons to user profile
- [ ] Share comparison via URL
- [ ] Add video/gallery per spec
- [ ] Real-time price comparison
- [ ] Detailed review section
- [ ] AI-powered recommendation
- [ ] Export as PDF
- [ ] Add to favorites
- [ ] Price history chart
- [ ] Seller information integration

## Troubleshooting

### Devices not appearing
- Check `AVAILABLE_DEVICES` array is populated
- Verify API endpoint returns correct format
- Check console for errors

### Specs not highlighting
- Ensure `specs` object is populated on Device
- Verify `compare` property set correctly in SPEC_ROWS
- Check value types match expected comparison type

### Styling issues
- Verify Tailwind classes are available
- Check dark mode is enabled in layout
- Ensure custom CSS doesn't override
- Clear cache and rebuild

## Contributing

When adding features:
1. Keep components reusable
2. Maintain dark theme consistency
3. Test responsive layouts
4. Update TypeScript interfaces
5. Add JSDoc comments
6. Follow existing code patterns
