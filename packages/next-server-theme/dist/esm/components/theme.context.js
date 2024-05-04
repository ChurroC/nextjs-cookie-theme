"use client";
import{jsx as e,jsxs as t}from"react/jsx-runtime";import{createContext as r,useContext as n,useState as o,useEffect as c}from"react";import{setSystemDark as i}from"../util/script.js";const m=r(""),s=r((()=>{}));function u(e,t){const[r,n]=o(!1);c((()=>{if(r)return e();n(!0)}),t)}function a({children:r,serverTheme:n,systemLightTheme:a,systemDarkTheme:d,attributes:f}){const[h,l]=o(n);return c((()=>{if("system"===h){const e=({matches:e})=>{e?[f].flat().forEach((e=>{document.documentElement.setAttribute(e,d)})):[f].flat().forEach((e=>{document.documentElement.setAttribute(e,a)}))},t=window.matchMedia("(prefers-color-scheme: dark)");return t.addEventListener("change",e),"undefined"!=typeof window&&window.matchMedia("(prefers-color-scheme: dark)").matches?[f].flat().forEach((e=>{document.documentElement.setAttribute(e,d)})):[f].flat().forEach((e=>{document.documentElement.setAttribute(e,a)})),()=>t.removeEventListener("change",e)}[f].flat().forEach((e=>{document.documentElement.setAttribute(e,h)}))}),[h]),u((()=>{"undefined"!=typeof cookieStore?cookieStore.set("theme",h):document.cookie=`theme=${h};`,localStorage.setItem("theme",h)}),[h]),c((()=>{function e({key:e,newValue:t}){"theme"===e&&l(t)}return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)}),[]),e(s.Provider,{value:l,children:t(m.Provider,{value:h,children:["system"===n&&e("script",{dangerouslySetInnerHTML:{__html:`(${i.toString()})("[${f}]", "${a}", "${d}")`}}),r]})})}function d(){return[n(m),n(s)]}function f(){return n(m)}function h(){return n(s)}export{a as ThemeProviderWithoutServerTheme,f as useGetTheme,u as useOnChange,h as useSetTheme,d as useTheme};
//# sourceMappingURL=theme.context.js.map
