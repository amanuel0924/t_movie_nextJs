export type GetAdminDataQuery = {
  start?: string
  size?: string
  filters?: string
  globalFilter?: string
  sorting?: string
  filtersFns?: string
  customVariantsTypes?: string
}
export type Filter = {
  id: string
  value: string
  mode?: string
  type?: string
}

export type GlobalFilter = {
  value: string
  columuns?: string[]
}
export interface CreateProgramFormStateType {
  errors: {
    title?: string[]
    videoUrl?: string[]
    description?: string[]
    duration?: string[]
    channel?: string[]
    category?: string[]
    type?: string[]
    released?: string[]
    _form?: string[]
  }
}

export interface CreateChannelFormStateType {
  errors: {
    name?: string[]
    _form?: string[]
  }
}
