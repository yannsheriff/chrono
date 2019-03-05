
import { AsyncStorage } from 'react-native';

let instance = null;
class StoreService {
  constructor() {
    if(!instance){
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

    let dataSaved = await AsyncStorage.getItem("saved");
    console.log(dataSaved)
    if (dataSaved !== null && dataSaved) {
        return JSON.parse(dataSaved)
    } else {
        return false
    }
  }
  
  async save(selectedValue) {
    try {
      let jsonValue = JSON.stringify(selectedValue);
      return await AsyncStorage.setItem("saved", jsonValue);
    } catch (error) {
      throw error;
    }
  }

  async set(itemKey, selectedValue) {
    try {
      let jsonValue = JSON.stringify(selectedValue);
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
  
  async loadState() { //  initial state
      const dataSaved = await this.getSaving()
      if (dataSaved) {
        console.log(' ================ Async Storage ================ ')
        console.log("last Save :", dataSaved )
        return dataSaved
      } else {
        
        var state = [{
            name : 'training',
            phases : [
                {
                    name : 'phase 1',
                    repetitions : 1,
                    steps : [
                        {
                            name : 'planche',
                            duration : 7, 
                            key: 's-6789'
                        },
                        {
                            name : 'pause',
                            duration : 5,
                            key: 's-6788'
                        },
                        {
                            name : 'planche',
                            duration : 10,
                            key: 's-6787'
                        },
                    ]
                }
            ]
        }]

        return state
      }
  }
}

export let storeService = new StoreService();
