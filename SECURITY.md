# Security notes for the website

This static site is designed with security in mind:

- No third-party JavaScript or CSS frameworks loaded from CDNs
- Content-Security-Policy meta tag restricts sources to `'self'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disables unnecessary features
- External links use `rel="noopener noreferrer"`
- No forms that accept user input (marketing site only)
- Logo and assets are self-hosted

For the full InfraSphere security policy, see the main repository:

https://github.com/SbruiceS/InfraSphere/blob/main/SECURITY.md

Report website issues via the main repository's private vulnerability process.
