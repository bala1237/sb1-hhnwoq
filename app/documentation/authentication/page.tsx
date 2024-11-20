import { getMdxContent } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "@/components/code-block";

export const dynamic = 'force-dynamic';

export default async function AuthenticationPage() {
  const source = await getMdxContent('authentication');

  const components = {
    h1: (props: any) => <h1 className="text-4xl font-bold mb-6" {...props} />,
    h2: (props: any) => <h2 className="text-3xl font-bold mt-12 mb-4" {...props} />,
    h3: (props: any) => <h3 className="text-2xl font-bold mt-8 mb-3" {...props} />,
    code: (props: any) => {
      if (props.className) {
        const language = props.className.replace('language-', '');
        return <CodeBlock code={props.children} language={language} />;
      }
      return <code className="bg-muted px-1.5 py-0.5 rounded-md" {...props} />;
    },
    pre: (props: any) => {
      const language = props.children?.props?.className?.replace('language-', '') || 'typescript';
      return (
        <CodeBlock 
          code={props.children?.props?.children || ''} 
          language={language}
          className="my-4"
        />
      );
    },
  };

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}