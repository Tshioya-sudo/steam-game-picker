'use client';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loading({ size = 'md', text }: LoadingProps) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-steam-blue/20" />
        <div className="absolute inset-0 rounded-full border-4 border-steam-blue border-t-transparent animate-spin" />
      </div>
      {text && (
        <p className="text-steam-text animate-pulse">{text}</p>
      )}
    </div>
  );
}

export function LoadingOverlay({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-steam-darker/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Loading size="lg" text={text} />
    </div>
  );
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-steam-dark rounded animate-shimmer ${className}`}
    />
  );
}
