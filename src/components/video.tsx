import type { ComponentProps } from "react";

function toEmbedUrl(src: string): string {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : src;
    }

    // youtube.com/watch?v=<id>
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : src;
      }
    }
  } catch {
    // not a parseable URL — fall through and use as-is
  }

  return src;
}

type VideoProps = {
  src: string;
  title?: string;
} & Omit<ComponentProps<"iframe">, "src" | "title">;

/**
 * Responsive video embed used across the guide. Accepts a YouTube share URL,
 * Google Drive preview URL, or any embeddable URL and renders a 16:9 iframe.
 */
export function Video({ src, title = "Video", ...props }: VideoProps) {
  return (
    <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg border border-fd-border">
      <iframe
        src={toEmbedUrl(src)}
        title={title}
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        {...props}
      />
    </div>
  );
}
