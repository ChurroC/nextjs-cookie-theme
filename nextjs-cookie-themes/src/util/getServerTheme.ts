import { cookies } from "next/headers";

import { config } from "@/util/getConfig";
import { modifyTheme } from "@/util/modifyTheme";

import type { Theme } from "@/util/getConfig";

export function getUnmodifiedServerTheme(): Theme {
    const cookie = cookies().get("theme")?.value as Theme;

    return cookie ?? config.defaultTheme;
}

export function getServerTheme(): Theme {
    const theme = getUnmodifiedServerTheme();

    return modifyTheme(theme);
}