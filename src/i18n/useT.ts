import { useGameStore } from "../store"
import { t, type TranslationKey, type TranslationVars } from "./index"

export function useT() {
  const locale = useGameStore((state) => state.locale)
  return (key: TranslationKey, vars?: TranslationVars) => t(key, vars, locale)
}
