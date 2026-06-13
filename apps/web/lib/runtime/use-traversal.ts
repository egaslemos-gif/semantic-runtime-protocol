import { useState, useCallback } from 'react';
import { simulateTraversal, TraversalIntent } from './traversal-engine';
import { RuntimeEvent } from './types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type TraversalStatus = 'IDLE' | 'RUNNING' | 'BLOCKED' | 'SUCCESS';

export function useTraversalSimulator() {
    const [intent, setIntent] = useState<TraversalIntent>('refactor_session');
    const [renderedEvents, setRenderedEvents] = useState<RuntimeEvent[]>([]);
    const [status, setStatus] = useState<TraversalStatus>('IDLE');

    const executeFirewall = useCallback(async (targetIntent: TraversalIntent) => {
        setIntent(targetIntent);
        setRenderedEvents([]);
        setStatus('RUNNING');

        const eventSequence = simulateTraversal(targetIntent);

        for (const event of eventSequence) {
            await sleep(350);
            setRenderedEvents(prev => [...prev, event]);
            
            if (event.type === 'BOUNDARY_VIOLATION') {
                setStatus('BLOCKED');
            }
        }

        const lastEvent = eventSequence[eventSequence.length - 1];
        if (lastEvent.type === "TERMINATED" && lastEvent.reason === "Traversal completed successfully.") {
             setStatus('SUCCESS');
        }
    }, []);

    return {
        intent,
        renderedEvents,
        status,
        executeFirewall
    };
}
