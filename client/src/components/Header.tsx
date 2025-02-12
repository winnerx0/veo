import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between sticky top-0 w-full h-12 px-4 border-b bg-background z-50">
      <a href={"/home"} className="font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 2000 2000"
        >
          <g>
            <g
              fill="hsl(242, 100%, 50%)"
              id="star"
              transform="matrix(-0.10452846326765333,0.9945218953682734,-0.9945218953682734,-0.10452846326765333,2039.935428440011,44.3527866105419)"
            >
              <path
                d="M 527.9720266661998 755.2447433290733 C 1000 1000 1000 1000 1356.643363335726 381.1188866686507 C 1000 1000 1000 1000 1500 1500 C 1000 1000 1000 1000 500 1500 C 1000 1000 1000 1000 527.9720266661998 755.2447433290733"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </g>
        </svg>
      </a>
      <Button
        className="rounded-full"
        variant={"outline"}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
