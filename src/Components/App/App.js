import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
        name: 'das',
        artist: 'ss',
        album: 'ss'
      },
      {
        name: 'Daniel',
        artist: 'Daniel',
        album:'Daniel'
      }],
      playlistName: 'New Playlist',
      playlistTracks: [{
        name: '',
        artist: '',
        album: '',
        id:''
      }]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  search(term){
    console.log(term);
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }

  addTrack(track){
    if(this.state.playListTracks.find(savedTrack => savedTrack.id === track.id) ) {
    }
      this.setState({ playlistTracks: this.state.playlistTracks.push({
        id: track.id,
        name: track.name,
        album: track.album,
        artist: track.artist
      })
    })
  };

  removeTrack(track){
    this.state.playlistTracks = this.state.playlistTracks.filter(function(item) {
        return item.id !== track.id
    })
  };

  updatePlaylistName(name){
    this.setState({playlistName: name})
  };

  savePlaylist(){
      Spotify.savePlaylist()
        let trackURIs = this.state.playListTracks.map(track => {
          return track.uri
        });
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack} />
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
