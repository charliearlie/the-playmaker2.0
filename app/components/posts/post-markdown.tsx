'use client';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  content: string;
};

export default function PostMarkdown({ content }: Props) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={atomDark}
              language="javascript"
              PreTag="div"
              showLineNumbers={true}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        img({ alt, src, ...props }) {
          return (
            <img className="max-w-48 max-h-96" src={src} alt={alt} {...props} />
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="rounded-md border-4 border-solid border-slate-300 bg-slate-200 px-2">
              <strong>User wrote:</strong>
              <div className="py-4">{children}</div>
            </blockquote>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
