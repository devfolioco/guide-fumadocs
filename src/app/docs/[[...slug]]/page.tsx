import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import posthog from "posthog-js";
import { Rate } from "@/components/rate";
import { LLMCopyButton, ViewOptions } from "./page.client";
//import { AISearchTrigger } from "@/components/ai";
//import { cn } from "@/lib/utils";
//import { cva } from "class-variance-authority";
//import { Sparkles } from "lucide-react";

/*const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-fd-background bg-gradient-to-b from-fd-primary to-fd-primary/60 text-fd-primary-foreground shadow-inner shadow-fd-background/20 hover:bg-fd-primary/90",
        outline: "border hover:bg-fd-accent hover:text-fd-accent-foreground",
        grow: "border bg-gradient-to-t from-fd-primary/10 shadow-inner shadow-fd-primary/10 hover:bg-fd-accent/50 hover:text-fd-accent-foreground",
        secondary:
          "border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
        ghost: "hover:bg-fd-accent hover:text-fd-accent-foreground",
        link: "text-fd-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "p-1.5",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 px-6",
        xs: "px-2 py-1.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
*/
export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        {/*@ts-expect-error: this library type is incorrect in v3*/}
        <LLMCopyButton slug={params.slug} />
        <ViewOptions markdownUrl={`${page.url}.mdx`} githubUrl={`check`} />
        <div className="text-xs px-3 py-1.5 bg-fd-secondary/50 border border-fd-border rounded-lg text-fd-muted-foreground shadow-sm">
  💡 Tip: Use this dropdown to get help from AI tools like ChatGPT or Claude.
</div>

      </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <Rate
        onRateAction={async (url, feedback) => {
          "use server";
          await posthog.capture("on_rate_docs", feedback);
          return { githubUrl: "https://github.com/devfolioco" };
        }}
      />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
