import { Request, Response } from 'express'
import { supabase } from '../services/supabase.service'
import { sendResponse } from '../utils/sendResponse'
import { HttpCode } from '../types/general'
import crypto from 'crypto'

export const createUserKategori = async (req: Request, res: Response) => {
  const { user_id, kategori_id } = req.body
  const { error } = await supabase.from('user_kategori').insert([
    {
      id: crypto.randomUUID(),
      user_id,
      kategori_id
    }
  ])
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.CREATED, 'User-Kategori berhasil dibuat')
}

export const getUserKategoriByUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { data, error } = await supabase
    .from('user_kategori')
    .select('kategori(*)')
    .eq('user_id', userId)
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Kategori milik user berhasil diambil', data)
}

export const deleteUserKategori = async (req: Request, res: Response) => {
  const { id } = req.params
  const { error } = await supabase.from('user_kategori').delete().eq('id', id)
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Relasi user-kategori berhasil dihapus')
}
