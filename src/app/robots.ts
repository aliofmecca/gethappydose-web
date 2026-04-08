import type { MetadataRoute } from "next";
import { strings } from "@/constants/strings";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${strings.brand.url}/sitemap.xml`,
  };
}
