// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginApi: 'http://localhost:8080/api/v1/login',
  userInfoApi: 'http://localhost:8080/users/user_info',
  findUserByIdApi: 'http://localhost:8080/users/find_user_by_id',
  operateUserByAdminApi: 'http://localhost:8080/admin/users',
  operateProjectByAdminApi: 'http://localhost:8080/admin/projects',
  findProjectByIdApi: 'http://localhost:8080/projects/find_by_id',
  operateProjectApi: 'http://localhost:8080/projects',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
