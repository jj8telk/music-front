import { Link } from "react-router-dom";
import { Container, Menu, Grid, Radio } from "semantic-ui-react";
import AudioPlayer from "../widgets/AudioPlayer";

const LayoutHeader = ({
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
    <Container fluid style={{ height: 20 }}>
      <Menu fixed='top' size='big'>
        <Menu.Item header>Music Manager</Menu.Item>
        <Menu.Item>
          <Link to='/releases'>Releases</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/artists'>Artists</Link>
        </Menu.Item>
        <Menu.Item>
          <Radio
            toggle
            label='Discogs'
            checked={toggleDiscogs}
            onChange={() => {
              setToggleDiscogs(!toggleDiscogs);
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <AudioPlayer
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
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default LayoutHeader;
