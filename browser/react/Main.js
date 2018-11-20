import React from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { AllAlbums } from './AllAlbums';
import axios from 'axios';
import SingleAlbum from './SingleAlbum';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: 'Hello, Juke',
      albums: [],
      selectedAlbum: { songs: [] },
      songPlaying: '',
      audio: document.createElement('audio'),
      isPlaying: false,
      currentIndex: '',
      progress: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.resetAlbums = this.resetAlbums.bind(this);
    this.playMusic = this.playMusic.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.playNextTrack = this.playNextTrack.bind(this);
  }
  async componentDidMount() {
    const { data } = await axios.get('/api/albums');
    this.setState({ albums: data });
    this.state.audio.addEventListener('ended', () =>
      this.playNextTrack(
        this.state.songPlaying + 1,
        this.state.currentIndex + 1
      )
    );
    this.state.audio.addEventListener('timeupdate', () =>
      this.setState({
        progress: Math.ceil(
          (100 * this.state.audio.currentTime) / this.state.audio.duration
        )
      })
    );
  }

  async handleClick(selectedAlbum) {
    const { data } = await axios.get(`/api/albums/${selectedAlbum}`);
    this.setState({ selectedAlbum: data });
  }

  resetAlbums() {
    console.log('heeeere');
    console.log('before', this.state.selectedAlbum);
    this.setState({
      selectedAlbum: { songs: [] }
    });
    console.log('after', this.state.selectedAlbum);
  }

  playMusic(songId, index) {
    console.log('songId', songId);
    /* const { data } = await axios.get(`/api/songs/${songId}/audio`);
    console.log(data); */

    this.state.audio.src =
      'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3';
    this.state.audio.load();
    this.state.audio.play();
    this.setState({
      songPlaying: songId,
      isPlaying: true,
      currentIndex: index
    });
  }

  playNextTrack(next, index) {
    console.log('next');
    this.playMusic(next, index);
  }

  toggleAudio() {
    console.log('toggle');
    this.state.audio.paused
      ? this.setState({ isPlaying: true })
      : this.setState({ isPlaying: false });
    this.state.audio.paused
      ? this.state.audio.play()
      : this.state.audio.pause();
  }

  render() {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar resetAlbums={this.resetAlbums} />
        </div>
        <div className="col-xs-10">
          <h1>{this.state.greeting}</h1>
          {this.state.selectedAlbum.songs.length === 0 ? (
            <AllAlbums
              Albums={this.state.albums}
              handleClick={this.handleClick}
            />
          ) : (
            <SingleAlbum
              selectedAlbum={this.state.selectedAlbum}
              playMusic={this.playMusic}
              songPlaying={this.state.songPlaying}
            />
          )}
        </div>
        {this.state.songPlaying && (
          <Footer
            songPlaying={this.state.songPlaying}
            audio={this.state.audio}
            toggleAudio={this.toggleAudio}
            selectedAlbum={this.state.selectedAlbum}
            playMusic={this.playMusic}
            playNextTrack={this.playNextTrack}
            isPlaying={this.state.isPlaying}
            currentIndex={this.state.currentIndex}
            progress={this.state.progress}
          />
        )}
      </div>
    );
  }
}
