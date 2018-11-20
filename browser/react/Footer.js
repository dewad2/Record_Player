import React from 'react';

export default props => {
  const {
    toggleAudio,
    selectedAlbum,
    playNextTrack,
    isPlaying,
    currentIndex,
    progress
  } = props;
  const length = selectedAlbum.songs.length;
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
