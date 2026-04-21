// lib/validations/invitation.ts
import { z } from "zod";

const coupleSchema = z.object({
  shortName: z.string().min(1, "Short name is required"),
  fullName: z.string().min(1, "Full name is required"),
  photoUrl: z.string().url("Invalid photo URL"),
  parents: z.object({
    father: z.string().min(1, "Father name is required"),
    mother: z.string().min(1, "Mother name is required"),
  }),
});

const quoteSchema = z.object({
  enabled: z.boolean(),
  text: z.string().min(1, "Quote text is required"),
  source: z.string().min(1, "Quote source is required"),
});

const storySchema = z.object({
  title: z.string().min(1, "Story title is required"),
  description: z.string().min(1, "Story description is required"),
  photoUrl: z.string().url("Invalid photo URL"),
});

const loveStorySchema = z.object({
  enabled: z.boolean(),
  stories: z.array(storySchema).optional(),
});

const livestreamSchema = z.object({
  enabled: z.boolean(),
  url: z.string().url("Invalid livestream URL"),
  platform: z.string().min(1, "Platform is required"),
  startTime: z.coerce.date(),
});

const eventSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  timeStart: z.coerce.date(),
  timeEnd: z.coerce.date().nullable(),
  venue: z.string().min(1, "Venue is required"),
  address: z.string().min(1, "Address is required"),
  mapsUrl: z.string().url("Invalid maps URL"),
  dresscode: z.string().optional(),
});

const bankAccountSchema = z.object({
  bank: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  accountName: z.string().min(1, "Account name is required"),
});

const giftSchema = z.object({
  enabled: z.boolean(),
  address: z.string().optional(),
  bankAccounts: z.array(bankAccountSchema),
});

const gallerySchema = z.object({
  enabled: z.boolean(),
  photos: z.array(z.string().url("Invalid photo URL")),
});

export const invitationSchema = z.object({
  createdAt: z.coerce.date(),
  type: z.string().min(1, "Invitation type is required"),
  bride: coupleSchema,
  groom: coupleSchema,
  weddingDate: z.coerce.date(),
  events: z.array(eventSchema).min(1, "At least one event is required"),
  quote: quoteSchema,
  loveStories: loveStorySchema,
  livestream: livestreamSchema,
  gallery: gallerySchema,
  gift: giftSchema,
  music: z.string().url("Invalid music URL").optional(),
  rsvpEnabled: z.boolean(),
  commentsEnabled: z.boolean(),
  notes: z.string().optional(),
});

export type InvitationFormValues = z.infer<typeof invitationSchema>;
