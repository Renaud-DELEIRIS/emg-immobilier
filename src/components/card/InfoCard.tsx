import type DefaultProps from "~/types/DefaultProps";
import { IconInfoCircle } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const InfoCard = ({
  title,
  className = "",
  icon = <IconInfoCircle size={18} />,
  children,
  noTitle = false,
  error = false,
}: {
  title?: string;
  icon?: React.ReactNode;
  noTitle?: boolean;
  error?: boolean;
} & DefaultProps) => {
  const { t } = useTranslation("info");

  return (
    <div
      className={
        `flex flex-col gap-3 bg-white p-4 pb-5 shadow-md ${
          error ? "border border-red-500" : "border border-gray-200"
        } ` + className
      }
    >
      {!noTitle && (
        <div className="flex items-center gap-1 text-blue-900">
          {icon}
          <p className="text-lg font-normal uppercase">
            {title ? title : t("information")}
          </p>
        </div>
      )}
      <span className="text-base font-normal text-gray-500">{children}</span>
    </div>
  );
};

export default InfoCard;
