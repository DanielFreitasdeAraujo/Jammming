import React, { Component } from 'react';
import './TrackList.css'
import Track from '../Track/Track'


class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">

        {
          this.props.tracks.map(track => {
            return <Track onAdd = {this.props.isRemoval} isRemove = {this.props.isRemoval} onRemove = {this.props.onRemove}/>
          })
        }

      </div>
    );
  }
}

export default TrackList;
