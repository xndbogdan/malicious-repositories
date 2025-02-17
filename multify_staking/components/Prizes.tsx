  import React, { useEffect, useRef, useState } from "react";
  import Modal from "react-responsive-modal";
  import PrizeItem from "./PrizeItem";
  import gift_box_big from "../public/assets/images/giftbox_big.svg";
  import add_icon from "../public/assets/images/add_icon.svg";
  import "react-responsive-modal/styles.css";
  import Image from "next/legacy/image";
  import { useAuth } from "../context/authcontext";
  import { FormProvider, useForm } from "react-hook-form";
  import cross from "../public/assets/images/xmark.png";
  import {
    ref,
    uploadString,
    getDownloadURL,
    getStorage,
    uploadBytesResumable,
  } from "firebase/storage";
  import { storage } from "../firebase";
  import Loader from "./loader";
  import toast from "react-hot-toast";
  import ImageCropper from "./ImageCopper";

  interface Prizes {
    prizeName: string;
    description: string;
    image: string;
    noOfWinners: string;
    value: string;
  }

  export default function Prizes({ formStep, nextFormStep, prevFormStep }: any) {
    // FOR POPUP
    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(false);
    const [index, setIndex] = useState(0);
    const { data, setFormValues } = useAuth();
    const [prizes, setPrizes] = useState(data?.prizes || []);
    const [imageToPost, setImageToPost] = useState<any | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const filepickerRef = useRef(null);
    const [percent, setPercent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [imageEdit , setImageEdit] = useState(false)
    const methods = useForm<Prizes>({ mode: "onBlur" });
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
      reset,
    } = methods;
    const formValues = watch();
    const [selectedImage, setSelectedImage] = useState<any | undefined>();
    const [imageLoading, setImageLoading] = useState(false);
    const [croppedImage, setCroppedImage] = useState<any | null | undefined>();
    const handleClick = (event: any) => {
      // 👉️ ref could be null here
      if (inputRef.current != null) {
        inputRef.current.click();
      }
    };
    // load data from parent or manage when its between
    useEffect(() => {
      setTimeout(() => {
        if (data?.prize && data?.prize.length > 0 && data?.prize != null) {
          setPrizes(data?.prize);
        }
      }, 10);
    }, [data]);
    // update Data when prizes updated
    useEffect(() => {
      setTimeout(() => {
        setFormValues({ prize: prizes });
      }, 1);
    }, [prizes]);

    const onOpenModal = () => {
      setOpen(true);
    };
    const onCloseModal = () => {
      setOpen(false);
      reset();
    };

    const onEdit = (index: number) => {
      console.log(prizes[index])
      setEdited(true);
      setImageEdit(true)
      setIndex(index);
      setValue("prizeName", prizes[index]?.prizeName);
      setValue("description", prizes[index]?.description);
      setValue("noOfWinners", prizes[index]?.noOfWinners);
      setValue("value", prizes[index]?.value);
      setSelectedImage(prizes[index]?.image);
      onOpenModal();
    };

    const handleNext = (data: any) => {
      nextFormStep();
    };

    const handlePrev = (data: any) => {
      prevFormStep();
    };


    const imageChange = (e: any) => {
      const file = e.target.files[0];

      if (file) {
        // check image size
        if (file.size > 10000000) {
          toast.error("Image size should be less than 1MB");
          return;
        }
        // check image type
        if (
          file.type !== "image/png" &&
          file.type !== "image/jpg" &&
          file.type !== "image/jpeg"
        ) {
          toast.error("Image type should be png, jpg or jpeg");
          return;
        }
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          const aspectRatio = width / height;

          URL.revokeObjectURL(img.src);
          if (width > 400 || height > 400 || aspectRatio !== 1) {
            toast.error(
              "Please upload an image with a 1:1 aspect ratio."
            );
            setCroppedImage(file);
            setImageLoading(true);
            return;
          } else {
            setSelectedImage(file);
            setImageToPost(URL.createObjectURL(file));
          }
        };
      }
    };

    const handleCrop = (image: any) => {
      //console.log('Test', formValues);
      const croppedImageFile = new File([image], Math.random().toString(36).substring(2, 15)+".png");
      setSelectedImage(croppedImageFile);
      setImageToPost(URL.createObjectURL(croppedImageFile));
      setCroppedImage(null);
      setImageLoading(false);
      setImageEdit(false)
    };
    // handle close crop image
    const handleClose = () => {
      setCroppedImage(null);
      setImageLoading(false);
      setSelectedImage(null);
      setImageToPost(null);
      setImageEdit(false)
    };

    const removeSelectedImage = () => {
      setSelectedImage(undefined);
      setImageEdit(false)
    };

    const onSubmit = async () => {
      const formData = formValues;
      //console.log(formData);
      if (edited) {
        console.log('edit here ', formData)
        if (
          prizes[index]?.image !== formData.image ||
          prizes[index]?.image !== URL.createObjectURL(selectedImage)
        ) {
          // update the image in backend
          console.log('edit here image ', formData)
          
          const storageRef = ref(storage, `/files/${selectedImage?.name || 'random'}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
          const uploadTask = uploadBytesResumable(storageRef, selectedImage);
          uploadTask.on("state_changed", (snapshot) => {
            setLoading(true);
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ); // update progress
            setPercent(percent);
          });
          await getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            setImageToPost(url);
            formData.image = await url;
            prizes[index] = formData;
            setPrizes(prizes);
            setEdited(false);
            reset();
            setSelectedImage(null);
            setLoading(false);
          });
        } else {
          console.log('edit here no image updated ', formData)
          prizes[index] = formData;
          setPrizes(prizes);
          setEdited(false);
          setLoading(false)
          reset();
        }
      } else {
        if (selectedImage) {
          const storageRef = ref(storage, `/files/${selectedImage?.name || 'random'}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
          const uploadTask = uploadBytesResumable(storageRef, selectedImage);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setLoading(true);
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              ); // update progress
              setPercent(percent);
            },
            (err) => console.log(err),
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                setImageToPost(url);
                formData.image = await url;
                const newPrizes = [...prizes, formData];
                setPrizes(newPrizes);
                reset();
                setSelectedImage(null);
                setLoading(false);
              });
            }
          );
        } else {
          const newPrizes = [...prizes, formData];
          setPrizes(newPrizes);
          reset();
          setSelectedImage(null);
        }
      }
    onCloseModal();
    };

    function onDelete(index: number) {
      const newPrizes = [...prizes];
      newPrizes.splice(index, 1);
      setPrizes(newPrizes);
    }
    return (
      <>
        <Loader show={loading}></Loader>
        <div>
          <div className="flex justify-between">
            <h3 className="text-xl font-Ubuntu-Medium mb-6">Current prizes</h3>
            <button className="buttonPrimary" onClick={onOpenModal}>
              Add prize
            </button>
          </div>

          <div className="lg:border-t-[1.5px] lg:border-jade-100 mt-5 lg:pt-6">
            <div className="grid grid-cols-1 items-center gap-y-6 md:gap-x-6 md:gap-y-7 md:grid-cols-2 lg:grid-cols-3">
              {prizes.map((prize: any, index: number) => (
                <PrizeItem
                  key={index}
                  prize={prize}
                  index={index}
                  onEdit={() => {
                    onEdit(index);
                  }}
                  onDelete={() => {
                    onDelete(index);
                  }}
                />
              ))}
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
              <button
                onClick={handleNext}
                className="buttonPrimary"
              >
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
            modal: "!w-full !p-6 !m-0 md:!max-w-[844px] !bg-transparent",
          }}
        >
          <div className="bg-[#101B1B] border-[1.5px] border-jade-100 rounded-md p-6 md:p-10">
                <div className="w-full flex flex-col gap-y-6 md:flex-row md:gap-x-10">
                  {/* LEFT */}
                  <div className="w-full md:w-[52%]">
                    {/* INPUT FIELDS */}
                    <div className="space-y-6">
                      <div>
                        {/* HEADING */}
                        <h4 className=" text-base leading-5 font-Ubuntu-Medium md:text-[18px] md:leading-[22.14px]">
                          Prize name
                        </h4>
                        {/* INPUT */}
                        <div className="w-full mt-2">
                          <div className="relative">
                            <input
                              {...register("prizeName", {
                                required: "Enter Prize",
                              })}
                              className="inputField"
                              placeholder="What you will gift in this giveaway?"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* HEADING */}
                        <h4 className=" text-base leading-5 font-Ubuntu-Medium md:text-[18px] md:leading-[22.14px]">
                          How many winners will win the prize
                        </h4>
                        {/* INPUT */}
                        <div className="w-full mt-2">
                          <div className="relative">
                            <input
                              {...register("noOfWinners", {
                                required: "Enter No of winners",
                              })}
                              className="inputField"
                              placeholder="1"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* HEADING */}
                        <h4 className=" text-base leading-5 font-Ubuntu-Medium md:text-[18px] md:leading-[22.14px]">
                          Prize value in USD per winner (Optional)
                        </h4>
                        {/* INPUT */}
                        <div className="w-full mt-2">
                          <div className="relative">
                            <input
                              {...register("value")}
                              className="inputField"
                              placeholder="$999"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* HEADING */}
                        <h4 className=" text-base leading-5 font-Ubuntu-Medium md:text-[18px] md:leading-[22.14px]">
                          Description (Optional)
                        </h4>
                        {/* INPUT */}
                        <div className="w-full mt-2">
                          <div className="relative">
                            <textarea
                              {...register("description")}
                              className="inputArea"
                              placeholder="Description about the prize"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className=" flex absolute top-2 right-[18px]">
                    <Image
                      onClick={onCloseModal}
                      src={cross}
                      alt="link_icon"
                      layout="intrinsic"
                    />
                  </div>
                  <div className="w-full md:w-[48%]">
                    {/* HEADING */}
                    <h4 className=" text-base leading-5 font-Ubuntu-Medium md:text-[18px] md:leading-[22.14px]">
                      Add prize image (Optional)
                    </h4>

                    <div className="relative border border-teal-100/20 bg-teal-900/5 rounded-md mt-2 h-[348px] flex items-center justify-center mb-6 md:mb-10">
                      {selectedImage && !imageEdit && (
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="gift_box_big"
                          layout="fill"
                        />
                      )}
                      {selectedImage && imageEdit &&(
                        <Image
                          src={selectedImage}
                          alt="gift_box_big"
                          layout="fill"
                        />
                      )}
                      {!selectedImage && !croppedImage &&(
                        <Image
                          src={gift_box_big}
                          alt="gift_box_big"
                          layout="intrinsic"
                        />
                      )}
                      {croppedImage  && imageLoading &&(
                      <div>
                        <ImageCropper
                          src={URL.createObjectURL(croppedImage)}
                          maxWidth={912}
                          maxHeight={912}
                          onCrop={handleCrop}
                        />
                        <button onClick={handleClose}>Cancel</button>
                      </div>
                    )}

                      <div className=" absolute top-4 right-4 cursor-pointer">
                        {!selectedImage && (
                          <>
                            <Image
                              onClick={handleClick}
                              src={add_icon}
                              alt="add_icon"
                              layout="intrinsic"
                            />
                            <input
                              type="file"
                              id="file"
                              ref={inputRef}
                              onChange={imageChange}
                              className="hidden"
                            />
                          </>
                        )}
                        {selectedImage && (
                          <>
                            <Image
                              onClick={removeSelectedImage}
                              src={cross}
                              alt="link_icon"
                              layout="intrinsic"
                              className="border border-teal-100/20 bg-teal-900/5 rounded-md"
                            />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-end">
                      {/* BUTTON */}
                      <button
                        onClick={onSubmit}
                        className="buttonPrimary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
          </div>
        </Modal>
      </>
    );
  }
