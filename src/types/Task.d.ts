export interface ITask {
  name: string;
  description: string;
  status: string;
  userId: string;
  categoryId: string;
}

export interface ITaskEdit {
  name?: string;
  description?: string;
  status?: string;
  categoryId?: string;
}
