/* eslint-disable class-methods-use-this */

import { AsyncStorage } from 'react-native';
import { compare, migrate } from './Migrator';
import schema, { training, phases, steps } from '../config/schema';

let instance = null;
class StoreService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }


  async get(itemKey) {
    try {
      return await AsyncStorage.getItem(itemKey);
    } catch (error) {
      throw error;
    }
  }

  async getSaving() {
    const dataSaved = await AsyncStorage.getItem('saved');
    if (dataSaved !== null && dataSaved) {
      return JSON.parse(dataSaved);
    }
    return false;
  }

  async save(selectedValue) {
    try {
      const jsonValue = JSON.stringify(selectedValue);
      return await AsyncStorage.setItem('saved', jsonValue);
    } catch (error) {
      throw error;
    }
  }

  async set(itemKey, selectedValue) {
    try {
      const jsonValue = JSON.stringify(selectedValue);
      return await AsyncStorage.setItem(itemKey, jsonValue);
    } catch (error) {
      throw error;
    }
  }

  async remove(itemKey) {
    try {
      return await AsyncStorage.removeItem(itemKey);
    } catch (error) {
      throw error;
    }
  }

  compareSchema(data) {
    const trainingData = data[0];
    const phaseData = trainingData.phases[0];
    const stepData = phaseData.steps[0];

    const trainingIsConsistent = compare(training, trainingData);
    const phaseIsConsistent = compare(phases, phaseData);
    const stepIsConsistent = compare(steps, stepData);

    const result = [trainingIsConsistent, phaseIsConsistent, stepIsConsistent];

    return result;
  }


  migrateSchema(dataSaved) {
    const migrationMap = this.compareSchema(dataSaved);
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

    console.log('TCL: StoreService -> migrateSchema -> data', data);
  }

  async loadState() { //  initial state
    const dataSaved = await this.getSaving();
    if (dataSaved) {
      console.log(' ================ Async Storage ================ ');
      console.log('last Save :', dataSaved);
      this.migrateSchema(dataSaved);


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
}

export const storeService = new StoreService();
