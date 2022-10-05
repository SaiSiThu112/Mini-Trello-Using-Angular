import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {  

  toDoForm !: FormGroup;
  todo : ITask [] = [];
  doing : ITask [] = [];
  done : ITask [] = [];
  updateIndex !: any;
  isEdit : boolean = false;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.toDoForm = this.fb.group({
      item : ['',Validators.required]
    })
  }

  addTask(){
    this.todo.push({
      description:this.toDoForm.value.item,
      done:false
    });
    this.toDoForm.reset();
  }

  onEdit(item : ITask , i : number){
    // to call value in the task 
    this.toDoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEdit=true;
  }

  updateTask(){
    this.todo[this.updateIndex].description=this.toDoForm.value.item;
    this.todo[this.updateIndex].done=false;
    this.toDoForm.reset();
    this.updateIndex = undefined;
    this.isEdit=false;
  }

  deleteTask(i : number){
    this.todo.splice(i,1)
  }

  deleteDoingTask(i : number){
    this.doing.splice(i , 1);
  }

  deleteDoneTask(i : number){
    this.done.splice(i,1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );}
  }

}
