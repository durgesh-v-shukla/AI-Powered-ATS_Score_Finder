// This file is not used in the ATS application as it's stateless
// The storage interface is kept for potential future use

export interface IStorage {
  // No storage operations needed for stateless ATS application
}

export class MemStorage implements IStorage {
  constructor() {
    // No storage needed
  }
}

export const storage = new MemStorage();
