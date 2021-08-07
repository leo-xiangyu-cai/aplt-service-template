import { model, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Mode } from '../Constants';

require('dotenv').config();

const collectionName = 'Health';

export interface Health {
  id: string;
  message: string;
}

const healthSchema = new Schema<Health>({
  id: { type: String, default: () => uuid() },
  message: { type: String, required: true },
});

export const HealthEntity = model<Health>(
  process.env.MODE as Mode === Mode.UnitTest
    ? `${collectionName}-${uuid()}-test`
    : collectionName, healthSchema,
);
