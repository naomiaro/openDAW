// noinspection PlatformDetectionJS
import { isDefined, UUID } from "@opendaw/lib-std";
export var Browser;
(function (Browser) {
    const hasLocation = typeof self !== "undefined" && "location" in self && typeof self.location !== undefined;
    const hasNavigator = typeof self !== "undefined" && "navigator" in self && typeof self.navigator !== undefined;
    Browser.isLocalHost = () => hasLocation && location.host.includes("localhost");
    Browser.isMacOS = () => hasNavigator && navigator.userAgent.includes("Mac OS X");
    Browser.isWindows = () => hasNavigator && navigator.userAgent.includes("Windows");
    Browser.isChrome = () => hasNavigator && /chrome|chromium|crios/.test(navigator.userAgent.toLowerCase()) && !/edg|opera|opr/.test(navigator.userAgent.toLowerCase());
    Browser.isFirefox = () => hasNavigator && navigator.userAgent.toLowerCase().includes("firefox");
    Browser.isWeb = () => !Browser.isTauriApp();
    Browser.isVitest = typeof process !== "undefined" && process.env?.VITEST === "true";
    Browser.isTauriApp = () => "__TAURI__" in window;
    Browser.userAgent = hasNavigator ? navigator.userAgent
        .replace(/^Mozilla\/[\d.]+\s*/, "")
        .replace(/\bAppleWebKit\/[\d.]+\s*/g, "")
        .replace(/\(KHTML, like Gecko\)\s*/g, "")
        .replace(/\bSafari\/[\d.]+\s*/g, "")
        .replace(/\s+/g, " ")
        .trim() : "N/A";
    Browser.id = () => {
        if (!hasLocation) {
            return "";
        }
        const key = "__id__";
        const id = localStorage.getItem(key);
        if (isDefined(id)) {
            return id;
        }
        const newID = UUID.toString(UUID.generate());
        localStorage.setItem(key, newID);
        return newID;
    };
})(Browser || (Browser = {}));
