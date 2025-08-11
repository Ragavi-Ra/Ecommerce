# React Native Product List Page — README

## Project Overview

Developed a **Product List Page** in React Native with lazy loading, offline support using SQLite, cart notifications, subscription-based pricing with discounts, and map location selection.

---

## Key Features

- **Lazy Loading:** Used `React.lazy()` and `Suspense` to defer loading of product components.
- **API Caching:** Fetched product data from API, cached locally using SQLite for offline access.
- **Add to Cart Notification:** Triggered push notifications on product add-to-cart using Notifee. I chose Notifee because, after reading documentation, I found that FCM alone doesn’t support foreground notifications well. I considered OneSignal but due to time constraints and needing to verify its documentation, I opted for Notifee, which I was already familiar with and could integrate quickly.
- **Subscription Module:** Allowed selection among Weekend, Weekdays, or Random day subscriptions with appropriate calendar views.
- **Price Calculation:** Applied discounts automatically based on subscription days and cart discounts.
- **Map Picker:** Initially planned to use Google Maps for location picking after subscription selection, but Google Maps requires a billing account for API usage even though it worked temporarily without one. To avoid this limitation and ongoing costs, I switched to the free, open-source MapLibreGL library, which renders OpenStreetMap tiles without needing an API key. This allowed live user location tracking and interactive location picking (drag and drop) without any billing or API restrictions.

---

## Timeline & Depth

| Task                         | Estimated Time | Notes                                          |
|------------------------------|----------------|------------------------------------------------|
| Lazy Loading & Product List  |     4 hrs      | Implemented React.lazy and optimized FlatList  |
| SQLite API Caching           |     4 hrs      | Basic offline caching and sync with API        |
| Cart Notification Setup      |     3 hrs      | Integrated push notification trigger           |
| Subscription & Price Logic   |     6 hrs      | Calendar UI with discount calculation          |
| Map Picker Integration       |     3 hrs      | Simple embedded map for location selection     |
| Error and fixes              |     6 hrs      | Worked on the errors during build generation   |

---

