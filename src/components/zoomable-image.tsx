/* eslint-disable @next/next/no-img-element */
'use client';

import { X } from 'lucide-react';
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type ZoomableImageProps = ComponentPropsWithoutRef<'img'>;

type PreviewImage = {
  alt: string;
  naturalHeight: number;
  naturalWidth: number;
  rect: DOMRect;
  src: string;
};

type ImageZoomStyle = CSSProperties & {
  '--zoom-final-height': string;
  '--zoom-final-left': string;
  '--zoom-final-top': string;
  '--zoom-final-width': string;
};

const CLOSE_DURATION_MS = 220;
const VIEWPORT_PADDING = 32;

const getImageGeometry = (image: PreviewImage) => {
  const availableWidth = Math.max(window.innerWidth - VIEWPORT_PADDING * 2, 1);
  const availableHeight = Math.max(window.innerHeight - VIEWPORT_PADDING * 2, 1);
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const viewportRatio = availableWidth / availableHeight;

  const finalWidth = imageRatio > viewportRatio ? availableWidth : availableHeight * imageRatio;
  const finalHeight = imageRatio > viewportRatio ? availableWidth / imageRatio : availableHeight;
  const finalLeft = (window.innerWidth - finalWidth) / 2;
  const finalTop = (window.innerHeight - finalHeight) / 2;

  return {
    finalHeight,
    finalLeft,
    finalTop,
    finalWidth,
  };
};

function ImageZoomPreview({ image, onClose }: { image: PreviewImage; onClose: () => void }) {
  const [isClosing, setIsClosing] = useState(false);
  const titleId = useId();

  const closePreview = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, CLOSE_DURATION_MS);
  }, [onClose]);

  const geometry = useMemo(() => getImageGeometry(image), [image]);
  const imageStyle: ImageZoomStyle = {
    '--zoom-final-height': `${geometry.finalHeight}px`,
    '--zoom-final-left': `${geometry.finalLeft}px`,
    '--zoom-final-top': `${geometry.finalTop}px`,
    '--zoom-final-width': `${geometry.finalWidth}px`,
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePreview();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closePreview]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closePreview();
  };

  return createPortal(
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="image-zoom"
      data-state={isClosing ? 'closing' : 'open'}
      onClick={handleBackdropClick}
      role="dialog"
    >
      <h2 className="sr-only" id={titleId}>
        Image preview
      </h2>
      <button
        aria-label="Close image preview"
        className="image-zoom__close"
        onClick={closePreview}
        type="button"
      >
        <X aria-hidden="true" size={18} />
      </button>
      <img
        alt={image.alt}
        className="image-zoom__image"
        draggable={false}
        src={image.src}
        style={imageStyle}
      />
    </div>,
    document.body,
  );
}

const createPreviewImage = (image: HTMLImageElement): PreviewImage | null => {
  const src = image.currentSrc || image.src;
  if (!src) return null;

  const rect = image.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return null;

  return {
    alt: image.alt,
    naturalHeight: image.naturalHeight || rect.height,
    naturalWidth: image.naturalWidth || rect.width,
    rect,
    src,
  };
};

export function DocsImageLightbox() {
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const image = target.closest('img');
      if (!image || !image.closest('[data-docs-body]')) return;

      const preview = createPreviewImage(image);
      if (!preview) return;

      event.preventDefault();
      setPreviewImage(preview);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return previewImage ? (
    <ImageZoomPreview image={previewImage} onClose={() => setPreviewImage(null)} />
  ) : null;
}

export function ZoomableImage({ alt = '', className, src, ...props }: ZoomableImageProps) {
  const imageSrc = typeof src === 'string' ? src : undefined;

  return (
    <button
      aria-label={alt ? `Open larger preview: ${alt}` : 'Open larger image preview'}
      className="zoomable-image"
      type="button"
    >
      <img alt={alt} className={className} src={imageSrc} {...props} />
    </button>
  );
}
