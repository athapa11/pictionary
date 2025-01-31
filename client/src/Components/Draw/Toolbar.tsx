import crayon from '../../assets/crayon.png'
import rubber from '../../assets/rubber.png'
import fill from '../../assets/fill.png'
import dot from '../../assets/dot.png'
import bin from '../../assets/bin.png'
import ToolButton from '../Common/ToolButton'
import SizeButton from '../Common/SizeButton'

interface Props {
  updateColour:(colour: string) => void,
  updateSize: (size: number) => void,
  clearCanvas: () => void,
  setTool: React.Dispatch<React.SetStateAction<string>>,
}

const Toolbar = ({ setTool, updateColour, updateSize, clearCanvas }: Props) => {
  return (
    <div className='flex flex-row p-2'>
      <div className='grid grid-cols-5 px-2'>
        <button className='bg-black p-1 w-10 h-10 rounded' onClick={() => updateColour('black')}/>
        <button className='bg-[#FF0000] p-1 w-10 h-10 rounded' onClick={() => updateColour('#FF0000')}/>
        <button className='bg-[#0000CD] p-1 w-10 h-10 rounded' onClick={() => updateColour('#0000CD')}/>
        <button className='bg-[#008000] p-1 w-10 h-10 rounded' onClick={() => updateColour('#008000')}/>
        <button className='bg-[#FFA500] p-1 w-10 h-10 rounded' onClick={() => updateColour('#FFA500')}/>
        <button className='bg-[#8B4513] p-1 w-10 h-10 rounded' onClick={() => updateColour('#8B4513')}/>
        <button className='bg-[#FFFF00] p-1 w-10 h-10 rounded' onClick={() => updateColour('#FFFF00')}/>
        <button className='bg-[#9370DB] p-1 w-10 h-10 rounded' onClick={() => updateColour('#9370DB')}/>
        <button className='bg-[#87CEFA] p-1 w-10 h-10 rounded' onClick={() => updateColour('#87CEFA')}/>
        <button className='bg-[#FF69B4] p-1 w-10 h-10 rounded' onClick={() => updateColour('#FF69B4')}/>
      </div>

      
      <div className='flex not-first:gap-0.5 px-2'>
        <ToolButton src={crayon} onClick={() => setTool('pen')} />
        <ToolButton src={rubber} onClick={() => setTool('rubber')} />
        <ToolButton src={fill} onClick={() => setTool('fill')} />
      </div>


      <div className='flex not-first:gap-0.5 px-2'>
        <SizeButton src={dot} onClick={() => updateSize(6)} size={4}/>
        <SizeButton src={dot} onClick={() => updateSize(12)} size={6}/>
        <SizeButton src={dot} onClick={() => updateSize(24)} size={8}/>
      </div>

      <ToolButton src={bin} onClick={() => clearCanvas()}/>
    </div>
  )
}

export default Toolbar