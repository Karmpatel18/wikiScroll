import ThemeMode from "./ThemeMode"
import { HiOutlineNewspaper } from "react-icons/hi2";

function Navbar() {
  return (
    <div className="flex w-full  justify-between mt-8 mb-6 font-poppins max-w-3xl flex-col gap-3 sm:gap-0 sm:flex-row ">
      <div className="flex items-center text-xl font-semibold tracking-tighter gap-2"><HiOutlineNewspaper />WikiScroll</div>
      <div className="flex gap-3">
      
      <div className="flex items-center font-normal tracking-tighter text-neutral-400 dark:text-neutral-200/40 text-sm gap-3">Made by 
      <div className="border-[1px] cursor-pointer p-[2px] w-[34px] h-[34px] rounded-md bg-white border-neutral-200 dark:bg-zinc-900 dark:border-neutral-200/90 transition-all">
        <a href="https://github.com/Karmpatel18" target="_blank"><img className="rounded-[3px] "src="https://avatars.githubusercontent.com/u/120663033?v=4"/></a>
      </div>
      </div>
      <ThemeMode/>
      </div>
    </div>
  )
}

export default Navbar
