import React from 'react';

export const Footer = props => {
  const {
    songPlaying,
    audio,
    toggleAudio,
    selectedAlbum,
    playNextTrack,
    isPlaying,
    currentIndex,
    progress
  } = props;
  console.log('selectedAlbum', selectedAlbum);
  console.log('songPlaying', songPlaying);
  const length = selectedAlbum.songs.length;
  console.log('length', length);
  let next = (currentIndex + 1) % length;
  let nextTrack = selectedAlbum.songs[next].id;
  let prev = currentIndex === 0 ? length - 1 : currentIndex - 1;
  let prevTrack = selectedAlbum.songs[prev].id;
  return (
    <footer>
      <div className="pull-left">
        <button
          className="btn btn-default"
          onClick={() => playNextTrack(prevTrack, prev)}
        >
          <span className="glyphicon glyphicon-step-backward" />
        </button>
        <button className="btn btn-default" onClick={toggleAudio}>
          <span
            className={
              isPlaying
                ? 'glyphicon glyphicon-pause'
                : 'glyphicon glyphicon-play'
            }
          />
        </button>
        <button
          className="btn btn-default"
          onClick={() => playNextTrack(nextTrack, next)}
        >
          <span className="glyphicon glyphicon-step-forward" />
        </button>
      </div>
      <div className="bar">
        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </footer>
  );
};
