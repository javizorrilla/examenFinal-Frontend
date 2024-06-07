import { FunctionComponent } from "preact";
import ToFavs from "../islands/ToFavs.tsx";
import { Video } from "../types.ts";

const VideoUnique: FunctionComponent<{ videos: Video[], userid: string }> = ({ videos, userid }) => {
  return (
    videos.map((v) => {
      return (
        <div class="video-detail-container">
          <a href="/videos" class="back-button">← Go Back to List</a>
          <div class="video-frame">
            <iframe
              width="100%"
              height="400px"
              src={`https://www.youtube.com/embed/${v.youtubeid}`}
              title={v.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>
          </div>
          <h2 class="video-detail-title">{v.title}</h2>
          <p class="video-detail-description">{v.description}</p>
          <ToFavs videoid={v.id} userid={userid} fav={v.fav} />
        </div>
      );
    })
  );
};

export default VideoUnique;