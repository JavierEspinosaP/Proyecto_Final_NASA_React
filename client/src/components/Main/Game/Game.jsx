import React, { useRef } from 'react'
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { Image } from 'react-konva';
import spaceship from '../../../assets/spaceship.png'
import useImage from 'use-image';

function Game() {

  const stageRef = useRef(null);
  const [image] = useImage('');

  return (
    <div className="Game">
      <div>
        <h2 className="GameTitle">Space Invaders</h2>
        <Stage className="canvas" width={400} height={600} ref={stageRef}>
          <Layer>
            <Rect x={0} y={0} width={400} height={600} fill="black" />
            <Text text="Space Invaders" x={120} y={300} fontSize={24} fill="white" />
            <Image
              image={image}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default Game
