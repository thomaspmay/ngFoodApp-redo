import { Injectable } from "@angular/core";
import { Recipe } from "./recipe";
// import { recipes } from "./mock-recipes";
import { knownFolders, path, File, Folder } from "@nativescript/core/file-system";
import { hundredMockRecipes as recipes } from "./txtmockrecipes"


@Injectable()
export class RecipesService {
    private _selectedId = -1;

    getRecipes(): Recipe[] {
        // for(let recipe of recipes){
        //     console.log(JSON.stringify(recipe));
        // }

        return recipes;
    }

    getRecipe(id: number): Recipe {
        return recipes.filter(recipe => recipe.id === id)[0];
    }

    setSelectedId(id: number) {
        if (id < recipes.length) {
            this._selectedId = id;
        }
    }

    getSelected(): Recipe {
        return this._selectedId < 0 ? null : this.getRecipe(this._selectedId);
    }
}