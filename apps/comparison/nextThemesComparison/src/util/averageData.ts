import fs from "fs/promises";

(async () => {
    try {
        const analytics: Record<string, number> = {};

        const files = await fs.readdir(
            "/home/charan/dev/js/next-server-theme/apps/comparison/nextServerThemeComparison/analyticsData"
        );
        if (files.length === 0) {
            throw Error("No files found in folder. Cannot average data.");
        }

        for (const file of files) {
            const data = JSON.parse(
                await fs.readFile(
                    `/home/charan/dev/js/next-server-theme/apps/comparison/nextServerThemeComparison/analyticsData/${file}`,
                    "utf8"
                )
            );

            Object.entries(data).forEach(([key, value]) => {
                console.log(key, value);
                console.log(file);
                console.log(value?.value);
                console.log(value.value);
                console.log((value as { value: number }).value);
                analytics[key] =
                    (analytics[key] ?? 0) + (value as { value: number })?.value;
            });
        }

        Object.keys(analytics).forEach(key => {
            analytics[key]! /= files.length;
        });

        await fs.writeFile(
            `/home/charan/dev/js/next-server-theme/apps/comparison/nextServerThemeComparison/analyticsData/analytics-avg.json`,
            JSON.stringify(analytics),
            "utf8"
        );
    } catch (e) {
        console.error(e);
    }
})();