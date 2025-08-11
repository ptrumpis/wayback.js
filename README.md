[![GitHub License](https://img.shields.io/github/license/ptrumpis/wayback.js)](https://github.com/ptrumpis/wayback.js?tab=MIT-1-ov-file#readme)
[![GitHub Release Date](https://img.shields.io/github/release-date/ptrumpis/wayback.js)](https://github.com/ptrumpis/wayback.js/releases/latest)
[![GitHub Release](https://img.shields.io/github/v/release/ptrumpis/wayback.js)](https://github.com/ptrumpis/wayback.js/releases/latest)
[![GitHub Commits](https://img.shields.io/github/commit-activity/t/ptrumpis/wayback.js)](https://github.com/ptrumpis/wayback.js/commits)
[![GitHub stars](https://img.shields.io/github/stars/ptrumpis/wayback.js?style=flat)](https://github.com/ptrumpis/wayback.js/stargazers) 
[![GitHub forks](https://img.shields.io/github/forks/ptrumpis/wayback.js?style=flat)](https://github.com/ptrumpis/wayback.js/forks)

# 🏛️ wayback.js
The Wayback Availability JSON API in JavaScript.

## 🚀 Installation
### npm
```shell
npm i wayback.js
```

## 📦 Usage
### Create an Instance
```js
import Wayback from 'wayback.js';

const wb = new Wayback({
  connectionTimeoutMs: 9000, // Timeout in ms
  cacheTTL: 86400,           // Cache time-to-live in seconds
  gcInterval: 3600,          // Garbage collection interval in seconds
  headers: { ... }           // Optional headers
});
```

### Check if a URL is Archived
```js
// Default check
const archived = await wb.isArchived('https://example.com');
console.log(archived);

// With options
const archivedOldest = await wb.isArchived('https://example.com', {
  resolveRedirects: false,  // Skip resolving redirects
  oldestArchive: true       // Request the oldest available archive
});
console.log(archivedOldest);
```

### Save a URL
```js
const saved = await wb.saveUrl('https://example.com');
console.log(saved);
```

### Save Only If Outdated
```js
// Default 30 days max age
const savedIfOld = await wb.saveOutdatedUrl('https://example.com');
console.log(savedIfOld);

// With options
const savedIfOldest = await wb.saveOutdatedUrl(
    'https://example.com',
    90,  // Maximum age (in days)
    resolveRedirects: false  // Skip resolving redirects
);
console.log(savedIfOldest);
```

### Resolve Redirects Before Archiving
```js
const finalUrl = await wb.getFinalRedirectUrl('https:/g.co/gsoc');
console.log(finalUrl);
```

## 📚 API Reference
| Method                         | Description                                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| `isArchived`                   | Checks if the given URL is archived and returns snapshot info.     |
| `saveUrl`                      | Saves the given URL to the Wayback Machine.                        |
| `saveOutdatedUrl`              | Saves the URL only if the last archive is older than `maxAgeDays`. |
| `getFinalRedirectUrl`          | Resolves redirects and returns the final destination URL.          |

### Options
**`isArchived` Options:**
* **resolveRedirects** *(boolean)* — whether to follow redirects before checking archive (default: `true`)
* **oldestArchive** *(boolean)* — if `true`, retrieves the oldest available snapshot instead of the latest (default: `false`)

**`saveOutdatedUrl` Options:**
* **maxAgeDays** *(number)* — maximum age (in days) of the last archive before re-saving (default: `30`)
* **resolveRedirects** *(boolean)* — whether to follow redirects before checking archive age (default: `true`)


## ℹ️ Info
### Dependents
This package is a dependency of:  
[👻 Snap Camera Server](https://github.com/ptrumpis/snap-camera-server)

## ❤️ Support
If you like my work and want to support me, feel free to invite me for a virtual coffee ☕  

[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/ptrumpis)
[![Buy me a Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/ptrumpis)
[![Liberapay](https://img.shields.io/badge/Liberapay-F6C915?style=for-the-badge&logo=liberapay&logoColor=black)](https://liberapay.com/ptrumpis/)
[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/donate/?hosted_button_id=D2T92FVZAE65L)

You can also become my GitHub Sponsor  

[![Sponsor](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/sponsors/ptrumpis)

---

© 2025 [Patrick Trumpis](https://github.com/ptrumpis)
