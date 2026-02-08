import React from "react";
import wavelinkLogo from "@/assets/wavelink-logo.png";

interface SignerInfo {
  name: string;
  email: string;
  title: string;
  organization: string;
  govId?: string;
  taxId?: string;
}

interface PrintableContractProps {
  contractId: string;
  date: string;
  status: "draft" | "pending" | "signed";
  companyInfo: SignerInfo;
  ambassadorInfo: SignerInfo;
  ambassadorSignatureData?: string | null;
  companySigned?: boolean;
  companySignedDate?: string;
  ambassadorSignedDate?: string;
}

const PrintableContract: React.FC<PrintableContractProps> = ({
  contractId,
  date,
  status,
  companyInfo,
  ambassadorInfo,
  ambassadorSignatureData,
  companySigned = true,
  companySignedDate,
  ambassadorSignedDate,
}) => {
  const statusLabels = {
    draft: "DRAFT",
    pending: "PENDING SIGNATURE",
    signed: "FULLY EXECUTED",
  };

  return (
    <div
      style={{
        width: "794px",
        padding: "48px 56px",
        fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif",
        color: "#1a2940",
        backgroundColor: "#ffffff",
        lineHeight: 1.6,
        fontSize: "12px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #d4dce8", paddingBottom: "20px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img src={wavelinkLogo} alt="Wave Link" style={{ width: "52px", height: "52px", objectFit: "contain" }} />
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 700, margin: 0, color: "#1a2940" }}>
              Wave Link
            </h1>
            <p style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b7a8d", margin: "2px 0 0 0" }}>
              Smart Digital Solutions
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{
            display: "inline-block",
            padding: "3px 12px",
            fontSize: "9px",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            borderRadius: "12px",
            border: status === "signed" ? "1.5px solid hsl(200 75% 38%)" : status === "pending" ? "1.5px solid hsl(25 85% 55%)" : "1.5px solid hsl(42 80% 55%)",
            color: status === "signed" ? "hsl(200 75% 38%)" : status === "pending" ? "hsl(25 85% 55%)" : "hsl(42 80% 55%)",
            backgroundColor: status === "signed" ? "hsl(200 75% 38% / 0.1)" : status === "pending" ? "hsl(25 85% 55% / 0.1)" : "hsl(42 80% 55% / 0.1)",
          }}>
            {statusLabels[status]}
          </span>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 600, margin: "0 0 4px 0", color: "#1a2940" }}>
          Sustainability Ambassador Program
        </h2>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "14px", margin: 0, color: "#1a2940", opacity: 0.8 }}>
          Partnership Agreement
        </p>
        <div style={{ width: "48px", height: "2px", background: "hsl(200 75% 38%)", margin: "12px auto 0" }} />
      </div>

      {/* Meta */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "24px" }}>
        <span>Contract ID: {contractId}</span>
        <span>Date: {date}</span>
      </div>

      {/* Preamble */}
      <p style={{ fontSize: "12px", marginBottom: "20px" }}>
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

      {/* Section 1 */}
      <SectionTitle>1. MANDATORY KYC (KNOW YOUR CUSTOMER) RULE</SectionTitle>
      <p style={{ marginBottom: "8px" }}>
        No deal is considered "Closed" or valid toward any milestone unless the customer or organization
        completes the Wave Link KYC process in full. This requirement is aligned with Bangladesh's
        Anti-Money Laundering regulations and the Prevention of Money Laundering Act 2012.
      </p>
      <div style={{ marginLeft: "16px" }}>
        <SubSection title="1.1 For Individual Customers:">
          Must provide a valid Government-issued Photo ID (National ID Card / NID, Passport, or
          Driving License issued by BRTA) and complete email verification through Wave Link's digital platform.
        </SubSection>
        <SubSection title="1.2 For Organizations:">
          Must provide valid Business Registration documents (Trade License issued by the respective
          City Corporation/Municipality, TIN Certificate from the National Board of Revenue) and the
          name of an Authorized Signatory with verification of their authority to bind the organization.
        </SubSection>
        <SubSection title="1.3 Ambassador KYC:">
          Before the first payout, the Ambassador must submit their own Government-issued Photo ID
          (NID/Passport), Tax Identification Number (TIN), and bank account details (or verified
          Mobile Financial Service account — bKash, Nagad, or Rocket) to Wave Link for identity
          verification pursuant to Bangladesh Bank's KYC directives.
        </SubSection>
      </div>

      {/* Section 2 */}
      <SectionTitle>2. MILESTONE-BASED COMPENSATION</SectionTitle>
      <p style={{ marginBottom: "8px" }}>
        Commission is <strong>not</strong> paid per-unit. It is unlocked only when the Ambassador reaches
        specific sales volumes of Digital Cards or NFC Review Stands (1 Unit = 1 Card or 1 Stand). All
        financial transactions shall comply with the Bangladesh Payment and Settlement Systems Regulations 2014.
      </p>

      {/* Milestone Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", margin: "12px 0", fontSize: "11px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f5fa" }}>
            <th style={{ textAlign: "left", padding: "8px 12px", fontSize: "10px", fontWeight: 600, borderBottom: "1px solid #d4dce8", color: "#1a2940" }}>Milestone</th>
            <th style={{ textAlign: "left", padding: "8px 12px", fontSize: "10px", fontWeight: 600, borderBottom: "1px solid #d4dce8", color: "#1a2940" }}>Target</th>
            <th style={{ textAlign: "left", padding: "8px 12px", fontSize: "10px", fontWeight: 600, borderBottom: "1px solid #d4dce8", color: "#1a2940" }}>Payout (20% of Net Revenue)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={cellStyle}>Level 1</td><td style={cellStyle}>10 Units Sold</td><td style={cellStyle}>20% of total revenue for the first 10 units</td></tr>
          <tr style={{ backgroundColor: "#f8fafc" }}><td style={cellStyle}>Level 2</td><td style={cellStyle}>20 Units Sold</td><td style={cellStyle}>20% of total revenue for units 11–20</td></tr>
          <tr><td style={cellStyle}>Level 3</td><td style={cellStyle}>30 Units Sold</td><td style={cellStyle}>20% of total revenue for units 21–30</td></tr>
        </tbody>
      </table>

      <div style={{ marginLeft: "16px", marginBottom: "16px" }}>
        <p style={{ marginBottom: "4px" }}><strong>Net Revenue:</strong> Sales price minus applicable VAT (as per the Value Added Tax and Supplementary Duty Act 2012), taxes, and shipping costs.</p>
        <p><strong>Payout Timing:</strong> Payments are processed within ten (10) business days of reaching the milestone, via bank transfer or verified Mobile Financial Service (MFS) account.</p>
      </div>

      {/* Section 3 */}
      <SectionTitle>3. OUTCOME-BASED RESPONSIBILITY & CONTENT</SectionTitle>
      <p style={{ marginBottom: "8px" }}>
        Marketing "buzz" is only permitted once a result is secured. This ensures all promotional content
        is factual, verifiable, and compliant with the Consumer Rights Protection Act 2009.
      </p>
      <div style={{ marginLeft: "16px" }}>
        <SubSection title="3.1 Lead & Close:">Ambassador secures a sale of a WaveLink Digital Card or NFC Review Stand.</SubSection>
        <SubSection title="3.2 KYC & Payment:">The customer completes the full KYC verification process and pays the invoice in full.</SubSection>
        <SubSection title="3.3 The Video 'Push':">
          Within forty-eight (48) hours of payment confirmation, the Ambassador must post one (1)
          promotional/success video to Facebook, YouTube, and TikTok. The video must highlight the specific
          benefits of the NFC product sold and clearly disclose the Ambassador's commercial relationship with Wave Link.
          Links to all three (3) posts must be sent to waavelink@gmail.com to receive milestone credit.
        </SubSection>
      </div>

      {/* Section 4 */}
      <SectionTitle>4. 14-DAY ACCOUNTABILITY CYCLE</SectionTitle>
      <div style={{ marginLeft: "16px" }}>
        <SubSection title="4.1 The Sync:">Every fourteen (14) calendar days, the Ambassador must submit a "Pipeline & KYC Report" to Wave Link.</SubSection>
        <SubSection title="4.2 Report Contents:">List of all pending leads, confirmation of KYC status for all new deals, and links to all social media posts published.</SubSection>
        <SubSection title="4.3 Non-Compliance:">Missing two (2) consecutive reports shall result in immediate termination of this Agreement and forfeiture of all progress toward the next uncompleted milestone.</SubSection>
      </div>

      {/* Section 5 */}
      <SectionTitle>5. LEGAL & CONDUCT STANDARDS</SectionTitle>
      <div style={{ marginLeft: "16px" }}>
        <SubSection title="5.1 Independent Contractor Status:">The Ambassador is an independent contractor, not an employee. Solely responsible for their own tax obligations.</SubSection>
        <SubSection title="5.2 Data Privacy & Security:">Must handle all lead and customer information securely per the Digital Security Act 2018.</SubSection>
        <SubSection title="5.3 Non-Compete:">During the term and for six (6) months post-termination, no competing NFC products within Bangladesh.</SubSection>
        <SubSection title="5.4 Intellectual Property:">All promotional content jointly owned. Non-exclusive, revocable license to use Wave Link trademarks.</SubSection>
        <SubSection title="5.5 Anti-Fraud:">Fraudulent activity results in immediate termination and potential legal action.</SubSection>
      </div>

      {/* Section 6 */}
      <SectionTitle>6. TERM & TERMINATION</SectionTitle>
      <p style={{ marginBottom: "16px" }}>
        This Agreement shall commence on the Effective Date and continue for twelve (12) months.
        Either Party may terminate with thirty (30) days' written notice. Wave Link reserves the right to
        terminate immediately for cause.
      </p>

      {/* Section 7 */}
      <SectionTitle>7. DISPUTE RESOLUTION & GOVERNING LAW</SectionTitle>
      <p style={{ marginBottom: "16px" }}>
        Governed by the laws of Bangladesh. Disputes resolved through negotiation, then mediation under the
        Arbitration Act 2001, then competent courts. Contact: waavelink@gmail.com.
      </p>

      {/* Witness clause */}
      <div style={{ borderTop: "1px solid #d4dce8", paddingTop: "12px", marginTop: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "10px", color: "#6b7a8d" }}>
          IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date set forth below.
          This document constitutes the entire agreement between the Parties and supersedes all prior
          negotiations, representations, or agreements relating to this subject matter.
        </p>
      </div>

      {/* ===== SIGNATURE SECTION ===== */}
      <div style={{ borderTop: "2px solid #d4dce8", paddingTop: "20px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "6px", color: "#1a2940" }}>
          AGREEMENT SIGN-OFF
        </h3>
        <p style={{ fontSize: "10px", color: "#6b7a8d", marginBottom: "20px" }}>
          Both parties must complete KYC verification before this agreement is considered binding.
        </p>

        <div style={{ display: "flex", gap: "32px" }}>
          {/* Company signer */}
          <div style={{ flex: 1 }}>
            <SignerBlock label="Company Representative" signer={companyInfo} />
            <div style={{ border: "1.5px solid hsl(200 40% 70%)", borderRadius: "8px", padding: "14px", marginTop: "12px", backgroundColor: "#f6f8fa" }}>
              <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "4px" }}>Signed digitally</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", fontStyle: "italic", color: "#1a2940" }}>{companyInfo.name}</p>
              <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginTop: "4px" }}>
                {companySignedDate || date} • Verified
              </p>
            </div>
          </div>

          {/* Ambassador signer */}
          <div style={{ flex: 1 }}>
            <SignerBlock label="Ambassador" signer={ambassadorInfo} showKyc />
            <div style={{
              border: `1.5px solid ${ambassadorSignatureData ? "hsl(200 40% 70%)" : "#d4dce8"}`,
              borderRadius: "8px",
              padding: "14px",
              marginTop: "12px",
              backgroundColor: "#f6f8fa",
              minHeight: "80px",
            }}>
              {ambassadorSignatureData ? (
                <>
                  <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "4px" }}>Signed digitally</p>
                  <img
                    src={ambassadorSignatureData}
                    alt="Ambassador Signature"
                    style={{ maxHeight: "50px", maxWidth: "100%" }}
                  />
                  <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginTop: "4px" }}>
                    {ambassadorSignedDate || date} • Verified
                  </p>
                </>
              ) : (
                <p style={{ fontSize: "10px", color: "#a0aec0", fontStyle: "italic" }}>Awaiting signature</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #d4dce8", marginTop: "28px", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d" }}>
        <span>© 2026 Wave Link — Smart Digital Solutions • All rights reserved</span>
        <span>Document secured with SHA-256 hash verification</span>
      </div>
    </div>
  );
};

