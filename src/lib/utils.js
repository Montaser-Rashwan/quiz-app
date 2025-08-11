// lib/utils.js
export const saveScores = (scores) => {
  const topScores = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  localStorage.setItem('scores', JSON.stringify(topScores));
};

export const getScores = () => {
  return JSON.parse(localStorage.getItem('scores')) || [];
};

export const saveRecentScore = (score) => {
  localStorage.setItem('mostRecentScore', score);
};

export const getRecentScore = () => {
  return localStorage.getItem('mostRecentScore');
};