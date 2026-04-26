"use client"

import { useStoryStore } from '@/src/store/StoryStore'
import { QuestStatus } from '@/src/game/StoryTypes'
import { useT } from '@/src/i18n/useT'

export default function StoryPanel() {
  const t = useT()
  const quests = useStoryStore((s) => s.quests)
  const npcs = useStoryStore((s) => s.npcs)
  const worldState = useStoryStore((s) => s.worldState)
  const updateQuestStatus = useStoryStore((s) => s.updateQuestStatus)
  const updateObjective = useStoryStore((s) => s.updateObjective)
  const setFlag = useStoryStore((s) => s.setFlag)

  return (
    <div className="flex flex-col gap-4 p-4 bg-black/90 text-cyan-400 font-mono text-xs border border-cyan-900 rounded-lg max-h-[80vh] overflow-auto">
      <h2 className="text-lg font-bold border-b border-cyan-900 pb-2 mb-2">{t("ui.story_panel.title")}</h2>
      
      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-[10px]">{t("ui.story_panel.active_quests")}</h3>
        <div className="flex flex-col gap-2">
          {quests.map((quest) => (
            <div key={quest.id} className={`p-2 border ${quest.status === 'active' ? 'border-cyan-400 bg-cyan-950/30' : 'border-gray-800 bg-gray-900/20'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">{quest.id}: {quest.title}</span>
                <select 
                  value={quest.status} 
                  onChange={(e) => updateQuestStatus(quest.id, e.target.value as QuestStatus)}
                  className="bg-black border border-cyan-800 text-[10px] px-1"
                >
                  <option value="locked">{t("ui.story.status.locked")}</option>
                  <option value="available">{t("ui.story.status.available")}</option>
                  <option value="active">{t("ui.story.status.active")}</option>
                  <option value="completed">{t("ui.story.status.completed")}</option>
                  <option value="failed">{t("ui.story.status.failed")}</option>
                </select>
              </div>
              <div className="text-[10px] text-gray-400 mb-2">{quest.description}</div>
              <div className="flex flex-wrap gap-1">
                {quest.objectives.map((obj) => (
                  <button 
                    key={obj.id} 
                    onClick={() => updateObjective(quest.id, obj.id, !obj.isCompleted)}
                    className={`px-2 py-0.5 rounded-full border text-left transition-colors ${obj.isCompleted ? 'border-green-500 text-green-500 bg-green-950/20 hover:bg-green-900/40' : 'border-gray-600 text-gray-500 hover:border-cyan-500 hover:text-cyan-400'}`}
                  >
                    {obj.description}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-[10px]">{t("ui.story_panel.npc_roster")}</h3>
        <div className="grid grid-cols-2 gap-2">
          {npcs.map((npc) => (
            <div key={npc.id} className="p-2 border border-gray-800 bg-gray-900/20">
              <div className="font-bold text-white">{npc.name}</div>
              <div className="text-[9px] text-gray-500">{npc.role} | {npc.region}</div>
              <div className="text-[9px] text-cyan-600 italic mt-1">{npc.arc}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-[10px]">{t("ui.story_panel.world_flags")}</h3>
        <div className="flex flex-col gap-1">
          {Object.entries(worldState.flags).map(([flag, value]) => (
            <div key={flag} className="flex justify-between items-center py-1 border-b border-gray-900">
              <span className="text-gray-400">{flag}</span>
              <span className="text-white">{String(value)}</span>
            </div>
          ))}
          <div className="mt-2 flex gap-2">
            <input 
              id="new-flag-name" 
              placeholder={t("ui.story_panel.flag_id_placeholder")}
              className="bg-black border border-cyan-900 p-1 flex-1 text-[10px]" 
            />
            <button 
              onClick={() => {
                const input = document.getElementById('new-flag-name') as HTMLInputElement;
                if (input.value) {
                  setFlag(input.value, true);
                  input.value = '';
                }
              }}
              className="bg-cyan-900 text-white px-2 py-1 text-[10px]"
            >
              {t("ui.story_panel.set_true")}
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-[10px]">{t("ui.story_panel.reputation")}</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {Object.entries(worldState.reputation).map(([faction, level]) => (
            <div key={faction} className="flex justify-between items-center">
              <span className="text-gray-400 text-[10px]">{faction}</span>
              <span className="text-cyan-400 font-bold">{level}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
