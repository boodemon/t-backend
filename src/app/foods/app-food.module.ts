import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodRoutesModule } from './food-routes.module';
// Component //
import { FoodComponent } from './food/food.component';
import { CategoryComponent } from './category/category.component';
import { RestourantComponent } from './restourant/restourant.component';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutesModule
  ],
  declarations: [
    FoodComponent,
    CategoryComponent,
    RestourantComponent
  ]
})
export class AppFoodModule { }
