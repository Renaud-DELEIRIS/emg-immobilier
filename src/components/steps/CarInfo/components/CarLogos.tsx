import Image from "next/image";
import { Fragment, ReactNode } from "react";
import { Button } from "~/components/button/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import marques from "~/data/car-brands.json";

type CarLogo = {
  brandName: string;
  component: ReactNode;
};

const CarLogos = ({
  className,
  onClick,
  query,
}: {
  className?: string;
  onClick: (modelName: string) => void;
  query?: string;
}) => {
  function getLogoButton(brandName: string, logoName?: string) {
    return (
      <Button
        onClick={() => onClick(brandName)}
        className="flex h-[108px] flex-[1_0_0] items-center justify-center rounded-xl bg-white px-5 py-[14px] hover:bg-[#8888941a]"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image
                width={80}
                height={80}
                src={`/images/car-brands/${logoName ?? brandName}.png`}
                alt={brandName}
              />
            </TooltipTrigger>
            <TooltipContent>{brandName}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    );
  }

  const brands: CarLogo[] = marques.map((marque) => ({
    brandName: marque.brand,
    component: getLogoButton(marque.brand.toLowerCase(), marque.logo),
  }));

  return (
    <div className="mt-[18px] grid h-60 w-full grid-cols-3 flex-row items-start justify-center gap-4 overflow-hidden md:h-[480px] md:grid-cols-4">
      {brands
        .filter(
          (brand) =>
            query == null ||
            brand.brandName
              .toLowerCase()
              .trim()
              .includes(query.toLowerCase().trim())
        )
        .slice(0, 16)
        .map((brand) => (
          <Fragment key={`${brand.brandName}`}>{brand.component}</Fragment>
        ))}
    </div>
  );
};

export default CarLogos;
