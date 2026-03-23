import { z } from "zod";

// QR Code configuration schema
export const qrConfigSchema = z.object({
  foregroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#000000"),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#ffffff"),
  dotsStyle: z
    .enum(["square", "dots", "rounded", "extra-rounded", "classy", "classy-rounded"])
    .default("square"),
  cornersStyle: z.enum(["square", "dot", "extra-rounded"]).default("square"),
  cornersDotStyle: z.enum(["square", "dot"]).default("square"),
  imageUrl: z.string().url().optional(),
  gradient: z
    .object({
      type: z.enum(["linear", "radial"]),
      rotation: z.number().min(0).max(360).default(0),
      colorStops: z
        .array(
          z.object({
            offset: z.number().min(0).max(1),
            color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
          })
        )
        .max(4),
    })
    .optional(),
});

export type QrConfig = z.infer<typeof qrConfigSchema>;

// QR Code record
export interface QrCode {
  id: string;
  user_id: string;
  title: string;
  destination_url: string;
  short_code: string;
  qr_config: QrConfig;
  social_platform: string | null;
  category: string | null;
  logo_url: string | null;
  scan_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// User profile
export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  plan: "free" | "pro" | "business";
  qr_count: number;
  max_qrs: number;
  created_at: string;
}

// Category
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  platform: string | null;
}

// Form schemas
export const createQrSchema = z.object({
  title: z.string().min(1, "Title is required").max(100).trim(),
  destination_url: z.string().url("Must be a valid URL").max(2048),
  short_code: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{6,12}$/, "6-12 alphanumeric characters")
    .optional(),
  qr_config: qrConfigSchema,
  social_platform: z.string().max(50).optional(),
  category: z.string().uuid().optional(),
});

export type CreateQrInput = z.infer<typeof createQrSchema>;

export const updateQrSchema = createQrSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type UpdateQrInput = z.infer<typeof updateQrSchema>;
