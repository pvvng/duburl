import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-3">
      <input
        className="w-full h-10 bg-transparent rounded-xl border-none transition shadow-md
        focus:outline-none ring-2 ring-neutral-200 focus:ring-4 focus:ring-blue-500 
        placeholder:text-neutral-400 bg-white dark:bg-transparent dark:ring-neutral-400"
        name={name}
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
