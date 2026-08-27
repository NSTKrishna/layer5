import { useEffect } from "react";

// Tilts the element with the given id around the X axis as the page scrolls,
// once the element reaches the top of the viewport.
const useScrollTiltEffect = (
  elementId,
  { topOffset = 110, scrollFactor = 50 } = {},
) => {
  useEffect(() => {
    const scrollingImage = document.getElementById(elementId);

    const handleScroll = () => {
      const imageRect = scrollingImage.getBoundingClientRect();
      const isImageAtTop = imageRect.top <= topOffset;

      if (isImageAtTop) {
        const scrollPosition = window.scrollY;
        const translateY = -scrollPosition / scrollFactor;
        scrollingImage.style.transform = `rotateX(${translateY}deg)`;
      } else {
        scrollingImage.style.transform = null;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementId, topOffset, scrollFactor]);
};

export default useScrollTiltEffect;
