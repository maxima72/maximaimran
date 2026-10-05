import { redirect } from "next/navigation";
import { createSessionAction } from "@/app/actions/create-session";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ ref?: string }>;
};

export default async function Home({ searchParams }: Props) {
  let partnerName = "admin";
  try {
    const sp = await searchParams;
    if (sp?.ref && typeof sp.ref === "string" && sp.ref.trim() !== "") {
      partnerName = sp.ref.trim();
    }
  } catch {
    partnerName = "admin";
  }

  const result = await createSessionAction(partnerName);

  if (!result.success || !result.data?.id) {
    redirect("/wheel");
  }

  const sessionId = result.data.id;
  const hasShortPublicId =
    result.data.public_id != null &&
    String(result.data.public_id).trim() !== "";

  const routeSessionId = hasShortPublicId
    ? String(result.data.public_id)
    : sessionId;

  redirect(`/wheel?session=${encodeURIComponent(routeSessionId)}`);
}
