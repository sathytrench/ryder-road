import { useRef, useState } from 'react';

const MobileImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const areaRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const threshold = 50;

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        if (index === 0) {
          setIndex(images.length - 1);
        } else {
          setIndex(index - 1);
        }
      } else {
        if (index === images.length - 1) {
          setIndex(0);
        } else {
          setIndex(index + 1);
        }
      }
    }
  };

  return (
    <div
      ref={areaRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", margin:"0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "center", height: "20em" }}>
            <img
              style={{ height:"100%", width:"100%", objectFit:"contain" }}
              src={images[index].thumbnails.large.url}
              alt={images[index].filename} />
          </div>
          <div style={{ display:"flex", justifyContent:"center", margin:"0.5rem" }}>{index + 1}/{images.length}</div>
        </div>
      </div>
    </div>
  );
}

export { MobileImageCarousel };