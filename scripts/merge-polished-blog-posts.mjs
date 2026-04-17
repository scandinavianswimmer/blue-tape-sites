import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = "/home/ubuntu/blue-tape-sites";
const metadataPath = "/home/ubuntu/write_blog_archive_posts.json";
const polishedPath = "/home/ubuntu/polish_blog_archive_posts.json";
const outputPath = path.join(projectRoot, "client/src/content/blogPosts.ts");

const metadataResults = JSON.parse(await fs.readFile(metadataPath, "utf8")).results;
const polishedResults = JSON.parse(await fs.readFile(polishedPath, "utf8")).results;

const escapeTemplateLiteral = value =>
  value.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");

const readingTimeFromContent = content => {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(6, Math.round(words / 190));
  return `${minutes} min read`;
};

const collapseWhitespace = value => value.replace(/\s+/g, " ").trim();

const sentenceSummaryFromContent = content => {
  const body = collapseWhitespace(
    content
      .replace(/^#\s+.*$/m, "")
      .replace(/^#{2,6}\s+.*$/gm, "")
      .replace(/^[*-]\s+/gm, "")
  );

  const sentences = body
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(Boolean);

  let summary = "";

  for (const sentence of sentences) {
    const candidate = collapseWhitespace(`${summary} ${sentence}`);

    if (candidate.length > 160) {
      break;
    }

    summary = candidate;

    if (summary.length >= 70) {
      break;
    }
  }

  if (!summary) {
    summary = body.slice(0, 157).trim();
  }

  if (summary.length < 50) {
    const expanded = collapseWhitespace(`${summary} ${sentences[1] ?? ""}`);
    summary = expanded.slice(0, 160).trim();
  }

  if (summary.length > 160) {
    summary = `${summary.slice(0, 157).trim()}...`;
  }

  return summary;
};

const posts = await Promise.all(
  metadataResults.map(async (metadataResult, index) => {
    const metadata = metadataResult.output;
    const polished = polishedResults[index]?.output;

    if (!metadata || !polished) {
      throw new Error(`Missing metadata or polished content for index ${index}`);
    }

    const rawContent = await fs.readFile(polished.content_file, "utf8");
    const cleanedContent = rawContent.trim();
    const summary = sentenceSummaryFromContent(cleanedContent);

    return {
      slug: metadata.slug,
      title: metadata.title,
      publishDate: metadata.publish_date,
      category: metadata.category,
      targetKeyword: metadata.target_keyword,
      summary,
      excerpt: summary,
      readingTime: readingTimeFromContent(cleanedContent),
      content: cleanedContent,
    };
  })
);

posts.sort((a, b) => (a.publishDate > b.publishDate ? 1 : -1));

const fileText = `export type BlogPost = {
  slug: string;
  title: string;
  publishDate: string;
  category: string;
  targetKeyword: string;
  summary: string;
  excerpt: string;
  readingTime: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
${posts
  .map(
    post => `  {
    slug: \`${escapeTemplateLiteral(post.slug)}\`,
    title: \`${escapeTemplateLiteral(post.title)}\`,
    publishDate: \`${escapeTemplateLiteral(post.publishDate)}\`,
    category: \`${escapeTemplateLiteral(post.category)}\`,
    targetKeyword: \`${escapeTemplateLiteral(post.targetKeyword)}\`,
    summary: \`${escapeTemplateLiteral(post.summary)}\`,
    excerpt: \`${escapeTemplateLiteral(post.excerpt)}\`,
    readingTime: \`${escapeTemplateLiteral(post.readingTime)}\`,
    content: \`${escapeTemplateLiteral(post.content)}\`,
  }`
  )
  .join(",\n")}
];

export const blogPostMap = new Map(blogPosts.map(post => [post.slug, post]));
`;

await fs.writeFile(outputPath, fileText);
console.log(`Wrote ${posts.length} polished posts to ${outputPath}`);
