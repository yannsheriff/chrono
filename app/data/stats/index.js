/* eslint-disable class-methods-use-this */
import { compare, migrate } from '../../helpers/Migrator';
import { doneTraining } from './schema';
import { storeService } from '../../helpers/storeService';

let instance = null;
class StatsService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  compareSchema(data) {
    const doneTrainingData = data[0];
    const trainingIsConsistent = compare(doneTraining, doneTrainingData);

    const result = [trainingIsConsistent];

    return result;
  }


  needMigration(dataSaved) {
    const migrationMap = compareSchema(dataSaved);
    const haveError = migrationMap.find(element => !element);
    if (haveError !== undefined) {
      return true;
    }
    return false;
  }

  migrateSchema(dataSaved) {
    const migrationMap = compareSchema(dataSaved);
    const migrateTraining = migrationMap[0];

    let data = [...dataSaved];
    if (!migrateTraining) {
      data = dataSaved.map(trainingData => migrate(doneTraining, trainingData));
    }

    return data;
  }

  async loadStats() { //  initial state
    const dataSaved = await storeService.get('stats');
    if (dataSaved) {
      console.log('Stats :', dataSaved);
      const dataNeedMigration = needMigration(dataSaved);
      if (dataNeedMigration) {
        const data = migrateSchema(dataSaved);
        await storeService.set('stats', data);
        return data;
      }

      return dataSaved;
    }

    return [];
  }


  async saveStats(data) { //  initial state
    const dataSaved = await storeService.get('stats');
    dataSaved.push(data);
    await storeService.set('stats', dataSaved);
  }
}

export default new StatsService();
