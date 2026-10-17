import type { IconName } from '@/lib/content';

type Name =
  | IconName
  | 'arrow'
  | 'check'
  | 'mail'
  | 'whatsapp'
  | 'phone'
  | 'pin'
  | 'clock'
  | 'badge'
  | 'eye'
  | 'bolt'
  | 'handshake'
  | 'building'
  | 'factory'
  | 'home'
  | 'store'
  | 'hospital'
  | 'file'
  | 'key';

/** Pictogrammes au trait, 24×24, couleur héritée (currentColor). */
const PATHS: Record<Name, React.ReactNode> = {
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6Z" />
      <path d="m8.8 12 2.2 2.2 4.3-4.4" />
    </>
  ),
  dog: (
    <>
      <path d="M6 4 4 9l3 1.5L9 7" />
      <path d="M9 7h3l3 3h3.5a2 2 0 0 1 0 4H16" />
      <path d="M7 10.5V20h3v-4h5v4h3v-6" />
      <circle cx="15.5" cy="11" r="0.6" fill="currentColor" />
    </>
  ),
  flame: (
    <path d="M12 21a6 6 0 0 0 6-6c0-3.5-2.5-5.5-3.5-8.5-1 2-2 3-3.2 3.3C11.5 7 10.5 5 9 3c0 4-3 6.5-3 12a6 6 0 0 0 6 6Zm0 0a2.5 2.5 0 0 1-2.5-2.5c0-2 2.5-3.5 2.5-3.5s2.5 1.5 2.5 3.5A2.5 2.5 0 0 1 12 21Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" />
    </>
  ),
  flashlight: (
    <>
      <path d="m3 15 6 6 4-4-6-6Z" />
      <path d="m7 11 6-6 6 6-6 6" />
      <path d="M16 3.5 20.5 8" />
      <path d="M17.5 2 19 0.5M21.5 6 23 4.5" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2" />
      <circle cx="9" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </>
  ),
  crane: (
    <>
      <path d="M6 21V4h1.5L20 7.5" />
      <path d="M2.5 7.5H20" />
      <path d="M17 7.5v4" />
      <path d="M15.5 11.5h3v2.5h-3Z" />
      <path d="M3 21h7" />
      <path d="m6 8 1.5 1.5L6 11l1.5 1.5L6 14l1.5 1.5L6 17" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  badge: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="10" r="2.6" />
      <path d="M8 17a4 4 0 0 1 8 0" />
      <path d="M10 6h4" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />,
  handshake: (
    <>
      <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
      <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-1.5 1a2 2 0 0 1-2.5-.2l-.4-.4a1.4 1.4 0 0 1 0-2L13.5 7c1-.8 2.4-.9 3.4-.2L21 9" />
      <path d="M3 9l4-2.5L11 8" />
      <path d="m3 14 2 2 2 2a1.4 1.4 0 0 0 2-2" />
      <path d="M21 14.5V9M3 14V9" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5l8-2v18" />
      <path d="M12 9h8v12" />
      <path d="M2.5 21h19" />
      <path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17Z" />
      <path d="M7 17h2M12 17h2" />
    </>
  ),
  home: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  store: (
    <>
      <path d="M4 10v10h16V10" />
      <path d="M3 10 5 4h14l2 6a2.5 2.5 0 0 1-4.5 1.2A2.5 2.5 0 0 1 12 11a2.5 2.5 0 0 1-4.5.2A2.5 2.5 0 0 1 3 10Z" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  hospital: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M12 7v6M9 10h6" />
      <path d="M10 21v-4h4v4" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13h7M8.5 17h5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 9-9M17 6l3 3M14.5 8.5l2 2" />
    </>
  ),
};

export function Icon({ name, size = 24, className }: { name: Name; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
