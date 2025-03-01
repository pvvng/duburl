"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { InputHTMLAttributes, useState } from "react";

interface InputProps {
  name: string;
  values: {
    value: string;
    text: string;
  }[];
  useExtra?: boolean;
  errors?: string[];
  extraPlaceholder?: string;
}

export default function RadioInputs({
  name,
  values,
  errors = [],
  useExtra = false,
  extraPlaceholder,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState("");
  const [extra, setExtra] = useState("");

  const handleExtraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const extraValue = e.target.value;
    setExtra(extraValue);

    setDisabled(extraValue.length > 0);

    if (extraValue.length > 0) {
      setSelected("");
    }
  };

  const handleExtraClear = () => {
    setExtra("");
    setDisabled(false);
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-3 text-center">
      {values.map(({ value, text }) => (
        <label
          key={value + text}
          className="w-full h-10 flex justify-center items-center font-semibold ring-2 ring-neutral-200 rounded-xl 
          has-[:checked]:ring-green-500 has-[:checked]:text-green-500 has-[:checked]:ring-4
          has-[:disabled]:bg-neutral-200 has-[disabled]:ring-neutral-200"
        >
          <input
            type="radio"
            name={name}
            value={value}
            className="opacity-0 h-0 w-0"
            {...rest}
            checked={selected === value}
            onChange={(e) => setSelected(e.target.value)}
            disabled={disabled}
          />
          {text}
        </label>
      ))}
      {useExtra && (
        <div className="relative col-span-full">
          <input
            name={name}
            placeholder={extraPlaceholder}
            value={extra}
            onChange={handleExtraChange}
            className="w-full h-10 border-none rounded-xl focus:outline-none 
            placeholder:text-neutral-400 ring-2 ring-neutral-200 focus:ring-4 focus:ring-green-500"
          />
          {extra.length > 0 && (
            <span onClick={handleExtraClear}>
              <XMarkIcon className="size-6 absolute right-2 top-1/2 transform -translate-y-1/2" />
            </span>
          )}
        </div>
      )}
      <div className="col-span-full text-start">
        {errors.map((error, index) => (
          <span key={index} className="text-red-500 font-medium">
            {error}
          </span>
        ))}
      </div>
    </div>
  );
}
