# Website enquiries

Formspree project: **CreativeCdi**.
Form: **CCDI website enquiries** (`mgaaqbbw`).
Endpoint: `https://formspree.io/f/mgaaqbbw`.
Recipient: `creativeselfcraft2008@gmail.com` (verified in Formspree).

The contact page uses one shared form for general enquiries, training, volunteering, membership, enterprise services, partnerships, donations and returning forms. Department contact cards also link to this form with a prefilled topic. All messages go to the same verified inbox, with their topic in the subject and submission fields. The displayed role-based email addresses remain available as direct email alternatives.

Visitors enter a name, email address, optional phone, topic and message. AJAX submits directly to Formspree without a website backend. Without JavaScript, the form's native POST action submits to the same endpoint. Reply to the notification to reach the visitor's email address. There are no API secrets in the website.

The form prevents repeat clicks while sending, preserves details on errors, resets after success and announces its status accessibly. Formspree Formshield is enabled; a hidden `_gotcha` honeypot is also included. CAPTCHA is disabled in the new form's default settings. No spam protections were disabled during setup.

Manage submissions and email routing in [Formspree](https://formspree.io/forms/mgaaqbbw/submissions). Its current account allowance is 50 submissions per month shared across the account's forms, as shown during setup. Monitor the quota in Formspree.

To change the recipient, add and verify the new address in Formspree before changing the form's Target Email. To change the endpoint, edit `src/lib/contact-form.ts` and rebuild/redeploy the site. Frontend and privacy changes require a website deployment; Formspree's recipient setting takes effect immediately.
