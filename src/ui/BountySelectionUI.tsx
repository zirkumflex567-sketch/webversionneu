import React, { useState } from 'react';
import { BOUNTIES, BountyData } from '../data/BountyData';
import { useGameStore } from '../store';
import '../styles/BountySelectionUI.css';

export const BountySelectionUI: React.FC<{ onConfirm: (selectedBounties: string[]) => void }> = ({ onConfirm }) => {
  const gameState = useGameStore();
  const bankedScrap = gameState.meta.totalScrap || 0;
  const [selectedBounties, setSelectedBounties] = useState<string[]>([]);
  const [hoveredBounty, setHoveredBounty] = useState<string | null>(null);

  const maxBounties = 3; // Can select up to 3 bounties per run
  const totalCost = selectedBounties.reduce((sum, id) => {
    const bounty = BOUNTIES.find(b => b.id === id);
    return sum + (bounty?.unlockCost || 0);
  }, 0);
  const canAfford = bankedScrap >= totalCost;

  const toggleBounty = (bountyId: string) => {
    if (selectedBounties.includes(bountyId)) {
      setSelectedBounties(selectedBounties.filter(id => id !== bountyId));
    } else if (selectedBounties.length < maxBounties) {
      setSelectedBounties([...selectedBounties, bountyId]);
    }
  };

  const handleConfirm = () => {
    if (canAfford && selectedBounties.length > 0) {
      // Deduct scrap (would update store)
      // gameState.spendScrap(totalCost);
      onConfirm(selectedBounties);
    }
  };

  const calculateDifficultyScore = (bounty: BountyData): number => {
    let score = 0;
    bounty.effects.forEach(effect => {
      if (effect.type === 'EnemyMaxAliveMultiplier') score += effect.value * 50;
      if (effect.type === 'IncomingDamageMultiplier') score += effect.value * 30;
      if (effect.type === 'ScrapMultiplier') score -= effect.value * 10; // Bonus reduces difficulty
      if (effect.type === 'TechMultiplier') score -= effect.value * 15;
    });
    return Math.max(0, score);
  };

  const getRewardTotal = () => {
    return selectedBounties.reduce((sum, id) => {
      const bounty = BOUNTIES.find(b => b.id === id);
      return sum + (bounty?.rewardScrap || 0) + (bounty?.rewardTech || 0);
    }, 0);
  };

  return (
    <div className="bounty-selection-ui">
      <div className="bounty-header">
        <h2>Bounty Selection — Pre-Match Modifiers</h2>
        <div className="bounty-resources">
          <span className="scrap-available">
            💎 Scrap: <strong>{bankedScrap}</strong>
          </span>
        </div>
      </div>

      <div className="bounty-instructions">
        <p>Select up to <strong>{maxBounties}</strong> bounties to modify your run. Each bounty costs Scrap to activate and grants rewards on completion.</p>
      </div>

      {/* Bounty Grid */}
      <div className="bounty-grid">
        {BOUNTIES.map((bounty) => {
          const isSelected = selectedBounties.includes(bounty.id);
          const isHovered = hoveredBounty === bounty.id;
          const canSelect = selectedBounties.length < maxBounties || isSelected;
          const difficulty = calculateDifficultyScore(bounty);

          return (
            <div
              key={bounty.id}
              className={`bounty-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredBounty(bounty.id)}
              onMouseLeave={() => setHoveredBounty(null)}
            >
              {/* Card Visual */}
              <div className="bounty-visual">
                <div className={`bounty-icon difficulty-${Math.min(5, Math.floor(difficulty / 10))}`} />
              </div>

              {/* Card Content */}
              <div className="bounty-content">
                <div className="bounty-name">{bounty.displayName}</div>
                <div className="bounty-description">{bounty.description}</div>

                {/* Objectives */}
                <div className="bounty-objectives">
                  {bounty.objectives.map((obj, idx) => (
                    <div key={idx} className="objective">
                      📋 {obj.type}: {obj.targetCount}
                    </div>
                  ))}
                </div>

                {/* Difficulty & Reward */}
                <div className="bounty-stats">
                  <span className={`difficulty difficulty-${Math.min(5, Math.floor(difficulty / 10))}`}>
                    ⚠️ Difficulty: {difficulty}%
                  </span>
                  <span className="reward">
                    🎁 Reward: {bounty.rewardScrap}💎 + {bounty.rewardTech}⚡
                  </span>
                </div>

                {/* Cost Badge */}
                <div className={`bounty-cost ${bounty.unlockCost <= bankedScrap ? 'affordable' : 'unaffordable'}`}>
                  💎 {bounty.unlockCost}
                </div>

                {/* Select Button */}
                <button
                  className={`select-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => canSelect && toggleBounty(bounty.id)}
                  disabled={!canSelect && !isSelected}
                >
                  {isSelected ? '✓ Selected' : 'Select'}
                </button>
              </div>

              {/* Hover Tooltip */}
              {isHovered && (
                <div className="bounty-tooltip">
                  <div className="tooltip-title">{bounty.displayName}</div>
                  <div className="tooltip-effects">
                    <strong>Effects:</strong>
                    {bounty.effects.map((eff, idx) => (
                      <div key={idx} className="effect-line">
                        {eff.type}: {eff.value > 1 ? `+${(eff.value * 100 - 100).toFixed(0)}%` : `${(eff.value * 100).toFixed(0)}%`}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Panel */}
      <div className="bounty-summary">
        <div className="summary-left">
          <div className="summary-item">
            <span>Selected Bounties:</span>
            <strong>{selectedBounties.length}/{maxBounties}</strong>
          </div>
          <div className="summary-item">
            <span>Total Cost:</span>
            <strong className={totalCost <= bankedScrap ? 'affordable' : 'unaffordable'}>
              💎 {totalCost}
            </strong>
          </div>
          <div className="summary-item">
            <span>Total Rewards:</span>
            <strong>🎁 {getRewardTotal()}</strong>
          </div>
        </div>

        {/* Risk/Reward Graph */}
        <div className="risk-reward-graph">
          <div className="graph-title">Risk/Reward</div>
          <div className="graph-bar">
            <div
              className="graph-fill"
              style={{
                width: `${Math.min(100, (selectedBounties.length / maxBounties) * 100 + (getRewardTotal() / 20))}%`
              }}
            />
          </div>
          <div className="graph-labels">
            <span>Safe</span>
            <span>Risky</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bounty-actions">
        <button className="btn-confirm" onClick={handleConfirm} disabled={!canAfford || selectedBounties.length === 0}>
          🚀 Confirm Run ({selectedBounties.length} bounties)
        </button>
        <button className="btn-skip" onClick={() => onConfirm([])}>
          Skip Bounties
        </button>
      </div>
    </div>
  );
};
