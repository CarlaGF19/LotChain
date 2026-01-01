
export enum BatchStatus {
  SAFE = 'SAFE',
  OBSERVED = 'OBSERVED',
  WITHDRAWN = 'WITHDRAWN'
}

export enum LabBpmStatus {
  VALID = 'VALID',
  IN_PROCESS = 'IN_PROCESS',
  SANCTIONED = 'SANCTIONED'
}

export interface MedicationBatch {
  id: string;
  batchNumber: string;
  medicationName: string;
  laboratory: string;
  bpmStatus: LabBpmStatus;
  status: BatchStatus;
  expiryDate: string;
  description: string;
  stellarTxId: string;
  recommendations: string[];
}

export interface SanitaryAlert {
  id: string;
  alertNumber: string;
  medicationName: string;
  affectedBatches: string[];
  date: string;
  urgency: 'URGENT' | 'MEDIUM' | 'LOW';
  reason: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  ruc: string;
  district: string;
  complianceRate: number;
}
