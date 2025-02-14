import React from 'react';
import Toolbar from '../Components/Draw/Toolbar';
import Canvas from '../Components/Draw/Canvas';
import { useCanvas } from '../Features/useCanvas';

const Draw: React.FC = () => {
  const {
    canvasRef, setTool,
    startDraw, draw, stopDraw,
    updateColour, updateSize, clearCanvas,
  } = useCanvas();
  
  return (
    <>
      <Canvas 
        canvasRef={canvasRef} 
        startDraw={startDraw} 
        draw={draw} 
        stopDraw={stopDraw}
      />
      <Toolbar 
        setTool={setTool} 
        updateColour={updateColour} 
        updateSize={updateSize} 
        clearCanvas={clearCanvas}
      />
    </>
  );
};

export default Draw;