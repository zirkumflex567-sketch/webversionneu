import React, { useState } from 'react'
import { BOUNTIES, BountyData, enforceSingleBountySelection } from '../data/BountyData'
import { useGameStore } from '../store'
import '../styles/BountySelectionUI.css'
import { useT } from '../i18n/useT'

export const BountySelectionUI: React.FC<{ onConfirm: (selectedBounties: string[]) => void }> = ({ onConfirm }) => {
  const t = useT()
  const gameState = useGameStore()
  const bankedScrap = gameState.meta.totalScrap || 0
  const [selectedBounties, setSelectedBounties] = useState<string[]>([])
  const [hoveredBounty, setHoveredBounty] = useState<string | null>(null)

  const maxBounties = 1
  const totalCost = selectedBounties.reduce((sum, id) => {
    const bounty = BOUNTIES.find((b) => b.id === id)
    return sum + (bounty?.unlockCost || 0)
  }, 0)
  const canAfford = bankedScrap >= totalCost

  const toggleBounty = (bountyId: string) => {
    if (selectedBounties.includes(bountyId)) {
      setSelectedBounties([])
      return
    }
    setSelectedBounties(enforceSingleBountySelection([...selectedBounties, bountyId]))
  }

  const handleConfirm = () => {
    if (canAfford && selectedBounties.length > 0) {
      onConfirm(selectedBounties)
    }
  }

  const calculateDifficultyScore = (bounty: BountyData): number => {
    let score = 0
    bounty.effects.forEach((effect) => {
      if (effect.type === 'EnemyMaxAliveMultiplier') score += effect.value * 50
      if (effect.type === 'IncomingDamageMultiplier') score += effect.value * 30
      if (effect.type === 'ScrapMultiplier') score -= effect.value * 10
      if (effect.type === 'TechMultiplier') score -= effect.value * 15
    })
    return Math.max(0, score)
  }

  const getRewardTotal = () => {
    return selectedBounties.reduce((sum, id) => {
      const bounty = BOUNTIES.find((b) => b.id === id)
      return sum + (bounty?.rewardScrap || 0) + (bounty?.rewardTech || 0)
    }, 0)
  }

  return (
    <div className="bounty-selection-ui">
      <div className="bounty-header">
        <h2>{t('ui.bounty_selection.title')}</h2>
        <div className="bounty-resources">
          <span className="scrap-available">
            {t('ui.bounty_selection.scrap')}: <strong>{bankedScrap}</strong>
          </span>
        </div>
      </div>

      <div className="bounty-instructions">
        <p>{t('ui.bounty.subtitle')} <strong>({t('ui.bounty.one_only')})</strong></p>
      </div>

      <div className="bounty-grid">
        {BOUNTIES.map((bounty) => {
          const isSelected = selectedBounties.includes(bounty.id)
          const isHovered = hoveredBounty === bounty.id
          const canSelect = selectedBounties.length < maxBounties || isSelected
          const difficulty = calculateDifficultyScore(bounty)

          return (
            <div
              key={bounty.id}
              className={`bounty-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredBounty(bounty.id)}
              onMouseLeave={() => setHoveredBounty(null)}
            >
              <div className="bounty-visual">
                <div className={`bounty-icon difficulty-${Math.min(5, Math.floor(difficulty / 10))}`} />
              </div>

              <div className="bounty-content">
                <div className="bounty-name">{t(bounty.displayNameKey)}</div>
                <div className="bounty-description">{t(bounty.descriptionKey)}</div>

                <div className="bounty-objectives">
                  {bounty.objectives.map((obj, idx) => (
                    <div key={idx} className="objective">
                      {t(`ui.bounty_selection.objective.${obj.type}` as never)}: {obj.targetCount}
                    </div>
                  ))}
                </div>

                <div className="bounty-stats">
                  <span className={`difficulty difficulty-${Math.min(5, Math.floor(difficulty / 10))}`}>
                    {t('ui.bounty_selection.difficulty')}: {difficulty}%
                  </span>
                  <span className="reward">
                    {t('ui.bounty_selection.reward')}: {bounty.rewardScrap} + {bounty.rewardTech}
                  </span>
                </div>

                <div className={`bounty-cost ${bounty.unlockCost <= bankedScrap ? 'affordable' : 'unaffordable'}`}>
                  {bounty.unlockCost}
                </div>

                <button
                  className={`select-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => canSelect && toggleBounty(bounty.id)}
                  disabled={!canSelect && !isSelected}
                >
                  {isSelected ? t('ui.bounty_selection.selected') : t('ui.bounty_selection.select')}
                </button>
              </div>

              {isHovered && (
                <div className="bounty-tooltip">
                  <div className="tooltip-title">{t(bounty.displayNameKey)}</div>
                  <div className="tooltip-effects">
                    <strong>{t('ui.bounty_selection.effects')}</strong>
                    {bounty.effects.map((eff, idx) => (
                      <div key={idx} className="effect-line">
                        {t(`ui.bounty_selection.effect.${eff.type}` as never)}:{' '}
                        {eff.value > 1 ? `+${(eff.value * 100 - 100).toFixed(0)}%` : `${(eff.value * 100).toFixed(0)}%`}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="bounty-summary">
        <div className="summary-left">
          <div className="summary-item">
            <span>{t('ui.bounty_selection.summary.selected')}</span>
            <strong>{selectedBounties.length}/{maxBounties}</strong>
          </div>
          <div className="summary-item">
            <span>{t('ui.bounty_selection.summary.total_cost')}</span>
            <strong className={totalCost <= bankedScrap ? 'affordable' : 'unaffordable'}>{totalCost}</strong>
          </div>
          <div className="summary-item">
            <span>{t('ui.bounty_selection.summary.total_rewards')}</span>
            <strong>{getRewardTotal()}</strong>
          </div>
        </div>

        <div className="risk-reward-graph">
          <div className="graph-title">{t('ui.bounty_selection.risk_reward')}</div>
          <div className="graph-bar">
            <div
              className="graph-fill"
              style={{
                width: `${Math.min(100, (selectedBounties.length / maxBounties) * 100 + getRewardTotal() / 20)}%`,
              }}
            />
          </div>
          <div className="graph-labels">
            <span>{t('ui.bounty_selection.risk.safe')}</span>
            <span>{t('ui.bounty_selection.risk.risky')}</span>
          </div>
        </div>
      </div>

      <div className="bounty-actions">
        <button className="btn-confirm" onClick={handleConfirm} disabled={!canAfford || selectedBounties.length === 0}>
          {t('ui.bounty_selection.confirm', { count: selectedBounties.length })}
        </button>
        <button className="btn-skip" onClick={() => onConfirm([])}>
          {t('ui.bounty_selection.skip')}
        </button>
      </div>
    </div>
  )
}
