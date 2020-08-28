import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/recommendations", pathMatch: "full" },
    { path: "recommendations", loadChildren: () => import("~/app/recommendations/recommendations.module").then((m) => m.RecommendationsModule) },
    { path: "details", loadChildren: () => import("~/app/recommendations/details/details.module").then((m) => m.DetailsModule) },
    { path: "createRecipe", loadChildren: () => import("~/app/recipes/createRecipes/createRecipe.module").then((m) => m.CreateRecipeModule) },
    { path: "discover", loadChildren: () => import("~/app/discover/discover.module").then((m) => m.DiscoverModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "recipes", loadChildren: () => import("~/app/recipes/recipes.module").then((m) => m.RecipesModule) },
    { path: "fridge", loadChildren: () => import("~/app/fridge/fridge.module").then((m) => m.FridgeModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) }
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
