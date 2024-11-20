"use client";

import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import { cn } from '@/lib/utils';

// Import Prism languages and plugins
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  code, 
  language = 'typescript', 
  className = '',
  showLineNumbers = true
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [code, language]);

  return (
    <div className="relative">
      <pre
        ref={preRef}
        className={cn(
          'rounded-lg overflow-x-auto',
          showLineNumbers && 'line-numbers',
          'bg-[#1e1e1e] text-gray-100',
          'p-4 my-4',
          className
        )}
        style={{ 
          fontSize: '14px',
          lineHeight: '1.5'
        }}
      >
        <code className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  );
}