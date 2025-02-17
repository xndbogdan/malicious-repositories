import { useState, useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

interface Props {
  src: string;
  maxWidth: number;
  maxHeight: number;
  onCrop: (blob: Blob) => void;
}

interface HTMLImageElementWithCropper extends HTMLImageElement {
  cropper?: Cropper;
}

//
export default function ImageCropper({ src, maxWidth, maxHeight, onCrop }: Props) {
  const [isCropping, setIsCropping] = useState(true);
  const cropperRef = useRef<HTMLImageElementWithCropper>(null);

  useEffect(() => {
    if (cropperRef.current) {

      const cropper = new Cropper(cropperRef.current, {
        aspectRatio: maxWidth / maxHeight,
        viewMode: 1,
        ready() {
          cropper.setDragMode('crop');
        },
      });

      cropperRef.current.cropper = cropper;

      return () => {
        cropper.destroy();
      };
    }
  }, [cropperRef, maxWidth, maxHeight]);

  const handleCrop = () => {
    if (!cropperRef.current) return;

    const canvas = cropperRef.current.cropper?.getCroppedCanvas({
      width: maxWidth,
      height: maxHeight,
    });

    canvas?.toBlob((blob: any) => {
      onCrop(blob);
      setIsCropping(false);
    });
  };

  const handleCancel = () => {
    setIsCropping(false);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
        
      setIsCropping(true);
    }
  };

  return (
    <div>
      {isCropping ? (
        <div>
          <img ref={cropperRef} src={src} alt="Image to crop" onLoad={handleImageLoad} />
          <button onClick={handleCrop}>Crop</button>
        </div>
      ) : (
        <img src={src} alt="Image" />
      )}
    </div>
  );
}
