export default class DatasetParser {
    static parseReuseOverTimeDataset(data) {
        let orderedData = data.sort((a, b) => a.date_unix - b.date_unix);
        let reuseOverTimeDataset = [];
        let coreTotalUsageCount = 0;
        let coreReuseCount = 0;
        let fairingReuseCount = 0;

        for (const launch of orderedData) {
            coreTotalUsageCount += launch.cores.length;

            launch.cores.forEach(core => {
                if (core.reused) {
                    coreReuseCount += 1;
                }
            });

            if (launch.fairings && launch.fairings.reused) {
                fairingReuseCount += 1;
            }

            reuseOverTimeDataset.push({
                flight_number: launch.flight_number,
                date: launch.date_unix,
                cores: launch.cores.map(core => core.core),
                core_total_usage_count: coreTotalUsageCount,
                core_reuse_count: coreReuseCount,
                core_non_reuse_count: coreTotalUsageCount - coreReuseCount,
                fairings: launch.fairings,
                fairings_total_usage_count: launch.flight_number,
                fairings_reuse_count: fairingReuseCount,
                fairings_non_reuse_count: launch.flight_number - fairingReuseCount,
                launch_details: {
                    name: launch.name,
                    failures: launch.failures,
                    details: launch.details,
                    rocket: launch.rocket,
                    media: {
                        video: launch.links.webcast,
                        article: launch.links.article,
                        wiki: launch.links.wikipedia
                    }
                }
            })
        }

        return reuseOverTimeDataset;
    }

    static parseCovidCasesDataset(data) {
        let dataWithUnixTimestamp = data.map(dp =>{
            let newData = {
                date_of_interest: new Date(dp.date_of_interest.split('T')[0]).valueOf()/1000,
                case_count: dp.case_count,
                bx_case_count: dp.bx_case_count,
                bk_case_count: dp.bk_case_count,
                mn_case_count: dp.mn_case_count,
                qn_case_count: dp.qn_case_count,
                si_case_count: dp.si_case_count
            };

            return newData;
        })

        return dataWithUnixTimestamp.sort((a, b) => a.date_of_interest - b.date_of_interest);
    }
}
