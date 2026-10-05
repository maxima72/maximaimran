import { redirect } from "next/navigation";
import { SessionRealtimeGate } from "@/components/demo/SessionRealtimeGate";
import { resolveServerSessionIdentity } from "@/lib/session-id";
import { isUuidSessionIdentifier } from "@/lib/session-identifiers";
import { WheelClient } from "../wheel-client";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WheelByIdPage({ params }: Props) {
  const { id } = await params;
  const { sessionId, routeSessionId } = await resolveServerSessionIdentity({
    routeSessionId: id,
  });

  if (
    id &&
    routeSessionId &&
    id !== routeSessionId &&
    (isUuidSessionIdentifier(id) || id.includes("-"))
  ) {
    redirect(`/wheel/${encodeURIComponent(routeSessionId)}`);
  }

  return (
    <>
      <SessionRealtimeGate
        sessionId={sessionId ?? ""}
        routeSessionId={routeSessionId ?? undefined}
      />
      <WheelClient sessionId={sessionId} routeSessionId={routeSessionId} />
    </>
  );
}
