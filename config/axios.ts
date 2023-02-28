import axios from "axios";

const instance = axios.create({
	baseURL: "https://amazon-ish-backend.onrender.com/",
	timeout: 30000,
});

export default instance;
