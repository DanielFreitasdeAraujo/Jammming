import React, { Component } from 'react';
import './TrackList.css'
import Track from '../Track/Track'


class TrackList extends Component {

  render() {
    if(this.props.tracks){
      return (
        <div className="TrackList">

          {
            this.props.tracks.map(track => {
              return <Track track={track} onAdd = {this.props.isRemoval} isRemoval = {this.props.isRemoval} onRemove = {this.props.onRemove} key = {track.id}/>
            })
          }

        </div>
      );
    }
    return null
  }
}

export default TrackList;
