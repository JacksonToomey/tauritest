import {
  toTypedRxJsonSchema,
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  type RxDatabase,
  type RxDocument,
  type RxJsonSchema,
} from "rxdb";

export const bookSchemaLiteral = {
  title: "books",
  description: "books",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
    },
  },
  required: ["id", "name"],
  indexes: ["name"],
} as const;

const bookSchemaTyped = toTypedRxJsonSchema(bookSchemaLiteral);

export type BookDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof bookSchemaTyped
>;

export const bookSchema: RxJsonSchema<BookDocType> = bookSchemaLiteral;

export type BookDocument = RxDocument<BookDocType>;

export type BookCollection = RxCollection<BookDocType>;

export interface DBCollections {
  books: BookCollection;
}

export type Database = RxDatabase<DBCollections>;
