export const localize = (number) => String(number).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')

export default {
  localize
}
