import { useEffect } from "react";
import { useSteps } from "~/components/provider/StepsProvider";

const Loader = () => {
  const { increaseStep } = useSteps();

  useEffect(() => {
    setTimeout(() => {
      increaseStep();
    }, 1000);
  }, []);

  return <div>Loading </div>;
};

export default Loader;
