
import {useState , useEffect} from 'react'
import { Moon, Sun } from 'lucide-react'

function ThemeMode() {
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize state from localStorage or default to light mode
        return localStorage.getItem('theme') === 'dark';
      });
      useEffect(() => {
        const root = window.document.documentElement;
    
        if (darkMode) {
          root.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          root.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }, [darkMode]);
    
      const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
      };

    

    
  return (
    
      <div 
      onClick={toggleDarkMode}
      className='cursor-pointer flex border-[1px] items-center p-2 border-neutral-200 rounded-lg bg-white dark:bg-zinc-900 dark:border-neutral-200/90 dark:text-white'>
        
        {darkMode ? (
          <Moon className="w-4 h-4 text-neutral-200" />
        ) : (
          <Sun className="w-4 h-4 text-neutral-900" />
        )}
      </div>
    
  )
}

export default ThemeMode;