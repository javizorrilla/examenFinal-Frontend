import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { context } from "https://deno.land/x/esbuild@v0.20.2/mod.js";
import VideoUnique from "../../components/VideoUnique.tsx";
import { Video } from "../../types.ts";

type State = {
    id: string;
    userid: string;
}

type Data = {
    video: Video;
}
export const handler: Handlers<Data, State> = {
    GET: async(_req: Request, ctx: FreshContext<State, Data>) => {
        const userid = ctx.state.id;
        const videoid = ctx.params.videoid;
        const response = await fetch(`https://videoapp-api.deno.dev/video/${userid}/${videoid}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });

        if(response.status === 404) {
            throw new Error("User with userid not found");
        }

        if(response.status === 200) {
            const video: Video = await response.json();
            return ctx.render({video});
        } else {
            return ctx.render();
        }
    }
}

const Page = (props: PageProps<Video[], State>) => {
    return (
        <VideoUnique videos={props.data} userid={props.state.id} />
    );
}

export default Page;