import React from 'react'
import Toolbar from '../Components/Draw/Toolbar';
import Canvas from '../Components/Draw/Canvas';
import { useCanvas } from '../Hooks/useCanvas';

const Draw: React.FC = () => {
  const {
    canvasRef, tool, setTool,
    startDraw, draw, stopDraw,
    startErase,
    updateColour, updateSize, clearCanvas,
  } = useCanvas();
  
  return (
    <div className='flex flex-col p-10'>
      <Canvas 
        canvasRef={canvasRef} 
        startDraw={tool === 'rubber' ? startErase : startDraw} 
        draw={draw} 
        stopDraw={stopDraw}
      />
      <Toolbar 
        setTool={setTool} 
        updateColour={updateColour} 
        updateSize={updateSize} 
        clearCanvas={clearCanvas}
      />
    </div>
  )
}

export default Draw