
import { BatchStatus, LabBpmStatus, MedicationBatch, SanitaryAlert, Pharmacy } from './types';

export const MOCK_BATCHES: MedicationBatch[] = [
  {
    id: '1',
    batchNumber: 'ABO25001',
    medicationName: 'Edetoxin',
    laboratory: 'IndoMed Ltd',
    bpmStatus: LabBpmStatus.SANCTIONED,
    status: BatchStatus.WITHDRAWN,
    expiryDate: '2026-05-12',
    description: 'Contaminación detectada durante el proceso de fabricación en la planta de origen.',
    stellarTxId: 'GDHT...XJ3R-HASH-EDETOXIN-01',
    recommendations: [
      'No consumir este medicamento.',
      'Devolver inmediatamente al punto de compra.',
      'Reportar cualquier efecto adverso al portal de DIGEMID.'
    ]
  },
  {
    id: '2',
    batchNumber: 'B402',
    medicationName: 'Paracetamol 500mg',
    laboratory: 'Farmindustria S.A.',
    bpmStatus: LabBpmStatus.SANCTIONED, // Changed to reflect image
    status: BatchStatus.OBSERVED, // Changed to reflect image
    expiryDate: '2025-12-30',
    description: 'Incumplimiento crítico de Buenas Prácticas de Manufactura (BPM) en el área de mezclado. Riesgo de contaminación cruzada.',
    stellarTxId: 'GAXP...4K9L-HASH-PARA-402',
    recommendations: [
      'No consumas el medicamento si pertenece al lote B402.',
      'Si ya lo consumiste y presentas malestar, acude a un centro médico.',
      'Devuelve el producto restante a la farmacia para su disposición segura.'
    ]
  },
  {
    id: '3',
    batchNumber: 'SF-3825',
    medicationName: 'Suero Fisiológico',
    laboratory: 'LimaLabs',
    bpmStatus: LabBpmStatus.IN_PROCESS,
    status: BatchStatus.OBSERVED,
    expiryDate: '2025-11-20',
    description: 'Alerta N.° 38-2025: Reportes de reacciones adversas localizadas en regiones del sur.',
    stellarTxId: 'GCHQ...R9M2-HASH-SF-3825',
    recommendations: [
      'Suspensión preventiva de uso.',
      'Segregar stock en cuarentena hasta nuevo aviso de DIGEMID.'
    ]
  }
];

export const MOCK_PHARMACIES: Pharmacy[] = [
  { id: 'p1', name: 'Inkafarma - Av. Antúnez', ruc: '20512004011', district: 'Los Olivos', complianceRate: 98 },
  { id: 'p2', name: 'Botica Salud Total', ruc: '20601234567', district: 'Los Olivos', complianceRate: 85 },
  { id: 'p3', name: 'MiFarma Central', ruc: '20456789012', district: 'Miraflores', complianceRate: 92 },
  { id: 'p4', name: 'Botica FarmaSalud', ruc: '20100123456', district: 'San Isidro', complianceRate: 74 }
];

export const MOCK_ALERTS: SanitaryAlert[] = [
  {
    id: 'a1',
    alertNumber: 'DIGEMID-045-2025',
    medicationName: 'Edetoxin',
    affectedBatches: ['ABO25001'],
    date: '2025-02-10',
    urgency: 'URGENT',
    reason: 'Presencia de impurezas químicas fuera de los límites permitidos.'
  },
  {
    id: 'a2',
    alertNumber: 'ALERTA-38-2025',
    medicationName: 'Suero Fisiológico',
    affectedBatches: ['SF-3825', 'SF-3826'],
    date: '2025-02-08',
    urgency: 'MEDIUM',
    reason: 'Reporte de fiebres y náuseas tras administración.'
  }
];
