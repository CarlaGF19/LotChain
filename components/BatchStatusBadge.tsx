
import React from 'react';
import { BatchStatus } from '../types';

interface Props {
  status: BatchStatus;
}

const BatchStatusBadge: React.FC<Props> = ({ status }) => {
  const configs = {
    [BatchStatus.SAFE]: { label: 'SEGURO', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    [BatchStatus.OBSERVED]: { label: 'OBSERVADO', className: 'bg-amber-100 text-amber-800 border-amber-200' },
    [BatchStatus.WITHDRAWN]: { label: 'RETIRADO', className: 'bg-rose-100 text-rose-800 border-rose-200' },
  };

  const { label, className } = configs[status];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${className}`}>
      {label}
    </span>
  );
};

export default BatchStatusBadge;
