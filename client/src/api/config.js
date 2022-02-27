import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://to-do-list-getir.herokuapp.com/"
});

const { get, post, put, delete: remove } = apiClient;
export { get, post, put, remove };

