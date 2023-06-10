"use client";

import { data } from "autoprefixer";
import { useRouter } from "next/navigation";
import { title } from "process";
import { use, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};

const updateBlog = async (data: UpdateBlogParams) => {
  const res = await fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: data.title, description: data.description }),
  });
  return (await res).json();
};

const deleteBlog = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    toast.loading("Loading Blog...📩", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Blog Loaded! 🎉", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Blog Not Found! 🎉", { id: "1" });
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Adding Blog...📩", { id: "1" });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });
      toast.success("Blog Added! 🎉", { id: "1" });
      router.push("/");
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    toast.loading("Deleting Blog...📩", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Blog Deleted! 🎉", { id: "2" });
    router.push("/");
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit A Blog 🚀
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
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 shadow-xl rounded-lg bg-slate-200 m-auto font-semibold hover:bg-slate-100"
              >
                Update
              </button>
            </div>
          </form>
          <button
            onClick={handleDelete}
            className="px-4 py-2 shadow-xl rounded-lg bg-red-400 m-auto mt-2 font-semibold hover:bg-red-500 my-2"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
