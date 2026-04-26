"use client"

import { useMemo, useState } from "react"
import * as Content from "../../content"
import { useT } from "../../i18n/useT"
import "./ContentBrowser.css"

type BrowserTab = "characters" | "skills" | "loot" | "bosses" | "combos"

const TABS: BrowserTab[] = ["characters", "skills", "loot", "bosses", "combos"]

interface CharacterEntry {
  id: string
  displayName: string
  title: string
  description: string
  baseStats: Record<string, unknown>
}

interface SkillEntry {
  id: string
  name: string
  type: string
  description: string
  characterId: string
  cooldownMs: number
}

interface LootEntry {
  id: string
  name: string
  tier: string
  description?: string
}

interface BossEntry {
  id: string
  name: string
  title: string
  region: string
  phases: Array<{ id: string; name: string }>
}

interface ComboEntry {
  id: string
  name: string
  type: string
  trigger: string
  effect: string
}

export default function ContentBrowser() {
  const t = useT()
  const [activeTab, setActiveTab] = useState<BrowserTab>("characters")
  const [search, setSearch] = useState("")

  const characterEntries = useMemo(
    () => Object.values(Content.CHARACTERS as Record<string, CharacterEntry>),
    [],
  )
  const skillEntries = Content.SKILLS as SkillEntry[]
  const lootEntries = Content.LOOT_ITEMS as unknown as LootEntry[]
  const bossEntries = Content.BOSSES as BossEntry[]
  const comboEntries = Content.MULTIPLAYER_COMBOS as ComboEntry[]

  const query = search.toLowerCase().trim()
  const matches = (value: string) => value.toLowerCase().includes(query)

  const renderContent = () => {
    switch (activeTab) {
      case "characters":
        return characterEntries
          .filter((c) => matches(c.displayName))
          .map((c) => (
            <article key={c.id} className="content-card">
              <h3>{c.displayName}</h3>
              <p className="content-card-subtitle">{c.title}</p>
              <p>{c.description}</p>
              <dl>
                {Object.entries(c.baseStats).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))
      case "skills":
        return skillEntries
          .filter((s) => matches(s.name))
          .map((s) => (
            <article key={s.id} className="content-card">
              <h3>{s.name}</h3>
              <p className="content-card-subtitle">{s.type}</p>
              <p>{s.description}</p>
              <p>{t("ui.content_browser.skill_meta", { character: s.characterId, cooldown: s.cooldownMs })}</p>
            </article>
          ))
      case "loot":
        return lootEntries
          .filter((l) => matches(l.name))
          .map((l) => (
            <article key={l.id} className="content-card">
              <h3>{l.name}</h3>
              <p className="content-card-subtitle">{l.tier}</p>
              {l.description && <p>{l.description}</p>}
            </article>
          ))
      case "bosses":
        return bossEntries
          .filter((b) => matches(b.name))
          .map((b) => (
            <article key={b.id} className="content-card">
              <h3>{b.name}</h3>
              <p className="content-card-subtitle">{b.title}</p>
              <p>{t("ui.content_browser.region")}: {b.region}</p>
              <ul>
                {b.phases.map((p) => <li key={p.id}>{p.name}</li>)}
              </ul>
            </article>
          ))
      case "combos":
        return comboEntries
          .filter((c) => matches(c.name))
          .map((c) => (
            <article key={c.id} className="content-card">
              <h3>{c.name}</h3>
              <p className="content-card-subtitle">{c.type}</p>
              <p>{t("ui.content_browser.trigger")}: {c.trigger}</p>
              <p>{t("ui.content_browser.effect")}: {c.effect}</p>
            </article>
          ))
    }
  }

  return (
    <section className="content-browser">
      <header className="content-browser-header">
        <h2>{t("ui.content_browser.title")}</h2>
        <input
          type="search"
          placeholder={t("ui.content_browser.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <nav className="content-browser-tabs" aria-label={t("ui.content_browser.tabs_label")}>
        {TABS.map((tab) => (
          <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
            {t(`ui.content_browser.tab.${tab}` as never)}
          </button>
        ))}
      </nav>

      <div className="content-browser-results">{renderContent()}</div>
    </section>
  )
}
