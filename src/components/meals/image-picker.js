"use client";
import { useRef, useState } from "react";

import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const inputRef = useRef(null);
  const [pickedImage, setPickedImage] = useState(null);

  function PickHandler() {
    inputRef.current.click();
  }

  function handleEventChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage} alt="Image picked by user" fill />
          ) : (
            <p>No Image picked yet</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={inputRef}
          onChange={handleEventChange}
          required
        />
        <button className={classes.button} type="button" onClick={PickHandler}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
