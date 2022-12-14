import React, {useRef, useEffect} from 'react'
import spaceship from '../../../../assets/spaceship2.png'

function Dashboard() {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    console.log(ctx);
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    

    const image = new Image();
    image.src = spaceship;
    image.onload = () => {
      ctx.drawImage(image, 185, 550, 30, 30);
    };
  }, []);


  return (<canvas width={400} height={600} ref={canvasRef} className="dashboardGame"></canvas>)
}

export default Dashboard