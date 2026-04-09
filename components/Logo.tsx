export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sbti-orbit" x1="10" y1="8" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F766E" />
          <stop offset="1" stopColor="#164E63" />
        </linearGradient>
        <linearGradient id="sbti-panel" x1="18" y1="18" x2="46" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FBFA" />
          <stop offset="1" stopColor="#ECF4F1" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="21" fill="url(#sbti-panel)" />
      <rect x="3" y="3" width="58" height="58" rx="21" stroke="rgba(15,118,110,0.16)" />
      <path d="M18 16.5C23.2 12.9 28.9 11 34.8 11C43.8 11 51.7 15.3 56 22.2" stroke="url(#sbti-orbit)" strokeWidth="3" strokeLinecap="round" />
      <path d="M46 47.5C40.8 51.1 35.1 53 29.2 53C20.2 53 12.3 48.7 8 41.8" stroke="#C0841E" strokeWidth="3" strokeLinecap="round" />
      <rect x="17" y="20" width="12" height="12" rx="4.5" fill="#0F766E" />
      <rect x="35" y="17" width="12" height="12" rx="4.5" fill="#D6EEE9" />
      <rect x="18" y="36" width="12" height="12" rx="4.5" fill="#E6F2EF" />
      <rect x="35" y="34" width="12" height="12" rx="4.5" fill="#C0841E" />
      <circle cx="32" cy="32" r="4.5" fill="#14211C" />
      <circle cx="32" cy="32" r="2" fill="#F7F4ED" />
    </svg>
  );
}
