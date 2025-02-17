import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useUserData } from '../context/userDataHook';
import router from 'next/router';

export default function CardLiveEvent(props: any) {
    const { userData } = useUserData();
    const [userEntries, setUserEntries] = useState(0);
    const [percentage, setPercent] = useState("0%");
    const endDate = new Date(props?.giveaway?.endDate)

    useEffect(() => {
        if (userData) {
            const tasksDoneByUser = userData?.participatedGiveaways?.filter(
                (tasks: any) => tasks.giveawayId === props.giveaway.uid
            );
            let sum = 0;
            tasksDoneByUser?.forEach((giveaway: any) => {
                sum += Number(giveaway.noOfEntries);
            });
            setUserEntries(sum);
            const percentage = (sum / props.giveaway?.totalEntries) * 100;
            setPercent(percentage + "%");
        }
    }, [userData])

    function goToPreview() {
        router.push("/company/giveaway/" + props?.giveaway?.uid);
    }

    return (
        <article
            className="flex flex-row bg-jade-900/5 rounded-lg border-[1.37px] border-w border-jade-100/40 align-center w-full p-3.5 snap-center hover:opacity-100 opacity-90 cursor-pointer transition-opacity duation-200 overflow-hidden space-x-4 md:space-x-8">
            {
                props.giveaway.prize[0].image
                    ?
                    <Image
                        onClick={goToPreview}
                        className="rounded-md group-hover:scale-105 transition duration-300 ease-in-out w-full max-w-[100px] md:max-w-[192px] h-auto object-cover" src={props.giveaway.prize[0].image} alt="Giveaway" width="206" height="206" />
                    :
                    <Image
                        onClick={goToPreview}
                        className="rounded-md group-hover:scale-105 transition duration-300 ease-in-out w-full max-w-[100px] md:max-w-[192px] h-auto object-cover" src="/assets/images/giveaway_img.png" alt="Giveaway" width="206" height="206" />
            }
            <div
                onClick={goToPreview}
                className="flex-1 justify-between h-full space-y-3.5 md:space-y-12">
                <div className="space-y-1.5 md:space-y-2">
                    <h4 className="font-medium text-white text-sm md:text-xl w-full md:mt-3">{props?.giveaway?.title}</h4>
                    <div className="flex w-full space-x-1.5">
                        <span className="text-white/60 text-sm">Ending:</span>
                        <span className="text-white text-sm font-Ubuntu-Bold">{endDate.toLocaleDateString("en-US")}</span>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center justify-between w-full">
                        <span className="flex font-Ubuntu-Bold text-white text-sm md:text-xl">Entries <QuestionMarkCircleIcon className="w-5 text-white/60 ml-1.5" /></span>
                        <span className="flex font-Ubuntu-Bold text-teal-900 text-sm md:text-2xl lg:w-auto text-center">{userEntries}/{props?.giveaway?.totalEntries}</span>
                    </div>
                    <div className="flex flex-col relative md:flex-row items-center">
                        <div className="border-[2px] border-teal-900/20 relative h-[24px] md:h-[32px] w-full rounded-full p-1 mt-1">
                            <div
                                style={{ width: percentage }}
                                className="rounded-full absolute top-0 left-0 flex h-full  items-center justify-center text-sm font-semibold text-white bg-gradient-to-r from-[#139BAD]/40 to-[#139BAD]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}