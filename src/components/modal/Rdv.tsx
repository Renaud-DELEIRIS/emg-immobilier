import { IconEditCircle } from "@tabler/icons-react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFormStore } from "~/stores/form";
import { api } from "~/utils/api";
import { Button } from "../button/Button";
import Calendar from "../calendar/Calendar";
import TileInput from "../inputs/Tile";
import Input from "../inputs/input";
import { Offre } from "../steps/result/ResultCard";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  onClose: () => void;
  offer: Offre;
}

const Rdv: React.FC<Props> = ({ onClose, offer }) => {
  const { t } = useTranslation("step");
  const data = useFormStore((state) => state.data);
  const updateData = useFormStore((state) => state.setData);
  const [rdvType, setRdvType] = useState<"visio" | "téléphonique">();
  const [updateEmail, setUpdateEmail] = useState(false);
  const [date, setDate] = useState<string>(new Date().toString());
  const { mutate: updateLead } = api.updateLead.useMutation();
  const { mutateAsync: fixRdv, isLoading } = api.fixRdv.useMutation();

  const onRdv = async () => {
    // TODO: envoyé demande de rdv (rdv type 1 = viso 2 = téléphone)
    try {
      updateLead({
        idlead: data.idlead ?? "",
        data: {
          nom: data.nom,
          prenom: data.prenom,
        },
      });
      await fixRdv({
        typeRdv: rdvType ?? "",
        dateRdv: dayjs(date).format(),
        tz: dayjs.tz.guess(),
        company: offer.name,
        telephone: data.phone,
        email: data.email,
        name: data.nom,
        firstname: data.prenom,
        idlead: data.idlead ?? "",
      });
      toast.success(t("result.rdv.success"));
    } catch (e) {
      toast.error(t("result.rdv.error"));
    } finally {
      onClose();
    }
  };

  return (
    <div className="flex max-w-[380px] flex-col items-center rounded-lg bg-white px-5 pb-1 pt-5">
      <div className="mb-3">
        <p className="text-center text-[13px] font-normal text-dark">
          {t("result.rdv.title")}
        </p>
      </div>
      <Calendar value={date} onChange={(e) => setDate(e)} />
      <div className="mb-4 mt-5 w-full">
        <label className="mb-3 block text-sm font-semibold">
          {t("result.rdv.question")}
        </label>
        <div className="grid grid-cols-2 items-center gap-2">
          <Input
            value={data.nom}
            onChange={(e) => updateData({ nom: e })}
            placeholder={t("result.rdv.nom_placeholder") || ""}
          />
          <Input
            value={data.prenom}
            placeholder={t("result.rdv.prenom_placeholder") || ""}
            onChange={(e) => updateData({ prenom: e })}
          />
        </div>
      </div>
      <div className="mb-4 w-full">
        <label className="mb-3 block text-sm font-semibold text-dark">
          {t("result.rdv.question_type")}
        </label>
        <TileInput
          value={rdvType}
          onChange={(e) => setRdvType(e)}
          className="grid grid-cols-2"
          tileClassName="[&>div>span]:text-[13px] h-[50px] min-h-[0px] px-2 [&>[data-dot]]:scale-75"
          options={[
            { label: t("result.rdv.type_visio"), value: "visio" },
            { label: t("result.rdv.type_phone"), value: "téléphonique" },
          ]}
        />
      </div>
      <div className="mb-5 w-full text-left">
        {updateEmail ? (
          <form
            className="flex items-end"
            onSubmit={(e) => {
              e.preventDefault();
              setUpdateEmail(false);
            }}
          >
            <Input
              value={data.email}
              onChange={(e) => updateData({ email: e })}
              placeholder={t("result.rdv.email_placeholder") || ""}
              label={t("result.rdv.email_label") || ""}
              className="w-full"
            />
            <button className="ml-2 text-primary" type="submit">
              <IconEditCircle size={26} className="mb-4" />
            </button>
          </form>
        ) : (
          <span className="text-left text-[13px] font-normal text-dark">
            {t("result.rdv.send_to")} {data.email}{" "}
            <button
              className="text-left text-primary"
              onClick={() => setUpdateEmail(true)}
            >
              ({t("result.rdv.action_update")})
            </button>
          </span>
        )}
      </div>
      <Button
        disabled={updateEmail || !rdvType || date === "" || data.nom === ""}
        onClick={() => void onRdv()}
        className="w-full"
        loading={isLoading}
      >
        {t("result.rdv.action")}
      </Button>
      <button
        className="flex h-12  w-full  items-center justify-center gap-1.5 px-2.5 py-2.5 text-[13px] font-semibold text-dark hover:bg-neutral-50"
        disabled={updateEmail}
        onClick={onClose}
      >
        {t("result.rdv.back")}
      </button>
    </div>
  );
};

export default Rdv;
