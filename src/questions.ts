interface Question {
  id: number;
  text: string;
  reversed?: boolean;
}

// MCF-9 questions
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Learning a practical vocation is more beneficial to society than theoretical studies.',
  },
  { id: 2, text: 'I trust science.', reversed: true },
  { id: 3, text: 'Children should be shaped by a firm hand.' },
  {
    id: 4,
    text: 'When push comes to shove, those who are prepared will survive.',
  },
  {
    id: 5,
    text: 'We need to prepare for a wave of break-ins, robberies and other crimes in the future.',
  },
  {
    id: 6,
    text: 'The discussions about sexual assault have led to a situation where even friendly gestures and complements are hyped up as "sexual assault".',
  },
  {
    id: 7,
    text: 'Social support does more than harsh prison sentences.',
    reversed: true,
  },
  {
    id: 8,
    text: 'The democratic politicians of today are better than the dictators of the past.',
    reversed: true,
  },
  {
    id: 9,
    text: 'The conservative values and norms are still the best way to live.',
  },
];

// Function to get results message based on total score
export function getResultsMessage(score: number) {
  const threshold1 = 22;
  const threshold2 = 31;

  if (score <= threshold1) {
    return {
      category: 'Low',
      message:
        'You likely prioritize individual autonomy, nuance, and skepticism towards traditional authority.',
    };
  } else if (score <= threshold2) {
    return {
      category: 'Moderate',
      message:
        'You value a balance between social order and personal freedom, though you might lean towards "safety" when things feel chaotic.',
    };
  } else {
    return {
      category: 'High',
      message:
        'This indicates a high "Authoritarian Personality" profile. You likely have a strong preference for clear hierarchies, traditional moral codes, and decisive leadership to maintain social stability.',
    };
  }
}
