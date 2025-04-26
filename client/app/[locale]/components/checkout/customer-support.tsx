import { useTranslations } from "next-intl";

export function CustomerSupport() {
  const t = useTranslations("checkout"); // Initialize translations
  return (
    <div className="fixed bottom-8 right-8 z-10">
      <button className="bg-subbutton hover:bg-hoversubbutton  text-white px-8 py-4 rounded-full font-semibold transition-colors">
        {t("support")}
      </button>
    </div>
  );
}
