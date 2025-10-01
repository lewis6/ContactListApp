export interface Contact {
  contactID: number;
  name: string;
  phone: string;
  fax?: string;
  email?: string;
  notes?: string;
  lastUpdateDate?: string;
  lastUpdateUserName: string
}