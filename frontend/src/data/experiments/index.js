// Aggregated Source of Truth for all 16 AI Lab Experiments
import { experiment01 } from './experiment01.js';
import { experiment02 } from './experiment02.js';
import { experiment03 } from './experiment03.js';
import { experiment04 } from './experiment04.js';
import { experiment05 } from './experiment05.js';
import { experiment06 } from './experiment06.js';
import { experiment07 } from './experiment07.js';
import { experiment08 } from './experiment08.js';
import { experiment09 } from './experiment09.js';
import { experiment10 } from './experiment10.js';
import { experiment11 } from './experiment11.js';
import { experiment12 } from './experiment12.js';
import { experiment13 } from './experiment13.js';
import { experiment14 } from './experiment14.js';
import { experiment15 } from './experiment15.js';
import { experiment16 } from './experiment16.js';

export const experiments = [
  experiment01,
  experiment02,
  experiment03,
  experiment04,
  experiment05,
  experiment06,
  experiment07,
  experiment08,
  experiment09,
  experiment10,
  experiment11,
  experiment12,
  experiment13,
  experiment14,
  experiment15,
  experiment16,
];

export const getExperimentById = (id) => experiments.find((e) => e.id === id || e.number === id);
