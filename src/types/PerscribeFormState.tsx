export type PrescribeFormState = {
  selectedChild: string;
  sessionTime: string;
  wordAttempts: string;
  wordPairs: { firstWordId: number; secondWordId: number }[];
  wordView: string;
};
