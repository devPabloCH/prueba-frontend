import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home-trainer',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/home-trainer/home-trainer.module').then(
        (m) => m.HomeTrainerPageModule
      ),
  },
  {
    path: 'home-runner',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/home-runner/home-runner.module').then(
        (m) => m.HomeRunnerPageModule
      ),
  },
  {
    path: 'runner-form',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/runner-form/runner-form.module').then(
        (m) => m.RunnerFormPageModule
      ),
  },
  {
    path: 'training-form',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/training-form/training-form.module').then(
        (m) => m.TrainingFormPageModule
      ),
  },
  {
    path: 'report-form',
    loadChildren: () =>
      import('./pages/report-form/report-form.module').then(
        (m) => m.ReportFormPageModule
      ),
  },
  {
    path: 'training-view',
    loadChildren: () =>
      import('./pages/training-view/training-view.module').then(
        (m) => m.TrainingViewPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
