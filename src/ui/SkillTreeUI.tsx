import React, { useState } from "react"
import { CharacterId } from "../save/SaveSchema"
import { CHARACTERS } from "../data/CharacterData"
import { useGameStore } from "../store"
import { useT } from "../i18n/useT"
import "../styles/SkillTreeUI.css"

interface SkillNodeProgress {
  id: string
  ranks: number
  isNewlyUnlocked?: boolean
}

export const SkillTreeUI: React.FC<{ characterId: CharacterId }> = ({ characterId }) => {
  const t = useT()
  const character = CHARACTERS[characterId]
  const gameState = useGameStore()
  const [unlockedNodes, setUnlockedNodes] = useState<Record<string, SkillNodeProgress>>({})
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedBranch, setSelectedBranch] = useState(0)

  if (!character) return null

  const bankedTech = gameState.meta.totalTech || 0
  const currentBranch = character.branches[selectedBranch]
  const canUnlockNode = (techCost: number) => bankedTech >= techCost

  const handleUnlockNode = (nodeId: string, techCost: number) => {
    if (!canUnlockNode(techCost)) {
      playSound("error")
      return
    }

    setUnlockedNodes((prev) => ({
      ...prev,
      [nodeId]: { id: nodeId, ranks: 1, isNewlyUnlocked: true },
    }))
    playSound("unlock")

    setTimeout(() => {
      setUnlockedNodes((prev) => ({
        ...prev,
        [nodeId]: { ...(prev[nodeId] ?? { id: nodeId, ranks: 1 }), isNewlyUnlocked: false },
      }))
    }, 1000)
  }

  const playSound = (type: "unlock" | "error") => {
    if (gameState.audioEnabled) {
      console.log(`[AUDIO] ${type} sound`)
    }
  }

  return (
    <section className="skill-tree-ui">
      <header className="skill-tree-header">
        <h2>{t("ui.skill_tree.title", { character: character.displayName })}</h2>
        <div className="tech-balance">{t("ui.skill_tree.tech_balance", { tech: bankedTech })}</div>
      </header>

      <nav className="branch-tabs" aria-label={t("ui.skill_tree.branch_tabs")}> 
        {character.branches.map((branch, idx) => (
          <button
            key={branch.id}
            className={selectedBranch === idx ? "active" : ""}
            onClick={() => setSelectedBranch(idx)}
          >
            <span>{branch.name}</span>
            <small>{branch.theme}</small>
          </button>
        ))}
      </nav>

      <div className="skill-tree-grid">
        {currentBranch.nodes.map((node) => {
          const progress = unlockedNodes[node.id]
          const isUnlocked = (progress?.ranks ?? 0) > 0
          const isNewlyUnlocked = Boolean(progress?.isNewlyUnlocked)
          const canAfford = canUnlockNode(node.techCost)
          const isHovered = hoveredNode === node.id
          const isCapstoneTier = node.tier === 4

          return (
            <div
              key={node.id}
              className={`skill-node tier-${node.tier} ${isUnlocked ? "unlocked" : "locked"} ${isNewlyUnlocked ? "newly-unlocked" : ""}`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="node-visual">
                {isCapstoneTier && <span aria-label={t("ui.skill_tree.capstone")}>*</span>}
              </div>

              <div className="node-name">{node.name}</div>

              {!isUnlocked && <div className="tech-cost">{t("ui.skill_tree.tech_cost_short", { cost: node.techCost })}</div>}

              {!isUnlocked && (
                <button onClick={() => handleUnlockNode(node.id, node.techCost)} disabled={!canAfford}>
                  {t("ui.skill_tree.unlock")}
                </button>
              )}

              {isUnlocked && (
                <div className="unlock-indicator">
                  {t("ui.skill_tree.unlocked")}
                  {node.maxRanks > 1 && ` ${progress?.ranks || 1}/${node.maxRanks}`}
                </div>
              )}

              {isHovered && (
                <aside className="node-tooltip">
                  <h4>{node.name}</h4>
                  <p>{node.description}</p>
                  <p>{t("ui.skill_tree.node_meta", { tier: node.tier, maxRanks: node.maxRanks })}</p>
                  {!isUnlocked && <p>{t("ui.skill_tree.tech_cost", { cost: node.techCost })}</p>}
                  <p>{t("ui.skill_tree.stat_delta", { sign: node.isPercent ? "+" : "", value: node.valuePerRank, suffix: node.isPercent ? "%" : "", stat: node.statKey })}</p>
                </aside>
              )}
            </div>
          )
        })}
      </div>

      <footer className="skill-tree-footer">
        {t("ui.skill_tree.footer")}
      </footer>
    </section>
  )
}
