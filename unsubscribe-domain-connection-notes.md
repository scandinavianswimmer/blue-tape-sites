# Unsubscribe Implementation and Domain Connection Notes

## What is now live in the app

The site now has a dedicated `/unsubscribe` route.

The page is built for outreach sent from `hello@trybluetape.com`, accepts a prefilled `?email=` query parameter, records unsubscribe requests in the database, and forwards each request to the owner notification flow for follow-up.

## Preview validation

The preview route loaded successfully at `/unsubscribe?email=test@example.com`.

The page showed the correct sender address, the route-specific heading, and the email field was prefilled from the query string.

## External guidance gathered for cross-domain connection

From Postmark's March 13, 2024 article on list-unsubscribe headers:

- A `List-Unsubscribe` header can use an HTTPS unsubscribe URL.
- Inbox providers may either send the user to that URL or use it as part of native unsubscribe handling.
- Gmail and Yahoo require a valid URL-based list-unsubscribe header that supports one-click unsubscribe.
- The one-click pattern uses `List-Unsubscribe-Post: List-Unsubscribe=One-Click` with a POST-capable unsubscribe endpoint.
- Mailto can be included as a secondary mechanism, but the URL-based method should be the main one.

## Practical implication for Blue Tape Sites

The unsubscribe page does not have to live on the same domain as the From address.

You can send outreach from `hello@trybluetape.com` and point the email body link or unsubscribe header at a hosted HTTPS page such as `https://bluetapesites.com/unsubscribe?email=...`.

If you want the unsubscribe experience to visually match the sender domain, the cleaner follow-up is to either:

1. add `trybluetape.com` or a subdomain like `mail.trybluetape.com` to this web app as a custom domain and serve `/unsubscribe` there too, or
2. create a redirect on the email domain that forwards `/unsubscribe` requests to the current site domain.

## Important limitation of the current build

The website now captures unsubscribe requests, but it does not yet push those removals automatically into whichever outbound email platform is actually sending from `hello@trybluetape.com`.

That last step depends on the sending system you use, such as Instantly, Smartlead, Apollo, Mailshake, Postmark, Resend, Mailgun, or another platform.
