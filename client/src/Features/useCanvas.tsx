import { useRef, useState, MouseEvent, useEffect } from 'react'
import { useSignalR } from '../Context/useSignalR';

interface DrawOptions {
  colour: string,
  size: number,
}

interface Drawing {
  x: number,
  y: number,
  type: 'start' | 'draw' | 'stop' | 'clear',
  colour: string,
  size: number
}

export const useCanvas = () => {
  const connection = useSignalR();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const optionsRef = useRef<DrawOptions>({colour: 'black', size: 2});

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [tool, setTool] = useState<string>('pen');
  const [options, setOptions] = useState<DrawOptions>({ colour: "black", size: 6 });

  // register listeners and handle
  useEffect(() => {
    if(!connection) return;

    const handleDrawing = (drawing: Drawing) => {
      if(!contextRef.current) return;
      
      const context = contextRef.current;

      if(drawing.type == 'start') {
        context.beginPath();
        context.strokeStyle = drawing.colour;
        context.lineWidth = drawing.size;
        context.moveTo(drawing.x, drawing.y);
      }
      else if(drawing.type == 'draw') {
        context.lineTo(drawing.x, drawing.y);
        context.stroke();
      }
      else if(drawing.type == 'stop') {
        context.closePath();
      }
      else if(drawing.type == 'clear') {
        const canvas = canvasRef.current;
        if(canvas && contextRef.current){
          contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
    connection.on('GetDrawing', handleDrawing);

    return () => {
      connection.off('GetDrawing', handleDrawing);
    };
  }, [connection]);

  // initialise canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if(!canvas || !context) return console.error('canvas or context not found');

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // adjust canvas size
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.resetTransform();
      context.scale(dpr, dpr);

      // set drawing options
      context.lineCap = "round";
      context.strokeStyle = options.colour;
      context.lineWidth = options.size;

      context.putImageData(imageData, 0, 0); // restore drawing before resize
    }
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    contextRef.current = context;

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);


  // update options when changed
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = options.colour;
      contextRef.current.lineWidth = options.size;
    }
    optionsRef.current = options;
  }, [options]);


  // get scaled mouse position
  const getMousePosition = (e: MouseEvent<HTMLCanvasElement>) => 
  {
    const canvas = canvasRef.current;
    if(!canvas) return {x: 0, y: 0};

    const rect = canvas.getBoundingClientRect();

    return {
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top)
    };
  };


  const updateColour = (colour: string) => { 
    setTool('pen');
    setOptions((prev) => ({ ...prev, colour }));
  };

  const updateSize = (size: number) => {
    setOptions((prev) => ({ ...prev, size }));
  };

  // clearCanvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if(canvas && contextRef.current){
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }

    const payload = {
      x: 0,
      y: 0,
      type: 'clear',
      colour: '',
      size: optionsRef.current.size
    }

    connection.send("SendDrawing", payload)
    .then(() => console.log('sent: ', payload))
    .catch(err => console.log('SendDrawing failed: ', err));
  };


  // listener for onmousedown (drawing setup)
  const startDraw = (e: MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePosition(e); 
    if(!contextRef.current) return; // null check

    // set options
    if(tool === 'rubber'){
      contextRef.current.strokeStyle = '#FFFFFF';
    }
    else{
      contextRef.current.strokeStyle = optionsRef.current.colour;
    }
    contextRef.current.lineWidth = optionsRef.current.size;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y); // set mouse position in canvas
    setIsDrawing(true);

    const payload = {
      x,
      y,
      type: 'start',
      colour: tool === 'rubber' ? '#FFFFFF' : optionsRef.current.colour,
      size: optionsRef.current.size
    }

    connection.send("SendDrawing", payload)
    .then(() => console.log('sent: ', payload))
    .catch(err => console.log('SendDrawing failed: ', err));
  };


  // listener for onmousemove (draw)
  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if(!isDrawing || !contextRef.current) return; // null check

    const { x, y } = getMousePosition(e); 
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();

    const payload = {
      x,
      y,
      type: 'draw',
      colour: tool === 'rubber' ? '#FFFFFF' : optionsRef.current.colour,
      size: optionsRef.current.size
    }

    connection.send("SendDrawing", payload)
    .then(() => console.log("sent: ", payload))
    .catch(err => console.log('SendDrawing failed: ', err));
  };


  // listener for onmouseup + onmouseleave (stop drawing)
  const stopDraw = (_e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return; // guard to only trigger stopdraw when drawing

    if(contextRef.current){
      contextRef.current.closePath();
    }
    setIsDrawing(false);

    const payload = {
      x: 0,
      y: 0,
      type: 'stop',
      colour: optionsRef.current.colour,
      size: optionsRef.current.size
    }

    connection.send("SendDrawing", payload)
    .then(() => console.log('sent: ', payload))
    .catch(err => console.log('SendDrawing failed: ', err));
  };

  return {
    canvasRef,
    setTool,
    updateColour, 
    updateSize,
    startDraw, 
    draw, 
    stopDraw,
    clearCanvas,
  };
};