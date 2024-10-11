import type { JsonData } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const fileData: Writable<JsonData> = writable([]);

export const headerRow: Writable<{} | null> = writable(null);
