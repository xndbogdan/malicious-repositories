import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import user_profile from "../public/assets/images/user_profile_rectangle.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { TrophyIcon } from "@heroicons/react/24/solid";

export default function WinnersList(props: any) {
  // console.log(props?.data?.winners)
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const endDate = new Date(props?.data?.endDate);
  useEffect(() => {
    // check props.data.winner contain name or imgUrl
    const userID = props.data.winners[0].userId;
    // get userData from firestore when uid === userID
    // set name and imgUrl
    if (userID) getUserData(userID);
  }, [props]);

  async function getUserData(id: string) {
    const q = query(collection(db, "users"), where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    const temp = querySnapshot.docs.map((doc) => doc.data());
    setName(temp[0].name);
    if (temp[0].imgUrl !== undefined || temp[0].imgUrl !== null)
      setImgUrl(temp[0].imgUrl);
  }
  return (
    <>
      <div className="border-[1.5px] border-jade-100 p-2 rounded-full">
        <div className="flex items-center space-x-4">
          {/* IMAGE */}
          <div className="w-14 h-14 rounded-2sm">
            {imgUrl ? (
              <Image
                className="rounded-full"
                src={imgUrl}
                alt="user_profile"
                width={192}
                height={192}
              />
            ) : (
              <Image
                className="rounded-full"
                src={user_profile}
                alt="user_profile"
                layout="intrinsic"
                objectFit="cover"
              />
            )}
          </div>
          <div className="items-center space-y-2">
            {/* NAME */}
            <h4 className="text-sm font-Ubuntu-Medium">
              {props?.data?.title}
            </h4>
            <h5 className="flex text-sm font-Ubuntu-Medium"><TrophyIcon className="text-fbyellow mr-2 w-4 h-4"/> <span className="text-teal-300 mr-1.5">{name}</span> won on {endDate.toLocaleDateString("en-US")}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
