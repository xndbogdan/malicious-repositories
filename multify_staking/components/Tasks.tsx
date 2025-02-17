import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import link_icon from "../public/assets/images/link-2.svg";
import cross from "../public/assets/images/xmark.png";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import TasksTagItem from "./TaskTagItem";
import { useAuth } from "../context/authcontext";
import { useForm } from "react-hook-form";

interface TasksType {
  tasks: [
    {
      title: string;
      description: string;
      link: string;
      noOfEntries: String;
      dailyTask: boolean;
    }
  ];
  title: string;
  description: string;
  link: string;
  noOfEntries: String;
  dailyTasks: boolean;
}
const inviteBotUrl = process.env.NEXT_PUBLIC_INVITEBOT_URL;
export default function Tasks({ formStep, nextFormStep, prevFormStep }: any) {
  // default Test tasks
  const defaultTasks = [
    {
      title: "Retweet this Twitter post",
      description: "Retweet this Twitter post and follow @Binance",
      link: "twitter.com",
      noOfEntries: "1",
      dailyTask: true,
    },
    {
      title: "Follow us on Twitter",
      description: "Follow us on Twitter and retweet this post",
      link: "twitter.com",
      noOfEntries: "5",
      dailyTask: false,
    },
  ];
  // Modal States
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState(false);
  const [title, setTitle] = useState("");
  const [index, setIndex] = useState(0);
  // Modal Functions
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setEdited(false);
    setValue("description", "");
    setValue("link", "");
    setValue("noOfEntries", "");
    setValue("dailyTasks", false);
  };

  // data management for whole multi step form
  const { data, setFormValues } = useAuth();
  // local tasks
  const [tasks, setTasks] = useState(data?.tasks || []);
  // form states and values
  const methods = useForm<TasksType>({ mode: "onBlur" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = methods;
  const formValues = watch();
  // map Tasks from data?.tasks to formValues
  useEffect(() => {
    setTimeout(() => {
      if (
        data?.tasks !== undefined &&
        data?.tasks !== null &&
        data?.tasks.length !== 0
      ) {
        setValue("tasks", data?.tasks);
        setTasks(data?.tasks);
      } else {
        setTasks(defaultTasks);
      }
    }, 1);
  }, [setValue]);

  const handleNext = (data: any) => {
    // setFormValues(data);
    nextFormStep();
  };
  const handlePrev = (data: any) => {
    //setFormValues(data);
    prevFormStep();
  };

  // add tasks to local tasks and global as well
  const addTask = () => {
    // get values from formValue
    const temp = {
      title: title,
      description: formValues.description,
      link: formValues.link,
      noOfEntries: formValues.noOfEntries,
      dailyTask: formValues.dailyTasks,
    };
    // Add this task to Tasks
    const newTask = [...tasks, temp];
    setTasks(newTask);
    // set Default formValues
    setValue("description", "");
    setValue("link", "");
    setValue("noOfEntries", "");
    setValue("dailyTasks", false);
    reset();
    setOpen(false);
  };

  const updateTask = () => {
    // get values from formValue
    const temp = {
      title: tasks[index].title,
      description: formValues.description,
      link: formValues.link,
      noOfEntries: formValues.noOfEntries,
      dailyTask: formValues.dailyTasks,
    };

    // update task in tasks
    const tempTasks = [...tasks];
    tempTasks[index] = temp;
    setTasks(tempTasks);
    // set Default formValues
    reset();
    setValue("description", "");
    setValue("link", "");
    setValue("noOfEntries", "");
    setValue("dailyTasks", false);
    setOpen(false);
    setEdited(false);
  };

  const removeTask = (index: any) => {
    console.log(index);
    const temp = [...tasks];
    temp.splice(index, 1);
    setTasks(temp);
  };

  const editTask = (index: any) => {
    setEdited(true);
    //console.log(index);
    const temp = [...tasks];
    //console.log(temp[index]);
    setIndex(index);
    setOpen(true);
    setTitle(temp[index].title);
    setValue("description", temp[index].description);
    setValue("link", temp[index].link);
    setValue("noOfEntries", temp[index].noOfEntries);
    setValue("dailyTasks", temp[index].dailyTask);
  };
  useEffect(() => {
    //  console.log(formValues)
    // setFormValues(formValues)
    setTimeout(() => {
      setFormValues({
        tasks: tasks,
      });
    }, 100);
    //console.log(data);
  }, [tasks]);

  const taskElements = tasks.map(
    (
      task: {
        title:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
        dailyTask: boolean | undefined;
        link: string | undefined;
        noOfEntries: string | undefined;
        description: string | undefined;
      },
      index: React.Key | null | undefined
    ) => {
      return (
        <>
          <div className="w-1/2 px-2">
            <div
              key={index}
              className="border-[1.5px] border-jade-100 rounded-md p-6 md:pt-3.5 md:pb-5 md:px-8"
            >
              <div className="grid grid_tasks_area">
                {/* HEADING GROUP */}
                <div className="grid_tasks_heading">
                  {/* HEADING */}
                  <h4 className="text-[20px] leading-[25px] font-Ubuntu-Medium md:text-base md:leading-5">
                    {task.title}
                  </h4>
                </div>
                {/* BUTTONS GROUP */}
                <div className="grid_tasks_buttons mt-7 md:mt-0 md:justify-self-end">
                  <div className=" flex items-center gap-x-4 justify-between md:justify-end">
                    {/* CHECKBOX */}
                    <div className="flex items-center">
                      <label
                        htmlFor="Daily task"
                        className=" text-sm text-extraLightWhite mr-1"
                      >
                        Daily task
                      </label>
                      <input
                        disabled
                        name="checkbox-button"
                        id="Daily task"
                        type="checkbox"
                        onChange={() => { }}
                        className="inputCheckbox"
                        checked={task.dailyTask}
                      />
                    </div>

                    {/* BUTTON */}

                    <button
                      onClick={() => {
                        editTask(index);
                      }}
                      className=" w-[77px] h-8 border border-lightSecondaryGreen bg-jade-900 rounded-sm text-sm font-Ubuntu-Medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        removeTask(index);
                      }}
                      className=" w-[77px] h-8 border border-lightSecondaryGreen bg-jade-900 rounded-sm text-sm font-Ubuntu-Medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* CONTENT GROUP */}
                <div className="grid_tasks_content mt-6 md:mt-3.5">
                  <div className="flex flex-col items-center gap-4 mb-4 md:flex-row">
                    {/* INPUT */}
                    <div className="w-full md:w-1/2">
                      <div className="relative">
                        <input
                          disabled
                          className="inputField"
                          value={task.link}
                        />
                        <div className=" flex absolute top-2 right-[18px]">
                          <Image
                            src={link_icon}
                            alt="link_icon"
                            layout="intrinsic"
                          />
                        </div>
                      </div>
                    </div>

                    {/* INPUT */}
                    <div className="w-full md:w-1/2">
                      <div className="relative">
                        <input
                          disabled
                          className="inputField"
                          value={task.noOfEntries}
                        />
                      </div>
                    </div>
                  </div>
                  {/* INPUT */}
                  <div className="w-full">
                    <div className="relative">
                      <textarea
                        disabled
                        className="inputArea"
                        value={task.description}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  );
  // update
  return (
    <>
      {/* HEADING */}
      <h3 className="text-xl font-Ubuntu-Medium mb-6 lg:mb-8">Tasks</h3>
      <div className="flex flex-col gap-y-6">
        <div key={1} className="flex flex-wrap gap-y-6">{taskElements}</div>
        {/* BOX */}
        <div className="border-[1.5px] border-jade-100 rounded-md py-6 px-8">
          <h4 className=" text-[20px] leading-[25px] font-Ubuntu-Medium md:text-base md:leading-5 mb-6">
            Add a way to enter
          </h4>

          <div className="flex flex-col w-full items-center gap-y-3 md:flex-row md:flex-wrap md:gap-2">
            <TasksTagItem
              key={1}
              name={"Visiting a website"}
              onclick={() => {
                setTitle("Visit a URL");
                onOpenModal();
              }}
            />
            {/* <TasksTagItem
              key={2}
              name={"Refer a friend"}
              onclick={() => {
                setTitle("Refer A Friend");
                onOpenModal();
              }}
            /> */}
            <TasksTagItem
              key={211}
              name={"Share on Facebook"}
              onclick={() => {
                setTitle("Share on Facebook");
                onOpenModal();
              }}
            />
            {/* <TasksTagItem
              key={3}
              name={"Bonus"}
              onclick={() => {
                setTitle("Bonus");
                onOpenModal();
              }}
            /> */}
            {/* <TasksTagItem
              key={4}
              name={"Follow account"}
              onclick={() => {
                setTitle("Follow Account");
                onOpenModal();
              }}
            /> */}
            <TasksTagItem
              key={5}
              name={"Discord"}
              onclick={() => {
                setTitle("Join Discord");
                onOpenModal();
              }}
            />
            {/* <TasksTagItem
              key={6}
              name={"Disqus"}
              onclick={() => {
                setTitle("Join Disqus");
                onOpenModal();
              }}
            /> */}
            {/* <TasksTagItem
              key={7}
              name={"Instagram"}
              onclick={() => {
                setTitle("Follow on Instagram");
                onOpenModal();
              }}
            />
            <TasksTagItem
              key={8}
              name={"Facebook"}
              onclick={() => {
                setTitle("Follow on Facebook");
                onOpenModal();
              }}
            /> */}
            <TasksTagItem
              key={9}
              name={"Follow us on Twitter"}
              onclick={() => {
                setTitle("Follow us on Twitter");
                onOpenModal();
              }}
            />
              <TasksTagItem
              key={10}
              name={"Post on Twitter"}
              onclick={() => {
                setTitle("Post on Twitter");
                onOpenModal();
              }}
            />
            <TasksTagItem
              key={91}
              name={"Retweet this Twitter post"}
              onclick={() => {
                setTitle("Retweet this Twitter post");
                onOpenModal();
              }}
            />
            {/* <TasksTagItem
              key={10}
              name={"Snapchat"}
              onclick={() => {
                setTitle("Follow on Snapchat");
                onOpenModal();
              }}
            />
            <TasksTagItem
              key={11}
              name={"Youtube"}
              onclick={() => {
                setTitle("Follow on Youtube");
                onOpenModal();
              }}
            /> */}
            <TasksTagItem
              key={12}
              name={"Telegram"}
              onclick={() => {
                setTitle("Follow on Telegram");
                onOpenModal();
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-[60px] lg:mt-auto lg:ml-auto py-12 ">
        <div className="flex flex-col-reverse gap-y-6 md:gap-y-0 md:gap-x-[34px] md:flex-row lg:gap-x-8 lg:justify-end">
          {formStep > 0 && (
            <button onClick={handlePrev} className="buttonPrimary">
              Previous
            </button>
          )}
          {formStep < 4 && (
            <button onClick={handleNext} className="buttonPrimary">
              Next
            </button>
          )}
        </div>
      </div>
      {/* POPUP */}
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        showCloseIcon={false}
        classNames={{
          overlay: "popupTasksOverlay",
          modal: "!w-full !p-6 !m-0 md:!w-[594px] !bg-transparent",
        }}
      >
        <div className="bg-[#101B1B] border-[1.5px] border-jade-100 rounded-md p-6 md:pt-3.5 md:pb-5 md:px-8">
          <div className="grid grid_tasks_area">
            {/* HEADING GROUP */}
            <div className="grid_tasks_heading">
              {/* HEADING */}
              <h4 className=" text-[20px] leading-[25px] font-Ubuntu-Medium md:text-base md:leading-5">
                {title}
              </h4>
            </div>

            {/* BUTTONS GROUP */}
            <div className="grid_tasks_buttons mt-7 md:mt-0 md:justify-self-end">
              <div className=" flex items-center gap-x-4 justify-between md:justify-end">
                {/* CHECKBOX */}
                <div className="flex items-center">
                  <label
                    htmlFor="Daily task"
                    className=" text-sm text-extraLightWhite mr-1"
                  >
                    Daily task
                  </label>
                  <input
                    id="Daily task"
                    type="checkbox"
                    {...register("dailyTasks")}
                    className="inputCheckbox"
                  />
                </div>

                {/* BUTTON */}
                {!edited && (
                  <button
                    onClick={addTask}
                    className=" w-[77px] h-8 border border-transparent bg-jade-900 rounded-sm text-sm font-Ubuntu-Medium"
                  >
                    Add
                  </button>
                )}
                {
                  title === "Join Discord" && (
                    <button
                      onClick={() => {
                        window.open(
                          inviteBotUrl,
                          "_blank"
                        )
                      }}
                      className=" w-[77px] h-8 border border-lightSecondaryGreen bg-jade-900 rounded-sm text-sm font-Ubuntu-Medium"
                    >
                      Invite Bot
                    </button>
                  )
                }
                {edited && (
                  <button
                    onClick={updateTask}
                    className=" w-[77px] h-8 border border-transparent bg-jade-900 rounded-sm text-sm font-Ubuntu-Medium"
                  >
                    Update
                  </button>
                )}

                <div className=" flex absolute top-2 right-[18px]">
                  <Image
                    onClick={onCloseModal}
                    src={cross}
                    alt="link_icon"
                    layout="intrinsic"
                  />
                </div>
              </div>
            </div>

            {/* CONTENT GROUP */}
            <div className="grid_tasks_content mt-6 md:mt-3.5">
              <div className="flex flex-col items-center gap-4 mb-4 md:flex-row">
                {/* INPUT */}
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <input
                      className="inputField"
                      placeholder="Add a url or server id"
                      {...register("link", {
                        required: "Enter your share link / server id for Discord",
                      })}
                    />
                    <div className=" flex absolute top-2 right-[18px]">
                      <Image
                        src={link_icon}
                        alt="link_icon"
                        layout="intrinsic"
                      />
                    </div>
                  </div>
                </div>

                {/* INPUT */}
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <input
                      className="inputField"
                      placeholder="Number of entries"
                      {...register("noOfEntries", {
                        required: "Enter no of entries",
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* INPUT */}
              <div className="w-full">
                <div className="relative">
                  <textarea
                    className="inputArea"
                    placeholder="Add task description (Optional)"
                    {...register("description")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
