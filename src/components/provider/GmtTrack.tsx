import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getQueryFromUrl } from "~/utils/queryFromUrl";
import { useSessionStorage } from "../hooks/useSessionStorage";

const keySessionStorage = "gtmtrack";

interface IGtmTrackContext {
  params: Record<string, string>;
}

const AppContext = createContext<IGtmTrackContext | null>(null);

export function GtmTrackProvider({ children }: { children: ReactNode }) {
  const sessionStorage = useSessionStorage(keySessionStorage);
  const [params, setParams] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.get();
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData) setParams((p) => ({ ...p, ...parsedData }));
    }
    const query = getQueryFromUrl(router.asPath);
    setParams((p) => ({ ...p, ...query }));
  }, []);
  useEffect(() => {
    sessionStorage.set(JSON.stringify(params));
  }, [params]);

  const sharedState = useMemo<IGtmTrackContext>(
    () => ({
      params,
    }),
    [params]
  );

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useGtmtrack() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context undefined");
  }
  return context;
}
