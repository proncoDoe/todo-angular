import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  categories =[];

  taskObj = {};
  taskName: any;
   taskDate: any;
   taskPriority:  any;
  taskCategory: any;

  constructor(public modalCtlr: ModalController, public todoservice: TodoService) { }

  ngOnInit() {

    this.categories.push('personal');
    this.categories.push('work');
  }

    async dismis(){
    await this.modalCtlr.dismiss(this.taskObj);
  }

  selectedCategory(index): void{
    this.taskCategory = this.categories[index];

  }


 async add(){

    this.taskObj = ({itemName:this.taskName,itemDate:this.taskDate,itemPriority:this.taskPriority,itemCategory:this.taskCategory});

    console.log(this.taskObj);
      const uid = this.taskName + this.taskDate;

      if(uid){

        await this.todoservice.addTask(uid,this.taskObj);

      }else{

        console.log('can\'t save empty task');
      }

    this.dismis();
  }





}
