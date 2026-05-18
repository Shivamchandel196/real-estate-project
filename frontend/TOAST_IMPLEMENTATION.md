# Toast Notifications Implementation Guide

Toast notifications have been set up in your Real Estate app. Here's how to use them:

## Setup Complete ✅

- **Provider**: Added `Toaster` component in `main.jsx` (positioned at top-right)
- **Utils**: Created `src/utils/toast.js` with reusable toast functions
- **Examples**: Updated `SignUp.jsx` and `Signin.jsx` pages with toast notifications

## Available Toast Functions

```javascript
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
  showInfoToast,
  updateToast,
  dismissToast,
} from "../utils/toast";
```

### 1. **Success Toast** (Auto-dismiss after 3 seconds)

```javascript
showSuccessToast("Account created successfully!");
showSuccessToast("Listing updated!");
```

### 2. **Error Toast** (Auto-dismiss after 4 seconds)

```javascript
showErrorToast("Invalid credentials!");
showErrorToast(data.message);
showErrorToast("Something went wrong!");
```

### 3. **Loading Toast** (Shows spinner - manual dismiss)

```javascript
const toastId = showLoadingToast("Processing your request...");

// Later update it:
updateToast(toastId, "Success!", "success");
// Or dismiss it:
dismissToast(toastId);
```

### 4. **Info Toast** (Auto-dismiss after 3 seconds)

```javascript
showInfoToast("Please check your email for verification.");
```

## Usage Examples

### Example 1: Form Submission in CreateListing.jsx

```javascript
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
  dismissToast,
} from "../utils/toast";

const handleSubmit = async (e) => {
  e.preventDefault();

  const toastId = showLoadingToast("Creating listing...");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listing/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      },
    );

    const data = await response.json();

    if (data.success) {
      dismissToast(toastId);
      showSuccessToast("Listing created successfully!");
      navigate("/");
    } else {
      updateToast(toastId, data.message, "error");
    }
  } catch (error) {
    updateToast(toastId, error.message || "Failed to create listing", "error");
  }
};
```

### Example 2: Simple API Call in Profile.jsx

```javascript
import { showSuccessToast, showErrorToast } from "../utils/toast";

const handleUpdateProfile = async (updatedData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      },
    );

    const data = await response.json();

    if (data.success) {
      showSuccessToast("Profile updated!");
    } else {
      showErrorToast(data.message);
    }
  } catch (error) {
    showErrorToast(error.message);
  }
};
```

### Example 3: Delete Operations

```javascript
import { showSuccessToast, showErrorToast } from "../utils/toast";

const handleDeleteListing = async (listingId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listing/${listingId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (data.success) {
      showSuccessToast("Listing deleted successfully!");
      // Refresh listings or navigate away
    } else {
      showErrorToast(data.message);
    }
  } catch (error) {
    showErrorToast("Failed to delete listing");
  }
};
```

## Customization Options

You can customize the toast appearance in `src/utils/toast.js`:

- **Duration**: Change `duration` (in milliseconds)
- **Style**: Modify `background`, `color`, `borderRadius`, `fontWeight`
- **Position**: Change in `main.jsx` → `<Toaster position="top-right" />`

Available positions: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

## Pages to Update (Optional)

For a complete implementation, consider adding toasts to:

- ✅ `SignUp.jsx` - Done
- ✅ `Signin.jsx` - Done
- `CreateListing.jsx` - Form submissions
- `UpdateListing.jsx` - Form submissions
- `Profile.jsx` - Profile updates
- `Listing.jsx` - Any API calls (like favorites)
- `Search.jsx` - Search operations if applicable

Just follow the examples above and replace the existing error/success handling with toast notifications!

---

**Happy toasting! 🎉**
