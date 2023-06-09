export const sendCodeSms = async (telephone: string) => {
  if (!telephone) return Promise.reject("Erreur téléphone manquant");
  const _url = `${
    process.env.NEXT_PUBLIC_SMS || ""
  }?telephone=${telephone.replace("+", "%2B")}`;
  try {
    const response = await fetch(_url);
    if (!response.ok) {
      const data = (await response.json()) as { message: string };
      return Promise.reject(data.message);
    }
    const data = (await response.json()) as { code: string };
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject("Erreur appel serveur");
  }
};
