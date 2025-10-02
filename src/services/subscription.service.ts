import { Subscription } from '../models/index.ts'   
import { Op } from 'sequelize'

// Types for Subscription creation and update
export type CreateSubscriptionData = {
  userId: number;
  planId: number;
  startDate: Date;
  endDate?: Date | null;
  status?: string;
}

export type UpdateSubscriptionData = Partial<CreateSubscriptionData>    


// Create a new Subscription
export function createSubscription(data: CreateSubscriptionData) {       
  return Subscription.create(data)
}

// List all, ordered by id ascending
export function listSubscriptions() {                            
  return Subscription.findAll({ order: [['id', 'ASC']] })
}

// Search by primary key (id)
export function getSubscriptionById(id: number) {                
  return Subscription.findByPk(id)
}

// Search by user_id
export function getSubscriptionByUserId(userId: number) {          
  return Subscription.findOne({ where: { userId } })
}

// Update only fields present in 'data'
export async function updateSubscription(id: number, data: UpdateSubscriptionData) { 
  const subscription = await Subscription.findByPk(id)
  if (!subscription) return null 
  await subscription.update(data)
  return subscription                        
}

// Delete by primary key (id)
export async function deleteSubscription(id: number) {           
  const subscription = await Subscription.findByPk(id)                  
  if (!subscription) return false                               
  await subscription.destroy() // delete from db
  return true                                           
}

// Search all active subscriptions
export function findActiveSubscriptions() {
  return Subscription.findAll({
    where: { status: { [Op.eq]: 'active' } }
  })
}

// Search all that the start date is in the future
export function findFutureSubscriptions() {
  return Subscription.findAll({
    where: { startDate: { [Op.gt]: new Date() } }
  })
}

// Search all non-ative subscriptions
export function findNonActiveSubscriptions() {
  return Subscription.findAll({
    where: { status: { [Op.ne]: 'active' } }
  })
}

