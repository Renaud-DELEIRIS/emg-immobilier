import { IconStar } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "glass" | "white";
}

const GoogleReview: React.FC<Props> = ({
  theme = "glass",
  className,
  ...props
}) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={twMerge(
        "flex items-center gap-2.5 rounded-lg p-[11.5px] md:p-[14px]",
        theme === "glass"
          ? "rounded-md bg-[linear-gradient(160deg,rgba(87,97,105,0.32)-13%,rgba(255,255,255,0.00)109.31%)] text-white shadow-[0px,5px,100px,0px,rgba(57,59,63,0.50)] backdrop-blur-[50px]"
          : "bg-white text-dark",
        className
      )}
    >
      <Image
        src="/logo/google.svg"
        alt="Google Review"
        width={50}
        height={50}
        className="h-[41px] w-[41px] md:h-[50px] md:w-[50px]"
      />
      <div className="flex flex-col md:gap-1">
        <div className="flex items-center">
          <span className="mr-1 text-lg font-bold md:text-[22px]">5</span>
          <IconStar
            className="h-5 w-5 md:h-6 md:w-6"
            fill="#FCD503"
            color="#FCD503"
          />
          <IconStar
            className="h-5 w-5 md:h-6 md:w-6"
            fill="#FCD503"
            color="#FCD503"
          />
          <IconStar
            className="h-5 w-5 md:h-6 md:w-6"
            fill="#FCD503"
            color="#FCD503"
          />
          <IconStar
            className="h-5 w-5 md:h-6 md:w-6"
            fill="#FCD503"
            color="#FCD503"
          />
          <IconStar
            className="h-5 w-5 md:h-6 md:w-6"
            fill="#FCD503"
            color="#FCD503"
          />
        </div>
        <p className="text-[11.5px] md:text-[13px]">{t("google_review")}</p>
      </div>
    </div>
  );
};

export default GoogleReview;
