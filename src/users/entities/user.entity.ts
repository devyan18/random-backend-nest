export class StudyingCareer {
  career: string;
  inassistences: number;
}

export class User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  studying_careers?: StudyingCareer[];
  teaching_subjects?: string[];
  isAdmin?: boolean;
}
