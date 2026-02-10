import { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PrintableContract from "@/components/PrintableContract";

interface SignerInfo {
  name: string;
  email: string;
  futureTitle?: string;
  nid?: string;
  institution?: string;
  // SECURITY: KYC data should NOT be included in PDF exports
  // govId and taxId should be handled server-side only
}

interface ExportPdfOptions {
  contractId: string;
  date: string;
  status: "draft" | "pending" | "signed";
  companyInfo: SignerInfo;
  ambassadorInfo: SignerInfo;
  ambassadorSignatureData?: string | null;
  companySignedDate?: string;
  ambassadorSignedDate?: string;
}

export function useExportPdf() {
  const [exporting, setExporting] = useState(false);

  const exportPdf = useCallback(async (options: ExportPdfOptions) => {
    setExporting(true);

    try {
      // SECURITY: Sanitize ambassador info to exclude KYC data
      const sanitizedAmbassadorInfo = {
        name: options.ambassadorInfo.name,
        email: options.ambassadorInfo.email,
        futureTitle: options.ambassadorInfo.futureTitle,
        nid: options.ambassadorInfo.nid,
        institution: options.ambassadorInfo.institution,
      };

      // Create a hidden container
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.zIndex = "-1";
      document.body.appendChild(container);

      // Render the printable contract
      const root = createRoot(container);
      
      await new Promise<void>((resolve) => {
        root.render(
          <PrintableContract
            contractId={options.contractId}
            date={options.date}
            status={options.status}
            companyInfo={options.companyInfo}
            ambassadorInfo={sanitizedAmbassadorInfo}
            ambassadorSignatureData={options.ambassadorSignatureData}
            companySignedDate={options.companySignedDate}
            ambassadorSignedDate={options.ambassadorSignedDate}
          />
        );
        // Wait for images to load and React to render
        setTimeout(resolve, 500);
      });

      const printableElement = container.firstElementChild as HTMLElement;
      if (!printableElement) throw new Error("Failed to render contract");

      // Capture with html2canvas
      const canvas = await html2canvas(printableElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Calculate PDF dimensions (A4)
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 8; // mm

      const contentWidth = pdfWidth - margin * 2;
      const imgAspect = canvas.height / canvas.width;
      const scaledHeight = contentWidth * imgAspect;

      // Multi-page support
      const pageContentHeight = pdfHeight - margin * 2;
      const totalPages = Math.ceil(scaledHeight / pageContentHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        // Calculate which portion of the canvas to draw
        const sourceY = (page * pageContentHeight / scaledHeight) * canvas.height;
        const sourceHeight = (pageContentHeight / scaledHeight) * canvas.height;
        const remainingHeight = canvas.height - sourceY;
        const actualSourceHeight = Math.min(sourceHeight, remainingHeight);

        // Create a temporary canvas for this page slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = actualSourceHeight;
        const ctx = pageCanvas.getContext("2d")!;
        ctx.drawImage(
          canvas,
          0, sourceY, canvas.width, actualSourceHeight,
          0, 0, canvas.width, actualSourceHeight
        );

        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
        const drawHeight = (actualSourceHeight / canvas.height) * scaledHeight;

        pdf.addImage(pageImgData, "JPEG", margin, margin, contentWidth, drawHeight);
      }

      // Generate filename
      const filename = `WaveLink-Contract-${options.contractId}-${options.status}.pdf`;
      pdf.save(filename);

      // Cleanup
      root.unmount();
      document.body.removeChild(container);
    } catch (error) {
      console.error("PDF export failed:", error);
      throw error;
    } finally {
      setExporting(false);
    }
  }, []);

  return { exportPdf, exporting };
}
