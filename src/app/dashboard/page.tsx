"use client";

import { useState } from "react";
// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
// import { signOut } from "@/app/auth/action";

/* ── Dummy Data ── */
const STATS = [
  {
    icon: <FileIcon />,
    value: "6",
    label: "Total Templates",
    color: "text-zinc-500",
    bg: "bg-zinc-100",
  },
  {
    icon: <CheckIcon />,
    value: "4",
    label: "Published",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: <PenIcon />,
    value: "2",
    label: "Drafts",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: <TrendIcon />,
    value: "5,400",
    label: "Total Views",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

const TEMPLATES = [
  {
    id: 1,
    couple: "Anisa & Rendra",
    date: "14 Jun 2026",
    status: "Published",
    theme: "Floral Elegance",
    themeColor: "bg-pink-100 text-pink-600",
    views: 1284,
    edited: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
  },
  {
    id: 2,
    couple: "Sari & Dimas",
    date: "20 Jul 2026",
    status: "Published",
    theme: "Minimalist White",
    themeColor: "bg-zinc-100 text-zinc-600",
    views: 856,
    edited: "6 days ago",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
  },
  {
    id: 3,
    couple: "Layla & Farhan",
    date: "5 Sept 2026",
    status: "Draft",
    theme: "Rustic Boho",
    themeColor: "bg-orange-100 text-orange-600",
    views: 312,
    edited: "8 days ago",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
  },
  {
    id: 4,
    couple: "Nadia & Rizky",
    date: "30 May 2026",
    status: "Published",
    theme: "Romantic Garden",
    themeColor: "bg-green-100 text-green-600",
    views: 2107,
    edited: "4 days ago",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
  },
  {
    id: 5,
    couple: "Maya & Bagas",
    date: "11 Oct 2026",
    status: "Draft",
    theme: "Luxury Gold",
    themeColor: "bg-yellow-100 text-yellow-700",
    views: 98,
    edited: "15 days ago",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: 6,
    couple: "Putri & Aldi",
    date: "8 Aug 2026",
    status: "Published",
    theme: "Tropical Modern",
    themeColor: "bg-teal-100 text-teal-600",
    views: 743,
    edited: "3 days ago",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
  },
];

type Filter = "All" | "Published" | "Draft";

export default function DashboardPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = TEMPLATES.filter((t) => {
    const matchFilter = filter === "All" || t.status === filter;
    const matchSearch = t.couple.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f7f6]">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100 px-5 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center">
            <HeartIcon />
          </div>
          <div>
            <h1
              className="text-base font-semibold text-zinc-900"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Rengganis
            </h1>
            <p className="text-[11px] text-zinc-400">
              Wedding Invitation Builder
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer">
          <span className="text-base leading-none">+</span>
          <span>New Template</span>
        </button>
      </div>

      <div className="px-5 md:px-8 py-6 space-y-6 max-w-6xl mx-auto">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-zinc-100 p-4 flex items-center gap-3"
            >
              <div
                className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0 ${s.color}`}
              >
                {s.icon}
              </div>
              <div>
                <p className="text-xl font-semibold text-zinc-900">{s.value}</p>
                <p className="text-xs text-zinc-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Templates section */}
        <div>
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-base font-semibold text-zinc-800 flex items-center gap-2">
              Client Templates
              <span className="bg-zinc-100 text-zinc-500 text-xs font-medium px-2 py-0.5 rounded-full">
                {filtered.length}
              </span>
            </h2>

            <div className="flex items-start sm:items-center sm:flex-row flex-col gap-2">
              {/* Search */}
              <div className="relative flex items-center">
                <SearchIcon className="absolute left-3 text-zinc-300 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-700 placeholder-zinc-300 outline-none focus:border-rose-300 transition-colors w-44 md:w-52"
                />
              </div>

              {/* Filter pills */}
              <div className="flex bg-white border border-zinc-200 rounded-xl p-0.5 gap-0.5">
                {(["All", "Published", "Draft"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      filter === f
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-md transition-shadow"
                onClick={() => openMenu && setOpenMenu(null)}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.couple}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        t.status === "Published"
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-400 text-white"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      {t.status}
                    </span>
                  </div>

                  {/* Views */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    <EyeSmIcon />
                    {t.views.toLocaleString()}
                  </div>

                  {/* Couple + date */}
                  <div className="absolute bottom-3 left-3">
                    <p
                      className="text-white font-semibold text-base leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {t.couple}
                    </p>
                    <p className="text-white/70 text-xs flex items-center gap-1 mt-0.5">
                      <CalIcon />
                      {t.date}
                    </p>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.themeColor}`}
                  >
                    {t.theme}
                  </span>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === t.id ? null : t.id);
                      }}
                      className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
                    >
                      <DotsIcon />
                    </button>
                    {openMenu === t.id && (
                      <div className="absolute right-0 top-8 bg-white border border-zinc-100 rounded-xl shadow-lg z-10 py-1 w-36">
                        {["Edit", "Duplicate", "Preview", "Delete"].map(
                          (action) => (
                            <button
                              key={action}
                              onClick={() => setOpenMenu(null)}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-zinc-50 transition-colors cursor-pointer ${
                                action === "Delete"
                                  ? "text-rose-500"
                                  : "text-zinc-700"
                              }`}
                            >
                              {action}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-4 pb-3 flex items-center gap-1 text-zinc-400 text-xs">
                  <ClockIcon />
                  Edited {t.edited}
                </div>

                <div className="px-4 pb-4">
                  <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <SlidersIcon />
                    Edit Properties
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-400 text-sm">
              No templates found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Icons ── */
function HeartIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="#e05070">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
function FileIcon() {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function CheckIcon() {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function PenIcon() {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function TrendIcon() {
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
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function SearchIcon({ className = "" }: { className?: string }) {
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
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function EyeSmIcon() {
  return (
    <svg
      width={12}
      height={12}
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
function CalIcon() {
  return (
    <svg
      width={11}
      height={11}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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
function ClockIcon() {
  return (
    <svg
      width={11}
      height={11}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function DotsIcon() {
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
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}
function SlidersIcon() {
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
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

// export default async function DashboardPage() {
//   const supabase = await createClient()

//   // always use getUser() — never getSession() on server
//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user) redirect('/login')

//   // fetch user's data server-side, RLS applied automatically
//   const { data: invitation } = await supabase
//     .from('invitations')
//     .select('*')
//     .single()

//   return (
//     <div>
//       <p>Hello, {user.email}</p>

//       {invitation
//         ? <p>Your invitation: {invitation.title}</p>
//         : <p>No invitation yet.</p>
//       }

//       <form action={signOut}>
//         <button type="submit">Sign out</button>
//       </form>
//     </div>
//   )
// }
