import { Fragment, ReactNode } from "react";
import { Button } from "../button/Button";

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
        className="flex h-auto flex-[1_0_0] items-center justify-center rounded-xl bg-white px-[20px] py-[14px] hover:bg-[#8888941a]"
      >
        <img
          className="h-20 w-20"
          src={`/images/car-brands/${logoName ?? brandName}.png`}
        ></img>
      </Button>
    );
  }

  const brands: CarLogo[] = [
    {
      brandName: "alfa romeo",
      component: getLogoButton("alfa romeo", "alfa_romeo"),
    },
    {
      brandName: "audi",
      component: getLogoButton("audi"),
    },
    {
      brandName: "bmw",
      component: getLogoButton("bmw"),
    },
    {
      brandName: "citroen",
      component: getLogoButton("citroen"),
    },
    {
      brandName: "dacia",
      component: getLogoButton("dacia"),
    },
    {
      brandName: "fiat",
      component: getLogoButton("fiat"),
    },
    {
      brandName: "ford",
      component: getLogoButton("ford"),
    },
    {
      brandName: "mercedes benz",
      component: getLogoButton("mercedes-benz", "mercedes"),
    },
    {
      brandName: "mini",
      component: getLogoButton("mini"),
    },
    {
      brandName: "nissan",
      component: getLogoButton("nissan"),
    },
    {
      brandName: "opel",
      component: getLogoButton("opel"),
    },
    {
      brandName: "peugeot",
      component: getLogoButton("peugeot"),
    },
    {
      brandName: "renault",
      component: getLogoButton("renault"),
    },
    {
      brandName: "seat",
      component: getLogoButton("seat"),
    },
    {
      brandName: "toyota",
      component: getLogoButton("toyota"),
    },
    {
      brandName: "volkswagen",
      component: getLogoButton("volkswagen"),
    },
  ];

  return (
    <div className="mt-[18px] grid w-full grid-cols-4 flex-row items-start justify-center gap-4">
      {brands
        .filter(
          (brand) =>
            query == null ||
            brand.brandName
              .toLowerCase()
              .trim()
              .includes(query.toLowerCase().trim())
        )
        .map((brand) => (
          <Fragment key={`${brand.brandName}`}>{brand.component}</Fragment>
        ))}
    </div>
  );
};

export default CarLogos;
