/* This example requires Tailwind CSS v2.0+ */
import { IconCheck, IconX } from "@tabler/icons-react";
import { Fragment } from "react";

const tiers: {
  name: "Essentiel" | "Confort" | "Premium";
  description: string;
  recommended?: boolean;
}[] = [
  {
    name: "Essentiel",
    description: "Tout ce dont vous devez savoir sur le pack essentiel",
  },
  {
    name: "Confort",
    description: "Tout ce dont vous devez savoir sur le pack confort",
    recommended: true,
  },
  {
    name: "Premium",
    description: "Tout ce dont vous devez savoir sur le pack premium",
  },
];
const sections = [
  {
    name: "Avantages",
    features: [
      {
        name: "Chambre commune",
        tiers: { Essentiel: true, Confort: true, Premium: true },
      },
      {
        name: "Lunettes",
        tiers: { Essentiel: true, Confort: true, Premium: true },
      },
      {
        name: "Maternité",
        tiers: { Essentiel: true, Confort: true, Premium: true },
      },
      {
        name: "Transports",
        tiers: { Essentiel: true, Confort: true, Premium: true },
      },
      {
        name: "Couverture monde",
        tiers: { Essentiel: true, Confort: true, Premium: true },
      },
      {
        name: "Moyens auxiliaires",
        tiers: { Essentiel: true, Confort: true, Premium: true },
      },
      {
        name: "Médicaments",

        tiers: { Essentiel: true, Confort: true, Premium: true },
      },
      {
        name: "Prévention, check-up",
        tiers: { Essentiel: false, Confort: true, Premium: true },
      },
      {
        name: "Fitness",
        tiers: { Essentiel: false, Confort: true, Premium: true },
      },
      {
        name: "Traitements orthodontie",
        tiers: { Essentiel: false, Confort: false, Premium: true },
      },
      {
        name: "Aide à domicile",
        tiers: { Essentiel: false, Confort: false, Premium: true },
      },
      {
        name: "Traitements dentaire",
        tiers: { Essentiel: false, Confort: false, Premium: true },
      },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PackCompar({
  setSelected,
  selected,
}: {
  setSelected: (selected: "Essentiel" | "Confort" | "Premium") => void;
  selected: "Essentiel" | "Confort" | "Premium" | undefined | null;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 lg:px-8 lg:pt-0 ">
        {/* xs to lg */}
        <div className="mx-auto max-w-2xl space-y-16 lg:hidden">
          {tiers.map((tier, tierIdx) => (
            <section key={tier.name}>
              <div className="mb-8 px-4">
                {tier.recommended && (
                  <div className="mb-4 w-fit rounded-lg border border-primary-600 bg-primary-50 px-2 text-xs text-primary-600">
                    Recommandé
                  </div>
                )}
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  {tier.name}
                </h2>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                <button
                  onClick={() => setSelected(tier.name)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-primary-800 bg-primary-800 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
                >
                  Select {tier.name}
                  {selected === tier.name && (
                    <IconCheck
                      className="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>

              {sections.map((section) => (
                <table key={section.name} className="w-full">
                  <caption className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-900">
                    {section.name}
                  </caption>
                  <thead>
                    <tr>
                      <th className="sr-only" scope="col">
                        Feature
                      </th>
                      <th className="sr-only" scope="col">
                        Included
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {section.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-t border-gray-200"
                      >
                        <th
                          className="px-4 py-5 text-left text-sm font-normal text-gray-500"
                          scope="row"
                        >
                          <span className="leading-4">{feature.name}</span>
                        </th>
                        <td className="py-5 pr-4">
                          {typeof feature.tiers[tier.name] === "string" ? (
                            <span className="block text-right text-sm leading-4 text-gray-700">
                              {feature.tiers[tier.name]}
                            </span>
                          ) : (
                            <>
                              {feature.tiers[tier.name] === true ? (
                                <IconCheck
                                  className="ml-auto h-5 w-5 leading-4 text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IconX
                                  className="ml-auto h-5 w-5 leading-4 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}

                              <span className="sr-only">
                                {feature.tiers[tier.name] === true
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}

              <div
                className={classNames(
                  tierIdx < tiers.length - 1 ? "border-b py-5" : "pt-5",
                  "border-t border-gray-200 px-4"
                )}
              >
                <button
                  onClick={() => setSelected(tier.name)}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-primary-800 bg-primary-800 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
                >
                  Select {tier.name}
                  {selected === tier.name && (
                    <IconCheck
                      className="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="hidden lg:block">
          <table className="h-px w-full table-fixed">
            <caption className="sr-only">Pricing plan comparison</caption>
            <tbody className="divide-y divide-gray-200 border-gray-200">
              <tr>
                <th
                  className="px-6 py-8 text-left align-top text-sm font-medium text-gray-900"
                  scope="row"
                >
                  Packs
                </th>
                {tiers.map((tier) => (
                  <td
                    key={tier.name}
                    className="relative h-full px-6 py-8 align-top"
                  >
                    {tier.recommended && (
                      <div className="absolute -top-3 w-fit rounded-lg border border-primary-600 bg-primary-50 px-2 text-primary-600">
                        Recommandé
                      </div>
                    )}
                    <div className="relative table h-full">
                      <p className="mb-16 mt-4 text-sm text-gray-500">
                        {tier.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelected(tier.name)}
                        className="absolute bottom-0 flex w-full flex-grow items-center justify-center gap-2 rounded-md border border-primary-800 bg-primary-800 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
                      >
                        Select {tier.name}
                        {selected === tier.name && (
                          <IconCheck
                            className="h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
              {sections.map((section) => (
                <Fragment key={section.name}>
                  <tr>
                    <th
                      className="bg-gray-50 py-3 pl-6 text-left text-sm font-medium text-gray-900"
                      colSpan={4}
                      scope="colgroup"
                    >
                      {section.name}
                    </th>
                  </tr>
                  {section.features.map((feature, i) => (
                    <tr key={feature.name}>
                      <th
                        className="px-6 py-5 text-left text-sm font-normal text-gray-500"
                        scope="row"
                      >
                        <span className="leading-4">{feature.name}</span>
                      </th>
                      {tiers.map((tier) => (
                        <td
                          key={tier.name}
                          className={`
                            ${
                              selected === tier.name
                                ? i === 0
                                  ? "border-b border-primary-100 "
                                  : i === section.features.length - 1
                                  ? "border-t border-primary-100 "
                                  : "border-y border-primary-100"
                                : ""
                            }
                        `}
                        >
                          <div
                            className={`px-6 py-5 ${
                              selected === tier.name
                                ? "border-x border-dashed border-primary bg-primary-50 " +
                                  (i === 0 ? "rounded-t-xl border-t " : "") +
                                  (i === section.features.length - 1
                                    ? "rounded-b-xl border-b "
                                    : "")
                                : ""
                            }`}
                          >
                            {typeof feature.tiers[tier.name] === "string" ? (
                              <span className="block text-sm leading-4 text-gray-700">
                                {feature.tiers[tier.name]}
                              </span>
                            ) : (
                              <>
                                {feature.tiers[tier.name] === true ? (
                                  <IconCheck
                                    className="h-5 w-5 leading-4 text-green-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <IconX
                                    className="h-5 w-5 leading-4 text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}

                                <span className="sr-only">
                                  {feature.tiers[tier.name] === true
                                    ? "Included"
                                    : "Not included"}{" "}
                                  in {tier.name}
                                </span>
                              </>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200">
                <th className="sr-only" scope="row">
                  Choose your plan
                </th>
                {tiers.map((tier) => (
                  <td key={tier.name} className="px-6 pt-5">
                    <button
                      type="button"
                      onClick={() => setSelected(tier.name)}
                      className="flex w-full items-center justify-center gap-2 rounded-md border border-primary-800 bg-primary-800 py-2 text-center text-sm font-semibold text-white hover:bg-primary-900"
                    >
                      Select {tier.name}
                      {selected === tier.name && (
                        <IconCheck
                          className="h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
