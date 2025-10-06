import { Plan } from '../models/index.ts'   
import { Op } from 'sequelize'

// Types for Plan creation and update
export type CreatePlanData = {
  name: string;
  price: number;
  maxBooks: number;
  description?: string | null;
}

export type UpdatePlanData = Partial<CreatePlanData>    


// Create a new Plan
export function createPlan(data: CreatePlanData) {       
  return Plan.create(data)
}

// List all, ordered by id ascending
export function listPlans() {                            
  return Plan.findAll({ order: [['id', 'ASC']] })
}

// Search by primary key (id)
export function getPlanById(id: number) {                
  return Plan.findByPk(id)
}

// Search by unique email
export function getPlanByEmail(name: string) {          
  return Plan.findOne({ where: { name } })
}

// Update only fields present in 'data'
export async function updatePlan(id: number, data: UpdatePlanData) { 
  const plan = await Plan.findByPk(id)
  if (!plan) return null 
  await plan.update(data)
  return plan                        
}

// Delete by primary key (id)
export async function deletePlan(id: number) {           
  const plan = await Plan.findByPk(id)                  
  if (!plan) return false                               
  await plan.destroy() // delete from db
  return true                                           
}


// Search Plans with price greater than 20
export function findExpensivePlans() {
  return Plan.findAll({
    where: { price: { [Op.gt]: 20 } }
  })
}

// Search Plans with maxBooks less than or equal to 5
export function findBasicPlans() {
  return Plan.findAll({
    where: { maxBooks: { [Op.lte]: 5 } }
  })
}

// Search Plans created after January 1, 2025
export function findPlansCreatedAfter() {
  return Plan.findAll({
    where: { createdAt: { [Op.gt]: new Date('2025-01-01') } }
  })
}
