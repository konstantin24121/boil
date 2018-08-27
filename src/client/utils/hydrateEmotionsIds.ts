import { hydrate } from 'emotion';

const emotionIds = [...window.__EMOTION_CRITICAL_IDS__];
window.__EMOTION_CRITICAL_IDS__ = undefined;
hydrate(emotionIds);
document.getElementById('emotionCritical').remove();
