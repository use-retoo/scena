import { createContext } from 'svelte';

import type { ScenaContext } from '../types';

/**
 * Svelte context pair for sharing {@link ScenaContext} across the component tree.
 *
 * - `getScenaContext` — retrieve the context in a child component.
 * - `setScenaContext` — provide the context in a parent component.
 */
export const [getScenaContext, setScenaContext] = createContext<ScenaContext>();
