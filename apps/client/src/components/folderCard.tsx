import { ChildDir } from "../models/DirInfo";

// fireship
interface FolderCardModel {
  dir: ChildDir;
}

export default function FolderCard({ dir }: FolderCardModel) {
  return (
    <div className="dir-card">
      <a
        href={location.pathname + dir.name.replaceAll(".", "ȧ")}
        className="dir-ancher"
      >
        <img src="/folderIcon.svg" alt="dir card image" />
        <h4>{dir.name}</h4>
      </a>
    </div>
  );
}
