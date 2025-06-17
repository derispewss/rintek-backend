import { Request, Response } from 'express'
import { supabase } from '../services/supabase.service'
import { sendResponse } from '../utils/sendResponse'
import { HttpCode } from '../types/general'
import crypto from 'crypto'

export const getAllKategori = async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from('kategori').select('*')
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Kategori retrieved successfully', data)
}

export const getKategoriById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data, error } = await supabase.from('kategori').select('*').eq('id', id).single()
  if (error) {
    if (error.code === 'PGRST116') {
      sendResponse(res, HttpCode.NOT_FOUND, 'Kategori tidak ditemukan')
      return
    }
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Kategori retrieved successfully', data)
}

export const getKategoriBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params
  const { data, error } = await supabase.from('kategori').select('*').eq('slug', slug).single()
  if (error) {
    if (error.code === 'PGRST116') {
      sendResponse(res, HttpCode.NOT_FOUND, 'Kategori tidak ditemukan')
      return
    }
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Kategori retrieved successfully', data)
}

export const getKategoriByType = async (req: Request, res: Response) => {
  const { type } = req.params
  if(!["PRIBADI", "KOMUNITAS"].includes(type)) {
    sendResponse(res, HttpCode.BAD_REQUEST, 'Invalid type parameter. Must be "PRIBADI" or "KOMUNITAS".')
    return
  }
  const { data, error } = await supabase.from('kategori').select('*').eq('type', type)
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Kategori retrieved successfully', data)
}

export const createKategori = async (req: Request, res: Response) => {
  const { name, room_name, room_desc, slug, type } = req.body
  const { error } = await supabase.from('kategori').insert([
    {
      id: crypto.randomUUID(),
      name,
      room_name,
      room_desc,
      slug,
      type
    }
  ])
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.CREATED, 'Kategori created successfully')
}

export const updateKategori = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, room_name, room_desc, slug, type } = req.body
  const { error } = await supabase.from('kategori').update({ name, room_name, room_desc, slug, type }).eq('id', id).select().single()
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Kategori updated successfully')
}

export const deleteKategori = async (req: Request, res: Response) => {
  const { id } = req.params
  const { error } = await supabase.from('kategori').delete().eq('id', id)
  if (error) {
    sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, error.message)
    return
  }
  sendResponse(res, HttpCode.OK, 'Kategori deleted successfully')
}