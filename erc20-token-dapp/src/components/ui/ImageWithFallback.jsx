import React, { useState } from 'react';

const ImageWithFallback = (props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      alt=""
    />
  );
};

export default ImageWithFallback;
