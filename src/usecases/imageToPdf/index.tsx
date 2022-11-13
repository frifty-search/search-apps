import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

const ImageToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (files: File[]) => {
    setFiles(files);
  };

  const getImageFromUrl = (
    url: string,
    index: number
  ): Promise<{
    img: HTMLImageElement;
    index: number;
  }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        resolve({
          img,
          index,
        });
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = url;
    });
  };

  const handleClick = async () => {
    // Convert image to PDF
    // const doc = new jsPDF("p", "pt", "a4");
    // For each file, add a page to the PDF
    // files.forEach((file, index) => {
    //   const image = new Image();
    //   image.src = URL.createObjectURL(file);
    //   doc.addImage(image, "JPEG", 0, 0, image.width, image.height);

    //   if (index < files.length - 1) {
    //     doc.addPage();
    //   }
    // });

    // For each file convert it to image and add it to the PDF

    const images = await Promise.all(
      files.map((file, index) =>
        getImageFromUrl(URL.createObjectURL(file), index)
      )
    );

    images.sort(
      (
        a: {
          img: HTMLImageElement;
          index: number;
        },
        b: {
          img: HTMLImageElement;
          index: number;
        }
      ) => a.index - b.index
    );

    let maxWidth = 1,
      maxHeight = 1;

    images.forEach((image) => {
      if (image.img.width > maxWidth) {
        maxWidth = image.img.width;
      }
      if (image.img.height > maxHeight) {
        maxHeight = image.img.height;
      }
    });

    const orientation = maxWidth > maxHeight ? 'l' : 'p';

    const doc = new jsPDF(orientation, 'mm', 'a4', true);

    const max =
      orientation === 'p'
        ? { height: 300, width: 210 }
        : {
            height: 210,
            width: 300,
          };

    images.forEach(({ img, index }) => {
      let height = img.height,
        width = img.width,
        src = img.src,
        ratio = img.height / img.width;
      if (height > max.height || width > max.width) {
        if (height > width) {
          height = max.height - 10;
          width = height * (1 / ratio);
        } else if (width > height) {
          width = max.width - 10;
          height = width * ratio;
        }
      }
      const mX = (max.width - width) / 2;
      const mY = (max.height - height) / 2;
      doc.addImage(src, 'png', mX, mY, width, height);

      if (index < images.length - 1) {
        doc.addPage(orientation);
      }
    });

    // Save the PDF
    doc.save('converted.pdf');
    saveAs(doc.output('blob'), 'converted.pdf');
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpeg', 'image/jpg']}
        filesLimit={10}
        fileObjects={files}
        dropzoneText="Click to upload (max 10 images) - Upload in the same order as you need in the pdf"
        onChange={handleDrop}
        showPreviewsInDropzone
        onDropRejected={() => {
          alert('Only image files are accepted');
        }}
      />
      <Button variant="outlined" onClick={handleClick}>
        Convert & Download to PDF
      </Button>
      {}
    </Stack>
  );
};

export default ImageToPdf;
