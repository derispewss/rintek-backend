import { Request, Response } from 'express'
import { supabase } from '../services/supabase.service'
import { sendResponse } from '../utils/sendResponse'
import { HttpCode } from '../types/general'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const getUsers = async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('user').select('id, name, created_at')
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Users retrieved successfully', data)
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data, error } = await supabase.from('user').select('id, name, created_at').eq('id', id).single()
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
  const { data, error } = await supabase.from('user').insert([
    {
      id: crypto.randomUUID(),
      name,
      password: hashedPassword,
      created_at: new Date().toISOString()
    }
  ])
  if (error) {
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

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body
  const { error } = await supabase.from('user').update({ name }).eq('id', id).select().single()
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'User updated successfully')
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { error } = await supabase.from('user').delete().eq('id', id)
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'User deleted successfully')
}