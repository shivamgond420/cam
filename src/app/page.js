"use client";
import React, { useRef, useState, useEffect } from "react";

const Err = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasphoto, SethasPhoto] = useState(false);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const takephoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    SethasPhoto(true);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);
  return (
    <div>
      <div className="camra">
        <video ref={videoRef}></video>
        <button onClick={takephoto} className="bg-slate-500">
          SNAP!
        </button>
      </div>
      <div className={"result" + (hasphoto ? "hasphoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button  className="bg-slate-500">CLOSE!</button>
      </div>
    </div>
  );
};

export default Err;
