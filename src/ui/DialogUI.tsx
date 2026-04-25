import React from 'react';
import { useStoryStore } from '../store/StoryStore';
import '../styles/DialogUI.css';

interface DialogOption {
  text: string;
  nextId?: string;
  action?: () => void;
}

export const DialogUI: React.FC = () => {
  const { currentDialog, endDialog, startDialogById } = useStoryStore();

  if (!currentDialog) return null;

  const handleOptionClick = (option: DialogOption) => {
    // Execute action if present
    if (option.action) {
      option.action();
    }

    // Move to next dialogue or end
    if (option.nextId) {
      startDialogById(option.nextId);
    } else {
      endDialog();
    }
  };

  return (
    <div className="dialog-ui">
      <div className="dialog-box">
        {/* Speaker Name */}
        <div className="dialog-speaker">{currentDialog.speaker}</div>

        {/* Dialogue Text */}
        <div className="dialog-text">{currentDialog.text}</div>

        {/* Options */}
        <div className="dialog-options">
          {currentDialog.options.map((option, idx) => (
            <button
              key={idx}
              className="dialog-option"
              onClick={() => handleOptionClick(option)}
            >
              <span className="option-arrow">➤</span>
              {option.text}
            </button>
          ))}
        </div>

        {/* Close Button (if last dialogue) */}
        {currentDialog.options.length === 0 && (
          <button className="dialog-close" onClick={endDialog}>
            Weiter [SPACE]
          </button>
        )}
      </div>
    </div>
  );
};
