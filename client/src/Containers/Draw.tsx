import React from 'react';
import Toolbar from '../Components/Draw/Toolbar';
import Canvas from '../Components/Draw/Canvas';
import { useCanvas } from '../Features/useCanvas';
import { useSession } from '../Context/useSession';

const Draw: React.FC = () => {
  const {
    canvasRef, setTool,
    startDraw, draw, stopDraw,
    updateColour, updateSize, clearCanvas,
  } = useCanvas();
  
  const { role } = useSession();
  
  return (
    <>
      <Canvas 
        canvasRef={canvasRef} 
        startDraw={role === 'drawer' ? startDraw : undefined} 
        draw={role === 'drawer' ? draw : undefined} 
        stopDraw={role === 'drawer' ? stopDraw : undefined}
      />
      
      {role === 'drawer' &&
      (<Toolbar 
        setTool={setTool} 
        updateColour={updateColour} 
        updateSize={updateSize} 
        clearCanvas={clearCanvas}
      />)}
    </>
  );
};

export default Draw;