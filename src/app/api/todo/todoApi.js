import axiosClient from '../axiosClient';

const todoApi = {
  createTodo: (params) => {
    const url = `/todo`;
    return axiosClient.post(url, params);
  },
  getTodo: () => {
    const url = `/todo`;
    return axiosClient.get(url);
  },
  deleteTodo: (todoId) => {
    const url = `/todo/${todoId}`;
    return axiosClient.delete(url);
  }
};

export default todoApi;
