import { MoonStar, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";

  const toggleMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full border-none bg-transparent"
      onClick={toggleMode}
    >
      <Sun
        className={`rotate-0 scale-100 transition-all ${
          isDarkMode ? "dark:-rotate-90 dark:scale-0" : ""
        }`}
      />
      <MoonStar
        className={`absolute rotate-90 scale-0 transition-all ${
          isDarkMode ? "dark:rotate-0 dark:scale-100" : ""
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
