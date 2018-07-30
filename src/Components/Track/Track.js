import React, { Component } from 'react';
import './Track.css'


class Track extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(){
    this.props.onAdd = this.props.track
  }

  removeTrack(){
    this.props.removeTrack = this.props.track
  }

  addRemove(){  if(this.props.isRemoval){
    return '-'
    } else {
    return '+'
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action">
          <div onClick = {this.removeTrack}>
            <span>{this.addRemove}</span>
          </div>
        </a>
      </div>
    );
  }
}

export default Track;