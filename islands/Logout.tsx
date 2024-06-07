import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";


const Logout: FunctionComponent = () => {
    return (
        <button class="logout-button" onClick={() => {
            document.cookie = "auth=; path=/;";
            window.location.href="/login"
        }}>Logout</button>
    )
}

export default Logout;