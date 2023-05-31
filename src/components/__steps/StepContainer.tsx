import Image from "next/image";
import type DefaultProps from "~/types/DefaultProps";
import { motion } from "framer-motion";

const StepContainer = ({
  title,
  children,
  description,
  infoTitle,
  info,
  maxWidth = "max-w-3xl",
  className = "",
}: {
  title: string;
  description?: string;
  info?: string;
  infoTitle?: string;
  maxWidth?: string;
} & DefaultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={
        "mx-auto flex w-full flex-col items-center justify-center " +
        maxWidth +
        " " +
        className
      }
    >
      <div className={"relative text-center "}>
        <Image
          src={"/portrait.png"}
          alt="Assistance"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full"
        ></Image>
        <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-green-400 outline outline-2 outline-white" />
      </div>
      <h1 className="mb-2 mt-4 text-center text-[32px] font-bold leading-10 tracking-tight text-primary">
        {title}
      </h1>

      <p className="mb-8 text-center text-neutral-500">{description}</p>

      <div className="w-full">{children}</div>
      {info && (
        <div className="mt-8 flex w-full flex-row items-center rounded-lg border border-primary-400 bg-primary-50 p-3">
          <Image
            src={"/portrait.png"}
            alt="Assistance"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          ></Image>
          <div className="ml-2">
            {infoTitle && (
              <h2 className="text-sm font-semibold text-primary-800">
                {infoTitle}
              </h2>
            )}
            {info && <p className="text-sm text-primary-700">{info}</p>}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StepContainer;
