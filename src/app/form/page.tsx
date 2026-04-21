"use client";

import { useEffect, useState } from "react";
import { db } from "@/utils/firebase/client";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

interface Couple {
  shortName: string;
  fullName: string;
  photoUrl: string;
  parents: {
    father: string;
    mother: string;
  };
}

interface Quote {
  enabled: boolean;
  text: string;
  source: string;
}

interface Story {
  title: string;
  description: string;
  photoUrl: string;
}

interface LoveStory {
  enabled: boolean;
  stories?: Story[];
}

interface Livestream {
  enabled: boolean;
  url: string;
  platform: string;
  startTime: Date;
}

export interface Event {
  title: string;
  timeStart: Date;
  timeEnd: Date | null;
  venue: string;
  address: string;
  mapsUrl: string;
  dresscode?: string;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface Gift {
  enabled: boolean;
  address?: string;
  bankAccount?: BankAccount;
}

export interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export interface Galery {
  enabled: boolean;
  photos: string[]; // array of photo URLs
}

interface FormData {
  bride: Couple;
  groom: Couple;
  weddingDate: Date;
  events: Event[];
  quote: Quote;
  loveStories: LoveStory;
  livestream: Livestream;
  gallery: Galery;
  gift: Gift;
  music?: string; // music URL
  rsvpEnabled: boolean;
  commentsEnabled: boolean;
}

const SECTIONS = [
  { id: "bride", label: "Bride", icon: <PersonIcon /> },
  { id: "groom", label: "Groom", icon: <PersonIcon /> },
  { id: "wedding-date", label: "Wedding Date", icon: <CalendarIcon /> },
  { id: "quote", label: "Quote", icon: <QuoteIcon /> },
  { id: "love-stories", label: "Love Stories", icon: <HeartStoryIcon /> },
  { id: "livestream", label: "Livestream", icon: <LiveIcon /> },
  { id: "events", label: "Events", icon: <EventIcon /> },
  { id: "gallery", label: "Gallery", icon: <GalleryIcon /> },
  { id: "gift", label: "Gift", icon: <GiftIcon /> },
  { id: "music", label: "Music", icon: <MusicIcon /> },
  { id: "comments", label: "Comments", icon: <CommentIcon /> },
  { id: "guest", label: "Guest", icon: <GuestIcon /> },
];

const documentId = "shoope_3828883JI";

const loadData = async () => {
  const docRef = doc(db, "forms", documentId);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document! Creating a new one...");
    await setDoc(docRef, { createdAt: serverTimestamp() });
  }
};

type SectionId = (typeof SECTIONS)[number]["id"];

