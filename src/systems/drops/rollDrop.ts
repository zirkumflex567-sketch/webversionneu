import { DropTable, DropTableEntry, CharacterId } from "../../content/schema";

export interface DropContext {
  characterId?: CharacterId;
  playerLevel?: number;
  pityCount?: Record<string, number>;
}

export function rollDropTable(table: DropTable, context: DropContext = {}): string[] {
  const drops: string[] = [];
  
  // Basic implementation of weighted rolling
  for (const entry of table.entries) {
    let weight = entry.weight;
    
    // Character Bias
    if (context.characterId && entry.characterBias?.includes(context.characterId)) {
      weight *= 1.5;
    }
    
    // Level restriction
    if (entry.minLevel && (context.playerLevel ?? 0) < entry.minLevel) continue;
    if (entry.maxLevel && (context.playerLevel ?? 0) > entry.maxLevel) continue;
    
    // Rolling
    if (Math.random() * 100 < weight) {
      drops.push(entry.itemId);
    }
  }
  
  return drops;
}

export function rollWeightedItem(entries: DropTableEntry[]): string {
  const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0);
  let r = Math.random() * totalWeight;
  
  for (const entry of entries) {
    r -= entry.weight;
    if (r <= 0) return entry.itemId;
  }
  
  return entries[0].itemId;
}
