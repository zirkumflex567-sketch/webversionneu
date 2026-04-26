import React, { useState } from "react"
import { useGameStore } from "../store"
import { FURNITURE_CATALOG, HOUSING_GRID, type FurnitureItem } from "../data/HousingData"
import { useT } from "../i18n/useT"
import type { TranslationKey } from "../i18n"
import "../styles/HousingUI.css"

interface HousingUIProps {
  onClose?: () => void
}

const CATEGORIES = ["all", "seating", "decor", "lighting", "tech", "storage"] as const
type HousingCategory = (typeof CATEGORIES)[number]

export const HousingUI: React.FC<HousingUIProps> = ({ onClose }) => {
  const t = useT()
  const { meta } = useGameStore()
  const [selectedCategory, setSelectedCategory] = useState<HousingCategory>("all")
  const [previewItem, setPreviewItem] = useState<FurnitureItem | null>(null)

  const scrap = meta?.totalScrap || 0
  const tech = meta?.totalTech || 0
  const filteredFurniture = selectedCategory === "all" ? FURNITURE_CATALOG : FURNITURE_CATALOG.filter((f) => f.category === selectedCategory)
  const canAfford = (item: FurnitureItem) => scrap >= item.scrapCost && tech >= item.techCost
  const categoryKey = (cat: HousingCategory) => `ui.housing.category.${cat}` as TranslationKey

  return (
    <div className="housing-ui">
      <div className="housing-header">
        <h2>{t("ui.housing.title")}</h2>
        <div className="housing-resources">
          <span>{t("ui.housing.scrap")}: {scrap}</span>
          <span>{t("ui.housing.tech")}: {tech}</span>
        </div>
      </div>

      <div className="housing-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {t(categoryKey(cat))}
          </button>
        ))}
      </div>

      <div className="housing-content">
        <section className="furniture-list">
          <h3>{t("ui.housing.available_items")}</h3>
          <div className="furniture-grid">
            {filteredFurniture.map((item) => (
              <button key={item.id} className="furniture-card" onClick={() => setPreviewItem(item)}>
                <div className="furniture-icon">{item.icon || t("ui.housing.item_icon_fallback")}</div>
                <div className="furniture-name">{t(item.nameKey)}</div>
                <div className="furniture-cost">
                  {item.scrapCost} {t("ui.housing.scrap_short")} / {item.techCost} {t("ui.housing.tech_short")}
                </div>
                <div className="furniture-size">{item.width}x{item.height}</div>
              </button>
            ))}
          </div>
        </section>

        {previewItem && (
          <section className="preview-panel">
            <h3>{t("ui.housing.preview")}</h3>
            <div className="preview-icon">{previewItem.icon || t("ui.housing.item_icon_fallback")}</div>
            <div className="garage-grid">
              {Array.from({ length: HOUSING_GRID.width * HOUSING_GRID.height }).map((_, i) => {
                const x = i % HOUSING_GRID.width
                const y = Math.floor(i / HOUSING_GRID.width)
                const isPreview = x >= 1 && x < 1 + previewItem.width && y >= 1 && y < 1 + previewItem.height
                const color = previewItem.color || 0x00ffaa
                return (
                  <div
                    key={i}
                    className="grid-cell"
                    style={{
                      backgroundColor: isPreview
                        ? `rgba(${(color >> 16) & 255}, ${(color >> 8) & 255}, ${color & 255}, 0.3)`
                        : "transparent",
                    }}
                  />
                )
              })}
            </div>

            <dl className="preview-details">
              <dt>{t("ui.housing.name")}</dt>
              <dd>{t(previewItem.nameKey)}</dd>
              <dt>{t("ui.housing.description")}</dt>
              <dd>{t(previewItem.descriptionKey)}</dd>
              <dt>{t("ui.housing.size")}</dt>
              <dd>{t("ui.housing.grid_cells", { width: previewItem.width, height: previewItem.height })}</dd>
              <dt>{t("ui.housing.cost")}</dt>
              <dd>{t("ui.housing.cost_values", { scrap: previewItem.scrapCost, tech: previewItem.techCost })}</dd>
            </dl>

            <button className="place-item-button" disabled={!canAfford(previewItem)}>
              {canAfford(previewItem) ? t("ui.housing.place_item") : t("ui.housing.insufficient_resources")}
            </button>
          </section>
        )}
      </div>

      {onClose && (
        <button className="housing-close" onClick={onClose}>
          {t("ui.common.close")}
        </button>
      )}
    </div>
  )
}
