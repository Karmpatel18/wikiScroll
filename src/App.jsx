import Card from "./components/card/Card"
import Navbar from "./components/navbar/Navbar"


function App() {
  

  return (
    <div className="font-poppins flex px-10 sm:px-14 md:px-12 lg:px-0 min-h-screen dark:bg-zinc-900 bg-neutral-50 text-neutral-900 dark:text-neutral-50 justify-center transition-all">
      <div className="flex-col max-w-3xl w-full items-center">
        <div className="flex fixed w-full px-10 sm:px-14 md:px-12 lg:px-0 left-0 right-0 backdrop-blur-lg justify-center"><Navbar/></div>
        <div className="flex mt-36 sm:mt-24 h-fit  ">
          <Card/>
        </div>
        </div>
    </div>
  )
}

export default App
