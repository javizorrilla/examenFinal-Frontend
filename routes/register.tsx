import { FreshContext, Handlers, RouteConfig } from "$fresh/server.ts";
import { User } from "../types.ts";
import jwt from "jsonwebtoken";
import { setCookie } from "$std/http/cookie.ts";
import Register from "../components/Register.tsx";

export const config: RouteConfig = {
    skipInheritedLayouts: true, // Skip already inherited layouts
};

export type Data = {
    message: string;
}

export const handler: Handlers<Data, unknown> = {
    POST: async(req: Request, ctx: FreshContext<unknown, Data>) => {
        const url = new URL(req.url);
        const form = await req.formData();
        const email = form.get("email")!.toString();
        const password = form.get("password")!.toString();
        const name = form.get("name")!.toString();

        const response = await fetch("https://videoapp-api.deno.dev/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password,
                name
            })
        });

        if(response.status === 400) {
            return ctx.render({message: "Email already exists"});
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

const Page = () => <Register />

export default Page;