export default function FormPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("bride");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const toggleCollapse = (id: string) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* ── Top Nav ── */}
      <header className="bg-white border-b border-zinc-200 px-4 md:px-6 py-3 flex items-center justify-between gap-3 z-20 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-zinc-500 hover:text-zinc-700"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </button>

          <button className="hidden md:flex items-center gap-1.5 text-zinc-500 hover:text-zinc-700 text-sm transition-colors shrink-0">
            <ArrowLeftIcon />
            <span>Templates</span>
          </button>

          <div className="hidden md:block w-px h-5 bg-zinc-200 shrink-0" />

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1
                className="text-lg md:text-xl font-semibold text-zinc-900 truncate"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Anisa &amp; Rendra
              </h1>
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0">
                Published
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden md:block">
              Floral Elegance · Properties Editor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="hidden sm:flex items-center gap-1.5 text-zinc-600 hover:text-zinc-800 border border-zinc-200 text-xs font-medium px-3 py-2 rounded-xl transition-all">
            <PreviewIcon />
            <span className="hidden md:inline">Preview JSON</span>
          </button>
          <button className="hidden sm:flex items-center gap-1.5 text-zinc-600 hover:text-zinc-800 border border-zinc-200 text-xs font-medium px-3 py-2 rounded-xl transition-all">
            <CopyIcon />
            <span className="hidden md:inline">Copy</span>
          </button>
          <button className="hidden sm:flex items-center gap-1.5 text-zinc-600 hover:text-zinc-800 border border-zinc-200 text-xs font-medium px-3 py-2 rounded-xl transition-all">
            <ExportIcon />
            <span className="hidden md:inline">Export</span>
          </button>
          <button className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors">
            <SaveIcon />
            Save
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Desktop Sidebar — always visible ── */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-zinc-100 bg-white overflow-y-auto">
          <div className="p-4">
            <p className="text-[10px] font-semibold text-zinc-400 tracking-widest mb-3 px-2">
              SECTIONS
            </p>
            <nav className="space-y-0.5">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                    activeSection === s.id
                      ? "bg-rose-50 text-rose-600 font-medium"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={
                        activeSection === s.id
                          ? "text-rose-400"
                          : "text-zinc-400"
                      }
                    >
                      {s.icon}
                    </span>
                    {s.label}
                  </div>
                  {activeSection === s.id && <ChevronRightIcon />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Mobile Sidebar drawer ── */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed top-0 left-0 h-full w-52 bg-white z-40 overflow-y-auto shadow-xl md:hidden">
              <div className="p-4 pt-6">
                <p className="text-[10px] font-semibold text-zinc-400 tracking-widest mb-3 px-2">
                  SECTIONS
                </p>
                <nav className="space-y-0.5">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                        activeSection === s.id
                          ? "bg-rose-50 text-rose-600 font-medium"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={
                            activeSection === s.id
                              ? "text-rose-400"
                              : "text-zinc-400"
                          }
                        >
                          {s.icon}
                        </span>
                        {s.label}
                      </div>
                      {activeSection === s.id && <ChevronRightIcon />}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          </>
        )}

        {/* ── Main form area ── */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 p-4 md:p-6 space-y-4">
          <Section
            id="bride"
            label="Bride"
            icon={<PersonIcon color="#e05070" />}
            collapsed={collapsed["bride"]}
            onToggle={() => toggleCollapse("bride")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Short Name" required placeholder="e.g. Anisa" />
              <Field
                label="Full Name"
                required
                placeholder="e.g. Anisa Rahmawati"
              />
            </div>
            <Field
              label="Photo URL"
              placeholder="https://..."
              hint="Portrait photo (400×500 recommended)"
              wide
            />
            <div>
              <p className="text-[10px] font-semibold text-zinc-400 tracking-widest mb-3">
                PARENTS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Father's Name" placeholder="Father's name" />
                <Field label="Mother's Name" placeholder="Mother's name" />
              </div>
            </div>
          </Section>

          <Section
            id="groom"
            label="Groom"
            icon={<PersonIcon color="#e05070" />}
            collapsed={collapsed["groom"]}
            onToggle={() => toggleCollapse("groom")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Short Name" required placeholder="e.g. Rendra" />
              <Field
                label="Full Name"
                required
                placeholder="e.g. Rendra Pratama"
              />
            </div>
            <Field
              label="Photo URL"
              placeholder="https://..."
              hint="Portrait photo (400×500 recommended)"
              wide
            />
            <div>
              <p className="text-[10px] font-semibold text-zinc-400 tracking-widest mb-3">
                PARENTS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Father's Name" placeholder="Father's name" />
                <Field label="Mother's Name" placeholder="Mother's name" />
              </div>
            </div>
          </Section>

          <Section
            id="wedding-date"
            label="Wedding Date"
            icon={<CalendarIcon color="#e05070" />}
            collapsed={collapsed["wedding-date"]}
            onToggle={() => toggleCollapse("wedding-date")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Date"
                required
                placeholder="e.g. 14 June 2026"
                type="date"
              />
              <Field label="Time" placeholder="e.g. 10:00 WIB" type="time" />
            </div>
            <Field
              label="Hijri Date"
              placeholder="e.g. 17 Dzulhijjah 1447 H"
              wide
            />
          </Section>

          <Section
            id="quote"
            label="Quote"
            icon={<QuoteIcon color="#e05070" />}
            collapsed={collapsed["quote"]}
            onToggle={() => toggleCollapse("quote")}
          >
            <Field
              label="Quote Text"
              placeholder="e.g. And of His signs is that He created for you from yourselves mates..."
              wide
              textarea
            />
            <Field label="Quote Source" placeholder="e.g. Ar-Rum: 21" wide />
          </Section>

          <Section
            id="love-stories"
            label="Love Stories"
            icon={<HeartStoryIcon color="#e05070" />}
            collapsed={collapsed["love-stories"]}
            onToggle={() => toggleCollapse("love-stories")}
          >
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border border-zinc-100 rounded-xl p-4 space-y-3 bg-zinc-50/50"
              >
                <p className="text-xs font-medium text-zinc-500">Story {i}</p>
                <Field label="Title" placeholder="e.g. First Met" wide />
                <Field
                  label="Description"
                  placeholder="Tell the story..."
                  wide
                  textarea
                />
                <Field label="Photo URL" placeholder="https://..." wide />
              </div>
            ))}
            <button className="text-rose-500 hover:text-rose-600 text-sm font-medium flex items-center gap-1.5 transition-colors">
              <span className="text-base">+</span> Add Story
            </button>
          </Section>

          <Section
            id="livestream"
            label="Livestream"
            icon={<LiveIcon color="#e05070" />}
            collapsed={collapsed["livestream"]}
            onToggle={() => toggleCollapse("livestream")}
          >
            <Field
              label="Livestream URL"
              placeholder="https://youtube.com/live/..."
              wide
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Platform" placeholder="e.g. YouTube" />
              <Field label="Start Time" placeholder="e.g. 09:00 WIB" />
            </div>
          </Section>

          <Section
            id="events"
            label="Events"
            icon={<EventIcon color="#e05070" />}
            collapsed={collapsed["events"]}
            onToggle={() => toggleCollapse("events")}
          >
            {["Akad Nikah", "Resepsi"].map((event) => (
              <div
                key={event}
                className="border border-zinc-100 rounded-xl p-4 space-y-3 bg-zinc-50/50"
              >
                <p className="text-xs font-medium text-zinc-500">{event}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Date" placeholder="14 June 2026" type="date" />
                  <Field label="Time" placeholder="10:00 WIB" type="time" />
                </div>
                <Field
                  label="Venue Name"
                  placeholder="e.g. Gedung Serbaguna"
                  wide
                />
                <Field
                  label="Address"
                  placeholder="Full address..."
                  wide
                  textarea
                />
                <Field
                  label="Google Maps URL"
                  placeholder="https://maps.google.com/..."
                  wide
                />
              </div>
            ))}
          </Section>

          <Section
            id="gallery"
            label="Gallery"
            icon={<GalleryIcon color="#e05070" />}
            collapsed={collapsed["gallery"]}
            onToggle={() => toggleCollapse("gallery")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Field
                  key={i}
                  label={`Photo ${i} URL`}
                  placeholder="https://..."
                />
              ))}
            </div>
            <button className="text-rose-500 hover:text-rose-600 text-sm font-medium flex items-center gap-1.5 transition-colors">
              <span className="text-base">+</span> Add Photo
            </button>
          </Section>

          <Section
            id="gift"
            label="Gift"
            icon={<GiftIcon color="#e05070" />}
            collapsed={collapsed["gift"]}
            onToggle={() => toggleCollapse("gift")}
          >
            {["BCA", "Mandiri"].map((bank) => (
              <div
                key={bank}
                className="border border-zinc-100 rounded-xl p-4 space-y-3 bg-zinc-50/50"
              >
                <p className="text-xs font-medium text-zinc-500">{bank}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Account Number" placeholder="e.g. 1234567890" />
                  <Field
                    label="Account Name"
                    placeholder="e.g. Anisa Rahmawati"
                  />
                </div>
              </div>
            ))}
            <Field
              label="Gift Address"
              placeholder="Physical gift delivery address..."
              wide
              textarea
            />
          </Section>

          <Section
            id="music"
            label="Music"
            icon={<MusicIcon color="#e05070" />}
            collapsed={collapsed["music"]}
            onToggle={() => toggleCollapse("music")}
          >
            <Field
              label="Music URL"
              placeholder="https://... (mp3 or audio file)"
              wide
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Song Title" placeholder="e.g. A Thousand Years" />
              <Field label="Artist" placeholder="e.g. Christina Perri" />
            </div>
          </Section>

          <Section
            id="comments"
            label="Comments"
            icon={<CommentIcon color="#e05070" />}
            collapsed={collapsed["comments"]}
            onToggle={() => toggleCollapse("comments")}
          >
            <ToggleRow
              label="Enable Comments"
              description="Allow guests to leave wishes"
              defaultOn
            />
            <ToggleRow
              label="Moderation"
              description="Approve comments before showing"
            />
          </Section>

          <Section
            id="guest"
            label="Guest"
            icon={<GuestIcon color="#e05070" />}
            collapsed={collapsed["guest"]}
            onToggle={() => toggleCollapse("guest")}
          >
            <ToggleRow
              label="RSVP Enabled"
              description="Allow guests to confirm attendance"
              defaultOn
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
              <Field
                label="RSVP Deadline"
                placeholder="e.g. 7 June 2026"
                type="date"
              />
              <Field label="Max Guests" placeholder="e.g. 200" type="number" />
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

