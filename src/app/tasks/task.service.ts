import { Injectable } from '@angular/core';
import { NewTask } from './new-task.dto';
import { TaskItem } from './task-item.dto';
import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  private tasks = new BehaviorSubject<TaskItem[]>([])

  getAllTasks(): Observable<TaskItem[]>{
   return this.httpClient.get<TaskItem[]>('http://localhost:3001/tasks')
  }

  addTask(newTask: NewTask){
    var updatedTasks = this.tasks.value.concat(new TaskItem(newTask.title));
    this.tasks.next(updatedTasks);
  }

  removeTask(existingTask: TaskItem){
    var updatedTasks = this.tasks.value.filter(task => task != existingTask);
    this.tasks.next(updatedTasks);
  }
}
