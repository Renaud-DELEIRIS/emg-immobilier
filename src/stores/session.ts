import { type Session, type Version } from ".prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { trcpProxyClient } from "~/utils/api";
import getCookie from "~/utils/client/getCookie";
import getParamsUrl from "~/utils/client/getParamsUrl";
import isBot from "~/utils/client/isBot";
import isMobile from "~/utils/client/isMobile";
import { useFormStore } from "./form";

type SessionState = {
  sessionId: string | null;
  setSessionId: (s: string | null) => void;
  fetchSession: () => Promise<{
    version: Version;
    session: Session;
  }>;
};
//
export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set, get) => ({
        sessionId: null,
        setSessionId: (s) => set(() => ({ sessionId: s })),
        fetchSession: async () => {
          const urlParams = getParamsUrl();
          const r = await trcpProxyClient.fetchSession.query({
            sessionId: get().sessionId,
            versionId: useFormStore.getState().versionId,
            urlParams,
            isBot: isBot(),
            isMobile: isMobile(),
            formVersion: getCookie("formversion"),
          });
          return r;
        },
      }),
      {
        name: "session-storage", // name of the item in the storage (must be unique)
      }
    )
  )
);
