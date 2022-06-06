import { Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FormatDescription from "../widgets/FormatDescription";

const ReleaseBlock = ({ releases }) => {
  return (
    <div>
      {releases
        .sort((a, b) => (a.title < b.title ? 1 : -1))
        .sort((a, b) => (a.releaseDate > b.releaseDate ? 1 : -1))
        .map((release) => {
          return (
            <Segment
              color={release.own ? "green" : "red"}
              textAlign='center'
              size='small'
              style={{
                width: 200,
                height: 250,
                float: "left",
                margin: 10,
                position: "relative",
                whiteSpace: "nowrap",
                overflow: "auto",
              }}
            >
              <Link to={"/release/" + release.releaseId}>
                <div>
                  {release.images.length > 0 ? (
                    <img
                      src={release.images[0].uri}
                      style={{ maxHeight: 150, maxWidth: 150 }}
                      alt='artwork'
                    />
                  ) : null}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "88%",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: "bold" }}>
                    {release.title}
                  </span>
                  <br />
                  <img
                    src={
                      process.env.REACT_APP_CORE_API +
                      "Release/formatIcon/" +
                      release.formatString
                    }
                    style={{ height: 40, marginRight: 7 }}
                  />
                </div>
              </Link>
            </Segment>
          );
        })}
    </div>
  );
};

export default ReleaseBlock;
