import { useViewport } from './context/ViewportContext';

const RecordCard = ({ id, simpleTitle, coverPhoto, synopsis, description }) => {
  const { isMobileView } = useViewport()

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      border: "black solid",
      borderWidth: "1.5px",
      borderRadius: "25px",
      padding: "1rem"
    }}>
      <div dangerouslySetInnerHTML={{ __html: simpleTitle }} />
      <div style={{
          display: "flex",
          position: "relative",
          overflow: "hidden",
          flexDirection: isMobileView ? "column" : "row"
        }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          margin: "1rem"
        }}>
          <div style={{ display: "flex", justifyContent: isMobileView ? "center" : "right", flex: "1", height: "inherit" }}>
            {coverPhoto
              ? <div style={{ display: "flex", margin: "0 1rem 1rem 1rem" }}>
                  <img
                    src={coverPhoto.thumbnails.large.url}
                    alt={coverPhoto.filename}
                    style={{ height: "10rem", maxWidth: "100%" }} />
                </div>
              : <div style={{ display: "flex", margin: "0 1rem 1rem 1rem", height: "10rem", minWidth: "10rem" }}></div>
            }
          </div>
        </div>
        <div style={{ flex: "3", position: "relative" }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "101%",
            pointerEvents: "none",
            background: "linear-gradient(to bottom, transparent, white)"
          }}>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div dangerouslySetInnerHTML={{ __html: synopsis }} />
            <div style={{ fontFamily: "Consolas", fontSize: "small" }} dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
      <div style={{
        display: "flex",
        backgroundColor: "white",
        justifyContent: "center",
        marginTop: "0.5rem",
      }}>
        <a
          href={`/boxes/${id}`}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", fontFamily: "Arial" }}
          aria-label="Individual record view"
        >SHOW MORE</a>
      </div>
    </div>
  )
};

export { RecordCard };