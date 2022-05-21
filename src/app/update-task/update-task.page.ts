import { TodoService } from './../todo.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  @Input() taskPlaceHolder;

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


    this.taskName = this.taskPlaceHolder.value.itemName;
    this.taskDate = this.taskPlaceHolder.value.itemDate;
    this.taskPriority = this.taskPlaceHolder.value.itemPriority;
    this.taskCategory = this.taskPlaceHolder.value.itemCategory;

    // console.log(this.taskPlaceHolder);
  }

  selectedCategory(index): void{
    this.taskCategory = this.categories[index];
    console.log(this.categories[index]);

  }


  async dismis(){
    await this.modalCtlr.dismiss();
  }


  async uTask(){

    this.taskObj = ({itemName:this.taskName,itemDate:this.taskDate,itemPriority:this.taskPriority,itemCategory:this.taskCategory});
    const uid = this.taskPlaceHolder.key;
    await this.todoservice.updateTask(uid, this.taskObj);
    this.dismis();

  }

}
