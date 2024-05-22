import { TimestreamWriteClient,_Record, WriteRecordsCommand} from "@aws-sdk/client-timestream-write";
import {MetricsAggregate} from "../src/controllers/metrics";

console.log("AWS Region: ", process.env.AWS_REGION);

const writeClient = new TimestreamWriteClient ({ region: process.env.AWS_REGION || "ap-southeast-2"  });
const DatabaseName = process.env.OTEL_TS_DB;
const TableName = process.env.OTEL_TS_TABLE;

export const printRejectedRecordsException = (err: any) => {
    console.log("Error writing records: RejectedRecordsException: One or more records have been rejected. See RejectedRecords for details.");
    err.RejectedRecords.forEach((rr: any) => {
        console.log(`Rejected Index ${rr.RecordIndex}: ${rr.Reason}`);
        if (rr.ExistingVersion) {
            console.log(`Rejected record existing version: ${rr.ExistingVersion}`);
        }
    })
}

export const writeMetrics = async (metrics: MetricsAggregate[]): Promise<boolean> => {
    const currentTime = Date.now().toString(); // Unix time in milliseconds
    const records: _Record[] = [];

    metrics.forEach(metric => {
        records.push({
            Dimensions: [{
                Name: metric.dimensionName,
                Value: metric.dimensionValue
            }],
            MeasureName: 'metric_count',
            MeasureValue: metric.metricsCount.toString(),
            MeasureValueType: 'BIGINT',
            Time: currentTime.toString(),
        });
    });

    const params = new WriteRecordsCommand({
        DatabaseName,
        TableName,
        Records: records,
    });

    try {
        const data = await writeClient.send(params);
        console.log("Inserted records successfully!!!", data.RecordsIngested);

        return true;
    } catch (err: any) {
        if (err.name === 'RejectedRecordsException') {
            printRejectedRecordsException(err);
        } else {
            console.error("Error writing records:", err);
        }

        return false;
    }
}