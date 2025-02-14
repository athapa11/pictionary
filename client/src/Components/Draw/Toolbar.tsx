import crayon from '../../assets/crayon.png';
import rubber from '../../assets/rubber.png';
import dot from '../../assets/dot.png';
import bin from '../../assets/bin.png';
import ToolButton from '../Common/ToolButton';
import SizeButton from '../Common/SizeButton';

interface Props {
  updateColour:(colour: string) => void,
  updateSize: (size: number) => void,
  clearCanvas: () => void,
  setTool: React.Dispatch<React.SetStateAction<string>>,
}

const Toolbar = ({ setTool, updateColour, updateSize, clearCanvas }: Props) => {
  return (
    <div className='flex flex-row p-2'>
      <div className='grid grid-cols-10 px-2'>
        <button className='bg-[#000000] hover:bg-[#2F4F4F] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#000000')}/>
        <button className='bg-[#FF0000] hover:bg-[#DC143C] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#FF0000')}/>
        <button className='bg-[#0000CD] hover:bg-[#4169E1] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#0000CD')}/>
        <button className='bg-[#008000] hover:bg-[#228B22] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#008000')}/>
        <button className='bg-[#FFA500] hover:bg-[#FF7F50] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#FFA500')}/>
        <button className='bg-[#8B4513] hover:bg-[#A0522D] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#8B4513')}/>
        <button className='bg-[#FFFF00] hover:bg-[#EEE8AA] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#FFFF00')}/>
        <button className='bg-[#9370DB] hover:bg-[#6A5ACD] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#9370DB')}/>
        <button className='bg-[#87CEFA] hover:bg-[#00BFFF] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#87CEFA')}/>
        <button className='bg-[#FF69B4] hover:bg-[#FFB6C1] w-10 h-10 rounded-full m-0.5' onClick={() => updateColour('#FF69B4')}/>
      </div>

      
      <div className='flex not-first:gap-0.5 px-2'>
        <ToolButton src={crayon} onClick={() => setTool('pen')} />
        <ToolButton src={rubber} onClick={() => setTool('rubber')} />
      </div>


      <div className='flex not-first:gap-0.5 px-2'>
        <SizeButton src={dot} onClick={() => updateSize(6)} size={4}/>
        <SizeButton src={dot} onClick={() => updateSize(12)} size={6}/>
        <SizeButton src={dot} onClick={() => updateSize(24)} size={8}/>
      </div>

      <ToolButton src={bin} onClick={() => clearCanvas()}/>
    </div>
  );
};

export default Toolbar;