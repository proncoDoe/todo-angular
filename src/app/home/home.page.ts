import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { AddTaskPage } from '../add-task/add-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList = [];

  today: number = Date.now();

  constructor(public modalCtlr: ModalController,public todoservice: TodoService) {

    this.getAllTask();

  }



  async addNewItem(){

 const modal = await this.modalCtlr.create({
      component: AddTaskPage,
    });

    modal.onDidDismiss().then(newObject => {

      this.getAllTask();

    });

    return await modal.present();

  }


  getAllTask(){

    this.todoList = this.todoservice.getAllTasks();
    console.log(this.todoservice.getAllTasks());

  }


  delete(key){

    // console.log(key);

    this.todoservice.deleteTask(key);
    this.getAllTask();

  }

   async update(selectedTask){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {taskPlaceHolder: selectedTask}

    });

     //  to refresh the page
    modal.onDidDismiss().then(()=>{
      this.getAllTask();
    });

    console.log(selectedTask);
    return await modal.present();
  }


}


