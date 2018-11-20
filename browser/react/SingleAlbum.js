import React from 'react';

export default class SingleAlbum extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { selectedAlbum, songPlaying } = this.props;
    return (
      <div className="album col-xs-10">
        <div>
          <h3>{selectedAlbum.name}</h3>
          <img src={selectedAlbum.imageUrl} className="img-thumbnail" />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Artists</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {selectedAlbum &&
              selectedAlbum.songs.map((song, index) => {
                return (
                  <tr
                    className={songPlaying === song.id && 'active'}
                    key={song.id}
                  >
                    <td>
                      <button
                        onClick={() => this.props.playMusic(song.id, index)}
                        className={
                          song.id !== songPlaying
                            ? 'btn btn-default btn-xs'
                            : 'hidden'
                        }
                      >
                        <span className="glyphicon glyphicon-play" />
                      </button>
                    </td>
                    <td>{song.name}</td>
                    <td>{selectedAlbum.artists[0].name}</td>
                    <td>{song.genre}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
