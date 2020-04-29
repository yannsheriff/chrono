/* eslint-disable prettier/prettier */
import {
  EditorStep,
  EditorPhase,
  Difficultys,
  EditorState,
  Phase,
  Step,
} from './editor.types';
import generateID from '~/helpers/idGenerator';
import { Training } from '~/components/trainingList/trainingList.component';

const formatPhaseToSoloStep = (phase: Phase, position: number): EditorStep => {
  return {
    ...phase.steps[0],
    position,
  };
};

const formatPhaseToEditorStep = (
  step: Step,
  phaseKey: string,
  position: number,
): EditorStep => {
  return {
    ...step,
    phase: phaseKey,
    position,
  };
};

const formatPhaseToEditorPhase = (
  phase: Phase,
  position: number,
): EditorPhase => {
  return {
    ...phase,
    key: `P${generateID()}`,
    steps: phase.steps.map((step): string => step.key),
    position,
  };
};

const extractStepsFromPhase = (
  phase: Phase,
  position: number,
): { editorSteps: EditorStep[]; editorPhase: EditorPhase } => {
  const editorPhase: EditorPhase = formatPhaseToEditorPhase(phase, position);
  const editorSteps: EditorStep[] = phase.steps.map(
    (step: Step, index: number): EditorStep =>
      formatPhaseToEditorStep(step, editorPhase.key, index),
  );
  return {
    editorPhase,
    editorSteps,
  };
};

const extractStepsAndPhases = (
  trainingPhases: Phase[],
): { steps: EditorStep[]; phases: EditorPhase[] } => {
  const steps: EditorStep[] = [];
  const phases: EditorPhase[] = [];

  trainingPhases.forEach((phase: Phase, index: number): void => {
    if (phase.steps.length === 1 && phase.repetitions === 1) {
      steps.push(formatPhaseToSoloStep(phase, index));
    } else {
      const { editorSteps, editorPhase } = extractStepsFromPhase(phase, index);
      steps.push(...editorSteps);
      phases.push(editorPhase);
    }
  });

  return { steps, phases };
};

const formatDifficultyToEditor = (difficulty: string): Difficultys => {
  switch (difficulty) {
    case 'Easy':
      return Difficultys.easy;
    case 'Medium':
      return Difficultys.medium;
    case 'Hard':
      return Difficultys.hard;
    default:
      return Difficultys.medium;
  }
};

export const formatTrainingToEditor = (training: Training): EditorState => {
  const { steps, phases } = extractStepsAndPhases(training.phases);
  const difficulty = formatDifficultyToEditor(training.difficulty);

  return {
    ...training,
    difficulty,
    steps,
    phases,
  };
};
