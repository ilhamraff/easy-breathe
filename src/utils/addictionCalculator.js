/**
 * Calculate addiction level based on form answers.
 * Pure function - no DOM manipulation.
 *
 * @param {Object} answers - Object with question keys and their numeric values.
 * @param {string[]} scoredQuestions - Array of question keys that contribute to score.
 * @returns {Object} Result with score, addictionLevel, progressClass, percentage.
 */
export function calculateAddiction(answers, scoredQuestions) {
  let score = 0;
  scoredQuestions.forEach((question) => {
    const value = answers[question];
    if (value !== undefined && value !== null) {
      score += parseInt(value, 10);
    }
  });

  let addictionLevel = "";
  if (score <= 2) {
    addictionLevel = "Ketergantungan rendah";
  } else if (score <= 4) {
    addictionLevel = "Ketergantungan rendah sampai sedang";
  } else if (score <= 7) {
    addictionLevel = "Ketergantungan sedang";
  } else {
    addictionLevel = "Ketergantungan tinggi";
  }

  const percentage = (score / 11) * 100;

  let progressClass = "";
  if (score <= 2) {
    progressClass = "low";
  } else if (score <= 4) {
    progressClass = "medium";
  } else if (score <= 7) {
    progressClass = "medium";
  } else {
    progressClass = "high";
  }

  return {
    score,
    addictionLevel,
    progressClass,
    percentage,
  };
}

/**
 * Check if all required questions have been answered.
 * @param {Object} answers - Object with question keys and their values.
 * @param {string[]} allQuestions - Array of all question keys.
 * @returns {{ allAnswered: boolean, firstUnanswered: string|null }}
 */
export function validateAnswers(answers, allQuestions) {
  let firstUnanswered = null;

  for (const question of allQuestions) {
    if (answers[question] === undefined || answers[question] === null) {
      if (!firstUnanswered) {
        firstUnanswered = question;
      }
      return { allAnswered: false, firstUnanswered };
    }
  }

  return { allAnswered: true, firstUnanswered: null };
}
