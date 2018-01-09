import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodRoutesModule } from './food-routes.module';
import { FormsModule } from '@angular/forms';
// Component //
import { FoodComponent } from './food/food.component';
import { CategoryComponent } from './category/category.component';
import { RestourantComponent } from './restourant/restourant.component';
import { CategortFormComponent } from './category/categort-form.component';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutesModule,
    FormsModule
  ],
  declarations: [
    FoodComponent,
    CategoryComponent,
    RestourantComponent,
    CategortFormComponent
  ]
})
export class AppFoodModule { }
