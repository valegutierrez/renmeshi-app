export function initialRoute(): string {
  return window.location.hash || '#/'
}

export function recipeIdFromRoute(route: string): string {
  return route.startsWith('#/recipe/') ? route.replace('#/recipe/', '') : ''
}
