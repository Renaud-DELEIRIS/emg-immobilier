import { Dialog, Transition } from "@headlessui/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";
import Button from "../button/Button";
import CodeInput from "../inputs/CodeInput";
import { useLead } from "../provider/LeadProvider";
import { useSteps } from "../provider/StepsProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

const VerifyModal = ({ onClose, open }: Props) => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successResend, setSuccessResend] = useState<boolean>(false);
  const { lead } = useLead();
  const { decreaseStep } = useSteps();

  const handleResend = () => {
    setSuccessResend(true);
    setTimeout(() => {
      setSuccessResend(false);
    }, 1000);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  useEffect(() => {
    // On open make html scrollable
    setTimeout(() => {
      document.documentElement.style.overflow = "auto";
    }, 300);
  }, [open]);

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-blue text-lg font-medium leading-6"
                ></Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500"></p>
                  <p className="text-sm text-gray-500"></p>
                </div>

                <div className="mt-4">
                  <CodeInput
                    value={code}
                    onChange={setCode}
                    onFilled={handleVerify}
                    length={4}
                    accept="number"
                  />
                </div>
                {/* Button resend code */}
                <div className="mt-1">
                  {!successResend ? (
                    <button
                      type="button"
                      className="text-blue text-sm hover:underline"
                      onClick={handleResend}
                    >
                      resend code
                    </button>
                  ) : (
                    <span className="text-sm text-green-500">
                      resend success
                    </span>
                  )}
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <Button
                    className="w-28"
                    onClick={handleVerify}
                    size="medium"
                    loading={loading}
                    disabled={code.length < 4}
                  >
                    Submit
                  </Button>
                  <Button
                    intent="secondary"
                    size="small"
                    iconLeft={<IconArrowLeft />}
                    onClick={() => decreaseStep()}
                  >
                    Back
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VerifyModal;
