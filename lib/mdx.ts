import fs from "fs/promises";
import path from "path";

export async function getMdxContent(slug?: string) {
  try {
    const contentPath = path.join(process.cwd(), "docs", `${slug || "index"}.mdx`);
    const content = await fs.readFile(contentPath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error loading MDX content:", error);
    throw error;
  }
}