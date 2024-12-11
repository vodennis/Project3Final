import axios from "axios";
const newAxios = axios.create({
  baseURL: "http://localhost:5000"
});

export default {
  getAll() {
    return newAxios.get("/recipes").then((res) => res.data);
  },
  likeRecipe(id: number) {
    return newAxios.post(`/recipes/${id}/like`).then(res => res.data.likes);
  },
  create(data: {name: string, instructions: string, steps: string, ingredients: string[], image_url: string}) {
    return newAxios.post("/recipes", data).then(res => res.data.result);
  }
};
