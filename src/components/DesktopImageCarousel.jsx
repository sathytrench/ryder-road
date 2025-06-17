import { useState } from 'react';

const DesktopImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleClick = (e) => {
    if (e.target.name === "previous") {
      if (index === 0) {
        setIndex(images.length - 1);
      } else {
        setIndex(index-1);
      }
    } else {
      if (index === images.length - 1) {
        setIndex(0);
      } else {
        setIndex(index+1);
      }
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button name="previous" type="button"
          style={{ border: "none", backgroundColor: "transparent", fontSize: "2rem", cursor: "pointer", margin: "1rem" }}
          onClick={(e) => handleClick(e)}>←</button>
        <div style={{ display: "flex", flexDirection: "column", margin:"0 2rem" }}>
          <div style={{ width: "40rem", height: "30rem", display: "flex", justifyContent: "center" }}>
            <img
              style={{ height:"100%", width:"100%", objectFit:"contain" }}
              src={images[index].thumbnails.large.url}
              alt={images[index].filename} />
          </div>
          <div style={{ display:"flex", justifyContent:"center", margin:"0.5rem" }}>{index + 1}/{images.length}</div>
        </div>
        <button name="next" type="button"
          style={{ border: "none", backgroundColor: "transparent", fontSize: "2rem", cursor: "pointer", margin: "1rem" }}
          onClick={(e) => handleClick(e)}>→</button>
      </div>
    </div>
  );
}

export { DesktopImageCarousel };