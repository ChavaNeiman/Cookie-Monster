import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'

export default function PlayVideo(props) {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    setVideoUrl(props.url);
  }, [props.url])

  return (
    <div>
    <div id="iframe">
      <ReactPlayer width="100%" height="400px" controls url={videoUrl+"/?showinfo=0&enablejsapi=1&origin=http://localhost:3000"} loop muted />
    </div>
    </div>
  );

}
