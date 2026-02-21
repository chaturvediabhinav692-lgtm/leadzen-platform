import { InterestLevel } from './mockData';

/**
 * Auto Lead Scoring Logic:
 * < 10 min -> HOT
 * 10–60 min -> WARM
 * > 60 min -> COLD
 */
export function getDynamicScore(lastActivityAt: number): InterestLevel {
    const now = Date.now();
    const diffInMins = (now - lastActivityAt) / (1000 * 60);

    if (diffInMins < 10) return 'HOT';
    if (diffInMins < 60) return 'WARM';
    return 'COLD';
}

export function getStatusFromScore(score: InterestLevel): string {
    return score.toLowerCase();
}
