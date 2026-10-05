"use client";

import { useEffect } from "react";

export function OgImageTags() {
  useEffect(() => {
    try {
      const SITE_URL = "https://maxima.onnemang.store";
      const imageUrl = `${SITE_URL}/og-image.jpg`;
      const title = "Maxima — Laimės Ratas";
      const description =
        "Maxima specialioji laimės ratai akcija! Išmėginkite savo sėkmę ir laimėkite išskirtinius prizus.";
      const siteUrl = SITE_URL;

      const upsertMeta = (
        selector: string,
        attrName: "name" | "property",
        attrValue: string,
        content: string
      ) => {
        let el = document.head.querySelector(selector) as HTMLMetaElement | null;
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attrName, attrValue);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      };

      // Open Graph
      upsertMeta(
        'meta[property="og:title"]',
        "property",
        "og:title",
        title
      );
      upsertMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        description
      );
      upsertMeta(
        'meta[property="og:type"]',
        "property",
        "og:type",
        "website"
      );
      upsertMeta(
        'meta[property="og:locale"]',
        "property",
        "og:locale",
        "lt_LT"
      );
      upsertMeta(
        'meta[property="og:url"]',
        "property",
        "og:url",
        siteUrl
      );
      upsertMeta(
        'meta[property="og:site_name"]',
        "property",
        "og:site_name",
        "Maxima Laimės Ratas"
      );
      upsertMeta(
        'meta[property="og:image"]',
        "property",
        "og:image",
        imageUrl
      );
      upsertMeta(
        'meta[property="og:image:secure_url"]',
        "property",
        "og:image:secure_url",
        imageUrl
      );
      upsertMeta(
        'meta[property="og:image:type"]',
        "property",
        "og:image:type",
        "image/jpeg"
      );
      upsertMeta(
        'meta[property="og:image:width"]',
        "property",
        "og:image:width",
        "1200"
      );
      upsertMeta(
        'meta[property="og:image:height"]',
        "property",
        "og:image:height",
        "630"
      );
      upsertMeta(
        'meta[property="og:image:alt"]',
        "property",
        "og:image:alt",
        "Maxima Laimės Ratas"
      );

      // Twitter
      upsertMeta(
        'meta[name="twitter:card"]',
        "name",
        "twitter:card",
        "summary_large_image"
      );
      upsertMeta(
        'meta[name="twitter:title"]',
        "name",
        "twitter:title",
        title
      );
      upsertMeta(
        'meta[name="twitter:description"]',
        "name",
        "twitter:description",
        description
      );
      upsertMeta(
        'meta[name="twitter:image"]',
        "name",
        "twitter:image",
        imageUrl
      );

      // Standart
      upsertMeta(
        'meta[name="description"]',
        "name",
        "description",
        description
      );
    } catch (_) {
      // no-op
    }
  }, []);

  return null;
}
