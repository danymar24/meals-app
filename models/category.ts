interface CategoryI {
  id: string,
  title: string,
  color: string
}

export default class Category implements CategoryI{
  id: string = '';
  title: string = '';
  color: string = '';

  constructor(id: string, title: string, color: string) {
    this.id = id;
    this.title = title;
    this.color = color;
  }
}