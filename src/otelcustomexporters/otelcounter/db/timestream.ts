import { TimestreamWriteClient } from "@aws-sdk/client-timestream-write";
import {MetricsAggregate} from "../src/controllers/metrics";
const writeClient = new TimestreamWriteClient({ maxAttempts: 10, });

// https://github.com/awslabs/amazon-timestream-tools/blob/mainline/sample_apps/js/crud-and-simple-ingestion-example.js
export const writeMetrics = async (metrics: MetricsAggregate[]) => {

}