export default interface ITag {
  author: string;
  tag: string;
  variants: string[];
  count: number;
  createdAt?: Date;
  updatedAt?: Date;
}