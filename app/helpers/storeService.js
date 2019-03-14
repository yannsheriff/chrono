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
}

export const storeService = new StoreService();
