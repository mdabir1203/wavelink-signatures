import React from "react";
import { motion } from "framer-motion";

const ContractDocument: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Preamble */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm font-body text-document-text leading-relaxed">
          This Sustainability Ambassador Performance Agreement ("Agreement") is entered into between
          <strong> Wave Link</strong>, a technology-driven brand specializing in NFC-powered digital solutions,
          operating from Chakaria, Bangladesh ("Company"), and the undersigned Ambassador ("Ambassador"),
          collectively referred to as the "Parties." This Agreement is governed by and shall be interpreted
          in accordance with the applicable laws of the People's Republic of Bangladesh, including but not
          limited to the Bangladesh Labour Act 2006 (as amended), the Information and Communication Technology
          Act 2006, the Digital Security Act 2018, the Right to Information Act 2009, and any applicable rules
          under the Bangladesh Telecommunication Regulatory Commission (BTRC) guidelines pertaining to digital
          commerce and electronic transactions.
        </p>
      </motion.div>

      {/* Section 1: KYC */}
      <Section index={0} title="1. MANDATORY KYC (KNOW YOUR CUSTOMER) RULE">
        <p className="text-sm font-body text-document-text leading-relaxed mb-3">
          No deal is considered "Closed" or valid toward any milestone unless the customer or organization
          completes the Wave Link KYC process in full. This requirement is aligned with Bangladesh's
          Anti-Money Laundering regulations and the Prevention of Money Laundering Act 2012.
        </p>
        <div className="space-y-3 ml-4">
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              1.1 For Individual Customers:
            </p>
            <p className="text-sm font-body text-document-text leading-relaxed">
              Must provide a valid Government-issued Photo ID (National ID Card / NID, Passport, or
              Driving License issued by BRTA) and complete email verification through Wave Link's
              digital platform.
            </p>
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              1.2 For Organizations:
            </p>
            <p className="text-sm font-body text-document-text leading-relaxed">
              Must provide valid Business Registration documents (Trade License issued by the respective
              City Corporation/Municipality, TIN Certificate from the National Board of Revenue) and the
              name of an Authorized Signatory with verification of their authority to bind the organization.
            </p>
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              1.3 Ambassador KYC:
            </p>
            <p className="text-sm font-body text-document-text leading-relaxed">
              Before the first payout, the Ambassador must submit their own Government-issued Photo ID
              (NID/Passport), Tax Identification Number (TIN), and bank account details (or verified
              Mobile Financial Service account — bKash, Nagad, or Rocket) to Wave Link for identity
              verification pursuant to Bangladesh Bank's KYC directives.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 2: Milestone-Based Compensation */}
      <Section index={1} title="2. MILESTONE-BASED COMPENSATION">
        <p className="text-sm font-body text-document-text leading-relaxed mb-3">
          You get paid for every sale you finish. No fixed hours—work when you want! Commission is
          milestone-based, unlocked when the Ambassador reaches specific sales volumes. All financial
          transactions shall comply with the Bangladesh Payment and Settlement Systems Regulations 2014.
        </p>

        {/* Commission Rates for Cards */}
        <div className="mb-5">
          <p className="text-xs font-display font-semibold text-document-header tracking-widest uppercase mb-3">
            Commission Rates for Cards:
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { target: "Sell 10 Cards", rate: "7%" },
              { target: "Sell 20 Cards", rate: "14%" },
              { target: "Sell 30 Cards", rate: "20%" },
            ].map((item) => (
              <div
                key={item.target}
                className="border border-document-border rounded-lg p-4 text-center bg-accent/10"
              >
                <p className="text-xs font-body text-document-muted mb-1">{item.target}</p>
                <p className="text-xl font-display font-bold text-primary">{item.rate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Stands & Partnerships */}
        <div className="mb-5">
          <p className="text-xs font-display font-semibold text-document-header tracking-widest uppercase mb-3">
            Review Stands & Partnerships:
          </p>
          <div className="border border-document-border rounded-lg p-4 bg-accent/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-body font-semibold text-document-header">Large Organizations</p>
              <p className="text-xl font-display font-bold text-primary">20%</p>
            </div>
            <p className="text-xs font-display font-semibold text-document-header tracking-widest uppercase mb-2">
              Qualifying Examples:
            </p>
            <ul className="list-disc ml-5 space-y-0.5">
              {[
                "Gyms & Fitness Centers",
                "Boutique Shops",
                "Sports Zones",
                "Theme Parks",
                "Educational Institutions (Schools/Colleges)",
                "SME Enterprises (Small/Medium Businesses)",
                "Online Digital Marketplaces (can use loyalty cards)",
                "Consultancy Houses",
                "Coaching Centres",
                "Wellness Centres",
                "High-quality Hair Salons",
              ].map((item) => (
                <li key={item} className="text-sm font-body text-document-text leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Single Unit Sales */}
        <div className="mb-5">
          <div className="border border-document-border rounded-lg p-4 bg-accent/10">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-body font-semibold text-document-header">Single Unit Sales</p>
              <p className="text-xl font-display font-bold text-primary">5%</p>
            </div>
            <p className="text-sm font-body text-document-text leading-relaxed">
              Direct sales of individual units to small business owners or individuals.
            </p>
          </div>
        </div>

        <div className="space-y-2 ml-4">
          <p className="text-sm font-body text-document-text leading-relaxed">
            <strong>Net Revenue:</strong> Sales price minus applicable VAT (as per the Value Added Tax and
            Supplementary Duty Act 2012), taxes, and shipping costs.
          </p>
          <p className="text-sm font-body text-document-text leading-relaxed">
            <strong>Payout Timing:</strong> Payments are processed within ten (10) business days of reaching
            the milestone, via bank transfer or verified Mobile Financial Service (MFS) account. All
            applicable tax deductions at source (TDS) shall be withheld as per the Income Tax Ordinance 1984.
          </p>
        </div>
      </Section>

      {/* Section 2.5: Customer Verification & Reviews */}
      <Section index={2} title="2A. CUSTOMER VERIFICATION & REVIEWS">
        <p className="text-sm font-body text-document-text leading-relaxed mb-3">
          Help customers verify their ID and ask them to post a quick review video on YouTube, TikTok, or Facebook.
        </p>
        <div className="border-l-4 border-destructive/40 bg-destructive/5 rounded-r-lg p-3">
          <p className="text-xs font-body text-destructive leading-relaxed">
            ⚠️ Payment is only sent after the customer is verified and Wavelink receives the funds.
          </p>
        </div>
      </Section>

      {/* Section 3: Outcome-Based Responsibility */}
      <Section index={2} title="3. OUTCOME-BASED RESPONSIBILITY & CONTENT">
        <p className="text-sm font-body text-document-text leading-relaxed mb-3">
          Marketing "buzz" is only permitted once a result is secured. This ensures all promotional content
          is factual, verifiable, and compliant with the Consumer Rights Protection Act 2009 and the
          Bangladesh Advertising Standards guidelines.
        </p>
        <div className="space-y-3 ml-4">
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              3.1 Lead & Close:
            </p>
            <p className="text-sm font-body text-document-text leading-relaxed">
              Ambassador secures a sale of a WaveLink Digital Card or NFC Review Stand.
            </p>
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              3.2 KYC & Payment:
            </p>
            <p className="text-sm font-body text-document-text leading-relaxed">
              The customer completes the full KYC verification process and pays the invoice in full.
            </p>
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              3.3 The Video "Push":
            </p>
            <p className="text-sm font-body text-document-text leading-relaxed">
              Within forty-eight (48) hours of payment confirmation, the Ambassador must post one (1)
              promotional/success video to <strong>Facebook, YouTube, and TikTok</strong>.
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li className="text-sm font-body text-document-text leading-relaxed">
                <strong>Requirement:</strong> The video must highlight the specific benefits of the NFC
                product sold (e.g., "Just helped [Cafe Name] go paperless with a Review Stand!").
              </li>
              <li className="text-sm font-body text-document-text leading-relaxed">
                <strong>Disclosure:</strong> All content must clearly disclose the Ambassador's commercial
                relationship with Wave Link, in compliance with Bangladesh's Digital Commerce guidelines
                and international best practices for influencer marketing.
              </li>
              <li className="text-sm font-body text-document-text leading-relaxed">
                <strong>Verification:</strong> A link to all three (3) posts must be sent to Wave Link
                at <span className="font-mono text-xs">waavelink@gmail.com</span> to receive milestone credit.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Section 4: 14-Day Accountability */}
      <Section index={3} title="4. 14-DAY ACCOUNTABILITY CYCLE">
        <p className="text-sm font-body text-document-text leading-relaxed mb-3">
          The Ambassador's contract status is maintained through bi-weekly check-ins to ensure transparent
          performance tracking.
        </p>
        <div className="space-y-3 ml-4">
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              4.1 The Sync:
            </p>
            <p className="text-sm font-body text-document-text leading-relaxed">
              Every fourteen (14) calendar days, the Ambassador must submit a "Pipeline & KYC Report"
              to Wave Link via the designated reporting channel.
            </p>
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              4.2 Report Contents:
            </p>
            <ol className="list-decimal ml-5 space-y-1">
              <li className="text-sm font-body text-document-text leading-relaxed">
                List of all pending leads with expected close dates.
              </li>
              <li className="text-sm font-body text-document-text leading-relaxed">
                Confirmation of KYC status for all new deals closed in the reporting period.
              </li>
              <li className="text-sm font-body text-document-text leading-relaxed">
                Links to all social media posts published in the last 14 days with engagement metrics.
              </li>
            </ol>
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-document-header mb-1">
              4.3 Non-Compliance:
            </p>
            <p className="text-sm font-body text-document-text leading-relaxed">
              Missing two (2) consecutive reports shall result in <strong>immediate termination</strong> of
              this Agreement and forfeiture of all progress toward the next uncompleted milestone. Completed
              milestones with verified payouts remain unaffected.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 5: Simple Rules to Follow */}
      <Section index={5} title="5. SIMPLE RULES TO FOLLOW">
        <div className="space-y-3">
          {[
            {
              num: 1,
              title: "Follow the Law",
              text: "You must respect the Bangladesh Cyber Security Act. This means you must keep customer information private and never share it with others.",
            },
            {
              num: 2,
              title: "Be Honest",
              text: "When checking a customer's ID (KYC), always use real documents. Providing fake information is a crime and will end your work immediately.",
            },
            {
              num: 3,
              title: "Work Rules",
              text: "We follow the Bangladesh Labour Act. You have full freedom to choose when you work, but you only get paid when a task is finished and confirmed.",
            },
            {
              num: 4,
              title: "After-Sales Help",
              text: "Your job isn't finished when the sale is made. You must help the customer set up the app and make sure they are happy with their product.",
            },
            {
              num: 5,
              title: "Travel Support",
              text: "If you have to travel more than 25km for a Wavelink meeting, we will pay for your bus/travel costs. Just keep your receipts!",
            },
          ].map((rule) => (
            <div key={rule.num} className="flex gap-3 border border-document-border rounded-lg p-4 bg-accent/10">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-display font-bold text-primary-foreground">{rule.num}</span>
              </div>
              <div>
                <p className="text-sm font-body font-semibold text-document-header mb-1">
                  {rule.title}:
                </p>
                <p className="text-sm font-body text-document-text leading-relaxed">{rule.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 6: Term & Termination */}
      <Section index={5} title="6. TERM & TERMINATION">
        <p className="text-sm font-body text-document-text leading-relaxed">
          This Agreement shall commence on the Effective Date and continue for a period of twelve (12)
          months, unless terminated earlier. Either Party may terminate with thirty (30) days' written
          notice sent to the other Party's registered email address. Wave Link reserves the right to
          terminate immediately for cause, including but not limited to: fraud, KYC violations, missed
          reporting obligations (as per Section 4.3), or conduct damaging to Wave Link's reputation.
          Upon termination, the Ambassador shall cease all representation and return any Company materials.
        </p>
      </Section>

      {/* Section 7: Dispute Resolution */}
      <Section index={6} title="7. DISPUTE RESOLUTION & GOVERNING LAW">
        <p className="text-sm font-body text-document-text leading-relaxed">
          This Agreement shall be governed by and construed in accordance with the laws of the People's
          Republic of Bangladesh. Any disputes arising shall first be resolved through good-faith negotiation
          between the Parties within thirty (30) days. If unresolved, disputes shall be referred to mediation
          under the Arbitration Act 2001 of Bangladesh. If mediation fails, the matter shall be submitted to
          the competent courts of Bangladesh having jurisdiction. All correspondence regarding disputes shall
          be directed to: <span className="font-mono text-xs">waavelink@gmail.com</span>.
        </p>
      </Section>

      {/* Legal footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pt-6 mt-8 border-t border-document-border"
      >
        <p className="text-[11px] font-body text-document-muted leading-relaxed">
          IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date set forth below.
          This document constitutes the entire agreement between the Parties and supersedes all prior
          negotiations, representations, or agreements relating to this subject matter. This Agreement
          may be executed in counterparts, each of which shall be deemed an original. Both Parties
          acknowledge that they have read, understood, and agree to be bound by all terms herein, and
          that this Agreement has been entered into voluntarily and without coercion, in compliance
          with the Contract Act 1872 of Bangladesh.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-[10px] font-mono text-document-muted">
            Document secured with SHA-256 hash verification • Compliant with ICT Act 2006 (Electronic Signatures)
          </span>
        </div>
      </motion.div>
    </div>
  );
};

interface SectionProps {
  index: number;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ index, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 + 0.25 }}
  >
    <h3 className="text-sm font-display font-semibold text-document-header tracking-wide mb-3">
      {title}
    </h3>
    {children}
  </motion.div>
);

export default ContractDocument;
