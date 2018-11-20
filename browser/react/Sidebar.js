import React from 'react';

export const Sidebar = props => {
  const { resetAlbums } = props;
  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <a href="#" onClick={resetAlbums}>
            ALBUMS
          </a>
        </h4>
      </section>
    </sidebar>
  );
};
