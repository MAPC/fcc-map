
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-tsx": preferDefault(require("/Users/kimberly/Documents/Repositories/retrofitting-suburbia/src/pages/404.tsx")),
  "component---src-pages-about-tsx": preferDefault(require("/Users/kimberly/Documents/Repositories/retrofitting-suburbia/src/pages/about.tsx")),
  "component---src-pages-index-tsx": preferDefault(require("/Users/kimberly/Documents/Repositories/retrofitting-suburbia/src/pages/index.tsx"))
}

