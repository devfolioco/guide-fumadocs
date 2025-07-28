import { ReactNode } from 'react';

interface BannerProps {
  children: ReactNode;
  image?: string;
  gradient?: string;
  className?: string;
}

export function Banner({ children, image, gradient, className = "" }: BannerProps) {
  const backgroundStyle = image 
    ? { backgroundImage: `url(${image})` }
    : gradient 
    ? { background: gradient }
    : { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };

  return (
    <div 
      className={`relative w-full h-64 bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden mb-8 ${className}`}
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 h-full flex items-center justify-center text-center p-8">
        <div className="text-white">
          {children}
        </div>
      </div>
    </div>
  );
}