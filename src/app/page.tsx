import { redirect } from "next/navigation";
import { createSessionAction } from "@/app/actions/create-session";

export const dynamic = "force-dynamic";

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
    canonical: "/",
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
