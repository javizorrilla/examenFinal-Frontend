import { FreshContext, Handlers, RouteConfig } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import Login from "../components/Login.tsx";
import { User } from "../types.ts";
import jwt from "jsonwebtoken";
import { Data } from "./register.tsx";

export const config: RouteConfig = {
    skipInheritedLayouts: true, // Skip already inherited layouts
};

export const handler: Handlers<Data, unknown> = {
    POST: async(req: Request, ctx: FreshContext<unknown, Data>) => {
        const url = new URL(req.url);
        const form = await req.formData();
        const email = form.get("email")!.toString();
        const password = form.get("password")!.toString();

        const response = await fetch("https://videoapp-api.deno.dev/checkuser", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email, 
                password
            })
        });

        if(response.status === 400 || response.status === 404) {
            return ctx.render({message: "User not found or incorrect credentials"});
        }

        if(response.status === 200) {
            const data: Omit<User, "password"> = await response.json();
            const token = jwt.sign({
                email: data.email,
                name: data.name,
                id: data.id
            }, Deno.env.get("JWT_SECRET"), {expiresIn: "3h"});
            const headers = new Headers();
            setCookie(headers, {
                name: "auth", 
                value: token,
                domain: url.hostname,
                sameSite: "Lax",
                path: "/",
                secure: true
            });
            headers.set("location", "/videos");
            return new Response("", {
                status: 303,
                headers
            });
        } else {
            return ctx.render();
        }
    }
}

const Page = () => <Login />

export default Page;