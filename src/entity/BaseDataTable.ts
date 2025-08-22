export interface BaseDataTable {
  isEdited?: boolean | false;
  isNewRow?: boolean | false;
  isDeleted?: boolean | false;
  rowUUID?: string;
  createdAt: Date;
}
