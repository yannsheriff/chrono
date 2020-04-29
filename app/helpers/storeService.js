/* eslint-disable class-methods-use-this */

import AsyncStorage from '@react-native-community/async-storage';

let instance = null;
class StoreService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async get(itemKey) {
    const dataSaved = await AsyncStorage.getItem(itemKey);
    if (dataSaved !== null && dataSaved) {
      return JSON.parse(dataSaved);
    }
    return false;
  }

  async getSaving() {
    const dataSaved = await AsyncStorage.getItem('saved');
    if (dataSaved !== null && dataSaved) {
      return JSON.parse(dataSaved);
    }
    return false;
  }

  async save(selectedValue) {
    const jsonValue = JSON.stringify(selectedValue);
    return AsyncStorage.setItem('saved', jsonValue);
  }

  async set(itemKey, selectedValue) {
    const jsonValue = JSON.stringify(selectedValue);
    return AsyncStorage.setItem(itemKey, jsonValue);
  }

  async remove(itemKey) {
    return AsyncStorage.removeItem(itemKey);
  }
}

export const storeService = new StoreService();
