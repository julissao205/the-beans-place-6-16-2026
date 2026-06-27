import { useEffect, useState } from "react";

export default function ScrollingCoffeePour() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
            setScrollProgress(progress);
        };

        updateScrollProgress();
        window.addEventListener("scroll", updateScrollProgress, { passive: true });
        window.addEventListener("resize", updateScrollProgress);

        return () => {
            window.removeEventListener("scroll", updateScrollProgress);
            window.removeEventListener("resize", updateScrollProgress);
        };
    }, []);

    const easedProgress = Math.min(1, scrollProgress ** 1.2);
    const streamHeight = `${Math.min(86, 8 + easedProgress * 78)}vh`;
    const streamWidth = `${10 + easedProgress * 8}px`;
    const leftTilt = `${easedProgress * 86}deg`;
    const rightTilt = `${-easedProgress * 86}deg`;
    const mugScale = 0.6 + easedProgress * 0.02;
    const mugVisibility = 1;
    const streamVisibility = scrollProgress > 0.01 ? 1 : 0;
    const streamTopOffset = 104 + easedProgress * 40;
    const streamLeftOffset = 61;
    const streamRightOffset = 61;
    const streamTilt = "0deg";
    const streamGlow = 0.24 + easedProgress * 0.16;
    const streamOpacity = 0.96 + easedProgress * 0.24;
    const streamScaleY = 0.94 + easedProgress * 0.1 + Math.sin(easedProgress * Math.PI) * 0.02;

    return (
        <div className="coffee-scene" aria-hidden="true">
            <div
                className="coffee-mug coffee-mug-left"
                style={{
                    transform: `rotate(${leftTilt}) scaleX(-1) scale(${mugScale})`,
                    opacity: mugVisibility
                }}
            />
            <div
                className="coffee-mug coffee-mug-right"
                style={{
                    transform: `rotate(${rightTilt}) scale(${mugScale})`,
                    opacity: mugVisibility
                }}
            />
            <div
                className="coffee-stream coffee-stream-left"
                style={{
                    height: streamHeight,
                    width: streamWidth,
                    opacity: streamVisibility * streamOpacity,
                    top: `${streamTopOffset}px`,
                    left: `${streamLeftOffset}px`,
                    transform: `rotate(${streamTilt}) scaleY(${streamScaleY})`,
                    boxShadow: `0 0 ${18 + streamGlow * 16}px rgba(95, 44, 17, ${0.18 + streamGlow * 0.16})`
                }}
            />
            <div
                className="coffee-stream coffee-stream-right"
                style={{
                    height: streamHeight,
                    width: streamWidth,
                    opacity: streamVisibility * streamOpacity,
                    top: `${streamTopOffset}px`,
                    right: `${streamRightOffset}px`,
                    transform: `rotate(${streamTilt}) scaleY(${streamScaleY})`,
                    boxShadow: `0 0 ${18 + streamGlow * 16}px rgba(95, 44, 17, ${0.18 + streamGlow * 0.16})`
                }}
            />
        </div>
    );
}
