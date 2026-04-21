// lib/defaults/invitation.ts
import { InvitationFormValues } from "@/lib/validations/invitation";

export const invitationDefaultValues: InvitationFormValues = {
  createdAt: new Date(),
  type: "lineart-v1",
  bride: {
    shortName: "",
    fullName: "",
    photoUrl: "",
    parents: { father: "", mother: "" },
  },
  groom: {
    shortName: "",
    fullName: "",
    photoUrl: "",
    parents: { father: "", mother: "" },
  },
  weddingDate: new Date(),
  events: [
    {
      title: "",
      timeStart: new Date(),
      timeEnd: null,
      venue: "",
      address: "",
      mapsUrl: "",
      dresscode: "",
    },
  ],
  quote: { enabled: true, text: "", source: "" },
  loveStories: { enabled: true, stories: [] },
  livestream: {
    enabled: true,
    url: "",
    platform: "",
    startTime: new Date(),
  },
  gallery: { enabled: true, photos: [] },
  gift: { enabled: true, address: "", bankAccounts: [] },
  music: "",
  rsvpEnabled: true,
  commentsEnabled: true,
  notes: "",
};
