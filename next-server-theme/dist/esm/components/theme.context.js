"use client";
import{jsx as e,jsxs as t}from"react/jsx-runtime";import{createContext as n,useContext as r,useState as o,useEffect as c}from"react";import{setSystemDark as i}from"../util/script.js";var u=n(""),a=n((function(){}));function m(e,t){var n=o(!1),r=n[0],i=n[1];c((function(){if(r)return e();i(!0)}),t)}function f(n){var r=n.children,f=n.serverTheme,d=n.systemLightTheme,s=n.systemDarkTheme,h=n.attributes,l=o(f),v=l[0],E=l[1];return c((function(){if("system"===v){var e=function(e){e.matches?[h].flat().forEach((function(e){document.documentElement.setAttribute(e,s)})):[h].flat().forEach((function(e){document.documentElement.setAttribute(e,d)}))},t=window.matchMedia("(prefers-color-scheme: dark)");return t.addEventListener("change",e),"undefined"!=typeof window&&window.matchMedia("(prefers-color-scheme: dark)").matches?[h].flat().forEach((function(e){document.documentElement.setAttribute(e,s)})):[h].flat().forEach((function(e){document.documentElement.setAttribute(e,d)})),function(){return t.removeEventListener("change",e)}}[h].flat().forEach((function(e){document.documentElement.setAttribute(e,v)}))}),[v]),m((function(){"undefined"!=typeof cookieStore?cookieStore.set("theme",v):document.cookie="theme=".concat(v,";"),localStorage.setItem("theme",v)}),[v]),c((function(){function e(e){var t=e.key,n=e.newValue;"theme"===t&&E(n)}return window.addEventListener("storage",e),function(){return window.removeEventListener("storage",e)}}),[]),e(a.Provider,{value:E,children:t(u.Provider,{value:v,children:["system"===f&&e("script",{dangerouslySetInnerHTML:{__html:"(".concat(i.toString(),')("').concat(h,'", "').concat(d,'", "').concat(s,'")')}}),r]})})}function d(){return[r(u),r(a)]}function s(){return r(u)}function h(){return r(a)}export{f as ThemeProviderWithoutServerTheme,s as useGetTheme,m as useOnChange,h as useSetTheme,d as useTheme};
//# sourceMappingURL=theme.context.js.map
