import type { Request, Response } from "express"
import { handleHttp } from "../utils/error.handler.ts"
import { getPlanService, getPlansService, createPlanService, updatePlanService, deletePlanService } from "../services/plans.services.ts"
import type { IPlan } from "../interfaces/plan.interface.ts"
import type { HttpErrorStatus } from "../types/types.ts"

const getPlan = (req: Request<{id:number}>, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    const { id } = req.params
    try {
        getPlanService(id).then((response) => {
            if (!response) {
                res.status(404).send({ message: "Plan not found" });
            } else {
                res.send(response);
            }
        })
    }catch(err){
        handleHttp(res, "ERROR_GET_PLAN", statusCode, err);
    }
}

const getPlans = (req: Request, res: Response):void => {
    const statusCode: HttpErrorStatus = 500
    try {
        getPlansService().then((response) => {
            res.send(response);
        })
    }catch(err){
        handleHttp(res, "ERROR_GET_PLANS", statusCode, err);
    }
}

const createPlan = (req: Request, res: Response):void => {
    const statusCode: HttpErrorStatus = 500
    try {
        const Plan: IPlan = req.body
        createPlanService(Plan).then((response) => {
            res.status(201).send(response);
        })
    } catch(err){
        handleHttp(res, "ERROR_CREATE_PLAN", statusCode, err);
    }
}

const updatePlan = (req: Request<{id:number}>, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    const { id } = req.params
    const Plan: IPlan = req.body
    try {
        updatePlanService(id, Plan).then((response) => {
            if (!response) {
                res.status(404).send({ message: "Plan not found" });
            } else {
                res.send(response);
            }
        })
    } catch(err){
        handleHttp(res, "ERROR_UPDATE_PLAN", statusCode, err);
    }
}

const deletePlan = (req: Request<{ id: number }>, res: Response) => {  
    let statusCode:HttpErrorStatus = 500;
    const { id } = req.params;
    try {
        deletePlanService(id).then((response) => {
            res.send(response);
        })

    }catch(err){
        handleHttp(res, "ERROR_DELETE_PLAN", statusCode, err);
    }
}

export { getPlan, getPlans, createPlan, updatePlan, deletePlan }