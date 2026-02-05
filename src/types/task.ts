export const enum Category {
  Work = 'Work',
  Personal = 'Personal',
  Study = 'Study',
}

export const enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export type FiltersType = 'all' | 'active' | 'completed' | 'personal' | 'work' | 'study'

export interface Task {
  id: number
  title: string
  category: Category
  priority: Priority
  isDone: boolean
  description?: string
  date?: string
  time?: string
}
