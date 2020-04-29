import {
  EditorPhase,
  EditorStep,
  Difficultys,
  Step,
  Phase,
} from '../editor/editor.types';

const formatEditorStep = (step: EditorStep): Step => ({
  duration: step.duration,
  key: step.key,
  name: step.name,
});

const sortByPosition = (
  a: EditorStep | EditorPhase | Phase,
  b: EditorStep | EditorPhase | Phase,
): number => a.position - b.position;

const formatStepsFromPhase = (
  steps: EditorStep[],
  phaseKey: string,
): Step[] => {
  return steps
    .filter((step): boolean => step.phase === phaseKey)
    .sort(sortByPosition)
    .map(formatEditorStep);
};

const formatPhase = (phase: EditorPhase, steps: EditorStep[]): Phase => {
  return {
    name: 'phase',
    repetitions: phase.repetitions,
    position: phase.position,
    steps: formatStepsFromPhase(steps, phase.key),
  };
};

const formatStepToPhase = (step: EditorStep): Phase => ({
  name: 'phase',
  repetitions: 1,
  position: step.position,
  steps: [formatEditorStep(step)],
});

const formatSoloStepToPhase = (steps: EditorStep[]): Phase[] => {
  return steps
    .filter((step): boolean => step.phase === undefined)
    .map(formatStepToPhase);
};

export const formatEditorPhases = (
  phases: EditorPhase[],
  steps: EditorStep[],
): Phase[] => {
  const formatedPhases = phases
    .sort(sortByPosition)
    .map((phase): Phase => formatPhase(phase, steps));

  const formatedSteps = formatSoloStepToPhase(steps);

  return [...formatedPhases, ...formatedSteps].sort(sortByPosition);
};

export const formatDifficulty = (difficulty: Difficultys): string => {
  switch (difficulty) {
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Hard';
    default:
      return 'Medium';
  }
};
