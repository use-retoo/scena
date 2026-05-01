import { createContext } from 'svelte';

import type { ScenaVideoContext } from '../types';

export const [getScenaVideoContext, setScenaVideoContext] = createContext<ScenaVideoContext>();
