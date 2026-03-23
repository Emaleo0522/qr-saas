"use client";

import { useRef, useCallback } from "react";
import QRCodeStyling from "qr-code-styling";
import { Download } from "lucide-react";
import { useQrEditor } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function QrDownload() {
  const { config, destinationUrl } = useQrEditor();
  const downloadingRef = useRef(false);

  const createQrInstance = useCallback(() => {
    return new QRCodeStyling({
      width: 1024,
      height: 1024,
      type: "svg",
      data: destinationUrl || "https://qr-saas.app",
      dotsOptions: {
        color: config.foregroundColor,
        type: config.dotsStyle as any,
      },
      cornersSquareOptions: {
        type: config.cornersStyle as any,
      },
      cornersDotOptions: {
        type: config.cornersDotStyle as any,
      },
      backgroundOptions: {
        color: config.backgroundColor,
      },
      image: config.imageUrl || undefined,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });
  }, [config, destinationUrl]);

  async function handleDownload(format: "png" | "svg" | "jpeg") {
    if (downloadingRef.current) return;
    downloadingRef.current = true;

    try {
      const qr = createQrInstance();
      await qr.download({
        name: "qr-code",
        extension: format,
      });
    } finally {
      downloadingRef.current = false;
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
        Download
      </h3>
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => handleDownload("png")}
        >
          <Download className="h-4 w-4" />
          PNG
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => handleDownload("svg")}
        >
          <Download className="h-4 w-4" />
          SVG
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => handleDownload("jpeg")}
        >
          <Download className="h-4 w-4" />
          JPEG
        </Button>
      </div>
    </div>
  );
}
