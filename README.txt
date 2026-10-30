NOVA DIGITAL STORE — STARTER WEBSITE

WHAT'S INCLUDED
- Responsive dark/premium storefront
- Product cards generated from script.js
- Placeholder checkout buttons (disabled until you add real payment links)
- FAQ and mobile layout

RUN LOCALLY
1. Extract this ZIP.
2. Open the nova-digital-store folder in VS Code.
3. Open index.html in your browser.
   Optional: install the VS Code "Live Server" extension and click "Go Live".

CUSTOMIZE PRODUCTS
1. Open script.js.
2. Edit each product's name, category, description, and price.
3. Create a real payment link in your payment provider dashboard.
4. Paste that link into the matching checkoutUrl field.
5. Test the payment flow in test mode before accepting real payments.

IMPORTANT ABOUT DIGITAL DELIVERY
This starter is a static storefront. It does NOT securely deliver paid files automatically.
Do not put private download URLs, API keys, secret keys, or customer data in index.html or script.js.
For real automatic delivery, add a server-side payment webhook that verifies the payment before issuing a one-time or expiring download link. A success/thank-you page alone is NOT proof of payment.
For a small first launch, you can manually fulfill orders after verifying payment in your payment dashboard.

FREE HOSTING WITH CLOUDFLARE PAGES
1. Create a GitHub account at https://github.com/ if you don't have one.
2. Create a new repository, for example: nova-digital-store
3. Upload the contents of this folder (index.html, styles.css, script.js).
4. Create a Cloudflare account at https://dash.cloudflare.com/
5. In Cloudflare, open Workers & Pages > Create > Pages > Connect to Git.
6. Choose the GitHub repository and deploy. No build command is needed; use the repository root as the output directory.
7. Cloudflare gives you a public *.pages.dev address.

PAYMENTS / ACCOUNT
Payment processing is not free: providers charge transaction fees. Payment provider eligibility and verification rules apply. If you are under 18, Stripe requires an adult legal guardian to be the account owner/representative before the account can accept charges and pay out funds. See:
https://support.stripe.com/questions/can-i-use-stripe-if-i-am-under-18

BEFORE LAUNCH
- Replace NOVA with your chosen store name.
- Replace all sample product information.
- Add real checkout links.
- Add a real support email/contact method.
- Publish clear refund, delivery, and terms policies that match what you actually offer.
- Test checkout and fulfillment.
- Only sell products you own or are authorized to distribute.
