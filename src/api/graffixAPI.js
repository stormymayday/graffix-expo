import { SERVER_BASE_URL } from "@env";
import axios from "axios";

export default axios.create({
    baseURL: SERVER_BASE_URL,
});
