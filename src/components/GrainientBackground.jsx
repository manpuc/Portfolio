import { useEffect, useState } from 'react';
import Grainient from './ui/Grainient';

export default function GrainientBackground({ className = "" }) {
  const [colors, setColors] = useState({
    color1: "#353535",
    color2: "#5328ff",
    color3: "#B497CF"
  });

  useEffect(() => {
    const updateColors = () => {
      // Small timeout to ensure CSS classes are applied and computed styles are ready
      const style = getComputedStyle(document.body);
      const c1 = style.getPropertyValue('--grad-1').trim();
      const c2 = style.getPropertyValue('--grad-2').trim();
      const c3 = style.getPropertyValue('--grad-3').trim();

      if (c1 && c2 && c3) {
        setColors({ color1: c1, color2: c2, color3: c3 });
      }
    };

    updateColors();

    // Observe body class changes from Astro's theme toggle script
    const observer = new MutationObserver(updateColors);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={`bg-fixed-container ${className}`}
      style={{ 
        position: 'fixed', 
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <Grainient
        color1={colors.color1}
        color2={colors.color2}
        color3={colors.color3}
        timeSpeed={0.2}
        colorBalance={0.0}
        warpStrength={3.4}
        warpFrequency={5.0}
        warpSpeed={2.0}
        warpAmplitude={50.0}
        blendAngle={0.0}
        blendSoftness={0.05}
        rotationAmount={500.0}
        noiseScale={2.0}
        grainAmount={0.1}
        grainScale={2.0}
        grainAnimated={false}
        contrast={1.5}
        gamma={0.75}
        saturation={1.0}
        centerX={0.0}
        centerY={0.0}
        zoom={0.8}
      />
    </div>
  );
}
