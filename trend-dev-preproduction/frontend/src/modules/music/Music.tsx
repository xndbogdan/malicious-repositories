import React, { FC, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "./Music.scss";

const Music: FC = () => {
  const musicTracks = [
    {
      name: "01-Tabibito-no-Uta",
      src: "/assets/music/sounds/01-Tabibito-no-Uta.mp3",
    },
    {
      name: "02-Mezame-no-Uta",
      src: "/assets/music/sounds/02-Mezame-no-Uta.mp3",
    },
  ];

  const [trackIndex, setTrackIndex] = useState(0);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1,
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0,
    );
  };

  return (
    <AudioPlayer
      // autoPlay
      src={musicTracks[trackIndex].src}
      showSkipControls={true}
      showJumpControls={false}
      onClickPrevious={handleClickPrevious}
      onClickNext={handleClickNext}
      onEnded={handleClickNext}
      header={musicTracks[trackIndex].name}
    />
  );
};

export default Music;
