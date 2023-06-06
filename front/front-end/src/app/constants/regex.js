export const PASSWORD_VALID =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const FIRSTNAME = /^[a-zA-Zàáâäãåçèéêëìíîïñòóôöõøùúûüýÿ'\-]{2,}$/;

export const LASTNAME = /^[a-zA-Zàáâäãåçèéêëìíîïñòóôöõøùúûüýÿ'\-\s]{2,}$/;

export const PROJECT_NAME = /^.{3,50}$/;

export const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ONLY_ALPHA = /^[a-zA-ZÀ-ÿ\s\-]+$/;