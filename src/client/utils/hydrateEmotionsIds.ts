import { hydrate } from 'emotion';

const emotionIds = [...window.__EMOTION_CRITICAL_IDS__];
hydrate(emotionIds);
document.getElementById('emotionCritical').remove();
