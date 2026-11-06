# CCDI launch security checklist

## Project protections prepared

The site is a static export, with no public website login, CCDI-hosted enquiry endpoint, card collection or payment processing. The enquiry form submits directly to Formspree, which stores submissions, filters spam and emails the verified CCDI recipient. A honeypot is included in the form. Sanity Studio is a separate authenticated editorial service.

The cPanel ZIP includes `deployment/cpanel.htaccess`: canonical HTTPS redirects, directory listing disabled, hidden-file access denied (except certificate validation), MIME sniffing protection, framing blocked, a referrer policy, and camera/microphone/location permissions disabled. A baseline Content Security Policy blocks plugins, foreign base URLs and framing and upgrades insecure resources. It does **not** restrict script sources; a strict script policy needs an export-compatible hash strategy and browser testing. The Google Maps preview can still display and link to directions without browser geolocation.

These are deployment settings, not proof they are active on the public domain. Apache must allow the relevant overrides and load the modules. Confirm successful responses, redirects and headers after upload; resolve any HTTP 500 with hosting support. Enable HTTPS redirects only with a valid certificate. HSTS is intentionally deferred until HTTPS and certificate renewal are verified.

## Hosting owner actions — pending verification

| Priority | Control | Launch check |
| --- | --- | --- |
| Critical | SSL/HTTPS | Confirm valid certificate for creativecdi.org and www, renewal, HTTP-to-HTTPS redirect and no mixed content. |
| Critical | Account security | Enable separate 2FA for Namecheap and cPanel. Secure GitHub and Sanity accounts too; retain recovery codes privately. Use unique passwords and individual accounts where available. |
| Critical | Backups | Confirm hosting backup frequency and retention. Take a backup before each deployment and keep an independent copy outside public_html. Test a restore, including email and content. Git does not back up mailboxes or the Sanity dataset. |
| Critical | Server protection | Check Imunify360 or the available equivalent with Namecheap; availability varies by plan/server. Confirm ModSecurity is enabled for the domain. Do not assume the controls are active from their menu names. |
| High | Malware scanning | Run the available scanner before launch, review findings and confirm ongoing scans and alerts with the provider. |
| High | Spam | Configure cPanel email filtering for the public inbox. A future server-side form needs validation, rate limits and bot protection at its endpoint; a client-only CAPTCHA would not secure it. |
| High | Access | Limit cPanel, deployment, GitHub and Sanity access to authorised personnel. Remove former collaborators, review API tokens and keep secrets outside source control and the web root. |
| High | Privacy | Have CCDI approve its existing privacy and child-protection pages, third-party services and practical handling procedures. Restrict access to private donor/beneficiary records; define retention and deletion responsibilities. |
| Ongoing | Updates | Review dependency alerts and patches regularly, rebuild and check the site after changes. No WordPress/plugin installation is required for this static site. |

## Donations

The current support page does not collect card details or process payments. If online donations are added, choose a reputable hosted gateway checkout. Never request or store card numbers or security codes in site code, email, enquiry drafts or the CMS. Verify payment results server-side through the gateway before acknowledging a successful donation. Keep gateway keys and webhook secrets private.

## Before public launch

- Verify all seven official email destinations and their forwarding, plus SPF, DKIM and DMARC with the hosting provider.
- Confirm only the generated deployment ZIP contents were uploaded; do not upload `.env`, source, Git, Studio credentials, backups or private documents.
- Check navigation, forms, Maps, videos, downloads and the privacy policy after applying headers.
- Record who owns hosting security, backups, patching, privacy requests and incident response, and how to contact Namecheap if compromise is suspected.

No hosting, account, mailbox, backup or firewall configuration was changed by this repository update.

## Provider references

- [Namecheap shared-hosting security and available tools](https://www.namecheap.com/support/knowledgebase/article/9242/2194/how-to-prevent-your-hosting-account-from-being-hacked/)
- [Namecheap account 2FA](https://www.namecheap.com/support/knowledgebase/article.aspx/9253/45/how-can-i-enabledisable-twofactor-authentication/)
- [cPanel 2FA](https://www.namecheap.com/support/knowledgebase/article.aspx/10036/2210/twofactor-authentication-for-cpanel/)
- [cPanel backups and restoration](https://www.namecheap.com/support/knowledgebase/article/9365/2199/how-to-create-and-restore-backups-in-cpanel/)
