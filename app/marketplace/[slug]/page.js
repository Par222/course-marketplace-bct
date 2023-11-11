"use client";
import NavBar from "@/components/common/Navbar";
import { courses } from "@/components/courses/Course";
import { web3Context } from "@/provider/Web3Provider";
import { useParams, useSearchParams } from "next/navigation";
import { useContext } from "react";
const Home = () => {
  const ctx=useContext(web3Context)
  const { slug } = useParams();
  const course = ctx.allCourses.filter((c) => c.slug == slug)[0];
  console.log(slug, course);
  const keypoints = [
    "Should have the hang of the basics",
    "Should know to work in an IDE",
    "Should have basic HTML knowldege",
    "Willingness to learn daily",
  ];
  return (
    <div className="my-3 mx-[10%]">
      <NavBar></NavBar>
      <div className="flex justify-between items-center my-10 ">
        <div className="w-[40%] mx-5">
          <h1 className="text-4xl font-extrabold mb-3">
            {course.title.substring(0, course.title.length / 2)}
            <span className="text-[#561eff]">
              {course.title.substring(
                course.title.length / 2,
                course.title.length
              )}
            </span>
          </h1>
          <span className=" text-gray-500">{course.description}</span>
          <div className="flex text-sm my-5 space-x-6">
            <button className="bg-[#561eff] text-white py-2 w-[30%] px-5 rounded-md font-medium ">
              Get Started
            </button>
            <button className="text-[#561eff] bg-[#ebe5ff] w-[30%] py-2 px-5 rounded-md font-medium ">
              Watch
            </button>
          </div>
        </div>
        {course.isOwned && course.state=="2" &&<div className="py-2 px-4 rounded-full text-sm  bg-red-200 text-red-700">Deactivated</div>}
        {course.isOwned && course.state=="0" &&<div className="py-2 px-4 rounded-full text-sm  bg-green-200 text-green-700">Purchased</div>}
        <div className="flex w-[60%]">
          <div className="bg-white w-[30%] h-[400px] translate-x-[100px] -skew-x-[20deg]"></div>
          <img src={course.coverImage} className="w-[70%]"></img>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2">
          {keypoints.map((k, i) => (
            <div className="flex space-x-3 items-center my-4">
              <div className="bg-[#561eff] py-2 px-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  fill="#ffffff"
                >
                  <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
                </svg>
              </div>
              <div>
                <h1 className="font-semibold text-sm">{`Keypoint ${i + 1}`}</h1>
                <p className="text-xs my-1 text-gray-500">{k}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm shadow-md rounded-md my-5">
          <div className="flex justify-between text-xs bg-gray-200 py-4 px-3 font-medium text-gray-500 ">
            <span>SECTION</span>
            <span>STATUS</span>
            <span>ACTION</span>
          </div>
          <div>
            {course.wsl.map((sec,i)=><>
            <div className="flex py-3 px-3 border-b-2 border-gray-200 text-xs">
              <p className="w-[47%] font-semibold">{sec}</p>
              {(!course.isOwned || course.state=="2") && <p className="w-[8%] bg-red-200 text-red-700 font-medium rounded-full py-1 px-3 text-center">Locked</p>}
              {course.isOwned && course.state=="0"&& <p className="w-[8%] bg-green-200 text-green-700 font-medium rounded-full py-1 px-3 text-center">Unlocked</p>}
              <button className="w-[45%] text-right text-[#561eff] font-semibold ">{course.isOwned && course.state=="0"?"Play":"Get Access"}</button>
            </div>
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
