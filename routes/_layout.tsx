import { FreshContext } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default async function Layout(_req: Request, ctx: FreshContext) {
    return (
        <div>
            <Header name={"a"}/>
            <ctx.Component />
        </div>
    )
}