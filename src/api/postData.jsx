import { useState, useEffect } from "react";
import FetchAxios, { getPost, deleteData, postData, putData } from "./PostApi";
export const Post = () => {
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  const [editData, setEditData] = useState({});
  const getPostData = async () => {
    try {
      const res = await getPost();
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostData();
    handleDeleteBtn();
    handleBtn();
  }, []);

  // Delete Data
  const handleDeleteBtn = async (id) => {
    try {
      const res = await deleteData(id);
      if (res.status === 200) {
        console.log("response recieved");
        setData((prev) => prev.filter((val) => val.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Add Data
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBtn = async () => {
    try {
      const res = await postData(addData);
      if (res.status === 201) {
        setData((prev) => [...prev, res.data]);
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeSubmitData = (e) => {
    e.preventDefault();
    let action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      handleBtn();
    }
    if (action === "Edit") {
      handlePostData();
    }
  };

  //Edit Data
  const handleEditBtn = (curElement) => setEditData(curElement);
  useEffect(() => {
    editData &&
      setAddData({
        title: editData.title || "",
        body: editData.body || "",
      });
  }, [editData]);

  const handlePostData = async () => {
    try {
      const res = await putData(editData.id, addData);
      console.log(res);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((val) => {
            return val.id === editData.id ? res.data : val;
          });
        });
        setAddData({ title: "", body: "" });
        setEditData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  // isEmpty
  const isEmpty = Object.keys(editData).length === 0;

  return (
    <>
      <FetchAxios />
      <form
        onSubmit={hanldeSubmitData}
        action=""
        className="bg-gray-700 w-lg h-auto py-2 mx-auto text-center flex gap-1.5 justify-center items-center rounded-sm"
      >
        <label htmlFor="title"></label>
        <input
          type="text"
          name="title"
          id="title"
          value={addData.title}
          onChange={handleInput}
          className="bg-white rounded-sm py-0.5"
        />
        <label htmlFor="body"></label>
        <input
          type="text"
          name="body"
          id="body"
          value={addData.body}
          onChange={handleInput}
          className="bg-white rounded-sm py-0.5"
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded-sm px-6 py-1 hover:cursor-pointer"
          value={isEmpty ? "Add" : "Edit"}
        >
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
      <ul className="flex flex-row flex-wrap gap-6 justify-center">
        {data &&
          data.map((curElement) => (
            <li
              className="mt-2 w-[310px] border h-auto py-5 ps-3 bg-[#696d72] border-s-blue-600 text-white rounded-sm p-2 shadow-2xl"
              key={curElement.id}
            >
              <h1>
                <span className="font-bold text-lg">Id</span> : {curElement.id}
              </h1>
              <span className="font-bold text-lg">Title</span> :{" "}
              {curElement.title}
              <h2 className="mt-2">
                {" "}
                <span className="font-bold text-lg">Body</span> :{" "}
                {curElement.body}
              </h2>
              <p>
                Likes : 👍<sup>3</sup>
              </p>
              <div className="flex flex-row flex-wrap gap-2 mt-3">
                <button
                  className="bg-yellow-500 text-white px-7 py-2 rounded-sm hover:cursor-pointer hover:bg-amber-300"
                  onClick={() => handleEditBtn(curElement)}
                >
                  Edit 📝
                </button>
                <button
                  className={`bg-red-500 text-white px-7 py-2 rounded-sm hover:cursor-pointer hover:bg-red-400`}
                  onClick={() => handleDeleteBtn(curElement.id)}
                >
                  Delete
                  <span className="text-xl">🗑</span>
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
