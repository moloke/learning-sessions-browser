import { SESSIONS_DATA } from './mockData';

const cleanData = SESSIONS_DATA.map(session => ({
  ...session,
  mins: parseInt(session.mins, 10), 
  difficulty: session.difficulty || "N/A" 
}));

/**
 * Simulates fetching sessions data with network delay and error handling
 * @param {boolean} shouldFail - If true, simulates a fetch error
 * @returns {Promise} Resolves with session data or rejects with error
 */
export const fetchSessions = (shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch sessions. Please try again."));
      } else {
        resolve(cleanData);
      }
    }, 500);
  });
};