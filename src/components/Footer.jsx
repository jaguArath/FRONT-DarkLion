import DarkLogo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-morado text-white px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Texto + redes */}
        <div className="flex flex-col items-center sm:items-start space-y-1 sm:ml-52">
          <span
            style={{ fontFamily: "Chakra" }}
            className="text-4-sm font-semibold tracking-widest sm:ml-21"
          >
            DARK LION
          </span>

          <div className="w-66 h-px bg-white/80" />

          {/* Íconos */}
          <div className="flex gap-5 mt-1">
            {icons.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                title={item.title}
                className="hover:scale-110 flex items-center justify-center w-9 h-9 rounded-full border-2 border-white hover:bg-white hover:text-purple-700 transition-all"
                // aria-label="social"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Logo */}
        <img
          src={DarkLogo}
          alt="Dark Lion Logo"
          className="h-14 sm:h-20 sm:mr-46"
        />
      </div>
    </footer>
  );
}

const icons = [
  {
    title: "Instagram",
    url: "https://www.instagram.com/darklion_paint/",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="3" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },

  {
    title: "Email",
    url: "mailto:contacto@darklion.com.mx",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6l9-6" />
      </svg>
    ),
  },

  {
    title: "Facebook",
    url: "https://www.facebook.com/Darklionpaint/",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2z" />
      </svg>
    ),
  },

  {
    title: "TikTok",
    url: "https://www.tiktok.com/@darklionpaint",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 7.9v4a10 10 0 0 1-5-2v4.6a6.5 6.5 0 1 1-8-6.3v4.3a2.5 2.5 0 1 0 4 2V3h4a6 6 0 0 0 5 4.9z" />
      </svg>
    ),
  },

  {
    title: "Ubicación",
    url: "https://maps.app.goo.gl/P9bMBM1iHBSJ1TyV6",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="11" r="3" />
        <path d="M17.7 16.7l-4.2 4.2a2 2 0 0 1-2.8 0l-4.3-4.2a8 8 0 1 1 11.3 0z" />
      </svg>
    ),
  },
];
