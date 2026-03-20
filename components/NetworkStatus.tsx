"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);
    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  }
  return () => {};
};

const getSnapshot = () =>
  typeof navigator !== "undefined" ? navigator.onLine : true;
const getServerSnapshot = () => true;
import { Wifi, WifiOff } from "lucide-react";

export function NetworkStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [showIndicator, setShowIndicator] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    let showTimeoutId: ReturnType<typeof setTimeout>;
    let hideTimeoutId: ReturnType<typeof setTimeout>;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isOnline) {
        showTimeoutId = setTimeout(() => setShowIndicator(true), 0);
      }
      return () => clearTimeout(showTimeoutId);
    }

    if (!isOnline) {
      showTimeoutId = setTimeout(() => setShowIndicator(true), 0);
    } else {
      showTimeoutId = setTimeout(() => setShowIndicator(true), 0);
      hideTimeoutId = setTimeout(() => setShowIndicator(false), 3000);
    }

    return () => {
      clearTimeout(showTimeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, [isOnline]);

  if (!showIndicator) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md font-sans transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in ${
        isOnline
          ? "bg-emerald-600/90 text-white dark:bg-emerald-700/90"
          : "bg-destructive/90 text-white dark:bg-destructive/90"
      }`}
      role="status"
      aria-live="polite"
    >
      {isOnline ? (
        <Wifi className="w-4 h-4" strokeWidth={2} />
      ) : (
        <WifiOff className="w-4 h-4 animate-pulse" strokeWidth={2} />
      )}
      <span className="text-sm font-medium tracking-wide">
        {isOnline ? "Connection Restored" : "Library Disconnected"}
      </span>
    </div>
  );
}
