import { IconPhoneCall, IconX } from "@tabler/icons-react";
import { Trans, useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { AuthCodeRef } from "react-auth-code-input";
import { formatPhoneNumber } from "react-phone-number-input";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import { Alert, AlertDescription } from "../feedback/alert";
import CodeInput2 from "../inputs/CodeInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

const CodeModal = ({
  open,
  setOpen,
  onVerify,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onVerify: (e: string) => Promise<void>;
}) => {
  const [code, setCode] = useState("");
  const { t } = useTranslation("step");
  const lead = useFormStore((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<AuthCodeRef>(null);

  const onClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      // TODO remove auto reject
      await new Promise((r, rej) => setTimeout(rej, 1000));
      await onVerify(code);
    } catch (e) {
      // Make modal shake
      const modal = document.getElementById("auth_code_modal");
      if (modal) {
        modal.animate(
          [
            { transform: "translate(calc(-50% - 5px), -50%)" },
            { transform: "translate(calc(-50% + 5px), -50%)" },
            { transform: "translate(calc(-50% - 5px), -50%)" },
            { transform: "translate(calc(-50% + 5px), -50%)" },
            { transform: "translate(calc(-50% - 5px), -50%)" },
          ],
          {
            duration: 150,
            iterations: 1,
          }
        );
      }
      setError(true);
      ref.current?.clear();
      ref.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent effect="scale" id="auth_code_modal">
        <DialogHeader>
          <DialogTitle>{t("verif.modal.title")}</DialogTitle>
          <button
            className="rounded-full p-0.5 text-primary hover:bg-primary/10"
            onClick={onClose}
          >
            <IconX size={24} />
          </button>
        </DialogHeader>
        <span className="text-base leading-5">
          <Trans
            t={t}
            i18nKey="verif.modal.subtitle"
            tOptions={{ phone: formatPhoneNumber(lead.phone) }}
            components={{
              b: <span className="font-semibold" />,
            }}
          />
        </span>
        <CodeInput2
          className="my-6"
          onChange={(e) => {
            setCode(e);
          }}
          placeholder="0"
          ref={ref}
        />
        {error && (
          <p className="mb-2 text-sm text-red-500">{t("verif.modal.error")}</p>
        )}
        <Alert variant="info" noTitle>
          <AlertDescription>
            <Trans
              t={t}
              i18nKey="verif.modal.alert"
              components={{
                b: <span className="font-semibold" />,
              }}
            />
          </AlertDescription>
        </Alert>
        <Button
          variant={"thirdy"}
          disabled={code.length !== 4}
          className="mt-[14px]"
          onClick={() => handleVerify()}
          loading={loading}
        >
          <IconPhoneCall size={24} className="mr-1" />
          {t("verif.modal.action")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CodeModal;
