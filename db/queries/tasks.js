import { Task, TASK_STATUSES } from '../models.js'

export async function createTaskQuery({ title, description }) {
  return await Task.create({
    title,
    description,
    status: TASK_STATUSES.PENDING
  })
}

export async function getTaskQuery({ id }) {
  return await Task.findOne({ where: { id } })
}

export async function updateTaskQuery({ id, title, description, status }) {
  return await Task.update({ title, description, status }, { where: { id } })
}

export async function getAllTasksQuery() {
  return await Task.findAll()
}

export async function deleteTaskQuery({ id }) {
  return await Task.destroy({ where: { id } })
}
