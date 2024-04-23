import { root } from './root.js';
/**
 * In the browser this is simply the Date constructor.
 */
export const dateTime = ((root.performance && root.performance.now) ? root.performance : Date);
