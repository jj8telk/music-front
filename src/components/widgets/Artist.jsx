import { Link } from "react-router-dom";

const Artist = ({ release }) => {
  return (
    <Link to={"/artist/" + release.albumArtist}>
      <span
        style={{
          marginRight: 15,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {release.albumArtist}
      </span>
    </Link>
  );
  // return release !== null ? (
  //   release.artists.map((artist) => {
  //     return (
  //       <span
  //         key={artist.artistId}
  //         style={{
  //           marginRight: 15,
  //           fontSize: 24,
  //           fontWeight: "bold",
  //         }}
  //       >
  //         <Link to={"/artist/" + artist.artistId}>
  //           {artist.anv !== "" ? artist.anv : artist.name}
  //         </Link>
  //         {artist.anv !== "" ? "*" : null}
  //       </span>
  //     );
  //   })
  // ) : (
  //   <span></span>
  // );
};

export default Artist;
