import { useLayoutEffect, useRef, useState } from "react";

// Shared client-side state for react-slick sliders: computes slidesToShow from
// the viewport width and keeps it in sync on resize/load (debounced).
const useResponsiveSlider = (computeSlides, { watchImagesSelector } = {}) => {
  const [isClient, setIsClient] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    setIsClient(true);
    setSlidesToShow(computeSlides());

    let resizeTimeout = null;
    const onResizeDebounced = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const slides = computeSlides();
        setSlidesToShow((prev) => {
          if (prev !== slides) return slides;
          return prev;
        });
        if (
          sliderRef.current &&
          sliderRef.current.innerSlider &&
          typeof sliderRef.current.innerSlider.onWindowResized === "function"
        ) {
          sliderRef.current.innerSlider.onWindowResized();
        }
      }, 100);
    };

    window.addEventListener("resize", onResizeDebounced);
    window.addEventListener("load", onResizeDebounced);
    const imgs = watchImagesSelector
      ? Array.from(document.querySelectorAll(watchImagesSelector))
      : [];
    imgs.forEach((img) => img.addEventListener("load", onResizeDebounced));

    return () => {
      window.removeEventListener("resize", onResizeDebounced);
      window.removeEventListener("load", onResizeDebounced);
      imgs.forEach((img) => img.removeEventListener("load", onResizeDebounced));
      clearTimeout(resizeTimeout);
    };
  }, []);

  return { isClient, slidesToShow, sliderRef };
};

export default useResponsiveSlider;
