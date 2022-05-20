import Vue from 'vue'
import { localize } from '@/helpers/divide'

Vue.filter('localize', (value) => localize(value))
