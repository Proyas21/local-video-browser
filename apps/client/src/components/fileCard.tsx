import { File } from "../models/DirInfo";

interface FileCardModel {
  file: File;
}

export default function FileCard({ file }: FileCardModel) {
  return (
    <div className="dir-card">
      <img src="/folderIcon.svg" alt="dir card image" />
      <h4>{file.name}</h4>
    </div>
  );
}
