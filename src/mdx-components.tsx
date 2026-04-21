import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Banner } from '@/components/banner';
import { ZoomableImage } from '@/components/zoomable-image';


// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: ZoomableImage,
    ...components,
    Banner,
  };
}
