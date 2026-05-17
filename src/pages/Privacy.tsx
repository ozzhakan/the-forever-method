import { LegalLayout, LegalH2, LegalH3, LegalP, LegalUL } from "./LegalLayout";

const CONTACT_EMAIL = "krudstina@gmail.com";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 17, 2026">
      <LegalP>
        The Unhooked Method™ ("we", "us", "our") respects your privacy. This Privacy
        Policy explains what personal data we collect when you visit
        theunhookedmethod.com or purchase the course, why we collect it, how we use
        it, who we share it with, and what rights you have. We follow the EU General
        Data Protection Regulation (GDPR) and equivalent privacy laws.
      </LegalP>

      <LegalH2>1. Who we are</LegalH2>
      <LegalP>
        The Unhooked Method is operated by Kristina Oz, based in the Netherlands. For
        any privacy question, write to <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-700 font-semibold hover:text-amber-900 underline">{CONTACT_EMAIL}</a>{" "}
        or message us on WhatsApp at +31 6 18784896.
      </LegalP>

      <LegalH2>2. What we collect</LegalH2>
      <LegalH3>2.1 Information you give us directly</LegalH3>
      <LegalUL items={[
        <><strong>Email address</strong> — when you purchase the course (via PayPal) or contact us.</>,
        <><strong>Name</strong> — if you choose to share it when contacting us on WhatsApp or by email.</>,
        <><strong>Photos / receipts</strong> — only if you voluntarily send them to us on WhatsApp during the course's two optional intermissions. We store them only as long as needed to respond, then delete.</>,
      ]} />

      <LegalH3>2.2 Information collected automatically</LegalH3>
      <LegalUL items={[
        <><strong>Usage data</strong> — pages visited, time on page, scroll depth, clicks. Collected via Microsoft Clarity (anonymised heatmaps and session recordings — no full keystroke capture, sensitive form fields are masked).</>,
        <><strong>Device + browser info</strong> — browser type, operating system, approximate location (city-level via IP). Used for analytics and to fix display bugs.</>,
        <><strong>Cookies</strong> — see Section 6.</>,
      ]} />

      <LegalH2>3. Why we collect it (legal basis)</LegalH2>
      <LegalUL items={[
        <><strong>To deliver the course you purchased</strong> — contract performance (GDPR Art. 6(1)(b)).</>,
        <><strong>To answer your questions on WhatsApp or email</strong> — contract performance + legitimate interest.</>,
        <><strong>To improve the site</strong> — legitimate interest (analytics).</>,
        <><strong>To run advertising</strong> — consent (where required) and legitimate interest. You can opt out at any time via your browser's tracking preferences.</>,
        <><strong>To comply with tax and accounting law</strong> — legal obligation (we keep purchase records for 7 years as required in the Netherlands).</>,
      ]} />

      <LegalH2>4. Who we share data with</LegalH2>
      <LegalP>
        We do not sell your data. We share it only with the third-party services we
        rely on to operate:
      </LegalP>
      <LegalUL items={[
        <><strong>PayPal</strong> — payment processing. PayPal collects payment info directly; we never see your card or bank details. See <a className="text-amber-700 font-semibold hover:text-amber-900 underline" href="https://www.paypal.com/privacy" target="_blank" rel="noopener noreferrer">paypal.com/privacy</a>.</>,
        <><strong>Meta (Facebook) Pixel + Conversions API</strong> — measures which ads brought you and which actions you took (page view, purchase). Lets us run ads efficiently. See <a className="text-amber-700 font-semibold hover:text-amber-900 underline" href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</a>.</>,
        <><strong>Microsoft Clarity</strong> — anonymised heatmaps and session recordings. Sensitive inputs (passwords, payment fields) are automatically masked. See <a className="text-amber-700 font-semibold hover:text-amber-900 underline" href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a>.</>,
        <><strong>Datahash</strong> — server-side relay of Meta events (helps deduplication, no extra data shared beyond what Pixel already sees).</>,
        <><strong>Vercel</strong> — hosts theunhookedmethod.com. May process basic request logs (IP, page) as part of normal hosting.</>,
        <><strong>WhatsApp / Meta</strong> — if you contact us on WhatsApp, message content is handled by WhatsApp's encryption + your data is governed by their policy.</>,
      ]} />

      <LegalH2>5. International transfers</LegalH2>
      <LegalP>
        Some of the providers above (PayPal, Meta, Microsoft, Vercel) are based in
        the United States. Where data is transferred outside the EU/EEA, it's done
        under the EU Standard Contractual Clauses or an equivalent valid mechanism.
      </LegalP>

      <LegalH2>6. Cookies and similar technologies</LegalH2>
      <LegalP>
        We use a small number of cookies and similar tracking pixels for:
      </LegalP>
      <LegalUL items={[
        <><strong>Strictly necessary</strong> — to remember your course progress (localStorage). Cannot be disabled.</>,
        <><strong>Analytics</strong> — Microsoft Clarity for heatmaps and session recordings.</>,
        <><strong>Advertising</strong> — Meta Pixel + Datahash for ad attribution.</>,
      ]} />
      <LegalP>
        You can block cookies via your browser settings. Blocking advertising cookies
        will not affect access to the course you purchased.
      </LegalP>

      <LegalH2>7. How long we keep your data</LegalH2>
      <LegalUL items={[
        <><strong>Purchase records (email, transaction)</strong> — 7 years (Dutch tax law).</>,
        <><strong>WhatsApp messages</strong> — until you ask us to delete them, or until the conversation concludes naturally.</>,
        <><strong>Photos sent during intermissions</strong> — deleted within 30 days of the conversation closing.</>,
        <><strong>Analytics data (Clarity)</strong> — retained per Microsoft's default (currently 1 year).</>,
        <><strong>Ad tracking data (Meta)</strong> — retained per Meta's policy (currently up to 2 years).</>,
      ]} />

      <LegalH2>8. Your rights (GDPR)</LegalH2>
      <LegalP>
        Under EU law you have the right to:
      </LegalP>
      <LegalUL items={[
        "Request a copy of the personal data we hold about you (access).",
        "Ask us to correct anything that's wrong (rectification).",
        "Ask us to delete your data (erasure / right to be forgotten).",
        "Ask us to limit how we use your data (restriction).",
        "Receive your data in a portable format (portability).",
        "Object to our use of your data for marketing.",
        "Withdraw consent at any time (where consent was the legal basis).",
      ]} />
      <LegalP>
        To exercise any of these rights, email <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-700 font-semibold hover:text-amber-900 underline">{CONTACT_EMAIL}</a>. We aim to respond within 30 days. You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).
      </LegalP>

      <LegalH2>9. Children</LegalH2>
      <LegalP>
        The course is intended for adults (18+). We do not knowingly collect data
        from anyone under 18. If you believe a child has provided us with personal
        data, contact us and we'll delete it.
      </LegalP>

      <LegalH2>10. Changes to this policy</LegalH2>
      <LegalP>
        We may update this policy from time to time. The "Last updated" date at the
        top will always reflect the latest version. Material changes will be
        announced via email to course members.
      </LegalP>

      <LegalH2>11. Contact</LegalH2>
      <LegalP>
        Any question about your privacy: email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-700 font-semibold hover:text-amber-900 underline">{CONTACT_EMAIL}</a>
        {" "}or message +31 6 18784896 on WhatsApp.
      </LegalP>
    </LegalLayout>
  );
}
