import { promises as fs } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import type { IPlan } from "../interfaces/plan.interface.ts"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filepath = join(__dirname, "../models/plans.model.json")

const getPlanService = async (id: number): Promise<IPlan|null> => {
    const data = await fs.readFile(filepath, "utf-8")
    const plans: IPlan[] = JSON.parse(data) as IPlan[]
    const plan = plans.find(plan => plan.id == id) || null
    return plan
}

const getPlansService = async (): Promise<IPlan[]> => {
    const data = await fs.readFile(filepath, "utf-8")
    const plans: IPlan[] = JSON.parse(data) as IPlan[]
    return plans
}

const createPlanService = async (plan: IPlan): Promise<IPlan> => {
    const data = await fs.readFile(filepath, "utf-8")
    const plans: IPlan[] = JSON.parse(data) as IPlan[]
    plans.push(plan)
    await fs.writeFile(filepath, JSON.stringify(plans, null, 2))
    return plan
}

const updatePlanService = async (id: number, plan: IPlan): Promise<IPlan|null> => {
    const data = await fs.readFile(filepath, "utf-8")
    const plans: IPlan[] = JSON.parse(data) as IPlan[]
    const index = plans.findIndex(plan => plan.id == id)
    if (index === -1) return null
    plans[index] = plan
    await fs.writeFile(filepath, JSON.stringify(plans, null, 2))
    return plan
}

const deletePlanService = async (id: number): Promise<void> => {
    const data = await fs.readFile(filepath, "utf-8")
    const plans: IPlan[] = JSON.parse(data) as IPlan[]
    const filteredplans = plans.filter(plan => plan.id != id)
    await fs.writeFile(filepath, JSON.stringify(filteredplans, null, 2))
}

export { getPlanService, getPlansService, createPlanService, updatePlanService, deletePlanService }