import { Container } from "semantic-ui-react";
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";

const Layout = ({
  children,
  toggleDiscogs,
  setToggleDiscogs,
  playlist,
  setAudio,
  loadAudio,
  playAudio,
  pauseAudio,
  stopAudio,
  setPlayState,
  playState,
  currentTrack,
}) => {
  return (
    <div>
      <LayoutHeader
        toggleDiscogs={toggleDiscogs}
        setToggleDiscogs={setToggleDiscogs}
        playlist={playlist}
        setAudio={setAudio}
        loadAudio={loadAudio}
        playAudio={playAudio}
        pauseAudio={pauseAudio}
        stopAudio={stopAudio}
        setPlayState={setPlayState}
        playState={playState}
        currentTrack={currentTrack}
      />
      <Container
        fluid
        style={{ marginTop: "5em", padding: "0 25px 25px 25px" }}
      >
        {children}
      </Container>
      <LayoutFooter />
      <pre>{JSON.stringify(currentTrack, null, 4)}</pre>
    </div>
  );
};

export default Layout;
