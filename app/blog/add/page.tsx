"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async (title: string, description: string) => {
  const res = await fetch("http://localhost:3000/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  const data = await res.json();
  return data;
};

const AddBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Adding Blog...📩", { id: "1" });
      await postBlog(titleRef.current?.value, descriptionRef.current?.value);
      toast.success("Blog Added! 🎉", { id: "1" });
      router.push("/");
    }
  };
  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add A New Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter Title"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 shadow-xl rounded-lg bg-slate-200 m-auto font-semibold hover:bg-slate-100"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
