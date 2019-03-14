import { compare, migrate } from '../../helpers/Migrator';
import { training, phases, steps } from '../../config/schema';
import { storeService } from '../../helpers/storeService';


function compareSchema(data) {
  const trainingData = data[0];
  const phaseData = trainingData.phases[0];
  const stepData = phaseData.steps[0];

  const trainingIsConsistent = compare(training, trainingData);
  const phaseIsConsistent = compare(phases, phaseData);
  const stepIsConsistent = compare(steps, stepData);

  const result = [trainingIsConsistent, phaseIsConsistent, stepIsConsistent];

  return result;
}


function needMigration(dataSaved) {
  const migrationMap = compareSchema(dataSaved);
  const haveError = migrationMap.find(element => !element);
  if (haveError !== undefined) {
    return true;
  }
  return false;
}

function migrateSchema(dataSaved) {
  const migrationMap = compareSchema(dataSaved);
  const migrateTraining = migrationMap[0];
  const migratePhase = migrationMap[1];
  const migrateStep = migrationMap[2];

  let data = [...dataSaved];
  if (!migrateTraining) {
    data = dataSaved.map(trainingData => migrate(training, trainingData));
  }
  if (!migratePhase) {
    data = data.map(trainingData => ({
      ...trainingData,
      phases: trainingData.phases.map(phaseData => migrate(phases, phaseData))
    }));
  }
  if (!migrateStep) {
    data = data.map(trainingData => ({
      ...trainingData,
      phases: trainingData.phases.map(phaseData => ({
        ...phaseData,
        steps: phaseData.steps.map(stepsData => migrate(steps, stepsData))
      }))
    }));
  }
  return data;
}

export default async function loadTrainingData() { //  initial state
  const dataSaved = await storeService.getSaving();
  if (dataSaved) {
    console.log(' ================ Async Storage ================ ');
    console.log('last Save :', dataSaved);
    const dataNeedMigration = needMigration(dataSaved);
    if (dataNeedMigration) {
      const data = migrateSchema(dataSaved);
      console.log('TCL: StoreService -> loadState -> data', data);
      return data;
    }

    return dataSaved;
  }

  const state = [{
    name: 'training',
    phases: [
      {
        name: 'phase 1',
        repetitions: 1,
        steps: [
          {
            name: 'planche',
            duration: 7,
            key: 's-6789'
          },
          {
            name: 'pause',
            duration: 5,
            key: 's-6788'
          },
          {
            name: 'planche',
            duration: 10,
            key: 's-6787'
          },
        ]
      }
    ]
  }];

  return state;
}
