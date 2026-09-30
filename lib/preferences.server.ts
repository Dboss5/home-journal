import "server-only";
import { cookies } from "next/headers";
import {
  DEFAULT_PREFERENCES,
  PREFERENCES_COOKIE,
  type Preferences,
} from "./preferences";

export async function getServerPreferences(): Promise<Preferences> {
  const store = await cookies();
  const raw = store.get(PREFERENCES_COOKIE)?.value;
  if (!raw) return DEFAULT_PREFERENCES;
  try {
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(decodeURIComponent(raw)) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}