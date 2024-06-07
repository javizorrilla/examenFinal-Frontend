import { FunctionComponent } from "preact";
import { Video } from "../types.ts";
import ToFavs from "../islands/ToFavs.tsx";

const VideoList: FunctionComponent<{videos: Video[], userid: string}> = ({videos, userid}) => {
    console.log(videos);
    return (
        <div class="video-list-container">
            {videos.videos.length > 0 && videos.videos.map((video) => {
                return (
                    <div class="video-item" key={video.id}>
                        <a href={`/video/${video.id}`} class="video-link">
                            <img src={video.thumbnail} alt={video.title} class="video-thumbnail"/>
                            <div class="video-info">
                                <h3 class="video-title">{video.title}</h3>
                                <p class="video-description">{video.description}</p>
                                <p class="video-release-date">Release date: {video.date}</p>
                            </div>
                        </a>
                        <ToFavs videoid={video.id} userid={userid} fav={video.fav} />
                    </div>
                )
            })}
        </div>
    );
}

export default VideoList;