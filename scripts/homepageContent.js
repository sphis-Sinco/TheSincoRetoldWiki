import { paragraph, strong, link } from './global.js';

const featured = null

/** {
  title: "The Siege of Halden’s Rise",
  description: "One of the most pivotal battles in Sinco history. Learn how the conflict shaped the political landscape of the Third Age.",
  href: "#"
}; **/

// You can set this to null or undefined to test the fallback:
const showFeatured = true;

export function renderFeaturedArticle() {
  if (!showFeatured || !featured) {
    return paragraph("No featured article, come back later!");
  }

  return paragraph(
    strong(featured.title),
    "— " + featured.description,
    link("Read more...", featured.href)
  );
}
