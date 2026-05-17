import { LegalLayout, LegalH2, LegalP, LegalUL } from "./LegalLayout";

const CONTACT_EMAIL = "krudstina@gmail.com";

export default function Refund() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="May 17, 2026">
      <LegalP>
        We want you to feel completely safe trying The Unhooked Method™. If it
        isn't the right fit for you, we'll refund your purchase — no forms, no
        questions, no awkward exit survey.
      </LegalP>

      <LegalH2>1. 14-day money-back guarantee</LegalH2>
      <LegalP>
        You have <strong>14 calendar days</strong> from the date of your purchase
        to request a full refund of $29 USD. That's roughly twice the time it
        takes most participants to complete the core video modules, so you have
        plenty of room to evaluate the Course honestly.
      </LegalP>

      <LegalH2>2. How to request a refund</LegalH2>
      <LegalP>
        Pick whichever is easiest for you:
      </LegalP>
      <LegalUL items={[
        <>Email{" "}<a href={`mailto:${CONTACT_EMAIL}?subject=Refund%20request`} className="text-amber-700 font-semibold hover:text-amber-900 underline">{CONTACT_EMAIL}</a> with the subject line "Refund request".</>,
        <>Or message us on WhatsApp at <strong>+31 6 18784896</strong>.</>,
      ]} />
      <LegalP>
        Please include the email address you used at checkout so we can locate
        your purchase quickly. You don't need to explain why — but if you feel
        like sharing what didn't work for you, we read every word and use it to
        improve.
      </LegalP>

      <LegalH2>3. Processing time</LegalH2>
      <LegalP>
        Refunds are processed within <strong>3 business days</strong> of your
        request. PayPal then takes another <strong>2 to 10 business days</strong>{" "}
        to return the funds to your original payment method, depending on your
        bank or card provider.
      </LegalP>

      <LegalH2>4. What happens to your access</LegalH2>
      <LegalP>
        Once the refund is issued, your access to the Course content will be
        deactivated. This is automatic. You're welcome to come back later — just
        purchase again whenever you're ready.
      </LegalP>

      <LegalH2>5. After 14 days</LegalH2>
      <LegalP>
        Refunds are not available after 14 days from purchase. The Course is a
        digital product with lifetime access — most of the value compounds as you
        revisit modules over time, so we'd much rather work with you to make it
        useful than say goodbye later. If you're struggling, message us on
        WhatsApp before time runs out.
      </LegalP>

      <LegalH2>6. Exceptional cases</LegalH2>
      <LegalP>
        If something unusual happens (medical emergency, accidental duplicate
        purchase, technical issue that prevents access), reach out even after the
        14-day window. We handle these case by case and try to do the right
        thing.
      </LegalP>

      <LegalH2>7. Why we offer this</LegalH2>
      <LegalP>
        Because the Course works for most people who actually do the work — and
        for the few it doesn't fit, we'd rather you walk away whole than stay
        annoyed. That's the deal.
      </LegalP>

      <LegalH2>8. Contact</LegalH2>
      <LegalP>
        Any question about refunds: email <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-700 font-semibold hover:text-amber-900 underline">{CONTACT_EMAIL}</a> or WhatsApp +31 6 18784896. We aim to reply within 1 business day.
      </LegalP>
    </LegalLayout>
  );
}
