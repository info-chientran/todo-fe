'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import todoApi from './api/todo/todoApi';

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [todo, setTodo] = useState();

  const getTodo = async () => {
    try {
      const res = await todoApi.getTodo();
      setTodo(res?.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await todoApi.createTodo(data);
      console.log(res);
      getTodo();
      reset();
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  const deleteTodo = async (todoId) => {
    try {
      await todoApi.deleteTodo(todoId);
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, [todo?.id]);

  return (
    <section className="min-h-screen bg-[#faf9f8] p-6">
      <div className="mb-6">
        <h1 className="flex gap-x-2">
          <svg
            fill="currentColor"
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm0 15a5 5 0 100-10 5 5 0 000 10zm0-1.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm9.25-2.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM12 19c.41 0 .75.34.75.75v1.5a.75.75 0 01-1.5 0v-1.5c0-.41.34-.75.75-.75zm-7.75-6.25a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zm-.03-8.53c.3-.3.77-.3 1.06 0l1.5 1.5a.75.75 0 01-1.06 1.06l-1.5-1.5a.75.75 0 010-1.06zm1.06 15.56a.75.75 0 11-1.06-1.06l1.5-1.5a.75.75 0 111.06 1.06l-1.5 1.5zm14.5-15.56a.75.75 0 00-1.06 0l-1.5 1.5a.75.75 0 001.06 1.06l1.5-1.5c.3-.3.3-.77 0-1.06zm-1.06 15.56a.75.75 0 101.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5z"
              fill="currentColor"
            ></path>
          </svg>

          <span>My day</span>
        </h1>

        <div></div>
      </div>

      <div className="max-w-4xl">
        {/* Create Todo */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2 flex gap-x-2">
          <input
            type="text"
            {...register('title', {
              required: { value: true, message: 'Enter' }
            })}
            placeholder="Add a task"
            className="w-full rounded border px-4 py-2 shadow-sm"
          />
          <input type="text" {...register('completed')} value={false} hidden />

          <button
            type="submit"
            className="min-w-[100px] rounded border px-4 py-2 text-blue-500"
          >
            Add
          </button>
        </form>

        {/* Todo list */}
        <ul className="flex flex-col gap-y-2">
          {todo?.map((item, index) => {
            return (
              <li key={index} className="flex gap-x-2">
                <div className="flex w-full cursor-pointer items-center gap-x-2 rounded border bg-white p-2 shadow-sm">
                  <input
                    type="checkbox"
                    defaultChecked={item?.completed}
                    className="h-3 w-3 p-2"
                  />
                  <span>{item?.title}</span>
                </div>

                <button
                  onClick={() => deleteTodo(item?.id)}
                  className="min-w-[100px] rounded border px-4 py-2 text-red-500"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>

        <div className="fixed right-0 top-0 min-h-screen min-w-[calc(100vw-(896px+48px))] bg-[#faf9f8] shadow-lg"></div>
      </div>
    </section>
  );
}