/* ── Section wrapper ── */
function Section({
  id,
  label,
  icon,
  collapsed,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="bg-white rounded-2xl border border-zinc-100 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-zinc-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          {icon}
          <span className="font-medium text-zinc-800 text-sm">{label}</span>
        </div>
        <span
          className={`text-zinc-400 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
        >
          <ChevronUpIcon />
        </span>
      </button>
      {!collapsed && (
        <div className="px-5 pb-5 border-t border-zinc-50 pt-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Field ── */
function Field({
  label,
  placeholder,
  required,
  hint,
  wide,
  textarea,
  type,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  wide?: boolean;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <div className={wide ? "col-span-full w-full" : ""}>
      <label className="block text-[13px] font-medium text-zinc-700 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={3}
          className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-300 outline-none focus:border-rose-300 resize-none transition-colors"
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-300 outline-none focus:border-rose-300 transition-colors"
        />
      )}
      {hint && <p className="text-xs text-zinc-400 mt-1">{hint}</p>}
    </div>
  );
}

/* ── Toggle Row ── */
function ToggleRow({
  label,
  description,
  defaultOn = false,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
      <div>
        <p className="text-sm font-medium text-zinc-700">{label}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${on ? "bg-rose-500" : "bg-zinc-200"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-4" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

/* ── Icons ── */
function PersonIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function CalendarIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function QuoteIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}
function HeartStoryIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function LiveIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.6 11.6L22 7v10l-6.4-4.5v-0.9z" />
      <rect x="2" y="7" width="15" height="10" rx="2" ry="2" />
    </svg>
  );
}
function EventIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function GalleryIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
function GiftIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
function MusicIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
function CommentIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function GuestIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function ChevronUpIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function PreviewIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function ExportIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
function SaveIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}
