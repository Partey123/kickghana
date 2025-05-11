
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

type Language = {
  code: string;
  name: string;
  flag?: string;
  isRTL?: boolean;
};

const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "ak", name: "Twi (Akan)" },
  { code: "ee", name: "Ewe" },
  { code: "ga", name: "Ga" },
  { code: "dag", name: "Dagbani" },
];

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Get from localStorage or default to English
    const savedLang = localStorage.getItem("preferredLanguage");
    return (
      SUPPORTED_LANGUAGES.find((lang) => lang.code === savedLang) ||
      SUPPORTED_LANGUAGES[0]
    );
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem("preferredLanguage", currentLanguage.code);
    
    // In a real application, this would trigger translation changes
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.isRTL ? "rtl" : "ltr";
    
    // This is a placeholder for actual translations
    // In a real app, you would use i18n libraries like react-i18next
    console.log(`Language changed to: ${currentLanguage.name}`);
  }, [currentLanguage]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${className}`}
        >
          <Globe size={16} />
          <span className="ml-1 hidden md:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`flex items-center gap-2 ${
              currentLanguage.code === language.code ? "bg-accent" : ""
            }`}
            onClick={() => setCurrentLanguage(language)}
          >
            {language.flag && <span>{language.flag}</span>}
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              {language.name}
            </motion.span>
            {currentLanguage.code === language.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
