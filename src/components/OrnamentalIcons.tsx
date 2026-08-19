import React from "react";

// Royal Emblem / Crest Logo for ZEYANA
export function RoyalCrestLogo({ className = "h-16" }: { className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center justify-center text-center ${className}`}>
      {/* Top Filigree Crown */}
      <svg viewBox="0 0 200 40" className="w-36 h-6 fill-[#C59B27] stroke-[#84620A] stroke-[0.5]">
        <path d="M100,5 C105,15 120,8 130,18 C140,28 125,32 110,25 C105,22 100,35 100,35 C100,35 95,22 90,25 C75,32 60,28 70,18 C80,8 95,15 100,5 Z" />
        <circle cx="100" cy="5" r="3" fill="#6A091A" />
        <circle cx="70" cy="18" r="2" fill="#6A091A" />
        <circle cx="130" cy="18" r="2" fill="#6A091A" />
      </svg>
      {/* Brand Title */}
      <div className="relative px-6 py-1 border-y border-[#C59B27]">
        <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.25em] text-[#6A091A] uppercase">
          ZEYANA
        </span>
        {/* Diamond accents */}
        <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[#C59B27] text-xs">❖</span>
        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[#C59B27] text-xs">❖</span>
      </div>
      {/* Subtitle */}
      <span className="font-serif text-[10px] tracking-[0.35em] text-[#7C6354] uppercase mt-0.5">
        SAREES & MORE
      </span>
    </div>
  );
}

// Section Header Ornamental Flourish (❖ ─── ❖ ─── ❖)
export function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center my-8 text-center">
      {/* Top Floral Filigree */}
      <div className="flex items-center justify-center gap-3 w-full max-w-md">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59B27] to-[#C59B27]" />
        <svg viewBox="0 0 50 20" className="w-8 h-4 fill-[#C59B27]">
          <path d="M25 0 C30 10 40 10 50 10 C40 10 30 10 25 20 C20 10 10 10 0 10 C10 10 20 10 25 0 Z" />
        </svg>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C59B27] to-[#C59B27]" />
      </div>
      {/* Title */}
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.18em] text-[#6A091A] uppercase my-2">
        {title}
      </h2>
      {/* Bottom Flourish */}
      <div className="flex items-center gap-2 text-[#C59B27] text-xs tracking-[0.4em]">
        <span>❖</span>
        <span className="w-12 h-[1px] bg-[#C59B27]" />
        <span>❖</span>
        <span className="w-12 h-[1px] bg-[#C59B27]" />
        <span>❖</span>
      </div>
    </div>
  );
}

// Royal Elephant SVG Motif (Airavata)
export function RoyalElephant({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={`${className} fill-[#E8C86B] stroke-[#84620A] stroke-[1]`}>
      {/* Decorative Blanket / Howdah */}
      <path d="M40,110 C35,70 50,40 90,35 C130,30 170,50 175,90 C180,120 160,140 150,145 C145,115 140,95 130,90 C120,85 110,85 100,90 C90,95 85,115 80,145 C70,140 60,130 50,135 C45,137 42,125 40,110 Z" />
      {/* Elephant Body Silhouette */}
      <path d="M50,105 C40,90 25,95 15,100 C10,102 12,110 20,108 C30,105 38,115 45,120 Z" /> {/* Trunk */}
      <circle cx="55" cy="65" r="3" fill="#6A091A" /> {/* Eye */}
      {/* Ear */}
      <path d="M60,55 C45,60 45,85 65,85 C75,85 75,60 60,55 Z" fill="#D4AF37" opacity="0.8" />
      {/* Howdah / Jhool carpet pattern */}
      <rect x="85" y="45" width="45" height="40" rx="3" fill="#6A091A" stroke="#E8C86B" strokeWidth="2" />
      <path d="M90,50 L125,50 M90,60 L125,60 M90,70 L125,70" stroke="#E8C86B" strokeWidth="1" strokeDasharray="3 3" />
      {/* Tusk */}
      <path d="M35,80 Q25,82 20,78 Q25,74 38,76 Z" fill="#FFFDF8" stroke="#C59B27" />
    </svg>
  );
}

// Festive Collection Emblem Badge (Scalloped Seal)
export function FestiveEmblemBadge({ text = "FESTIVE COLLECTION '24" }: { text?: string }) {
  return (
    <div className="relative inline-flex items-center justify-center p-6 text-center">
      {/* Scalloped Outer Seal */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#E8C86B] animate-spin-slow" />
      <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#6A091A] to-[#38030B] border-2 border-[#C59B27] flex flex-col items-center justify-center p-2 text-[#E8C86B] shadow-2xl">
        <span className="text-[10px] tracking-[0.2em] font-serif uppercase opacity-80">ESTD 2024</span>
        <span className="font-serif text-xs font-bold tracking-wider text-center leading-tight my-1 text-[#F5D77F]">
          {text}
        </span>
        <span className="text-xs">❖</span>
      </div>
    </div>
  );
}
