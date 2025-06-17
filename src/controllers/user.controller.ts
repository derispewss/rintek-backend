import { Request, Response } from 'express'
import { supabase } from '../services/supabase.service'
import { sendResponse } from '../utils/sendResponse'
import { HttpCode } from '../types/general'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const getUsers = async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('user').select('id, name, subscription_type, created_at')
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Users retrieved successfully', data)
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data, error } = await supabase.from('user').select('id, name, subscription_type, created_at').eq('id', id).single()
  if (error) {
    if (error.code === 'PGRST116') {
        sendResponse(res, HttpCode.NOT_FOUND, 'User not found')
        return
    }
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'User retrieved successfully', data)
}

export const createUser = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const { error } = await supabase.from('user').insert([
    {
      id: crypto.randomUUID(),
      name,
      password: hashedPassword,
      created_at: new Date().toISOString()
    }
  ])
  if (error) {
    if (error.code === '23505') {
      sendResponse(res, HttpCode.CONFLICT, 'User already exists')
      return
    }
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.CREATED, 'User created successfully')
}

export const loginUser = async (req: Request, res: Response) => {
  const { name, password } = req.body
  const { data: user, error } = await supabase
    .from('user')
    .select('*')
    .eq('name', name)
    .single()
  if (error || !user) {
    sendResponse(res, HttpCode.UNAUTHORIZED, 'User not found or invalid')
    return
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    sendResponse(res, HttpCode.UNAUTHORIZED, 'Password salah')
    return
  }
  sendResponse(res, HttpCode.OK, 'Login berhasil', { id: user.id, name: user.name })
}

export const subscribeUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { subscription_type } = req.body

  if (!subscription_type || !['PRIBADI', 'KOMUNITAS'].includes(subscription_type)) {
    sendResponse(res, HttpCode.BAD_REQUEST, 'Subscription type tidak valid (PRIBADI/KOMUNITAS)')
    return
  }

  const { data: existing, error: fetchError } = await supabase
    .from('user')
    .select('subscription_type')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    sendResponse(res, HttpCode.NOT_FOUND, 'User tidak ditemukan')
    return
  }

  if (existing.subscription_type) {
    sendResponse(res, HttpCode.CONFLICT, 'User sudah memiliki subscription')
    return
  }

  const { error } = await supabase
    .from('user')
    .update({ subscription_type })
    .eq('id', id)

  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }

  sendResponse(res, HttpCode.OK, 'Subscription berhasil dipilih')
}