import { create } from "zustand";
import type { QrConfig, QrCode } from "@/types";

interface QrEditorState {
  // Current QR being edited
  config: QrConfig;
  title: string;
  destinationUrl: string;
  socialPlatform: string | null;
  category: string | null;

  // Actions
  setConfig: (config: Partial<QrConfig>) => void;
  setTitle: (title: string) => void;
  setDestinationUrl: (url: string) => void;
  setSocialPlatform: (platform: string | null) => void;
  setCategory: (category: string | null) => void;
  resetEditor: () => void;
  loadQr: (qr: QrCode) => void;
}

const defaultConfig: QrConfig = {
  foregroundColor: "#000000",
  backgroundColor: "#ffffff",
  dotsStyle: "square",
  cornersStyle: "square",
  cornersDotStyle: "square",
};

export const useQrEditor = create<QrEditorState>((set) => ({
  config: defaultConfig,
  title: "",
  destinationUrl: "",
  socialPlatform: null,
  category: null,

  setConfig: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),
  setTitle: (title) => set({ title }),
  setDestinationUrl: (url) => set({ destinationUrl: url }),
  setSocialPlatform: (platform) => set({ socialPlatform: platform }),
  setCategory: (category) => set({ category }),
  resetEditor: () =>
    set({
      config: defaultConfig,
      title: "",
      destinationUrl: "",
      socialPlatform: null,
      category: null,
    }),
  loadQr: (qr) =>
    set({
      config: qr.qr_config,
      title: qr.title,
      destinationUrl: qr.destination_url,
      socialPlatform: qr.social_platform,
      category: qr.category,
    }),
}));
