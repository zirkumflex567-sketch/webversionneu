import React from "react"
import { useStoryStore } from "../store/StoryStore"
import { useT } from "../i18n/useT"
import "../styles/DialogUI.css"

interface DialogOption {
  text: string
  nextId?: string
  action?: () => void
}

export const DialogUI: React.FC = () => {
  const t = useT()
  const { currentDialog, endDialog, startDialogById } = useStoryStore()

  if (!currentDialog) return null

  const handleOptionClick = (option: DialogOption) => {
    option.action?.()
    if (option.nextId) startDialogById(option.nextId)
    else endDialog()
  }

  return (
    <div className="dialog-ui">
      <div className="dialog-speaker">{currentDialog.speaker}</div>
      <div className="dialog-text">{currentDialog.text}</div>
      <div className="dialog-options">
        {currentDialog.options.map((option, idx) => (
          <button key={idx} onClick={() => handleOptionClick(option)}>
            <span aria-hidden="true">›</span> {option.text}
          </button>
        ))}
      </div>
      {currentDialog.options.length === 0 && (
        <button className="dialog-continue" onClick={endDialog}>
          {t("ui.dialog.continue_space")}
        </button>
      )}
    </div>
  )
}
