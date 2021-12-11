import {base} from "../../utils/sClient";

export default function handler(req,res) {
    base.auth.api.setAuthCookie(req, res);
}