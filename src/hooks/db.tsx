import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { bookSchema, type DBCollections, type Database } from "../db/schemas";

const DBContext = createContext<Database | undefined>(undefined);

export const useDB = () => {
  const db = useContext(DBContext);
  return db as Database;
};

const initializeDB = async () => {
  const db = await createRxDatabase<DBCollections>({
    name: "appDb",
    storage: getRxStorageDexie(),
    eventReduce: true,
    multiInstance: false,
  });
  await db.addCollections({
    books: {
      schema: bookSchema,
    },
  });
  return db;
};

export const DBProvider = ({ children }: { children: ReactNode }) => {
  const [db, setDb] = useState<Database | undefined>(undefined);
  useEffect(() => {
    initializeDB()
      .then((database) => {
        setDb(database);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (db === undefined) return null;
  return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
};
