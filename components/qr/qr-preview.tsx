"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useQrEditor } from "@/lib/store";

export function QrPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const { config, destinationUrl } = useQrEditor();

  // Initialize QR code instance
  useEffect(() => {
    qrRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
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
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 8,
      },
    });

    if (ref.current) {
      ref.current.innerHTML = "";
      qrRef.current.append(ref.current);
    }
  }, []);

  // Update QR when config or URL changes
  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.update({
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
      });
    }
  }, [config, destinationUrl]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-2xl bg-white p-8 shadow-[var(--shadow-lg)]">
        <div ref={ref} />
      </div>
      {destinationUrl && (
        <p className="max-w-[300px] truncate text-sm text-[var(--text-tertiary)]">
          {destinationUrl}
        </p>
      )}
    </div>
  );
}
