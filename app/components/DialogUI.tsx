"use client"

import { useStoryStore } from '@/src/store/StoryStore'
import { ScanlineOverlay } from './UIElements'

export default function DialogUI() {
  const currentDialog = useStoryStore((s) => s.currentDialog)
  const endDialog = useStoryStore((s) => s.endDialog)
  const startDialogById = useStoryStore((s) => s.startDialogById)

  if (!currentDialog) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center pb-12 sm:pb-20 pointer-events-none">
      <div className="w-[95vw] max-w-[800px] bg-black/90 border-4 border-cyan-500 shadow-[10px_10px_0_0_rgba(0,255,255,0.2)] p-4 sm:p-6 relative pointer-events-auto">
        <ScanlineOverlay />
        
        {/* Speaker Name */}
        <div className="absolute -top-10 left-0 bg-cyan-500 text-black px-4 py-1 font-bebas text-2xl tracking-widest uppercase">
          {currentDialog.speaker}
        </div>

        {/* Dialog Text */}
        <div className="font-orbitron text-white text-sm sm:text-base mb-6 leading-relaxed">
          {currentDialog.text}
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          {currentDialog.options.length > 0 ? (
            currentDialog.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (opt.action) opt.action()
                  if (opt.nextId) {
                    startDialogById(opt.nextId)
                  } else {
                    endDialog()
                  }
                }}
                className="w-full text-left p-3 border border-cyan-900 bg-cyan-950/20 hover:bg-cyan-500 hover:text-black text-cyan-400 text-xs sm:text-sm font-black tracking-widest uppercase transition-colors flex items-center gap-3"
              >
                <span className="text-white opacity-40">[{idx + 1}]</span>
                {opt.text}
              </button>
            ))
          ) : (
            <button
              onClick={endDialog}
              className="w-full text-left p-3 border border-gray-700 bg-gray-900/40 hover:bg-white hover:text-black text-white text-xs sm:text-sm font-black tracking-widest uppercase transition-colors"
            >
              [CLOSE CONNECTION]
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
