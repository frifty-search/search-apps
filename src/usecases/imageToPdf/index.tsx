import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { DropzoneArea } from "mui-file-dropzone";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

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
      img.crossOrigin = "Anonymous";
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

    const doc = new jsPDF("p", "pt", "a4");

    const height = doc.internal.pageSize.height;
    const width = doc.internal.pageSize.width;

    images.forEach(({ img, index }) => {
      const ratio =
        img.width > img.height
          ? Math.min(width / img.width, height / img.height)
          : Math.max(width / img.width, height / img.height);

      const newWidth = width * ratio;
      const newHeight = height * ratio;

      const x = (width - newWidth) / 2;
      const y = (height - newHeight) / 2;

      console.log({
        width,
        height,
        imgWidth: img.width,
        imgHeight: img.height,
        x,
        y,
      });

      doc.addImage(img, "JPEG", x, y, newWidth, newHeight);

      if (index < files.length - 1) {
        doc.addPage();
      }
    });

    // Save the PDF
    doc.save("converted.pdf");
    saveAs(doc.output("blob"), "converted.pdf");
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <DropzoneArea
        acceptedFiles={["image/png", "image/jpeg", "image/jpg"]}
        filesLimit={10}
        fileObjects={files}
        dropzoneText="Drag and drop an image file here or click"
        onChange={handleDrop}
        showPreviewsInDropzone={true}
        onDropRejected={() => {
          alert("Only image files are accepted");
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
