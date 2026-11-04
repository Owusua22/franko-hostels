type IconProps = {
  size?: number;
  className?: string;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const SearchIcon = ({ size = 15, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const CloseIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const CheckIcon = ({ size = 12, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.4} className={className}>
    <path d="M4 12.5 9.5 18 20 6.5" />
  </svg>
);

export const WifiIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M2.5 8.5a15 15 0 0 1 19 0M5.5 12a10.5 10.5 0 0 1 13 0M8.5 15.5a6 6 0 0 1 7 0" />
    <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const DeskIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 8h18M5 8v11M19 8v11M3 12h18" />
  </svg>
);

export const BedIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 18v-7a2 2 0 0 1 2-2h5v4M3 18h18v-4a2 2 0 0 0-2-2h-6M3 21v-3M21 21v-3" />
    <circle cx="7" cy="12" r="1.6" />
  </svg>
);

export const ShowerIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 20V8a4 4 0 0 1 8 0v1M12 9h8M16 12v1M18 15v1M14 15v1M20 18v1M16 18v1" />
  </svg>
);

export const PowerIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

export const ShieldIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3l7 3v5.5c0 4.3-3 7.6-7 9.5-4-1.9-7-5.2-7-9.5V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const KitchenIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="3" width="16" height="18" rx="2.5" />
    <path d="M4 10h16M8 6.5h.01M8 14h.01" />
    <circle cx="16" cy="17" r="2" />
  </svg>
);

export const LampIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 10 12 3l6 7H6ZM12 10v8M8 21h8" />
  </svg>
);

export const SparkIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v4M12 17v4M4.5 12h4M15.5 12h4M6.7 6.7l2.8 2.8M14.5 14.5l2.8 2.8M17.3 6.7l-2.8 2.8M9.5 14.5l-2.8 2.8" />
  </svg>
);

export const SunIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
  </svg>
);


export const PinIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const CalendarIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const UserIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
);

export const MailIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const PhoneIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2L20 14v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  </svg>
);

export const LogOutIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M14 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
    <path d="M17 8.5 20.5 12 17 15.5M11 12h9" />
  </svg>
);

export const ClockIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const SlidersIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
    <circle cx="16" cy="8" r="2" />
    <circle cx="10" cy="16" r="2" />
  </svg>
);

export const BellIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" />
    <path d="M10.2 19a2 2 0 0 0 3.6 0" />
  </svg>
);

export const AcademyIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
    <path d="M7 12v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V12M20 10.5V15" />
  </svg>
);

export const BikeIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="6" cy="17" r="3.2" />
    <circle cx="18" cy="17" r="3.2" />
    <path d="M9 17h6l-2.5-7H9m3 0 3.5 7M14.5 6h2.8l.7 2" />
  </svg>
);

export const LaundryIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="3" width="16" height="18" rx="2.5" />
    <circle cx="12" cy="14" r="4" />
    <path d="M8 7h.01M11 7h.01" />
  </svg>
);

/** Larger floor-plan drawing for the room detail page. */
export const RoomPlan = ({
  capacity,
  taken = 0,
  labels,
}: {
  capacity: number;
  taken?: number;
  labels: string[];
}) => {
  const cols = capacity;
  const bedW = capacity === 1 ? 150 : capacity === 2 ? 108 : 72;
  const gap = 10;
  const totalW = cols * bedW + (cols - 1) * gap;
  const startX = (400 - totalW) / 2;

  return (
    <svg viewBox="0 0 400 190" role="img" aria-label="Room floor plan">
      <rect
        x="6"
        y="6"
        width="388"
        height="178"
        rx="10"
        fill="#FFFFFF"
        stroke="#E4DCD6"
        strokeWidth="1.5"
      />
      {/* door */}
      <path d="M306 184v-30" stroke="#E4DCD6" strokeWidth="1.5" />
      <path
        d="M306 154a30 30 0 0 1-30 30"
        stroke="#F25757"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="4 4"
      />
      <text x="318" y="176" fontSize="9" fill="#9A908A" fontFamily="system-ui">
        door
      </text>
      {/* window */}
      <path d="M60 6h70M250 6h54" stroke="#F25757" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <text x="88" y="22" fontSize="9" fill="#9A908A" fontFamily="system-ui">
        window
      </text>
      {/* beds */}
      {labels.map((label, index) => {
        const x = startX + index * (bedW + gap);
        const isTaken = index < taken;
        return (
          <g key={label}>
            <rect
              x={x}
              y="52"
              width={bedW}
              height="76"
              rx="7"
              fill={isTaken ? "#FFF2F1" : "#FFFFFF"}
              stroke="#F25757"
              strokeOpacity={isTaken ? 0.65 : 0.4}
              strokeWidth="1.4"
            />
            <rect
              x={x + 8}
              y="60"
              width={bedW - 16}
              height="16"
              rx="4"
              fill="#F25757"
              fillOpacity={isTaken ? 0.42 : 0.2}
            />
            <text
              x={x + bedW / 2}
              y="108"
              fontSize="9"
              textAnchor="middle"
              fill="#736A65"
              fontFamily="system-ui"
            >
              {label.split(" · ")[0]}
            </text>
            <text
              x={x + bedW / 2}
              y="120"
              fontSize="8"
              textAnchor="middle"
              fill="#9A908A"
              fontFamily="system-ui"
            >
              {isTaken ? "taken" : "open"}
            </text>
          </g>
        );
      })}
      {/* desk run */}
      <rect x="60" y="146" width="180" height="12" rx="4" fill="#F1ECE8" />
      <text x="66" y="172" fontSize="9" fill="#9A908A" fontFamily="system-ui">
        study desk run
      </text>
      {/* wardrobe */}
      <rect x="252" y="140" width="48" height="22" rx="4" fill="#F1ECE8" />
      <text x="252" y="176" fontSize="9" fill="#9A908A" fontFamily="system-ui">
        wardrobe
      </text>
    </svg>
  );
};
