import Image from "next/image";
import logo from "../public/image2.png";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-15 sticky top-0 bg-white">
        <div className="flex justify-between items-center mt-4 h-10 px-4">
          <div>
            <Image src={logo} alt="Logo" width={100} height={100} />
          </div>
          <div>Chirag</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
