import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Banner } from '@/components/banner';
import { ZoomableImage } from '@/components/zoomable-image';
import { Video } from '@/components/video';
import { Caption } from '@/components/caption';


// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: ZoomableImage,
    Tabs,
    Tab,
    Steps,
    Step,
    Accordion,
    Accordions,
    TypeTable,
    Files,
    File,
    Folder,
    Video,
    Caption,
    ...components,
    Banner,
  };
}
