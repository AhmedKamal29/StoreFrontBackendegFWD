import { query } from 'express';

const CreateNewQuerey = (
  queryMode: string,
  col: string,
  tabel: string,
  join: boolean = false,
  joinType: String,
  where: boolean = false,
  condition: string,
  on: boolean = false
): string => {
  if (queryMode === 'select') {
    if (where == true) {
      return `SELECT ${col} FROM ${tabel} WHERE ${condition}`;
    }
    return `SELECT ${col} FROM ${tabel}`;
  }
  return `SELECT`;
};

export default CreateNewQuerey;
