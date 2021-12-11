import {base} from "../utils/sClient";

export default function Dashboard() {

    return (
        <button className="button block" onClick={() => base.auth.signOut()}>
            Sign Out
        </button>
    )
}