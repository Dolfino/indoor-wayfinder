export function adminOnly<T>(isAdmin: boolean, action: T): T | undefined {
  return isAdmin ? action : undefined;
}
