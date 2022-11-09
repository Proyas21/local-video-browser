import { ChildDir } from "../models/DirInfo";

interface FolderCardModel {
  dir: ChildDir;
}

export default function FolderCard({ dir }: FolderCardModel) {
  return (
    <div className="dir-card">
      <img src="folderIcon.svg" alt="dir card image" />
      <h4>{dir.name}</h4>
    </div>
  );
}
