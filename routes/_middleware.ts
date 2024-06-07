import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import jwt from "jsonwebtoken";

type State = {
    id: string;
    name: string;
    email: string;
}

export async function handler(req: Request, ctx: FreshContext<State>) {
    if(ctx.destination !== "route") {
        const response = await ctx.next();
        return response;
    }

    if(ctx.route === "/login" || ctx.route === "/register") {
        const response = await ctx.next();
        return response;
    }

    const {auth} = getCookies(req.headers);
    if(!auth) {
        return new Response("", {
            status: 307,
            headers: {location: "/login"}
        });
    }

    const validToken = jwt.verify(auth, Deno.env.get("JWT_SECRET"));
    if(!validToken) {
        return new Response("", {
            status: 307,
            headers: {location: "/login"}
        });
    }

    ctx.state.id = validToken.id;
    ctx.state.email = validToken.email;
    ctx.state.name = validToken.name;

    const response = await ctx.next();
    return response;
}