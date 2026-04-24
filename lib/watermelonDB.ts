// database/index.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { appSchema, tableSchema } from '@nozbe/watermelondb';
import Item from './models/Item';

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'items',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ],
    }),
  ],
});

export const database = new Database({
  adapter: new SQLiteAdapter({ schema }),
  modelClasses: [Item],
});