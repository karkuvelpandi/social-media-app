import React from "react";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
type FileUploaderProps = {
  onChange: (e: any) => void;
  progress?: boolean;
  value?: string;
  isUploadCompleted?: boolean;
  onOk: () => void;
  accept?: string;
  label?: string;
};
export const FileUploader: React.FC<FileUploaderProps> = ({
  onChange,
  progress,
  value,
  isUploadCompleted,
  onOk,
  accept = "",
  label = "Select Image",
}) => {
  return (
    <section className="w-4/5 sm:w-[500px] h-[400px] bg-myPrimary rounded-md flex flex-col justify-center items-center relative">
      <label
        htmlFor="inputTag"
        className="flex flex-col items-center font-bold "
      >
        {label}
        <input
          onChange={onChange}
          className="hidden"
          id="inputTag"
          type="file"
          accept={accept}
        />
        <div className="flex gap-2 items-center">
          <i className="pi pi-image font-bold text-3xl" />
          {isUploadCompleted && (
            <i className="pi pi-check font-bold text-green-400 text-xl" />
          )}
        </div>
      </label>

      <div className="w-full absolute top-0 left-0">
        {progress && (
          <ProgressBar
            mode="indeterminate"
            style={{ height: "6px" }}
          ></ProgressBar>
        )}
      </div>
      {isUploadCompleted && value && (
        <div className="w-72 h-72 flex justify-center items-center">
          <img src={value} width={"200px"} className="max-h-[250px]" alt="" />
        </div>
      )}
      {onOk && (
        <Button
          onClick={onOk}
          className="absolute right-4 bottom-4"
          label="OK"
          size="small"
        />
      )}
    </section>
  );
};
