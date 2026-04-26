"use client"

import { useStoryStore } from '@/src/store/StoryStore'
import { useT } from '@/src/i18n/useT'

export default function QuestTracker() {
  const t = useT()
  const quests = useStoryStore((s) => s.quests)
  const activeQuest = quests.find(q => q.status === 'active')

  if (!activeQuest) return null

  return (
    <div className="bg-black/80 border-2 border-[#ffaa00] p-2 sm:p-3 shadow-[4px_4px_0_0_#000] max-w-[200px] sm:max-w-[300px]">
      <div className="text-[7px] sm:text-[9px] font-black text-[#ffaa00] tracking-[0.2em] uppercase mb-1">{t("ui.quest_tracker.active_objective")}</div>
      <div className="font-bebas text-lg sm:text-2xl text-white leading-none tracking-wide mb-2 uppercase">{activeQuest.title}</div>
      <div className="flex flex-col gap-1.5">
        {activeQuest.objectives.map(obj => (
          <div key={obj.id} className="flex items-start gap-2">
            <div className={`mt-1.5 w-1.5 h-1.5 shrink-0 rotate-45 ${obj.isCompleted ? 'bg-[#00ffaa]' : 'border border-white/40'}`} />
            <span className={`text-[9px] sm:text-[11px] font-bold tracking-wide uppercase leading-tight ${obj.isCompleted ? 'text-white/40 line-through' : 'text-white/80'}`}>
              {obj.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
