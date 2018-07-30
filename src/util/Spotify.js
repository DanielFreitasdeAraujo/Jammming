const usersAccessToken = ""
const redirectURI = "http://localhost:3000/";
const clientID = "0f943bc0ebab4f848a34b7fdfcee4a47";
let accessToken;
let userID;



let Spotify = {

  search(term){
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {headers:
        {Authorization: `Bearer ${accessToken}`}
      }
    ).then(response => {
        if (response.ok) {
          return response.json()}
        }).then(jsonResponse => {return jsonResponse.map(track =>
            ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            })
          )
        }
      )
    },



  savePlaylist(playlistName,trackURIs){
    let accessToken;
    let headers = {};
    let clientID;
    let playlistID;

    fetch("https://api.spotify.com/v1/me",
      {headers: headers}
    ).then(response =>
        response.json()
      ).then(jsonResponse =>{
        userID = jsonResponse.id

        fetch(
          `/v1/users/${clientID}/playlists`,
            {
              method: 'POST',
              headers: {
                'Authorization': accessToken,
                'Content-type': 'application/json'
              },
              body: {
                'name': playlistName
              }
            }
          ).then(response => {
            response.json()}
          ).then(jsonResponse => {
            playlistID = jsonResponse.id

            fetch(
              `/v1/users/${clientID}/playlists/${playlistID}/tracks`,
                {
                  method: 'POST',
                  headers: {
                    'Authorization': accessToken,
                    'Content-type': 'application/json'
                  },
                  body: {
                    'uri': trackURIs
                  }
                }
              ).then(response => {
                response.json()
              }
              ).then(jsonResponse => {
                playlistID = jsonResponse.id
              })
            })
          })
  },




  getAcessToken(){
    let accessToken
    if(usersAccessToken){
      accessToken = usersAccessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch){
      accessToken = accessTokenMatch;
      let expiresIn = expiresInMatch;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
  }
}

export default Spotify;
