const KEY = 'avatarURL';

export function setAvatarUrl(avatarUrl) {
  localStorage.setItem(KEY, avatarUrl);
}

export function getAvatarUrl() {
  return localStorage.getItem(KEY);
}

export function removeAvatarUrl() {
  localStorage.removeItem(KEY);
}