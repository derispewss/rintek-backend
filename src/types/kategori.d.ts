export type KategoriType = 'PRIBADI' | 'KOMUNITAS'

export interface Kategori {
  id: string
  name: string
  room_name: string
  room_desc: string
  slug: string
  type: KategoriType
}
