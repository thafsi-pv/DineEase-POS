import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/img/avatars/avatar11.png";
import banner from "../../../../assets/img/profile/banner.png";
import Card from "../../../../components/card";
import Upload from "./Upload";
import General from "./General";
import axiosInstance2 from "../../../../axios/axiosInterceptor2";
import { GET_PROFILE_API } from "../../../../axios/const";

const Banner = () => {
  const [user, setUser] = useState(null);
  console.log("🚀 ~ file: Banner.jsx:12 ~ Banner ~ user:", user);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = await axiosInstance2.get(GET_PROFILE_API);
    console.log("🚀 ~ file: Banner.jsx:18 ~ getUserData ~ data:", data);
    setUser({
      firstName: data?.data[0].firstName,
      lastName: data?.data[0].lastName,
      email: data?.data[0].email,
      mobile: data?.data[0].mobile,
      alternateNo: data?.data[0].alternateNo,
      dob: data?.data[0].dob,
      address: data?.data[0].address,
      imageUrl: data?.data[0].imageUrl,
      gender: data?.data[0].gender,
    });
  };

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}>
        <div className="absolute -bottom-12 flex h-[117px] w-[117px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src={user?.imageUrl}
            alt=""
          />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {user?.firstName} {user?.lastName}
        </h4>
        <p className="text-base font-normal text-gray-600">Product Manager</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="z-0 col-span-5 lg:!mb-0 flex flex-col justify-center">
          {user && <General user={user} setUser={setUser} />}
        </div>
        <div></div>
      </div>
    </Card>
  );
};

export default Banner;
