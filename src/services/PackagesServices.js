import axios from '@/axios'

export async function versionPackages (name) {
  const response = await axios.get(`package/npm/${name}`)
  return response.data
}

export async function filesPackages (name, version) {
  const response = await axios.get(`package/npm/${name}@${version}`)
  return response.data
}
