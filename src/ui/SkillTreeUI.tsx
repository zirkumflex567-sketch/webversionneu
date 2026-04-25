import React, { useState } from 'react';
import { CharacterId } from '../save/SaveSchema';
import { CHARACTERS } from '../data/CharacterData';
import { useGameStore } from '../store';
import '../styles/SkillTreeUI.css';

interface SkillNodeProgress {
  id: string;
  ranks: number; // 0 = locked, 1+ = unlocked with ranks
  isNewlyUnlocked?: boolean;
}

export const SkillTreeUI: React.FC<{ characterId: CharacterId }> = ({ characterId }) => {
  const character = CHARACTERS[characterId];
  const gameState = useGameStore();
  const [unlockedNodes, setUnlockedNodes] = useState<Record<string, SkillNodeProgress>>({});
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number>(0);

  if (!character) return null;

  const bankedTech = gameState.meta.totalTech || 0;
  const currentBranch = character.branches[selectedBranch];

  // Simulate tech cost availability - in real game this would check unlock order
  const canUnlockNode = (techCost: number) => bankedTech >= techCost;

  const handleUnlockNode = (nodeId: string, techCost: number) => {
    if (!canUnlockNode(techCost)) {
      playSound('error');
      return;
    }

    // Deduct tech (would update store)
    // gameState.spendTech(techCost);

    // Mark as unlocked with animation
    setUnlockedNodes({
      ...unlockedNodes,
      [nodeId]: { id: nodeId, ranks: 1, isNewlyUnlocked: true }
    });

    playSound('unlock');

    // Remove newly-unlocked flag after animation
    setTimeout(() => {
      setUnlockedNodes(prev => ({
        ...prev,
        [nodeId]: { ...prev[nodeId], isNewlyUnlocked: false }
      }));
    }, 1000);
  };

  const playSound = (type: 'unlock' | 'error') => {
    // Audio integration will be added in Phase 2 Priority 5
    if (gameState.audioEnabled) {
      console.log(`[AUDIO] ${type} sound`);
    }
  };

  return (
    <div className="skill-tree-ui">
      <div className="skill-tree-header">
        <h2>{character.displayName} — Tech-Lab</h2>
        <div className="skill-tree-resources">
          <span className="tech-available">
            ⚡ Tech: <strong>{bankedTech}</strong>
          </span>
        </div>
      </div>

      {/* Branch Selection Tabs */}
      <div className="skill-tree-tabs">
        {character.branches.map((branch, idx) => (
          <button
            key={branch.id}
            className={`skill-tree-tab ${idx === selectedBranch ? 'active' : ''}`}
            onClick={() => setSelectedBranch(idx)}
          >
            <div className="tab-name">{branch.name}</div>
            <div className="tab-theme">{branch.theme}</div>
          </button>
        ))}
      </div>

      {/* Skill Tree Grid */}
      <div className="skill-tree-grid">
        {currentBranch.nodes.map((node) => {
          const isUnlocked = unlockedNodes[node.id]?.ranks > 0;
          const isNewlyUnlocked = unlockedNodes[node.id]?.isNewlyUnlocked;
          const canAfford = canUnlockNode(node.techCost);
          const isHovered = hoveredNode === node.id;
          const isCapstoneTier = node.tier === 4;

          return (
            <div
              key={node.id}
              className={`skill-node tier-${node.tier} ${isUnlocked ? 'unlocked' : 'locked'} ${isNewlyUnlocked ? 'newly-unlocked' : ''} ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Node Visual */}
              <div className="node-visual">
                {isCapstoneTier && <div className="capstone-star">★</div>}
                <div className="node-icon" />
              </div>

              {/* Node Name */}
              <div className="node-name">{node.name}</div>

              {/* Tech Cost Badge */}
              {!isUnlocked && (
                <div className={`node-cost ${canAfford ? 'affordable' : 'unaffordable'}`}>
                  ⚡ {node.techCost}
                </div>
              )}

              {/* Unlock Button */}
              {!isUnlocked && (
                <button
                  className="unlock-button"
                  onClick={() => handleUnlockNode(node.id, node.techCost)}
                  disabled={!canAfford}
                >
                  Unlock
                </button>
              )}

              {/* Unlock Indicator */}
              {isUnlocked && (
                <div className="unlock-indicator">
                  <span className="unlock-check">✓</span>
                  {node.maxRanks > 1 && <span className="unlock-ranks">{unlockedNodes[node.id]?.ranks || 1}/{node.maxRanks}</span>}
                </div>
              )}

              {/* Hover Tooltip */}
              {isHovered && (
                <div className="skill-tooltip">
                  <div className="tooltip-name">{node.name}</div>
                  <div className="tooltip-description">{node.description}</div>
                  <div className="tooltip-meta">
                    <span>Tier {node.tier} • Max Ranks: {node.maxRanks}</span>
                    {!isUnlocked && <span className="tooltip-cost">Tech Cost: {node.techCost}</span>}
                    <span className="tooltip-effect">
                      {node.isPercent ? '+' : ''}{node.valuePerRank}
                      {node.isPercent ? '%' : ''} {node.statKey}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Footer */}
      <div className="skill-tree-footer">
        <p>💡 Unlock skills with banked ⚡ Tech from previous runs. Each unlock is permanent.</p>
      </div>
    </div>
  );
};
