import React, { useEffect, useRef, useState } from "react";

const ImageCarousel = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState();
  const carouselItemsRef = useRef([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length
      );

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectedImageChange = (newIdx) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
    }
  };

//   return (
//     <div className="carousel-container">
//       <div
//         className="selected-image"
//         style={{ backgroundImage: `url(${selectedImage?.url})` }}
//       />
//       <div className="carousel">
//         <div className="carousel__images">
//           {images &&
//             images.map((image, idx) => (
//               <div
//                 onClick={() => handleSelectedImageChange(idx)}
//                 style={{ backgroundImage: `url(${image.url})` }}
//                 key={image.id}
//                 className={`carousel__image ${
//                   selectedImageIndex === idx && "carousel__image-selected"
//                 }`}
//                 ref={(el) => (carouselItemsRef.current[idx] = el)}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
  // return (
  //   <div className="carousel-container">
  //     <img
  //       className="selected-image"
  //       src={selectedImage?.url}
  //     />
  //       <div className="carousel__images">
  //         {images &&
  //           images.map((image, idx) => (
  //             <img
  //               onClick={() => handleSelectedImageChange(idx)}
  //               src={image.url}
  //               key={image.id}
  //               className={`carousel__image ${
  //                 selectedImageIndex === idx && "carousel__image-selected"
  //               }`}
  //               ref={(el) => (carouselItemsRef.current[idx] = el)}
  //             />
  //           ))}
  //       </div>
  //   </div>
  // );

  return (
    <div className="carousel-container">
      <div className="selected-image" style={{ backgroundImage: `url(${selectedImage})` }}/>
      <div className="carousel-images">
        {images &&
            images.map((image, idx) => (
              <div
                onClick={() => handleSelectedImageChange(idx)}
                style={{ backgroundImage: `url(${image})` }}
                key={image.id}
                className={`carousel-image ${
                  selectedImageIndex === idx && "carousel-image-selected"
                }`}
                ref={(el) => (carouselItemsRef.current[idx] = el)}
              />
            ))}
          {/* <div className="carousel-image">
          </div>
          <div className="carousel-image">
          </div>
          <div className="carousel-image">
          </div>
          <div className="carousel-image"> */}
      </div>
    </div>
  )
};

export default ImageCarousel;
