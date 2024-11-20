import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readFileSync } from "fs";
import { join } from "path";

export async function generateStaticParams() {
  return [
    { slug: "features" },
    { slug: "white-label" },
    { slug: "api-integration" }
  ];
}

export default async function DocPage({ params }: { params: { slug: string } }) {
  try {
    const filePath = join(process.cwd(), "docs", `${params.slug}.mdx`);
    const source = readFileSync(filePath, "utf8");

    const components = {
      // Add any custom components here
      h1: (props: any) => <h1 className="text-4xl font-bold mb-6" {...props} />,
      h2: (props: any) => <h2 className="text-3xl font-bold mt-12 mb-4" {...props} />,
      h3: (props: any) => <h3 className="text-2xl font-bold mt-8 mb-3" {...props} />,
      code: (props: any) => (
        <code className="bg-muted px-1.5 py-0.5 rounded-md" {...props} />
      ),
      pre: (props: any) => (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4" {...props} />
      ),
    };

    return (
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <MDXRemote source={source} components={components} />
      </article>
    );
  } catch (error) {
    console.error(`Error loading documentation for ${params.slug}:`, error);
    notFound();
  }
}