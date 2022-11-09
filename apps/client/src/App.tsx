import { useEffect, useState } from "react";
import "./App.css";
import DirInfo, { ChildDir, Dir, File, FsItems } from "./models/DirInfo";
import formatsByExt from "./misc/formatsByExt.json";
import FileCard from "./components/fileCard";
import FolderCard from "./components/folderCard";
import VideoCard from "./components/videocard";

export default function App() {
  const [dirInfo, setDirInfo] = useState<DirInfo>();
  const [videoList, setVideoList] = useState<File[]>();
  const [dirList, setDirList] = useState<ChildDir[]>();
  const [fileList, setFileList] = useState<File[]>();
  useEffect(() => {
    fetch("http://127.0.0.1:3000/browse/Mithu%20b2")
      .then((res) => res.json())
      .then((info) => setDirInfo(JSON.parse(info)));
  }, []);
  useEffect(() => {
    const vdo: File[] = [];
    const file: File[] = [];
    const dir: ChildDir[] = [];
    dirInfo?.children.forEach((item) => {
      switch (item.type) {
        case FsItems.Dir:
          dir.push(item);
          break;
        case FsItems.File:
          if (formatsByExt.video.includes(item.extension.replace(".", ""))) {
            vdo.push(item);
            break;
          }
          file.push(item);
          break;
      }
    });

    setVideoList(vdo);
    setFileList(file);
    setDirList(dir);
  }, [dirInfo]);

  const dirClick = () => {
    fetch("http://127.0.0.1:3000/")
      .then((res) => res.json())
      .then((info) => setDirInfo(JSON.parse(info)));
  };
  return (
    <div className="app">
      <h2>{dirInfo?.location}</h2>
      <h3>Videos</h3>
      <div className="files-list">
        {videoList?.map((vdo, i) => (
          <VideoCard key={i} video={vdo} />
        ))}
      </div>
      <h3>Files</h3>
      <div className="files-list">
        {fileList?.map((file, i) => (
          <FileCard key={i} file={file} />
        ))}
      </div>
      <h3>Folders</h3>
      <div className="dir-list">
        {dirList?.map((dir, i) => (
          <FolderCard key={i} dir={dir} />
        ))}
      </div>
    </div>
  );
}
