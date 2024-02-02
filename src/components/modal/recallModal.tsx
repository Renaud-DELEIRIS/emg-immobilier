import { IconPhoneCall, IconX } from "@tabler/icons-react";
import PhoneInputWithCountrySelect, {
  isValidPhoneNumber,
} from "react-phone-number-input";
import { useFormStore } from "~/stores/form";
import { Button } from "../button/Button";
import { Alert, AlertDescription } from "../feedback/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

const RecallModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const lead = useFormStore((state) => state.data);
  const changeLead = useFormStore((state) => state.setData);

  const onRecall = () => null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Un conseiller vous appelle gratuitement</DialogTitle>
          <button
            className="rounded-full p-0.5 text-primary hover:bg-primary/10"
            onClick={() => setOpen(false)}
          >
            <IconX size={24} />
          </button>
        </DialogHeader>
        <span className="text-base leading-5">
          Indiquez nous votre numéro de téléphone, un conseiller va vous appeler
          dans quelques minutes.
        </span>
        <PhoneInputWithCountrySelect
          value={lead.phone || ""}
          onChange={(val) => {
            if (!val) return;
            changeLead({ phone: val });
          }}
          defaultCountry="CH"
          countryOptionsOrder={["CH", "FR", "DE", "IT"]}
          className="my-[14px] h-[56px] rounded-lg border-[1.5px] border-[#88889459] bg-white px-[14px] focus-within:border-2 focus-within:border-primary [&>input[type=tel]]:focus-within:outline-none"
          placeholder="Numéro de téléphone"
          required
        />
        <Alert variant="info" noTitle>
          <AlertDescription>
            Nous ne communiquerons jamais votre numéro de téléphone à un tiers
            sans votre accord.
          </AlertDescription>
        </Alert>
        <Button
          variant={"thirdy"}
          disabled={!isValidPhoneNumber(lead.phone)}
          className="mt-[14px]"
          onClick={() => void onRecall()}
        >
          <IconPhoneCall size={24} className="mr-1" />
          Me faire appeler
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RecallModal;
