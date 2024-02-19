import Image from "next/image";

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <Image src="/logo/logo.svg" alt="Logo" width={48} height={48} />
    <Image src="/logo/logo_text.svg" alt="Logo" width={71} height={24} />
  </div>
);
export default Logo;
