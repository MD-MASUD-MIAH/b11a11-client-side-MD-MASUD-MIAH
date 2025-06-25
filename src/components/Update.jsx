import { use } from "react";

import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hook/useAxiosSecure";
import { PageName } from "./PageName";

const Update = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const blog = useLoaderData();
  PageName("Update");
  const handleupdate = (e) => {
    e.preventDefault();

    const frm = e.target;

    const plant = new FormData(frm);

    const blogUpdate = Object.fromEntries(plant.entries());

    axiosSecure
      .put(
        `https://blogsite-b11a11-server.vercel.app/blogs/${blog._id}`,
        blogUpdate
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Update Success !",
            icon: "success",
            draggable: true,
            timer: 1500,
          });
          navigate("/allblogs");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { user } = use(AuthContext);
  return (
    <div className="py-20 w-11/12 mx-auto">
      <div className="md:max-w-5xl mx-auto border border-[#550527] rounded p-6 shadow ">
        <h2 className="text-3xl font-bold  mb-6 ">Update Blog</h2>
        <form
          onSubmit={handleupdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="  text-sm font-medium mb-1">Blog Title</label>
            <input
              name="title"
              type="text"
              defaultValue={blog.title}
              placeholder="blog title"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">PhotoURL</label>
            <input
              name="image"
              type="text"
              defaultValue={blog.image}
              placeholder="enter photo url"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              defaultValue={blog.category}
              name="category"
              className="select select-bordered w-full"
            >
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="food">Food</option>
              <option value="education">Education</option>
              <option value="personalDevelopment">Personal Development</option>
              <option value="entertainment">Entertainment</option>
              <option value="health&fitness">Health & Fitness</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User Name</label>
            <input
              name="userName"
              value={user.displayName}
              type="text"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Added Date
            </label>
            <input
              name="addedTime"
              defaultValue={blog.addedTime}
              type="date"
              id="date"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Short Description
            </label>
            <textarea
              name="shortDesc"
              defaultValue={blog.shortDesc}
              className="textarea textarea-bordered w-full"
              rows="3"
              placeholder="Brief description..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Long Description
            </label>
            <textarea
              name="longDesc"
              defaultValue={blog.longDesc}
              className="textarea textarea-bordered w-full"
              rows="5"
              placeholder="Brief description..."
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full tom-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
