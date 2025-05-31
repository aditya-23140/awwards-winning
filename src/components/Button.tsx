import { IconType } from "react-icons";

type MyComponentProps = {
  id: string;
  title: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  containerClass: string;
};

const Button = ({
  id,
  title,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  containerClass,
}: MyComponentProps) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {LeftIcon && <LeftIcon />}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {RightIcon && <RightIcon />}
    </button>
  );
};

export default Button;
