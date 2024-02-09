import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Fragment, ReactNode } from "react";
import { Button } from "~/components/button/Button";
import { TooltipProvider } from "~/components/ui/tooltip";
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
        className="flex h-auto flex-[1_0_0] items-center justify-center rounded-xl bg-white px-5 py-[14px] hover:bg-[#8888941a]"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <img
                className="h-20 w-20"
                src={`/images/car-brands/${logoName ?? brandName}.png`}
              ></img>
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
    <div className="mt-[18px] grid w-full grid-cols-3 flex-row items-start justify-center gap-4 md:grid-cols-4">
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
