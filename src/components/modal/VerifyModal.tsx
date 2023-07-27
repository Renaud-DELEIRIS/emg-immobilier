import { type StepId } from "~/constants/step.constant";
import PhoneInput from "react-phone-input-2";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useLead } from "../provider/LeadProvider";
import { useSteps } from "../provider/StepsProvider";
import TextInput from "../inputs/TextInput";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import CodeInput from "../inputs/CodeInput";
import Button from "../button/Button";
import { sendCodeSms } from "~/utils/api/sendSms";

const Info = ({ open }: { open: boolean }) => {
  const { lead, changeLead } = useLead();
  const { increaseStep } = useSteps();
  const [step, setStep] = useState<"info" | "phone">("info");
  const [code, setCode] = useState("");
  const [responseCode, setResponseCode] = useState<string>();
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    return res;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("phone");
  };

  useEffect(() => {
    if (lead.verified) increaseStep("verification");
  }, []);

  const verifyCode = () => {
    console.log(code, responseCode);
    if (process.env.NODE_ENV === "development") {
      if (code === "6121") {
        changeLead({ ...lead, verified: true });
        increaseStep("verification", {
          ...lead,
          verified: true,
        });
        return;
      }
    }
    if (!responseCode) return;
    if (code.trim() !== responseCode) {
      console.log("Code is not valid");
      return;
    }
    changeLead({ ...lead, verified: true });
    increaseStep("verification");
  };

  useEffect(() => {
    if (step !== "phone" || !lead.phone) return;
    setLoading(true);
    void sendCodeSms(lead.phone)
      .then((res) => {
        console.log(res);
        setResponseCode(res.code);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [step]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-[5px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-20 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex w-full">
                  {step === "info" && (
                    <form
                      onSubmit={onSubmit}
                      className="flex flex-1 grid-cols-6 flex-col gap-4 p-6"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src="/portrait.png"
                          alt="Portrait"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <span className="text-base font-semibold">Emma</span>
                      </div>
                      <p className="col-span-6 text-sm text-gray-500">
                        Nous avons identifié pour <b>vous</b> les{" "}
                        <span className="font-semibold text-primary underline">
                          12
                        </span>{" "}
                        meilleures offres <b>conforts</b> adaptées à votre{" "}
                        <b>profil</b>. Ces tarifs seront bloqués pour vous
                        jusqu’au{" "}
                        <span className="font-semibold text-primary underline">
                          {dayjs().add(1, "day").format("DD/MM/YYYY")}
                        </span>
                      </p>
                      <div className="col-span-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Votre adresse email
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
                            className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="you@example.com"
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
                      <div className="col-span-6">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Votre numéro de téléphone
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
                            autoComplete: "phone",
                          }}
                          inputClass="block !w-full border-gray-300 focus:!border-primary-500 focus:!ring-primary-500 !sm:text-sm !h-[38px] !rounded-md"
                          preferredCountries={["ch", "fr"]}
                          regions={"europe"}
                          country={"ch"}
                          containerClass="relative mt-1  h-[38px] !border-transparent"
                          value={lead.phone || ""}
                        />
                      </div>
                      <span className="col-span-6 text-xs text-gray-400">
                        Ces <strong>informations protégées</strong> seront
                        utilisées uniquement dans le cadre de votre dossier.
                      </span>

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
                          <span>ACCÉDER AUX TARIFS NÉGOCIÉS</span>
                        </Button>
                      </div>
                    </form>
                  )}
                  {step === "phone" && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-1 flex-col p-6"
                    >
                      <p className="text-sm text-gray-500">
                        Afin de vérifier votre identité, nous vous avons envoyé
                        un code de vérification par SMS au numéro :{" "}
                        <span className="text-primary">{lead.phone}</span>
                      </p>
                      <div className="mt-8">
                        <p className="mb-2 text-sm text-gray-500">
                          Veuillez saisir le code à 4 chiffres :
                        </p>
                        <CodeInput
                          onChange={(e) => setCode(e)}
                          value={code}
                          accept={"number"}
                        />
                      </div>
                      <div className="mt-8 flex w-full flex-row items-center justify-between">
                        <Button
                          disabled={code.length !== 4}
                          intent={"primary"}
                          onClick={() => {
                            verifyCode();
                          }}
                        >
                          <span>Valider</span>
                        </Button>
                        <Button
                          intent={"secondary"}
                          size={"small"}
                          iconLeft={<IconArrowLeft />}
                          onClick={() => {
                            setStep("info");
                            setCode("");
                          }}
                        >
                          <span>Retour</span>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  <div className="hidden w-64 flex-col items-center justify-center bg-neutral-300 md:flex">
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
                    <span className="mt-4 text-center text-base font-semibold text-primary-500">
                      Une équipe d‘expert pour vous conseiller{" "}
                      <u>gratuitement</u>
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Info;
