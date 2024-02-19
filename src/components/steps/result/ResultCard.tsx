export interface Offre {
  img: string;
  advantages: {
    title: string;
    active: boolean;
  }[];
  interest: number;
}

interface Props {
  offre: Offre;
}

const ResultCard: React.FC<Props> = ({ offre }) => {
  return (
    <div className="flex flex-col rounded-xl border-[1.5px] border-[#8888941A] bg-white"></div>
  );
};

export default ResultCard;
