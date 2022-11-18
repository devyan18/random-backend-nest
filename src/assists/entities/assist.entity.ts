export interface Presense {
  user: string;
  is_present: boolean;
}

export class Assist {
  date: Date;
  present: Presense[];
}
