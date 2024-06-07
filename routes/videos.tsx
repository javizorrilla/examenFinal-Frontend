import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import VideoList from "../components/VideoList.tsx";
import { Video } from "../types.ts";

type State = {
    id: string;
    userid: string;
}

type Data = {
    videos: Video[];
}

export const handler: Handlers<Data, State> = {
    GET: async(_req: Request, ctx: FreshContext<State, Data>) => {
        const userid = ctx.state.id;
        const response = await fetch(`https://videoapp-api.deno.dev/videos/${userid}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });

        if(response.status === 404) {
            throw new Error("User with userid not found");
        } 

        if(response.status === 500) {
            throw new Error("Something failed");
        }

        if(response.status === 200) {
            const videos: Video[] = await response.json();
            return ctx.render({videos});
        } else {
            return ctx.render();
        }
    }
}

const Page = (props: PageProps<Video[], State>) => {
    return (
        <div class="video-page-container">
            <h1 class="video-list-title">Curso Deno Fresh</h1>
            <VideoList videos={props.data} userid={props.state.id}/>
        </div>
    )
} 

export default Page;