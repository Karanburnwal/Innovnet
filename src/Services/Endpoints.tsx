const Endpoints = {
  baseUrl: "http://localhost:5000/api/", //"https://innovnet-backend.herokuapp.com/api/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  posts: "/posts/",
  categories: "/categories/",
  users: "/users/",
  upload: "/upload/",
  delete: "/delete",
};
export default Endpoints;
