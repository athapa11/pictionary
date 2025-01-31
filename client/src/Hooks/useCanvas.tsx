import React, { useRef, useState, MouseEvent, useEffect } from 'react'

interface DrawOptions {
  colour: string,
  size: number,
}

type Tool = 'pen' | 'rubber' | 'fill';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [tool, setTool] = useState<string>('pen');
  const optionsRef = useRef<DrawOptions>({colour: 'black', size: 2});

  const [options, setOptions] = useState<DrawOptions>({
    colour: "black",
    size: 2,
  });


  // initialise canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return console.error('canvas not found'); // null check
    
    const context = canvas.getContext("2d");
    if(!context) return console.error('context not found'); // null check

    context.lineCap = "round";
    context.strokeStyle = options.colour;
    context.lineWidth = options.size;

    contextRef.current = context;
  }, []);

  // update options
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);


  const updateColour = (colour: string) => { 
    setOptions((prev) => ({ ...prev, colour }));
    if(contextRef.current){
      contextRef.current.strokeStyle = colour;
    }else{
      console.error('colour not updating');
    }
    console.log(colour);
  };

  const updateSize = (size: number) => {
    setOptions((prev) => ({ ...prev, size }));
    if(contextRef.current){
      contextRef.current.lineWidth = size;
    }else{
      console.error('size not updating');
    }
    console.log(size);
  };

  // clearCanvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if(!canvas || !contextRef) return;
    contextRef.current?.clearRect(0, 0, canvas.width, canvas.height);
  };


  // listener for onmousedown (drawing setup)
  const startDraw = (e: MouseEvent<HTMLCanvasElement>) => {
    console.log('event fire test');
    const { offsetX, offsetY } = e.nativeEvent; 
    if(!contextRef.current) return; // null check

    // set options
    contextRef.current.strokeStyle = optionsRef.current.colour;
    contextRef.current.lineWidth = optionsRef.current.size;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY); // set mouse position in canvas
    setIsDrawing(true);
  };

  const startErase = (e: MouseEvent<HTMLCanvasElement>) => {
    console.log('event fire test');
    const { offsetX, offsetY } = e.nativeEvent; 
    if(!contextRef.current) return; // null check

    // set options
    contextRef.current.strokeStyle = '#FFFFFF';
    contextRef.current.lineWidth = optionsRef.current.size;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY); // set mouse position in canvas
    setIsDrawing(true);
  };


  // listener for onmousemove (draw)
  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if(!isDrawing || !contextRef.current) return; // null check

    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };


  // listener for onmouseup + onmouseleave (stop drawing)
  const stopDraw = (e: MouseEvent<HTMLCanvasElement>) => {
    if(contextRef.current){
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  return {
    canvasRef, tool, setTool,
    updateColour, updateSize,
    startDraw, draw, stopDraw,
    startErase, 
    clearCanvas,
  };
};