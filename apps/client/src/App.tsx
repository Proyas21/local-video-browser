import { useEffect, useState } from 'react';
import './App.css';
import dirInfoJson from "./info.json";

export default function App() {
  const [dirInfo, setDirInfo] = useState(dirInfoJson);
  useEffect(()=>{
    fetch("http://127.0.0.1:3000/").then(res=>
      
    res.json()).then(info =>
      setDirInfo(JSON.parse(info)));
  },[]);

  const dirClick = ()=>{

  }
  return (
    <div className='app'>
      <h2>{dirInfo.location}</h2>
      <h3>Files</h3>
      <div className="files-list">
        {dirInfo.children.map((item, i)=>(
          item.type===1&&
          <div className='file-card' key={i}>
            <img src="https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="dir card image" />
            <h3>{item.name}</h3>
          </div>
          ))}
      </div>
      <h3>Folders</h3>
      <div className="dir-list">
        {dirInfo.children.map((item, i)=>(
          item.type===0&&
          <div className='dir-card' key={i} onClick={dirClick}>
            <img src="folderIcon.svg" alt="dir card image" />
            <h4>{item.name}</h4>
          </div>
          ))}
      </div>
    </div>
  )
}
