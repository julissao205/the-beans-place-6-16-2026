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

    const streamHeight = `${Math.min(86, 16 + scrollProgress * 70)}vh`;
    const leftTilt = `${scrollProgress * 90}deg`;
    const rightTilt = `${-scrollProgress * 90}deg`;
    const mugScale = 0.6 + scrollProgress * 0.02;
    const mugVisibility = 1;
    const streamVisibility = scrollProgress > 0.01 ? 1 : 0;
    const streamTopOffset = 112 + scrollProgress * 28;
    const streamLeftOffset = 62 + scrollProgress * 2;
    const streamRightOffset = 62 + scrollProgress * 2;

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
                    opacity: streamVisibility,
                    top: `${streamTopOffset}px`,
                    left: `${streamLeftOffset}px`
                }}
            />
            <div
                className="coffee-stream coffee-stream-right"
                style={{
                    height: streamHeight,
                    opacity: streamVisibility,
                    top: `${streamTopOffset}px`,
                    right: `${streamRightOffset}px`
                }}
            />
        </div>
    );
}
