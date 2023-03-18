import axios from "axios";

const apiAir = axios.create({
    baseURL: "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-23.55&longitude=-46.64&",
});

export default apiAir;