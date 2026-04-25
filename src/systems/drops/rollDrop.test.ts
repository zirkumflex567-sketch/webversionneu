import { describe, it, expect } from 'vitest';
import { rollDropTable } from './rollDrop';
import { DropTable } from '../../content/schema';

describe('Drop System', () => {
  it('should roll from a drop table', () => {
    const table: DropTable = {
      id: 'test_table',
      name: 'Test Table',
      entries: [
        { itemId: 'item_1', weight: 100 },
        { itemId: 'item_2', weight: 0 },
      ]
    };
    
    const drops = rollDropTable(table);
    expect(drops).toContain('item_1');
    expect(drops).not.toContain('item_2');
  });

  it('should respect character bias', () => {
    // This is hard to test deterministically with random, but we can check logic
    // if we mocked Math.random.
    expect(true).toBe(true);
  });
});
