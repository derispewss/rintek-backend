import { Request, Response } from 'express'
import { supabase } from '../services/supabase.service'
import { sendResponse } from '../utils/sendResponse'
import { HttpCode } from '../types/general'
import crypto from 'crypto'

export const getAllUserSubscriptions = async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('user_subscription').select('*')
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'User Subscriptions retrieved successfully', data)
}

export const createUserSubscription = async (req: Request, res: Response) => {
  const { user_id, subscription_type } = req.body

  const { error } = await supabase.from('user_subscription').insert([
    {
      id: crypto.randomUUID(),
      user_id,
      subscription_type
    }
  ])

  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }

  sendResponse(res, HttpCode.CREATED, 'User Subscription created successfully')
}

export const deleteUserSubscription = async (req: Request, res: Response) => {
  const { id } = req.params

  const { error } = await supabase.from('user_subscription').delete().eq('id', id)
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }

  sendResponse(res, HttpCode.OK, 'User Subscription deleted successfully')
}
