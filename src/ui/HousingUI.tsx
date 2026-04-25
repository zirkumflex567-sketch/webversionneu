import React, { useState } from 'react'
import { useGameStore } from '../store'
import { FURNITURE_CATALOG, HOUSING_GRID, type FurnitureItem } from '../data/HousingData'
import '../styles/HousingUI.css'

interface HousingUIProps {
  onClose?: () => void
}

export const HousingUI: React.FC<HousingUIProps> = ({ onClose }) => {
  const { meta } = useGameStore()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seating' | 'decor' | 'lighting' | 'tech' | 'storage'>('all')
  const [previewItem, setPreviewItem] = useState<FurnitureItem | null>(null)

  const scrap = meta?.totalScrap || 0
  const tech = meta?.totalTech || 0

  const filteredFurniture =
    selectedCategory === 'all'
      ? FURNITURE_CATALOG
      : FURNITURE_CATALOG.filter(f => f.category === selectedCategory)

  const canAfford = (item: FurnitureItem) => scrap >= item.scrapCost && tech >= item.techCost

  const categories = ['all', 'seating', 'decor', 'lighting', 'tech', 'storage'] as const

  return (
    <div className="housing-ui">
      <div className="housing-header">
        <h2>GARAGE CUSTOMIZATION</h2>
        <div className="housing-resources">
          <span className="resource scrap">🔩 {scrap} Scrap</span>
          <span className="resource tech">⚡ {tech} Tech</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="housing-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="housing-content">
        {/* Furniture Grid */}
        <div className="furniture-grid">
          <h3>Available Items</h3>
          <div className="items-list">
            {filteredFurniture.map(item => (
              <div
                key={item.id}
                className={`furniture-card ${!canAfford(item) ? 'unaffordable' : ''}`}
                onClick={() => setPreviewItem(item)}
              >
                <div className="item-icon">{item.icon}</div>
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-cost">
                    <span className="cost-scrap">{item.scrapCost}</span>
                    <span className="cost-tech">{item.techCost}</span>
                  </div>
                </div>
                <div className="item-dimensions">
                  {item.width}×{item.height}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Panel */}
        {previewItem && (
          <div className="preview-panel">
            <h3>PREVIEW</h3>
            <div className="preview-display">
              <div className="preview-icon">{previewItem.icon}</div>
              <div className="preview-grid">
                {Array.from({ length: HOUSING_GRID.width * HOUSING_GRID.height }).map((_, i) => {
                  const x = i % HOUSING_GRID.width
                  const y = Math.floor(i / HOUSING_GRID.width)
                  const isPreview =
                    x >= 1 &&
                    x < 1 + previewItem.width &&
                    y >= 1 &&
                    y < 1 + previewItem.height
                  return (
                    <div
                      key={i}
                      className={`grid-cell ${isPreview ? 'preview' : ''}`}
                      style={{
                        width: HOUSING_GRID.cellSize,
                        height: HOUSING_GRID.cellSize,
                        backgroundColor: isPreview
                          ? `rgba(${(previewItem.color || 0x00ffaa) >> 16}, ${((previewItem.color || 0x00ffaa) >> 8) & 255}, ${(previewItem.color || 0x00ffaa) & 255}, 0.3)`
                          : 'transparent',
                      }}
                    />
                  )
                })}
              </div>
            </div>

            <div className="preview-info">
              <div className="info-section">
                <span className="label">Name:</span>
                <span className="value">{previewItem.name}</span>
              </div>
              <div className="info-section">
                <span className="label">Description:</span>
                <span className="value">{previewItem.description}</span>
              </div>
              <div className="info-section">
                <span className="label">Size:</span>
                <span className="value">
                  {previewItem.width}×{previewItem.height} grid cells
                </span>
              </div>
              <div className="info-section">
                <span className="label">Cost:</span>
                <span className="value">
                  {previewItem.scrapCost} Scrap, {previewItem.techCost} Tech
                </span>
              </div>

              <button
                className={`place-btn ${!canAfford(previewItem) ? 'disabled' : ''}`}
                disabled={!canAfford(previewItem)}
              >
                {canAfford(previewItem) ? 'PLACE ITEM' : 'INSUFFICIENT RESOURCES'}
              </button>
            </div>
          </div>
        )}
      </div>

      {onClose && (
        <button className="close-btn" onClick={onClose}>
          CLOSE
        </button>
      )}
    </div>
  )
}
