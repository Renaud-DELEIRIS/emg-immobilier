import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";
import { Dialog, Transition } from "@headlessui/react";
import { IconMail } from "@tabler/icons-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "next-i18next";
import Image from "next/image";
import { Fragment, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useFormStore } from "~/stores/form";
import { sendLeadComparea } from "~/utils/api/createLead";
import { sendCodeSms } from "~/utils/api/sendSms";
import getParamsUrl from "~/utils/client/getParamsUrl";
import { formatTelephone } from "~/utils/formatTelephone";
import Button from "../button/Button";
import CodeInput from "../inputs/CodeInput";
import TextInput from "../inputs/TextInput";

const Info = ({ open }: { open: boolean }) => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);
  const nextStep = useFormStore((state) => state.nextStep);
  const [step, setStep] = useState<"info" | "phone">("info");
  const [code, setCode] = useState("");
  const [responseCode, setResponseCode] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { t } = useTranslation("common");
  const versionId = useFormStore((state) => state.versionId);
  const gtmDispatch = useGTMDispatch();
  const isValidEmail = (email: string) => {
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    return res;
  };

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!lead.phone) return;
    setStep("phone");
    // Scroll to input code with id #code
    setTimeout(() => {
      const elem = document.getElementById("code");
      const modal = document.getElementById("modal");
      // scroll to center the element on the page
      if (!modal || !elem) return;
      // scroll to have elem 200 px above the bottom of the modal
      const offsetTop = elem.getBoundingClientRect().top;
      modal.scrollTo({
        top: offsetTop - modal.offsetHeight + 400,
        behavior: "smooth",
      });
    }, 50);

    const gmtParams = getParamsUrl();
    const idLead = await sendLeadComparea(
      lead,
      gmtParams,
      versionId || "",
      lead.idLead
    );
    gtmDispatch({ event: "leadOk" });
    changeLead({ ...lead, idLead: idLead });
    const res = await sendCodeSms(lead.phone);
    setResponseCode(res.code);
  };

  const verifyCode = async () => {
    // if (code.trim() === "6121") {
    //   changeLead({ ...lead, verified: true });
    //   setLoading(false);
    //   return;
    // }
    if (!responseCode) return;
    if (code.trim() !== responseCode.toString()) {
      setError(t("STEP_VERIFY_ERROR"));
      return;
    }
    setLoading(true);

    const gmtParams = getParamsUrl();
    // TODO Create lead frontaluer
    await sendLeadComparea(lead, gmtParams, versionId || "", lead.idLead, true);
    changeLead({ ...lead, verified: true });
    setLoading(false);
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[70]" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-black/30 backdrop-blur-[5px]" />
          </Transition.Child>

          <div
            className="fixed inset-0 overflow-y-auto pb-36 md:pb-0"
            id="modal"
          >
            <div className="flex  items-start justify-center p-4 pt-16  text-center  md:pt-24">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl  transition-all">
                  <div className="flex h-full w-full">
                    <div className="flex w-full flex-col">
                      <form
                        onSubmit={(e) => void onSubmit(e)}
                        className="flex h-full flex-1 grid-cols-6 flex-col gap-4 p-6"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src="/portrait.png"
                            alt="Portrait"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <span className="text-base font-semibold">Emma </span>
                        </div>
                        <p className="col-span-6 text-base text-gray-500">
                          {lead.situation === "frontalier" ? (
                            <Trans
                              i18nKey="STEP_VERIFY_TITLE_FRONTALIER"
                              t={t}
                              values={{
                                date: dayjs()
                                  .add(1, "day")
                                  .format("DD.MM.YYYY"),
                              }}
                              components={{
                                span: (
                                  <span className="font-semibold text-primary underline" />
                                ),
                              }}
                            />
                          ) : (
                            <Trans
                              i18nKey="STEP_VERIFY_TITLE_SUISSE"
                              t={t}
                              values={{
                                date: dayjs()
                                  .add(1, "day")
                                  .format("DD.MM.YYYY"),
                              }}
                              components={{
                                span: (
                                  <span className="font-semibold text-primary underline" />
                                ),
                              }}
                            />
                          )}
                        </p>
                        <div className="col-span-6">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {t("STEP_VERIFY_LABEL_PHONE")}
                          </label>
                          <PhoneInput
                            onChange={(e: string) =>
                              changeLead({
                                phone: e,
                              })
                            }
                            inputProps={{
                              type: "tel",
                              name: "phone",
                              id: "phone",
                              autoComplete: "tel",
                            }}
                            inputClass="block !w-full !bg-[#EAEBEC] !border-2 !border-[#EAEBEC] focus:!border-primary-500 focus:!ring-primary-500 !sm:text-sm !h-[48px] !rounded-md focus:shadow-lg"
                            preferredCountries={["ch", "fr"]}
                            regions={"europe"}
                            country={"ch"}
                            containerClass="relative mt-1  h-[48px] !border-transparent"
                            value={lead.phone || ""}
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {t("STEP_VERIFY_LABEL_EMAIL")}
                          </label>
                          <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <IconMail
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <TextInput
                              type="email"
                              name="email"
                              placeholder="you@example.com"
                              autocomplete="email"
                              value={lead.email || ""}
                              icon={<IconMail size={18} />}
                              onChange={(e) =>
                                changeLead({
                                  email: e,
                                })
                              }
                            />
                          </div>
                        </div>

                        <span className="col-span-6 text-xs text-gray-400">
                          <Trans i18nKey={"STEP_VERIFY_INFO"} t={t} />.
                        </span>
                        {step === "info" && (
                          <div className="col-span-6 flex justify-around">
                            <Button
                              loading={loading}
                              size="large"
                              type="submit"
                              disabled={
                                !(
                                  lead.phone &&
                                  lead.email &&
                                  isValidEmail(lead.email)
                                )
                              }
                            >
                              <span>{t("STEP_VERIFY_ACTION")}</span>
                            </Button>
                          </div>
                        )}
                      </form>
                      {step === "phone" && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex h-full flex-1 flex-col p-4 text-center"
                        >
                          <p className="text-sm text-dark">
                            <Trans
                              i18nKey="STEP_VERIFY_CODE_TITLE"
                              t={t}
                              values={{
                                phone: formatTelephone(lead.phone || ""),
                              }}
                              components={{
                                span: (
                                  <span className="font-semibold text-primary" />
                                ),
                              }}
                            />
                          </p>
                          <button
                            className="mb-4 mt-2 text-sm font-semibold text-primary"
                            onClick={() => void onSubmit()}
                          >
                            {t("STEP_VERIFY_RESEND")}
                          </button>
                          <p className="mb-4 mt-2 text-sm text-gray-500">
                            {t("STEP_VERIFY_DESCRIPTION")}
                          </p>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              void verifyCode();
                            }}
                            id="code"
                          >
                            <CodeInput
                              onChange={(e) => setCode(e)}
                              allowedCharacters="numeric"
                              containerClassName="md:mx-8"
                            />
                            {error && (
                              <p className="mt-4 text-sm text-red-500">
                                {error}
                              </p>
                            )}
                            <div className="mt-6 flex w-full justify-center">
                              <Button
                                loading={loading}
                                disabled={code.length !== 4}
                                intent={"primary"}
                                type="submit"
                              >
                                <span>{t("STEP_VERIFY_ACTION")}</span>
                              </Button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </div>

                    <div className="hidden w-96 flex-col items-center justify-center bg-[#eaebec] lg:flex">
                      <Image
                        src="/comparea-file.png"
                        alt="Comparea"
                        width={200}
                        height={200}
                      />
                      <Image
                        src="/photos_agents.png"
                        alt="agents"
                        width={200}
                        height={200}
                      />
                      <span className="mt-4 text-center text-base font-semibold text-[#2a3775]">
                        <Trans
                          i18nKey="STEP_VERIFY_EXPERT"
                          t={t}
                          components={{
                            u: <u />,
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Info;
