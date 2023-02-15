import { useRef, useState } from 'react';
import { Button, Input, Layout } from 'antd';
import styles from '../styles/Home.module.css';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [videoURL, setVideoURL] = useState<undefined | string>(undefined);
  const [videoBlobURL, setVideoBlobURL] = useState<undefined | string>(
    undefined
  );

  const downloadVideo = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch('/api/download', {
        method: 'POST',
        body: JSON.stringify({
          url: videoURL,
        }),
      });
      const video = await response.blob();
      const videoUrl = URL.createObjectURL(video);
      setVideoBlobURL(videoUrl);
    } catch (error) {
    } finally {
      setIsDownloading(false);
    }
  };

  const captureScreen = async () => {
    if (canvasRef.current && videoRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      const canvasContext = canvasRef.current.getContext('2d');
      if (canvasContext) {
        canvasContext.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
      }
    }
  };

  return (
    <Layout className={styles.Home}>
      <div className={styles.container}>
        <Input.Search
          placeholder="Enter video URL"
          onChange={event => setVideoURL(event.target.value)}
          onSearch={downloadVideo}
          enterButton
          loading={isDownloading}
        />

        <video
          ref={videoRef}
          src={videoBlobURL}
          width={426}
          height={240}
          controls
        >
          <source src={videoBlobURL} />
        </video>
        <Button onClick={captureScreen} disabled={!videoBlobURL}>
          Capture
        </Button>
        <canvas ref={canvasRef} style={{ overflow: 'auto' }} />
      </div>
    </Layout>
  );
}
