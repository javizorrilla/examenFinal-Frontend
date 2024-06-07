import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

type Props = {
    videoid: string;
    userid: string;
    fav: boolean;
}

const ToFavs: FunctionComponent<Props> = ({userid, videoid, fav}) => {
    const [favourite, setFavourite] = useState<boolean>(fav);
    
    const postFavs = async() => {
        const response = await fetch(`https://videoapp-api.deno.dev/fav/${userid}/${videoid}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        });

        if(response.status === 200) {
            setFavourite(!fav);
            console.log("Fav toggled")   
        } else {
            console.log("Error toggling fav");
        }
    }

    return (
        <button class="fav-button" onClick={() => {
            postFavs();
            setFavourite(!fav)}}>
            {favourite? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
    );
}

export default ToFavs;