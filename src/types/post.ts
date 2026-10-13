export interface Post {
  /** Unique and never reused: the unread cookie stores the newest id */
  id: string;
  title: string;
  date: string;
  body: string;
}
