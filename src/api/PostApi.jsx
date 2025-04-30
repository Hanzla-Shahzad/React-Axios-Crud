import axios from "axios";
import { useEffect } from "react";

const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export const getPost = () => {
  return api.get("/posts");
};
export const deleteData = () => {
  return api.delete(`/posts/${1}`);
};

export const postData = (post) => {
  return api.post(`/posts`, post);
};

export const putData = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
export default function FetchAxios() {
  useEffect(() => {
    getPost();
    deleteData();
    putData();
    putData();
  }, []);
}
