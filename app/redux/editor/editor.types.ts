import {
  editStep,
  editStepName,
  editStepDuration,
  editStepPhase,
  editStepPosition,
  editPhase,
  editPhaseRepetitions,
  editPhasePosition,
  removeStepFromPhase,
  addStepToPhase,
} from './editor.action';

export type EditStepActions =
  | ReturnType<typeof editStepName>
  | ReturnType<typeof editStepDuration>
  | ReturnType<typeof editStepPhase>
  | ReturnType<typeof editStepPosition>;

export type EditPhaseActions =
  | ReturnType<typeof editPhaseRepetitions>
  | ReturnType<typeof editPhasePosition>
  | ReturnType<typeof removeStepFromPhase>
  | ReturnType<typeof addStepToPhase>;

export interface EditorStep {
  key: string;
  name: string;
  duration: number;
  phase?: string;
  position: number;
}

export enum Difficultys {
  easy,
  medium,
  hard,
}

export interface EditorPhase {
  key: string;
  steps: Array<string>;
  position: number;
  repetitions: number;
}

export interface EditorState {
  name: string;
  steps: Array<EditorStep>;
  phases: Array<EditorPhase>;
  difficulty: Difficultys;
  id: string;
}
