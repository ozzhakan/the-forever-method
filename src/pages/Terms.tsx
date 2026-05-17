import { LegalLayout, LegalH2, LegalP, LegalUL } from "./LegalLayout";

const CONTACT_EMAIL = "krudstina@gmail.com";

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 17, 2026">
      <LegalP>
        These Terms govern your use of theunhookedmethod.com and your purchase of
        The Unhooked Method™ course ("the Course"). By visiting the site or buying
        access, you agree to these Terms. If you don't agree, please don't use the
        site.
      </LegalP>

      <LegalH2>1. What you're buying</LegalH2>
      <LegalP>
        The Unhooked Method is a self-paced digital education product. For a
        one-time payment of $29 USD you receive:
      </LegalP>
      <LegalUL items={[
        "9 in-depth video modules plus Welcome and My Story intro videos.",
        "2 intermissions structured as environment checkpoints (your kitchen and a grocery receipt).",
        "19 downloadable PDF resources (cheat sheets, templates, women-specific guides).",
        "A curated Watch List of recommended videos, which grows over time.",
        "WhatsApp support from the Unhooked Method team during the course.",
        "Lifetime access — no subscription, no recurring charges.",
      ]} />

      <LegalH2>2. Your account / access</LegalH2>
      <LegalP>
        Access is delivered immediately after payment via a link to the platform at{" "}
        theunhookedmethod.com/learn. Your purchase grants a personal,
        non-transferable, non-exclusive license to access the Course content for
        your own use. You may not:
      </LegalP>
      <LegalUL items={[
        "Share your access link or login credentials with anyone else.",
        "Re-sell, redistribute, sublicense, or rent the Course or any part of it.",
        "Reproduce or publish Course materials publicly (including on social media).",
        "Use any automated tool, scraper, or bot to download Course content in bulk.",
        "Reverse-engineer or extract source materials for competing products.",
      ]} />
      <LegalP>
        We reserve the right to revoke access without refund if these restrictions
        are breached.
      </LegalP>

      <LegalH2>3. Payment</LegalH2>
      <LegalP>
        Payment is processed by PayPal. The Course price is $29 USD, one-time, with
        no recurring charges, no upsells, and no hidden fees. Applicable VAT or
        sales tax may be added at checkout depending on your country.
      </LegalP>

      <LegalH2>4. Refunds</LegalH2>
      <LegalP>
        You have 14 days from purchase to request a full refund — no questions, no
        forms. See our <a href="/refund" className="text-amber-700 font-semibold hover:text-amber-900 underline">Refund Policy</a> for the full process.
      </LegalP>

      <LegalH2>5. Educational nature — not medical advice</LegalH2>
      <LegalP>
        The Course is educational content. It is <strong>not</strong> medical advice,
        medical treatment, nutritional counselling, or psychiatric therapy. Kristina
        Oz is a founder and educator with formal training in nutrition science and
        ten years of personal recovery — she is not your doctor.
      </LegalP>
      <LegalP>
        If you have an eating disorder (anorexia, bulimia, binge eating disorder),
        diabetes, are pregnant or breastfeeding, or are being treated for any
        condition where your diet is clinically managed, please consult your doctor
        before making changes based on the Course material. The Course is not a
        substitute for individualised medical care.
      </LegalP>

      <LegalH2>6. No guarantee of results</LegalH2>
      <LegalP>
        Outcomes depend on you. Most participants notice meaningful change in
        cravings within 1–4 weeks of consistently applying the framework, and
        downstream improvements (skin, energy, hormones) typically appear between
        weeks 3 and 12. These are not promises. We do not guarantee any specific
        result, weight loss, health outcome, or financial outcome.
      </LegalP>

      <LegalH2>7. Intellectual property</LegalH2>
      <LegalP>
        All Course content — videos, PDFs, written material, design, branding, and
        the name "The Unhooked Method" — is owned by Kristina Oz and protected by
        copyright and trademark law. Your purchase grants a personal use license
        only. Nothing in these Terms transfers any intellectual property to you.
      </LegalP>

      <LegalH2>8. WhatsApp support</LegalH2>
      <LegalP>
        WhatsApp support is provided by the Unhooked Method team. We read every
        message and respond when it's useful. We do not guarantee a response time;
        we aim for within 1–2 business days. WhatsApp support is part of the Course
        license — please do not share the number publicly or use it for unrelated
        purposes.
      </LegalP>

      <LegalH2>9. Third-party services</LegalH2>
      <LegalP>
        The site relies on third parties (PayPal for payments, Vercel for hosting,
        Meta and Microsoft for analytics). Their Terms also apply where relevant.
        We are not responsible for outages or changes in those services.
      </LegalP>

      <LegalH2>10. Limitation of liability</LegalH2>
      <LegalP>
        To the maximum extent permitted by law, The Unhooked Method's total
        liability to you for any claim arising from your purchase or use of the
        Course is limited to the amount you paid for the Course ($29). We are not
        liable for indirect, consequential, or incidental damages — including
        without limitation loss of income, loss of data, or any health outcome you
        attribute to applying or not applying the Course material.
      </LegalP>

      <LegalH2>11. Termination</LegalH2>
      <LegalP>
        You can stop using the Course at any time. We can suspend or terminate your
        access if you breach these Terms (e.g. sharing credentials, redistributing
        content). Where reasonable, we'll give you notice and a chance to correct
        the issue first.
      </LegalP>

      <LegalH2>12. Governing law and jurisdiction</LegalH2>
      <LegalP>
        These Terms are governed by the law of the Netherlands. Any dispute will be
        settled in the courts of the Netherlands, unless mandatory consumer
        protection law in your country gives you stronger rights — in which case
        those rights apply.
      </LegalP>

      <LegalH2>13. Changes to these Terms</LegalH2>
      <LegalP>
        We may update these Terms from time to time. The "Last updated" date at the
        top will reflect the latest version. Continued use of the site after a
        change means you accept the new Terms.
      </LegalP>

      <LegalH2>14. Contact</LegalH2>
      <LegalP>
        Questions about these Terms: <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-700 font-semibold hover:text-amber-900 underline">{CONTACT_EMAIL}</a> or WhatsApp +31 6 18784896.
      </LegalP>
    </LegalLayout>
  );
}
