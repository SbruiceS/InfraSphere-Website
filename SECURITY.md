# Security notes for the InfraSphere website

Static GitHub Pages site. No backend, no user input forms, no third-party scripts.

## Implemented controls
- Content-Security-Policy meta: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: disables geolocation, microphone, camera, payment
- X-Frame-Options: DENY
- All assets self-hosted
- External links use rel="noopener noreferrer" where present
- .nojekyll present

## Limitations (GitHub Pages)
GitHub Pages does not allow arbitrary response headers on project sites without a custom domain and external CDN. Meta tags provide the practical equivalent for CSP, referrer, and permissions on this static site.

## Reporting
Report issues via the main InfraSphere repository private vulnerability process.
