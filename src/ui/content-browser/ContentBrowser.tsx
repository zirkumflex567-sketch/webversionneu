"use client"

import React, { useState } from 'react';
import * as Content from '../../content';
import './ContentBrowser.css';

const TABS = [
  'Characters', 'Skills', 'Loot', 'Bosses', 'Combos'
] as const;

type Tab = typeof TABS[number];

export default function ContentBrowser() {
  const [activeTab, setActiveTab] = useState<Tab>('Characters');
  const [search, setSearch] = useState('');

  const characterEntries = Object.values(
    Content.CHARACTERS as Record<
      string,
      {
        id: string;
        displayName: string;
        title: string;
        description: string;
        baseStats: Record<string, unknown>;
      }
    >
  );
  const skillEntries = Content.SKILLS as Array<{
    id: string;
    name: string;
    type: string;
    description: string;
    characterId: string;
    cooldownMs: number;
  }>;
  const lootEntries = Content.LOOT_ITEMS as Array<{
    id: string;
    name: string;
    tier: string;
    description?: string;
  }>;
  const bossEntries = Content.BOSSES as Array<{
    id: string;
    name: string;
    title: string;
    region: string;
    phases: Array<{ id: string; name: string }>;
  }>;
  const comboEntries = Content.MULTIPLAYER_COMBOS as Array<{
    id: string;
    name: string;
    type: string;
    trigger: string;
    effect: string;
  }>;

  const renderContent = () => {
    switch (activeTab) {
      case 'Characters':
        return characterEntries
          .filter(c => c.displayName.toLowerCase().includes(search.toLowerCase()))
          .map(c => (
            <div key={c.id} className="content-card">
              <h3>{c.displayName}</h3>
              <p className="title">{c.title}</p>
              <p>{c.description}</p>
              <div className="stats">
                {Object.entries(c.baseStats).map(([k, v]) => (
                  <span key={k}>{k}: {String(v)}</span>
                ))}
              </div>
            </div>
          ));
      case 'Skills':
        return skillEntries
          .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
          .map(s => (
            <div key={s.id} className="content-card">
              <h3>{s.name}</h3>
              <p className="badge">{s.type}</p>
              <p>{s.description}</p>
              <p className="meta">Character: {s.characterId} | CD: {s.cooldownMs}ms</p>
            </div>
          ));
      case 'Loot':
        return lootEntries
          .filter(l => l.name.toLowerCase().includes(search.toLowerCase()))
          .map(l => (
            <div key={l.id} className="content-card">
              <h3>{l.name}</h3>
              <p className={`rarity ${l.tier}`}>{l.tier}</p>
              <p>{l.description}</p>
            </div>
          ));
      case 'Bosses':
        return bossEntries
          .filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
          .map(b => (
            <div key={b.id} className="content-card">
              <h3>{b.name}</h3>
              <p className="title">{b.title}</p>
              <p>Region: {b.region}</p>
              <div className="phases">
                {b.phases.map(p => <span key={p.id}>{p.name}</span>)}
              </div>
            </div>
          ));
      case 'Combos':
        return comboEntries
          .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
          .map(c => (
            <div key={c.id} className="content-card">
              <h3>{c.name}</h3>
              <p className="badge">{c.type}</p>
              <p><strong>Trigger:</strong> {c.trigger}</p>
              <p><strong>Effekt:</strong> {c.effect}</p>
            </div>
          ));
    }
  };

  return (
    <div className="content-browser">
      <div className="browser-header">
        <h2>Content Browser</h2>
        <input 
          type="text" 
          placeholder="Search..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="browser-tabs">
        {TABS.map(tab => (
          <button 
            key={tab} 
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="browser-grid">
        {renderContent()}
      </div>
    </div>
  );
}
