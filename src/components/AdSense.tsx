import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  style?: React.CSSProperties;
  className?: string;
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle';
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSense({ style, className, adSlot, adFormat = 'auto' }: AdSenseProps) {
  const adRef = useRef<HTMLInsElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (adRef.current && !initialized.current) {
      try {
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }
        
        if (!adRef.current.getAttribute('data-ad-status')) {
          window.adsbygoogle.push({});
          initialized.current = true;
        }
      } catch (error) {
        console.error('Error loading AdSense:', error);
      }
    }

    return () => {
      if (adRef.current) {
        adRef.current.remove();
        initialized.current = false;
      }
    };
  }, [adSlot]);

  return (
    <div className={`ad-container ${className || ''}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style,
        }}
        data-ad-client="ca-pub-1118721416381353"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}