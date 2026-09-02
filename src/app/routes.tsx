export function initialRoute(): string {
  return window.location.hash || '#/'
}

export function recipeIdFromRoute(route: string): string {
  return route.startsWith('#/recipe/') ? route.replace('#/recipe/', '') : ''
}

export function categoryFromRoute(route: string): string {
  return route.startsWith('#/category/') ? route.replace('#/category/', '') : ''
}