// Sub-components for cleaner structure

const cellStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderBottom: "1px solid #e8ecf0",
  color: "#1a2940",
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: "#1a2940",
    marginBottom: "8px",
    marginTop: "18px",
  }}>
    {children}
  </h3>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: "6px" }}>
    <p style={{ fontWeight: 600, fontSize: "12px", color: "#1a2940", marginBottom: "2px" }}>{title}</p>
    <p style={{ fontSize: "12px", color: "#1a2940" }}>{children}</p>
  </div>
);

interface SignerBlockProps {
  label: string;
  signer: {
    name: string;
    email: string;
    title: string;
    organization: string;
    govId?: string;
    taxId?: string;
  };
  showKyc?: boolean;
}

const SignerBlock: React.FC<SignerBlockProps> = ({ label, signer, showKyc }) => (
  <div>
    <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", color: "#1a2940" }}>
      {label}
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "11px" }}>
      <div>
        <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "2px" }}>Full Name</p>
        <p style={{ fontWeight: 500 }}>{signer.name || "—"}</p>
      </div>
      <div>
        <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "2px" }}>Email</p>
        <p style={{ fontWeight: 500 }}>{signer.email || "—"}</p>
      </div>
      <div>
        <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "2px" }}>Title / Role</p>
        <p style={{ fontWeight: 500 }}>{signer.title || "—"}</p>
      </div>
      <div>
        <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "2px" }}>Organization</p>
        <p style={{ fontWeight: 500 }}>{signer.organization || "—"}</p>
      </div>
    </div>
    {showKyc && (
      <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px dashed #d4dce8" }}>
        <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: "hsl(200 75% 38%)", letterSpacing: "0.08em", marginBottom: "6px" }}>
          ● KYC VERIFICATION
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "11px" }}>
          <div>
            <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "2px" }}>Government ID (NID/Passport)</p>
            <p style={{ fontWeight: 500 }}>{signer.govId || "—"}</p>
          </div>
          <div>
            <p style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: "#6b7a8d", marginBottom: "2px" }}>TIN</p>
            <p style={{ fontWeight: 500 }}>{signer.taxId || "—"}</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default PrintableContract;
