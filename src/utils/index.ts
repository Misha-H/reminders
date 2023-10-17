class Task {
  private title = '';
  private description = '';
  private tsCreated: number;

  setTitle(value: string): void {
    this.title = value;
  }

  setDescription(value: string): void {
    this.description = value;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  constructor() {
    this.tsCreated = new Date().getTime();
  }
}

export default Task;
