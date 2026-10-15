"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  value,
  duration = 1600,
  className = "",
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if the value is purely a numeric or float value (e.g. "8.80" or "14")
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      // Non-numeric strings (like "1st", "Top 0.3%") display as is
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isFloat = value.includes(".");
    const decimals = isFloat ? (value.split(".")[1] || "").length : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = easeOutProgress * targetNumber;

            setDisplayValue(currentNum.toFixed(decimals) + suffix);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
}
