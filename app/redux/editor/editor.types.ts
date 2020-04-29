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
  steps: string[];
  position: number;
  repetitions: number;
}

export interface EditorState {
  name: string;
  steps: EditorStep[];
  phases: EditorPhase[];
  difficulty: Difficultys;
  id: string;
}
