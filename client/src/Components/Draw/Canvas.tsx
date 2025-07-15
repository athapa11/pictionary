import React from 'react';

interface Props {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  startDraw?: (e: React.MouseEvent<HTMLCanvasElement>) => void,
  draw?: (e: React.MouseEvent<HTMLCanvasElement>) => void,
  stopDraw?: (e: React.MouseEvent<HTMLCanvasElement>) => void,
}

const Canvas = ({ canvasRef, startDraw, draw, stopDraw }: Props) => {
  return (
    <canvas 
      className='w-full h-full rounded-lg bg-white'
      ref={canvasRef}
      onMouseDown={startDraw}
      onMouseMove={draw}
      onMouseUp={stopDraw}
      onMouseLeave={stopDraw}
    />
  );
};

export default Canvas;