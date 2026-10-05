import { redirect } from "next/navigation";
import { createSessionAction } from "@/app/actions/create-session";

export const dynamic = "force-dynamic";

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
