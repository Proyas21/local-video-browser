import { File } from "../models/DirInfo";

interface VideoCardModel {
  video: File;
}

export default function VideoCard({ video }: VideoCardModel) {
  return (
    <div className="file-card">
      <img
        src="https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="dir card image"
      />
      <h3>{video.name}</h3>
    </div>
  );
}
