import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private storageReady = new BehaviorSubject(false);
 private _storage: Storage | null = null;
  constructor(private storage: Storage) {

    // this.init();
  }

  addTask(key, value){

    this.storage.set(key, value);

    this._storage?.set(key, value);

  }

  async deleteTask(key){

    await this.storage.remove(key);


  }

  updateTask(key, newValue){

    this.storage.set(key, newValue);

    this._storage?.set(key, newValue);
    // i am passing the getAllTasks to refresh the page
    this.getAllTasks();

  }

  getAllTasks(){
    const tasks: any = [];
    this.storage.forEach((key, value, index) => {
    tasks.push({key:value, value:key});
    });
    return tasks;
  }

    async init() {

      await this.storage.defineDriver(CordovaSQLiteDriver);
     // If using, define drivers here: await this.storage.defineDriver(/*...*/);
     const storage = await this.storage.create();
     this._storage = storage;

     this.storageReady.next(true);

  }


}
