import { type ThemeConfig } from "@/index.d";

export const config: ThemeConfig<"dark" | "system" | "light" | "pink"> = {
    defaultTheme: "system",
    systemLightTheme: "pink",
    systemDarkTheme: "dark",
    debounce: 0,
    modifyTheme: theme => {
        return theme;
    }
};